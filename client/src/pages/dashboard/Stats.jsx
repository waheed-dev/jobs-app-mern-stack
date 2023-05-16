import {useEffect} from "react";
import initialState from "../../../store/store.js";
import {Box, Grid, Heading, Text, useColorModeValue} from "@chakra-ui/react";
import {BsCalendar, BsClock} from "react-icons/bs";
import {GiCrossMark} from "react-icons/gi";
import {ResponsiveBar} from "@nivo/bar";
import {ResponsivePie} from "@nivo/pie";
import Charts from "./charts/index.jsx";

const Stats = () => {
  const {statsJob,stats,monthlyApplication} = initialState()
  useEffect(() => {
    statsJob()
  },[])
  console.log(monthlyApplication)

  return (
      <Box mt={'10'} textAlign={'center'}>
        <Text fontSize={'2xl'} mb={'6'} letterSpacing={'widest'} fontWeight={'bold'}>STATS</Text>
        <Grid
            templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }}
            gap={4}
            px={4}
        >
          <Card colorScheme="red" title="Declined">
            <Text fontSize={'4xl'} fontWeight={'bold'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'4'}>
              {stats.declined || 0}
              <GiCrossMark size={'30'}/>
            </Text>
          </Card>

          <Card colorScheme="blue" title="Interview">
            <Text fontSize={'4xl'} fontWeight={'bold'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'4'}>
              {stats.interview || 0}
              <BsCalendar size={'30'}/>
            </Text>
          </Card>

          <Card colorScheme="yellow" title="Pending">
            <Text fontSize={'4xl'} fontWeight={'bold'} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'4'}>
              {stats.pending || 0}
              <BsClock size={'30'}/>
            </Text>
          </Card>
        </Grid>
          {monthlyApplication.length > 0 ? <Charts/> : ""}
      </Box>

  );
};

const Card = ({ colorScheme, title, children }) => {
  return (
      <Box
          bg={`${colorScheme}.100`}
          borderRadius="md"
          p={4}
          boxShadow="sm"
          color={`${colorScheme}.800`}
      >
        <Text fontWeight="bold" mb={2}>
          {title}
        </Text>
        {children}
      </Box>
  );
}
export default Stats