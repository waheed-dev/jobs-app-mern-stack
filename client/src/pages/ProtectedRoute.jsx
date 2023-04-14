import initialState from "../../store/store.js";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const user = initialState(state => state.user)
  if (!user) {
    return <Navigate to={'/landing'}/>
  }
  return children
}
export default ProtectedRoute