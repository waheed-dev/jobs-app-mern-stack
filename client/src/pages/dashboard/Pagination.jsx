import {Box, Button, Flex} from '@chakra-ui/react'
import initialState from "../../../store/store.js";

const Pagination = () => {
    const {
        noOfPages,
        page,
        changePage
    } = initialState()


    const handlePreviousClick = () => {
        let newPage = noOfPages -1
        if (newPage < 1) {
            newPage = page
        }
        changePage(newPage)
    }

    const handleNextClick = () => {
    let newPage = noOfPages + 1
        if (newPage > page) {
            newPage = 1
        }
        changePage(newPage)
    }


    const renderPageNumbers = () => {
        const pages = []
        for (let i = 1; i <= page; i++) {
            pages.push(
                <Button
                    key={i}
                    size="sm"
                    variant={i === noOfPages ? 'solid' : 'ghost'}
                    onClick={() => changePage(i)}
                >
                    {i}
                </Button>
            )
        }
        return pages
    }

    return (
        <Flex justify="center" align="center" mt={4}>
            <Box mr={2}>
                <Button size="sm"  onClick={handlePreviousClick}>
                    Previous
                </Button>
            </Box>
            <Box>{renderPageNumbers()}</Box>
            <Box ml={2}>
                <Button size="sm" onClick={handleNextClick}>
                    Next
                </Button>
            </Box>
        </Flex>
    )
}

export default Pagination