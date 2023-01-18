import PageHeader from "../components/PageHeader";
import React from "react";
import { Box } from "@mui/material";

const HelpPage = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <PageHeader header="Help" />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          ml={2}
          mr={2}
          gap={1}
        >
          <Box fontSize={18}>Welcome to WannaBet™</Box>
          <Box textAlign="justify" fontSize={15}>
            This app is created to serve as a platform for you and your friends
            to record friendly bets amongst yourselves!
          </Box>
          <Box textAlign="justify" fontSize={15} display="flex" gap={1} mt={1}>
            <Box alignSelf="center">1.</Box>
            <Box>
              Start by adding friends! go to the friends page and search for
              your friends by entering their username/email (case sensitive)
            </Box>
          </Box>
          <Box textAlign="justify" fontSize={15} display="flex" gap={1} mt={1}>
            <Box alignSelf="center">2.</Box>
            <Box>
              You can look at all the betlines created by your friends by
              clicking on their profile picture! Alternatively you can check out
              all open betlines from your friends at the home page under the
              betlines tab!
            </Box>
          </Box>
          <Box textAlign="justify" fontSize={15} display="flex" gap={1} mt={1}>
            <Box alignSelf="center">3.</Box>
            <Box>
              Before you start betting or creating a betline, ensure you have
              some money available in your wallet balance!
            </Box>
          </Box>
          <Box textAlign="justify" fontSize={15} display="flex" gap={1} mt={1}>
            <Box alignSelf="center">4.</Box>
            <Box>
              You can verify your own betline once the betline is closed. A
              betline will be closed if the max bet has been hit OR it is past
              the closing time of the betline.
            </Box>
          </Box>
          <Box textAlign="justify" fontSize={15} display="flex" gap={1} mt={1}>
            <Box alignSelf="center">5.</Box>
            <Box>
              Green betlines denotes an open betline, orange denotes a closed
              betline, and grey denotes a betline that has already been
              verified. Only the owner of the betline will be able to view the
              details of a verified betline.
            </Box>
          </Box>
          <Box textAlign="justify" fontSize={15} display="flex" gap={1} mt={1}>
            <Box alignSelf="center">6.</Box>
            <Box>
              If you have any other questions or you encounter any issues, feel
              free to contact us at <em>qmahe@live.com</em>!
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HelpPage;
