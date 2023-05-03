import {
    Box,
    Button,
    Container,
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
        isLoading,
        registerUser,
        token,
        user,
        showAlert,
        loginUser,
        alertText,
        updateUser,
        jobTypeOptions,
        company,
        position,
        statusOptions,
        jobType,
        jobLocation,
        jobStatus,
        createJob,
        isEditing
    } = initialState()
    const storeState = initialState(state => state.set)
    const [jobPosition, setJobPosition] = useState(position)
    const [jobCompany, setJobCompany] = useState(company)
    const [jobsLocation, setJobsLocation] = useState(jobLocation)
    const [jobsStatus, setJobsStatus] = useState(jobStatus)
    const [jobOptions, setJobOptions] = useState(jobType)
    console.log(company, position, jobType, jobStatus)
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!jobCompany || !jobPosition || !jobsLocation) {
            return toast({
                title: 'provide all values',
                duration: 3000,
                status: 'error'
            })
        } else  {
            storeState({
                company: jobCompany,
                position: jobPosition,
                jobType: jobOptions,
                jobStatus: jobsStatus,
                jobLocation: jobsLocation
            })

            console.log(location)
            console.log({company, position, jobsStatus, jobOptions, jobLocation})
            createJob()
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
        storeState({company: '', position: '', jobType: 'full-time', jobStatus: 'pending', location: ''})
    }

    return (
        <Container py={{base: '8', md: '14'}}>
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
                        as="form"
                        bg="bg-surface"
                        boxShadow={useColorModeValue('sm', 'sm-dark')}
                        borderRadius="lg"
                        maxW={{lg: '3xl'}}
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
                                <Button onClick={handleReset} bg="red.500" ml={'2'}>Clear
                                </Button>
                                <Button type={'submit'} onClick={handleSubmit} bg="green.500">Save
                                </Button>
                            </Flex>
                        </form>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    )
}
export default AddJob