import {Box, Heading, Highlight} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <Box mx={'auto'}>
          <Heading mb={'5'}>
              Not Found
          </Heading>
            <Link to={'/'}>
                <Highlight query='Back to Home' styles={{ px: "4", py: "2",mt : '4', rounded: "full", bg: "teal.100" }}>
                Back to Home

                </Highlight>
            </Link>
      </Box>
    )
}

export default Error