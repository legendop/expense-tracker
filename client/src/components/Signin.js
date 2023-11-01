import React from "react";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate} from "react-router-dom";
import { Fetch } from "../dbFetch";
import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const paperStyle = {
  padding: 20,
  width: 300,
  margin: "auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "8px 0" };

const Signin = () => {

  //getting the login state from the context
  const { setLogin, } = useContext(ExpenseContext);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    //validation of form
    validationSchema: yup.object({
      email: yup.string().required("required").email("Invalid Email"),
      password: yup.string().required("required"),
    }),
    //forms value comes here
    onSubmit: (values) => {
      logInApi(values);
    },
  });

  //feting the loginApi 
  async function logInApi(data) {
    const path = "/api/user/sign-in";
    delete data.initialValues;
    const response = await Fetch(path, data);
    if (response.success) {       
      localStorage.setItem('user', response.user._id);
      localStorage.setItem('token', response.jwtToken); 
      setLogin(true);
      toast.success("Login Successull")
      navigate("/user-logged");
    } else {
      toast.error("wrong credential");

    }
  }

  return (
    <>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlined />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <TextField
            label="Enter Email"
            name="email"
            placeholder="Enter email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email && formik.errors.email}
          />
          <br />
          <br />
          {/* Password */}
          <TextField
            label="Enter Password"
            name="password"
            placeholder="Enter password"
            type="password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            onBlur={formik.handleBlur}
            helperText={formik.touched.password && formik.errors.password}
          />
          <br />
          <br />
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Login
          </Button>
        </form>        
        <br />
      </Paper>
    </>
  );
};

export default Signin;
