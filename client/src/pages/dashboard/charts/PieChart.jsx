import {ResponsivePie} from "@nivo/pie";
import {Box, useColorModeValue} from "@chakra-ui/react";
import initialState from "../../../../store/store.js";

const PieChart = () => {
    const {monthlyApplication} = initialState()
    const chartData = monthlyApplication.map((item, index) => ({
        id: item.date,
        label: item.date,
        value: item.count,
    }));
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
        <Box mt={''} width={'200'} height={'400'}>
            <ResponsivePie
                data={chartData}
                colors={{ scheme: 'nivo' }}
                theme={theme}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                enableArcLinkLabels={false}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={textColor}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={textColor}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        translateY: 56,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: textColor,
                        symbolSize: 18,
                        symbolShape: 'circle',
                    },
                ]}
            />
        </Box>
    )
}

export default PieChart