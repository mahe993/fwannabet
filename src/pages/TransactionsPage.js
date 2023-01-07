import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import TransactionHistoryTable from "../components/TransactionHistoryTable";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";

const TransactionsPage = () => {
  const [transactionsHistory, setTransactionsHistory] = useState([]);

  const { user, getAccessTokenSilently } = useAuth0();

  // fetching all the transactions
  const fetchTransactions = async (data) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const res = await axios({
        method: "GET",
        url: `${BACKEND_URL}/transactions/${user.sub}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data,
      });

      setTransactionsHistory(res.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const testTransactions = [
    { date: "01/01/2022", type: "Deposit", amount: "$100" },
    { date: "02/01/2022", type: "Deposit", amount: "$50" },
    { date: "03/01/2022", type: "Deposit", amount: "$200" },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Transactions" />
      {transactionsHistory.length < 0 ? (
        <TransactionHistoryTable transactions={transactionsHistory} />
      ) : (
        <Box textAlign="center" fontStyle="italic">
          No transactions made yet!
        </Box>
      )}
    </Box>
  );
};

export default TransactionsPage;
