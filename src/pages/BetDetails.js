import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import PageHeader from "../components/PageHeader";
import CircularProgress from "@mui/material/CircularProgress";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box } from "@mui/material";

const BetDetails = () => {
  const [details, setDetails] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  const { betlineId } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  console.log(details);
  const getBetDetails = async (signal) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const details = await axios({
        method: "GET",
        url: `${BACKEND_URL}/betlines/details/${betlineId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: signal,
      });
      setDetails(details.data);
      setLoadingData(false);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log("bet details data fetch aborted");
      } else {
        setLoadingData(false);
        throw new Error(err);
      }
    }
  };

  // on mount get betline details
  useEffect(() => {
    setLoadingData(true);
    const controller = new AbortController();
    const signal = controller.signal;
    getBetDetails(signal);
    return () => {
      controller.abort();
      setLoadingData(false);
    };
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header={"Betlines"} />
      {loadingData ? (
        <CircularProgress
          css={css`
            justify-self: center;
          `}
        />
      ) : (
        <>
          <Box
            className="bet-description"
            textAlign="center"
            fontSize={14}
            fontStyle="italic"
            p={1}
            color="lightgrey"
          >
            {details?.betDescription}
          </Box>
          <Box
            className="bet-win-loss-amount"
            color={details?.winLoss < 0 ? "red" : "lightgreen"}
            fontSize={20}
            css={css`
              text-shadow: -5px 5px 10px black;
            `}
          >
            {details?.winLoss === 0 ? "" : details?.winLoss < 0 ? "- " : "+ "}$
            {Math.abs(details?.winLoss.toFixed(2))}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="90%"
            gap={1}
          >
            <Box
              width="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box color="gray">NAME</Box>
              <Box color="gray">AMOUNT</Box>
            </Box>
            {details?.bets?.length === 0 ? (
              <Box
                textAlign="center"
                color="red"
                fontSize={14}
                fontStyle="italic"
                p={2}
              >
                There were no takers for this betline!
              </Box>
            ) : (
              details?.bets?.map((bet) => (
                <Box
                  key={bet?.id}
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    fontSize={14}
                    color={details?.winLoss < 0 ? "lightgreen" : "red"}
                  >
                    {bet?.user?.username
                      ? bet?.user?.username
                      : bet?.user?.email}
                  </Box>
                  <Box color={details?.winLoss < 0 ? "lightgreen" : "red"}>
                    {details?.winLoss < 0 ? "+ " : "- "}$
                    {details?.winLoss < 0
                      ? (
                          bet?.betAmount * details?.betOdds -
                          bet?.betAmount
                        ).toFixed(2)
                      : bet?.betAmount.toFixed(2)}
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default BetDetails;
