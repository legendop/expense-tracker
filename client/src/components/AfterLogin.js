import React from "react";
import {
  Typography,
  Button,
  AppBar,
  Toolbar,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Graph from "./Graph";
import ExpenseForm from "./ExpenseForm";
import { ShowExpenses } from "./ShowExpenses";
import { ExpenseContext } from "../context/ExpenseContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const AfterLogin = () => {
  //intialize the navigate hook
  const navigate = useNavigate();

  const { setLogin,setShowDialog, showDialog } = useContext(ExpenseContext);
  //For the sign-up Dialog handle
  const openDialog = () => {
    setShowDialog(true);
  };
  const closeDialog = () => {
    setShowDialog(false);
  };
  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem('token');
    setLogin(false);
    toast.success('Logout successfull')
    navigate("/");
  }
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Title */}
          <Typography
            variant="h4"
            style={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              fontSize: "20px",
            }}
          >
            Expense Tracker
          </Typography>
          {/* Logout Button  */}
          <Button color="inherit" onClick={handleLogout}>
            <LogoutIcon></LogoutIcon> Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* Body section */}
      <Grid container mt={5} spacing={5}>
        {/* Chart */}
        <Grid ml={5} item lg={4}>
          <Graph />
        </Grid>
        {/* form */}
        <Grid item lg={6} md={8}>
          {/* Login Button  */}
          <Typography>
            Click here to add expense <Button onClick={openDialog}>Add</Button>
          </Typography>

          {/* Dialog defined here */}
          <Dialog open={showDialog} onClose={closeDialog}>
            <DialogContent>
              <ExpenseForm />
            </DialogContent>
            {/* dialog action if user want to close  */}
            <DialogActions>
              <Button onClick={closeDialog}>close</Button>
            </DialogActions>
          </Dialog>
          <ShowExpenses />
        </Grid>
      </Grid>
    </>
  );
};
