import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const ShowExpenses = () => {
  //getting the state from the context 
  const { expenses, removeExpense } = useContext(ExpenseContext);

  return (
    <>
      {/* Tittle */}
      <Typography
        variant="h5"
        style={{ marginBottom: "1rem", fontWeight: "bold" }}
      >
        Expense History
      </Typography>
      <Table
        sx={{
          maxWidth: "800px",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Table  */}
        <TableHead sx={{ backgroundColor: "#f2f2f2" }}>
          <TableRow>
            {/* Table Heading */}
            <TableCell style={{ fontWeight: "bold" }}>Title</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Category</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Detail</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        {/* Table body where history of data present */}
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell>{expense.title}</TableCell>
              <TableCell>{expense.amount.toFixed(2)}</TableCell>
              <TableCell>
                {new Date(expense.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.detail}</TableCell>
              <TableCell>
                <Button onClick={() => removeExpense(expense.title)}>
                  <DeleteIcon></DeleteIcon>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
