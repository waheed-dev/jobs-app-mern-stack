import { create } from "zustand";
import axios from "axios";
const addUserToLocalStorage = ({user,token,location}) => {
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('token',token)
    localStorage.setItem('location',location)
}
const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')
const initialState = create((set,get) => ({
    isLoading: false,
      showAlert : null,
    user : user ? JSON.parse(user) : null,
    token : token || null,
    userLocation : userLocation || '',
    jobLocation : userLocation || '',
    registerUser : async (user1) => {
        try {
            console.log('sss')
            const response = await axios.post('/api/v1/auth/register',user1)
            console.log(response)
            const {user,token,location} = response.data
            set({token : token,user : user,userLocation : location,jobLocation : location})
            set({showAlert : true})
            addUserToLocalStorage({user,token,location})
        } catch (error) {
            console.log('sad',error)
            set({showAlert : false})
        } finally {
            set({isLoading : false})
        }
    },
    loginUser : async (currentUser) => {
        console.log(currentUser)
    }
}))
export default initialState