import {Box} from "@chakra-ui/react";
import {useEffect} from "react";

const Dashboard = () => {
    const data = async () => {

        try {
            const res = await fetch('/api/v1')
            const da = await res.json()
            console.log(da)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        data()
    },[])
  return (
      <Box>
          DashBoard haha
      </Box>
  )
}

export default Dashboard