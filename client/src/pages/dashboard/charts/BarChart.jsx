import {Box, Text, useColorModeValue} from "@chakra-ui/react";
import {ResponsiveBar} from "@nivo/bar";
import initialState from "../../../../store/store.js";

const BarChart = () => {
    const {monthlyApplication} = initialState()
    const generateColors = () => {
        // Adjust color schemes for light and dark modes
        return useColorModeValue('#053752', '#BEE3F8');
    };
    const textColor = useColorModeValue('black', 'white'); // Adjust label color for light and dark modes
    const labelColor = useColorModeValue('yellow', 'gray')
    const theme = {


        axis: {
            ticks: {
                text: {
                    fill: textColor,
                },
            },
        },
        labels: {
            text: {
                fill: labelColor,
            },
        },
        tooltip: {
            container: {
                background: labelColor,
            },
        },
    }

    return (
        <Box mt={'4'} width={'200'} height={'200'} >

            <ResponsiveBar
                data={monthlyApplication}
                keys={['count']}
                indexBy="date"
                margin={{ top: 20, right: 30, bottom: 50, left: 50 }}
                padding={0.3}
                colors={generateColors}
                theme={theme}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Date',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    tickTextColor: textColor, // Set the tick text color
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Count',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    tickTextColor: textColor, // Set the tick text color
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </Box>
    )
}

export default BarChart