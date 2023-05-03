import {
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Select,
    Stack,
    StackDivider,
    Text,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
import initialState from "../../../store/store.js";
import {useEffect} from "react";
import moment from 'moment'

const AllJobs = () => {
    const toast = useToast()
    const {
        jobTypeOptions,
        company,
        position,
        statusOptions,
        jobs,
        totalJobs,
        noOfPages,
        page,
        getAllJobs
    } = initialState()
    useEffect(() => {
        getAllJobs()
    },[page,getAllJobs,noOfPages,totalJobs])
    const handleSubmit = (event) => {
        event.preventDefault()
            return toast({
                title: 'user updated',
                duration: 3000,
                status: 'success'
            })
    }
    const date = createdAt => {
        return moment(createdAt).format('MMM Do,YYYY')
    }
    return (
        <Box py={{base: '4', md: '8'}}>
            <Stack spacing="5" divider={<StackDivider/>}>
                <Stack
                    direction={{base: 'column', lg: 'column'}}
                    spacing={{base: '2', lg: '2'}}
                    justify="space-between"
                >
                    <Box textAlign={'center'}>
                        <Text fontSize="xl" fontWeight="medium">
                            Search
                        </Text>
                    </Box>
                    <Box
                        bg="bg-surface"
                        boxShadow={useColorModeValue('sm', 'sm-dark')}
                        borderRadius="lg"
                    >
                        <form onSubmit={handleSubmit}>
                            <Stack spacing="2" px={{base: '4', md: '4'}} py={{base: '2', md: '3'}}>
                                <Stack spacing="2" direction={{base: 'column', md: 'row'}}>
                                    <FormControl id="position">
                                        <FormLabel>Position</FormLabel>
                                        <Input name={'position'} type={'text'}/>
                                    </FormControl>
                                    <FormControl id={'status'}>
                                        <FormLabel>Status</FormLabel>
                                        <Select>
                                            {statusOptions.map((value, index) => <option key={index}
                                                                                         value={value}>{value}</option>)}
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Stack spacing="2" direction={{base: 'column', md: 'row'}}>
                                    <FormControl id={'status'}>
                                        <FormLabel>Status</FormLabel>
                                        <Select>
                                            {statusOptions.map((value, index) => <option key={index}
                                                                                         value={value}>{value}</option>)}
                                        </Select>
                                    </FormControl>
                                    <FormControl id={'type'}>
                                        <FormLabel>Job Type</FormLabel>
                                        <Select>
                                            {jobTypeOptions.map((value, index) => <option key={index}
                                                                                          value={value}>{value}</option>)}
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Flex direction="row-reverse" py="2" px={{base: '4', md: '6'}}>
                                    <Button type={'submit'} onClick={handleSubmit} bg="green.500">Search
                                    </Button>
                                </Flex>
                            </Stack>

                            <Divider/>
                        </form>
                    </Box>
                </Stack>
            </Stack>
            <Text>{totalJobs} jobs found</Text>
            <Grid
                templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                gap={6}
                mt={'4'}
            >
                {jobs?.map(job =>  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" maxW="md">
                    <Flex direction={{ base: "column", md: "row" }}>
                        <Box flex="1" p="4">
                            <Text fontSize="2xl" fontWeight="semibold">
                                {job.position}
                            </Text>
                            <Text fontSize="lg" mt="2">
                                {job.company}
                            </Text>
                            <Flex mt="2" flexWrap="wrap">
                                <Badge variant="solid" colorScheme="green" mr="2">
                                    {date(job.createdAt)}
                                </Badge>
                                <Badge variant="solid" colorScheme="purple" mr="2">
                                    {job.jobType}
                                </Badge>
                                <Badge variant="solid" colorScheme="blue" mr="2">
                                    {job.status}
                                </Badge>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>)}
            </Grid>
        </Box>)
}
export default AllJobs