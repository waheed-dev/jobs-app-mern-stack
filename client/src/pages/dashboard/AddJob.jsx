import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    StackDivider,
    Text,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
import initialState from "../../../store/store.js";
import {useState} from "react";

const AddJob = () => {
    const toast = useToast()
    const {
        jobTypeOptions,
        company,
        position,
        statusOptions,
        jobType,
        jobLocation,
        jobStatus,
        createJob,
        isEditing,
        editJob,
        editJobId,
        getAllJobs,
        testUser
    } = initialState()
    const storeState = initialState(state => state.set)
    const [jobPosition, setJobPosition] = useState(position)
    const [jobCompany, setJobCompany] = useState(company)
    const [jobsLocation, setJobsLocation] = useState(jobLocation)
    const [jobsStatus, setJobsStatus] = useState(jobStatus)
    const [jobOptions, setJobOptions] = useState(jobType)

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (testUser) {
            return toast({
                title : 'test user is readOnly',
                duration : 3000,
                status  : 'error'
            })
        }
        if (!jobCompany || !jobPosition || !jobsLocation) {
            return toast({
                title: 'provide all values',
                duration: 3000,
                status: 'error'
            })
        }

        storeState({
            company: jobCompany,
            position: jobPosition,
            jobType: jobOptions,
            jobStatus: jobsStatus,
            jobLocation: jobsLocation
        })
        console.log(location)
        console.log({company, position, jobsStatus, jobOptions, jobLocation})
        if  (isEditing) {
            await editJob(editJobId)
            await getAllJobs
            handleReset()
              toast({
                title: 'job updated',
                duration: 3000,
                status: 'success'
            })
        } else {
            await createJob()
            handleReset()
            return toast({
                title: 'user updated',
                duration: 3000,
                status: 'success'
            })
        }


    }

    function handleReset() {
        setJobPosition('')
        setJobCompany('')
        setJobsLocation('')
        setJobsStatus('pending')
        setJobOptions('full-time')
        storeState({
            company: '',
            position: '',
            jobType: 'full-time',
            jobStatus: 'pending',
            location: '',
            isEditing: false,
            editJobId: ""
        })
    }

    return (
        <Box py={{base: '8', md: '14'}}>
            <Stack spacing="5" divider={<StackDivider/>}>
                <Stack
                    direction={{base: 'column', lg: 'column'}}
                    spacing={{base: '5', lg: '8'}}
                    justify="space-between"
                >
                    <Box textAlign={'center'}>
                        <Text fontSize="xl" fontWeight="medium">
                            Profile
                        </Text>
                    </Box>
                    <Box
                        bg="bg-surface"
                        boxShadow={useColorModeValue('sm', 'sm-dark')}
                        borderRadius="lg"
                    >
                        <form onSubmit={handleSubmit}>
                            <Stack spacing="5" px={{base: '4', md: '4'}} py={{base: '5', md: '6'}}>
                                <Stack spacing="6" direction={{base: 'column', md: 'row'}}>
                                    <FormControl id="position">
                                        <FormLabel>Position</FormLabel>
                                        <Input value={jobPosition} name={'position'} type={'text'}
                                               onChange={(e) => setJobPosition(e.target.value)}/>
                                    </FormControl>
                                    <FormControl id="company">
                                        <FormLabel>Company</FormLabel>
                                        <Input value={jobCompany} name={'company'} type={'text'}
                                               onChange={(e) => setJobCompany(e.target.value)}/>
                                    </FormControl>
                                </Stack>
                                <FormControl id={'status'}>
                                    <FormLabel>Status</FormLabel>
                                    <Select value={jobsStatus} onChange={e => setJobsStatus(e.target.value)}>
                                        {statusOptions.map((value, index) => <option key={index}
                                                                                     value={value}>{value}</option>)}
                                    </Select>
                                </FormControl>
                                <Stack>
                                    <FormControl id="location">
                                        <FormLabel>Job Location</FormLabel>
                                        <Input value={jobsLocation} type={'text'} name={'location'}
                                               onChange={(e) => setJobsLocation(e.target.value)}/>
                                    </FormControl>
                                    <FormControl id={'type'}>
                                        <FormLabel>Job Type</FormLabel>
                                        <Select value={jobOptions} onChange={e => setJobOptions(e.target.value)}>
                                            {jobTypeOptions.map((value, index) => <option key={index}
                                                                                          value={value}>{value}</option>)}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Divider/>
                            <Flex direction="row-reverse" py="4" px={{base: '4', md: '6'}}>
                                <Button onClick={handleReset} colorScheme="red" ml={'2'}>Clear
                                </Button>
                                <Button type={'submit'} onClick={handleSubmit} colorScheme="green">Save
                                </Button>
                            </Flex>
                        </form>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    )
}
export default AddJob