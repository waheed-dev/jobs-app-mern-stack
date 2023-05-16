import BarChart from "./BarChart.jsx";
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
import PieChart from "./PieChart.jsx";
import {useState} from "react";

const Charts = () => {
    return (
        <Box>
            <Text fontSize={'2xl'} mb={'4'} mt={'4'} letterSpacing={'widest'} fontWeight={'bold'}>Monthly applications</Text>
            <Tabs variant="soft-rounded" >
                <TabList display={'flex'} justifyContent={'center'}>
                    <Tab>Bar chart</Tab>
                    <Tab>Pie chart</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                       <BarChart/>
                    </TabPanel>
                    <TabPanel>
                        <PieChart/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
export default Charts