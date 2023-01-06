import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TransactionHistoryTable = (props) => {

  const {transactions} = props;


  return (
    <TableContainer component={Paper}>
      <Table className={"transaction-table"}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="middle">Transaction Type</TableCell>
            <TableCell align="middle">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.map((transaction) => (
            <TableRow key={transaction.date}>
              <TableCell component="th" scope="row">
                {transaction.date}
              </TableCell>
              <TableCell align="middle">{transaction.type}</TableCell>
              <TableCell align="middle">{transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionHistoryTable;
