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
const authFetch = axios.create({
    baseURL: 'api/v1',
})
authFetch.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${token}`
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

const initialState = create((set, get) => ({
    isLoading: false,
    showAlert: null,
    alertText: '',
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
    getAllJobs : async () => {
        try {
      const response = await authFetch.get('/jobs')
            console.log(response.data.jobs)
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
            console.log('success')
        } catch (e) {
            console.log(e)
        }
    },
    updateUser: async (currentUser) => {
        try {
            const {data} = await authFetch.patch('/auth/updateUser', currentUser)
            const {user, token, location} = data
            console.log(user, token, location)
            set({token: token, user: user, userLocation: location, jobLocation: location})
            set({showAlert: true, alertText: 'user created! redirecting ....'})
            addUserToLocalStorage({user, token, location})
        } catch (error) {
            set({showAlert: false, alertText: 'something went wrong'})
            console.log(error.response)
        }
    },
    registerUser: async (user1) => {
        try {
            console.log('sss')
            const response = await axios.post('/api/v1/auth/register', user1)
            console.log(response)
            const {user, token, location} = response.data
            set({token: token, user: user, userLocation: location, jobLocation: location})
            set({showAlert: true, alertText: 'profile updated'})
            addUserToLocalStorage({user, token, location})
        } catch (error) {
            console.log('sad', error)
            set({showAlert: false, alertText: 'something went wrong'})
        } finally {
            set({isLoading: false})
        }
    },
    loginUser: async (currentUser) => {
        try {
            const response = await axios.post('/api/v1/auth/login', currentUser)
            const {user, token, location} = response.data
            set({token: token, user: user, userLocation: location, jobLocation: location})
            set({showAlert: true, alertText: 'logged in successfully! redirecting ....'})
            addUserToLocalStorage({user, token, location})
        } catch (error) {
            console.log('sad', error)
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
    editJob :  () => {
        console.log('edit job')
    },
    deleteHandler :async (_id) => {
        try {
            await authFetch.delete(`/jobs/${_id}`)
            await get().getAllJobs()

        } catch (err) {
            console.log(err)
        }
        console.log('Job Editing')
    }
}))
export default initialState