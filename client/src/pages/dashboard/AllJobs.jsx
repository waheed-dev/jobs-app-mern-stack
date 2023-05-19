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
import {useEffect, useState,useMemo} from "react";
import moment from 'moment'
import {Link, useNavigate} from "react-router-dom";
import Pagination from "./Pagination.jsx";

const AllJobs = () => {
    const [localSearch,setLocalSearch] = useState('')
    const navigate = useNavigate()
    const toast = useToast()
    let {
        jobTypeOptions,
        company,
        position,
        statusOptions,
        jobs,
        totalJobs,
        noOfPages,
        page,
        getAllJobs,
        editHandler,
        deleteHandler,
        search,
        searchStatus,
        sort,
        sortOptions,
            searchType,
        clearFilter,
        searchJobStatusOptions,
        searchJobTypeOptions,
        testUser
    } = initialState()
    useEffect( () => {
        getAllJobs(search,searchType,sort,searchStatus,noOfPages)
    },[page,getAllJobs,noOfPages,totalJobs,search,searchType,sort,searchStatus])

    const date = createdAt => {
        return moment(createdAt).format('MMM Do,YYYY')
    }
    const statusColors = {
        pending : 'green.400',
        interview : 'blue.400',
        declined : 'red.400'
    }

    const storeState = initialState(state => state.set)
    function handleStatusChange(e) {
        storeState({
        searchStatus: e.target.value,
            noOfPages : 1
        })
        console.log(searchStatus)
    }

    function handleSortChange(e) {
        storeState({
            sort : e.target.value,
            noOfPages : 1
        })
        console.log(sort)
    }

    function handleSearchTypeChange(e) {

        storeState({
            searchType : e.target.value,
            noOfPages : 1
        })
        console.log(sort)
    }

    const debounce = () => {
        let timeoutID
        return (e) => {
            setLocalSearch(e.target.value)
            clearTimeout(timeoutID)
            timeoutID = setTimeout(() => {
                setLocalSearch(e.target.value)
                storeState({
                    search : e.target.value,
                    noOfPages : 1
                })
            },800)
        }
    }
    const optimizedDebounce = useMemo(() => debounce(),[])

    function editClickHandler(id) {
        if (testUser) {
            return toast({
                title : 'test user is readOnly',
                duration : 3000,
                status  : 'error'
            })
        }
        navigate('/add-job')
        editHandler(id)
    }
    function deleteClickHandler(job) {
        if (testUser) {
            return toast({
                title : 'test user is readOnly',
                duration : 3000,
                status  : 'error'
            })
        }
        deleteHandler(job)
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
                        <form>
                            <Stack spacing="2" px={{base: '4', md: '4'}} py={{base: '2', md: '3'}}>
                                <Stack spacing="2" direction={{base: 'column', md: 'row'}}>
                                    <FormControl id="position">
                                        <FormLabel>Position</FormLabel>
                                        <Input name={'position'} type={'text'} value={localSearch} onChange={optimizedDebounce}/>
                                    </FormControl>
                                    <FormControl id={'sort'}>
                                        <FormLabel>Sort</FormLabel>
                                        <Select value={sort} onChange={handleSortChange}>
                                            {sortOptions.map((value, index) => <option key={index}
                                                                                         value={value}>{value}</option>)}
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Stack spacing="2" direction={{base: 'column', md: 'row'}}>
                                    <FormControl id={'status'}>
                                        <FormLabel>Status</FormLabel>
                                        <Select value={searchStatus} onChange={handleStatusChange}>
                                            {searchJobStatusOptions.map((value, index) => <option key={index}
                                                                                         value={value}>{value}</option>)}
                                        </Select>
                                    </FormControl>
                                    <FormControl id={'type'}>
                                        <FormLabel>Job Type</FormLabel>
                                        <Select value={searchType} onChange={handleSearchTypeChange}>
                                            {searchJobTypeOptions.map((value, index) => <option key={index}
                                                                                          value={value}>{value}</option>)}
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Flex direction="row-reverse" py="2" px={{base: '4', md: '6'}}>
                                    <Button onClick={clearFilter} colorScheme="red">Clear filter
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
                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={6}
                mt={'4'}
            >
                {jobs?.map((job,index) =>  <Box borderWidth="1px" key={index} borderRadius="lg" overflow="hidden" maxW="md">
                    <Flex direction={{ base: "column", md: "row" }}>
                        <Box flex="1" p="4">
                            <Text fontSize="2xl" fontWeight="semibold">
                                {job.position}
                            </Text>
                            <Text fontSize="lg" m={'1'}>
                                {job.company}
                            </Text>
                            <Flex mt="2" flexWrap="wrap">
                                <Badge variant="solid" colorScheme="green" m="1">
                                    {date(job.createdAt)}
                                </Badge>
                                <Badge variant="solid" colorScheme="purple" m={'1'}>
                                    {job.jobType}
                                </Badge>
                                <Badge variant="solid" bg={statusColors[job.status]} m={'1'}>
                                    {job.status}
                                </Badge>
                                <Badge variant="solid" colorScheme={'cyan'} m={'1'}>
                                    {job.jobLocation}
                                </Badge>
                            </Flex>
                        </Box>
                    </Flex>
                    <Flex justifyContent={'center'} mb={'2'}>
                        <Button variant="solid" colorScheme='blue' mr="2" onClick={() => editClickHandler(job._id)}>
                            Edit
                        </Button>
                        <Button variant="solid" colorScheme="red" mr="2" onClick={() => deleteClickHandler(job._id)}>
                            Delete
                        </Button>
                    </Flex>

                </Box>)}
                <Pagination/>
            </Grid>
        </Box>)
}
export default AllJobs