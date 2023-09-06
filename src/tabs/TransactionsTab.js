import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import CircularProgress from "@mui/material/CircularProgress";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const TransactionsTab = () => {
  const [transactions, setTransactions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const { user, getAccessTokenSilently } = useAuth0();

  const getUserTransacitons = async (signal) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const trans = await axios({
        method: "GET",
        url: `${BACKEND_URL}/transactions/${user.sub}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: signal,
      });
      setTransactions(trans.data);
      setLoadingData(false);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log("transactions data fetch aborted");
      } else {
        throw new Error(err);
      }
    }
  };

  // on mount get all transactions owned by friends
  useEffect(() => {
    setLoadingData(true);
    const controller = new AbortController();
    const signal = controller.signal;
    // get all transactions owned by friends
    getUserTransacitons(signal);
    return () => {
      controller.abort();
      setLoadingData(false);
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="95%"
      gap={2}
      mb={2}
    >
      {loadingData ? (
        <CircularProgress
          css={css`
            justify-self: center;
          `}
        />
      ) : transactions.length === 0 ? (
        <Box
          textAlign="center"
          color="red"
          fontSize={14}
          fontStyle="italic"
          p={2}
        >
          No transactions yet!
        </Box>
      ) : (
        transactions.map((transaction) => (
          <Box
            key={transaction.id}
            width="100%"
            border={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box width="100%" fontSize={13} color="lightgrey" p={1}>
              {transaction?.description}
            </Box>
            <Box
              width="100%"
              fontSize={11}
              fontStyle="italic"
              color="grey"
              pl={1}
              pr={1}
            >
              {transaction?.type} transaction
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              fontSize={12}
              p={1}
            >
              <Box color="grey">
                {new Date(transaction?.createdAt).toString().slice(0, 25)}
              </Box>
              <Box display="flex" gap={1}>
                <Box color="grey">SGD</Box>
                <Box
                  color={
                    transaction?.amount > 0
                      ? "lightgreen"
                      : transaction?.amount === 0
                      ? "grey"
                      : "tomato"
                  }
                >
                  {transaction?.amount > 0 && "+"}
                  {transaction?.amount < 0 && "-"}
                  {Math.abs(transaction?.amount).toFixed(2)}
                </Box>
              </Box>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default TransactionsTab;
