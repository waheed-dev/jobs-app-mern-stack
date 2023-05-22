import {Outlet} from "react-router-dom";
import ProtectedSidebar from "../../components/ProtectedSidebar.jsx";
import {Box, Grid, GridItem} from "@chakra-ui/react";
const SharedLayout = () => {
    return (
        <Grid
            templateColumns={{md : 'repeat(6, 1fr)'}}
            gap={''}
        >
            <GridItem>
                <ProtectedSidebar/>
            </GridItem>
            <GridItem colSpan={5}>
                <Outlet/>
            </GridItem>
        </Grid>
    )
}


export default SharedLayout