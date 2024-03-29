import {create} from "zustand";
import axios from "axios";

const addUserToLocalStorage = ({user, token, location}) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
}
const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')
const userString = JSON.parse(user)
const isTestUser = userString?.email === 'test@test.com'
const authFetch = axios.create({
    baseURL: 'api/v1',
})
const initialState = create((set, get) => ({
    isLoading: false,
    showAlert: null,
    testUser : isTestUser,
    alertText: '',
    alertStatus : "",
    user: user ? JSON.parse(user) : null,
    token: token || null,
    set: (newState) => set(() => ({...initialState, ...newState})),
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['pending', 'interview', 'declined'],
    jobStatus: 'pending',
    jobs:[],
    totalJobs : 0,
    noOfPages : 1,
    page : 1,
    stats : {},
    monthlyApplication : [],
    search : '',
    searchStatus : 'all',
    searchType : 'all',
    sort : 'latest',
    sortOptions : ['latest','oldest','a-z','z-a'],
    searchJobTypeOptions: ['all','full-time', 'part-time', 'remote', 'internship'],
    searchJobStatusOptions: ['all','pending', 'interview', 'declined'],
    getAllJobs : async (search,searchType,sort,searchStatus,noOfPages) => {
        let url =  `/jobs?page=${noOfPages}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
        if (search) {
            url = url + `&search=${search}`
        }
        try {
      const response = await authFetch.get(url)
            set({jobs: response.data.jobs, totalJobs: response.data.totalJobs, page: response.data.numOfPages})
        } catch (e) {
            console.log(e)
        }
    },
    createJob: async () => {
        const data = {
            company: get().company,
            position: get().position,
            status: get().jobStatus,
            jobType: get().jobType,
            jobLocation: get().jobLocation,
        }
        try {
            await authFetch.post('/jobs', data)
        } catch (e) {
            console.log(e)
        }
    },
    updateUser: async (currentUser) => {
            try {
                const {data} = await authFetch.patch('/auth/updateUser', currentUser)
                const {user, token, location} = data
                set({token: token, user: user, userLocation: location, jobLocation: location})
                set({showAlert: true, alertStatus : 'success',alertText: 'profile updated'})
                addUserToLocalStorage({user, token, location})
            } catch (error) {
                set({showAlert: false,alertStatus : 'error', alertText: 'something went wrong'})
        }
    },
    registerUser: async (user1) => {
        try {

            const response = await axios.post('/api/v1/auth/register', user1)
            const {user, token, location} = response.data
            set({token: token, user: user, userLocation: location, jobLocation: location})
            set({showAlert: true, alertText: 'profile updated'})
            addUserToLocalStorage({user, token, location})
        } catch (error) {
            set({showAlert: false, alertText: 'something went wrong'})
        } finally {
            set({isLoading: false})
        }
    },
    loginUser: async (currentUser) => {
        console.log(currentUser)
        try {
            const response = await axios.post('/api/v1/auth/login', currentUser)
            const {user, token, location} = response.data
            console.log(token)
            set({token: token, user: user, userLocation: location, jobLocation: location})
            set({showAlert: true, alertText: 'logged in successfully! redirecting ....'})
            addUserToLocalStorage({user, token, location})
            if ( response.data.user.email === 'test@test.com') {
                set({testUser : true})
            }
        } catch (error) {
            set({showAlert: false, alertText: 'credentials dont match'})
        } finally {
            set({isLoading: false})
        }
    },
     editHandler : (id) => {
         const job = get().jobs.find(job => job._id === id)
         const {_id,position,company,jobLocation,jobType,status} = job
         set({editJobId: _id, isEditing : true,position,company,jobLocation,jobType,status})
    },
    editJob : async (editJobId) => {
        const data = {
            company: get().company,
            position: get().position,
            status: get().jobStatus,
            jobType: get().jobType,
            jobLocation: get().jobLocation,
        }
        try {
              await authFetch.patch(`jobs/${editJobId}`, data)
        } catch (e) {
            console.log(e)
        }
    },
    deleteHandler :async (_id) => {
        try {
            await authFetch.delete(`/jobs/${_id}`)
           return  await get().getAllJobs()

        } catch (err) {
            console.log(err)
        }
    },
    statsJob : async () => {
        try {
           const data = await authFetch.get('jobs/stats')
            const {defaultStates,monthlyApplications} = data.data
            set({stats : defaultStates,monthlyApplication : monthlyApplications})
        } catch (err) {
            console.log(err)
        }
    },
    clearFilter : () => {
        set({search: '', searchStatus : 'all',searchType : "all",sort : 'latest'})

    },
    changePage : (page) => {
        set({noOfPages : page})
    },
}))
authFetch.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`
    return config
}, (error) => {
    return Promise.reject(error)
})

authFetch.interceptors.response.use((response) => {
    return response
}, (error) => {
    console.log(error.response)
    if (error.response.status === 401) {
        console.log('auth error')
    }
    return Promise.reject(error)
})


export default initialState