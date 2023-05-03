import {Outlet} from "react-router-dom";
import ProtectedSidebar from "../../components/ProtectedSidebar.jsx";
import {Box, Grid, GridItem} from "@chakra-ui/react";
const SharedLayout = () => {
    return (
        <Grid
            h='200px'
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(5, 1fr)'
            gap={''}
        >
            <GridItem>
                <ProtectedSidebar/>
            </GridItem>
            <GridItem colSpan={4}>
                <Outlet/>
            </GridItem>
        </Grid>
    )
}


export default SharedLayout