import { create } from "zustand";
import axios from "axios";

const initialState = create((set,get) => ({
    isLoading: false,
      showAlert : false,
      alertText : '',
      alertType : '',
    user : null,
    token : '',
    userLocation : '',
    jobLocation : '',
    registerUser : async (user1) => {
        try {
            console.log('sss')
            set({isLoading : true})
            const response = await axios.post('/api/v1/auth/register',user1)
            console.log(response)
            const {user,token,location} = response.data
            set({token : token,user : user,userLocation : location,jobLocation : location})
        } catch (error) {
            console.log('sad',error)
        } finally {
            set({isLoading : false})
        }
    }
}))
export default initialState