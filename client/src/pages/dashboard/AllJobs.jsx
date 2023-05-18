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
import {Link} from "react-router-dom";
import Pagination from "./Pagination.jsx";

const AllJobs = () => {
    const [localSearch,setLocalSearch] = useState('')
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
        searchJobTypeOptions
    } = initialState()
    useEffect( () => {
        getAllJobs(search,searchType,sort,searchStatus,noOfPages)
    },[page,getAllJobs,noOfPages,totalJobs,search,searchType,sort,searchStatus])
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
                                    <Button onClick={clearFilter} bg="red.400">Clear filter
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
                                <Badge variant="solid" bg={statusColors[job.status]} mr="2">
                                    {job.status}
                                </Badge>
                            </Flex>
                        </Box>
                        <Stack>
                            <Link to={'/add-job'}>
                                <Button variant="solid" colorScheme="purple" mr="2" onClick={() => editHandler(job._id)}>
                                    Edit
                                </Button>
                            </Link>
                            <Button variant="solid" colorScheme="blue" mr="2" onClick={() => deleteHandler(job._id)}>
                                Delete
                            </Button>
                        </Stack>
                    </Flex>

                </Box>)}
                <Pagination/>
            </Grid>
        </Box>)
}
export default AllJobs