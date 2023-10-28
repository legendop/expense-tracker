import React from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Grid
} from "@mui/material";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import Signin from "./Signin";
import LoginIcon from "@mui/icons-material/Login";
import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const LandingPage = () => {
  //intialize the naviagte hook
  const navigate = useNavigate();
  //state of the dialog box
  const [showDialogSingup, setShowDialogSignup] = React.useState(false);
  const [showDialogLogin, setShowDialogLogin] = React.useState(false);

  //getting the state from the context api
  const { login } = useContext(ExpenseContext);

  //For the sign-up Dialog handle
  const openDialog = () => {
    if (login === true) {
      toast.info("Already logged in");
      navigate("/user-logged");
    }
    setShowDialogSignup(true);
  };
  const closeDialog = () => {
    setShowDialogSignup(false);
  };

  //For the sign-in Dialog handle
  const openDialogLogin = () => {
    if (login === true) {
      toast.info("Already logged in");
      navigate("/user-logged");
    }
    setShowDialogLogin(true);
  };

  const closeDialogLogin = () => {
    setShowDialogLogin(false);
  };
  return (
    <>
      {/* Navbar in wich left side title and right login button */}
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
            component={Link}
            to="/"
          >
            Expense Tracker
          </Typography>

          {/* Login Button  */}
          <Button onClick={openDialogLogin} color="inherit">
            <LoginIcon style={{ fontSize: "20px" }} />
            Login
          </Button>
          {/* Dialog defined here */}
          <Dialog open={showDialogLogin} onClose={closeDialogLogin}>
            <DialogContent>
              <Signin />
            </DialogContent>
            {/* dialog action if user want to close  */}
            <DialogActions>
              <Button onClick={closeDialogLogin}>close</Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
      {/* Center content and signup button */}
      <Typography
        style={{
          alignContent: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
        mt={30}
        variant="h5"
      >
        Hey! want to manage expense {/* dialog for the signup button */}
        <Button onClick={openDialog} variant="contained">
          {" "}
          <span color="Signup">Signup</span>
        </Button>
        <Dialog open={showDialogSingup} onClose={closeDialog}>
          <DialogContent>
            <Signup />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>close</Button>
          </DialogActions>
        </Dialog>
      </Typography>
      <Grid>
       
      </Grid>
    </>
  );
};
