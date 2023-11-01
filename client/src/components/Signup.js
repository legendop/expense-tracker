import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Fetch } from "../dbFetch";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const paperStyle = {
  padding: 20,
  height: "",
  width: "500px",
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "8px 0" };

const Signup = () => {
  //intialize the naivate hook
  const navigate = useNavigate();

  const formik = useFormik({
    //intial value to the the form name
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    //validation to the form
    validationSchema: yup.object({
      name: yup.string().required("required").min(3, "too short"),
      email: yup.string().required("required").email("Invalid email"),
      password: yup
        .string()
        .required("required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number"
        ),
    }),
    //All the value of form come here after submitting
    onSubmit: async (values) => {
      console.log(values);
      signUpApi(values);
    },
  });
  //sending data to the sign upi
  async function signUpApi(data) {
    const path = "/api/user/create";
    delete data.initialValues;
    const response = await Fetch(path, data);
    if (response.success) {      
      localStorage.setItem("user", response.newUser._id);
      localStorage.setItem("token", response.jwtToken);
      toast.success("Signup successfull");
      navigate("/user-logged");
    } else {
      toast.info("User Already present");
    }
  }

  return (
    <>
      <Grid container>
        <Paper elevation={0} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlined />
            </Avatar>
            <Typography variant="h6" color="inherit">
              Signup
            </Typography>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            {/* Input  Name */}
            <TextField
              label="Enter Name"
              type="text"
              fullWidth
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              onBlur={formik.handleBlur}
              helperText={formik.touched.name && formik.errors.name}
            />
            <br />
            <br />
            {/* Input Email Address */}
            <TextField
              label="Enter Email"
              type="text"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              onBlur={formik.handleBlur}
              helperText={formik.touched.email && formik.errors.email}
            />
            <br />
            <br />
            {/* Input Password */}
            <TextField
              label="Enter Password"
              type="password"
              fullWidth
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              onBlur={formik.handleBlur}
              helperText={formik.touched.password && formik.errors.password}
            />{" "}
            <br />
            {/* Submit Form */}
            <Button
              type="submit"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Signup
            </Button>
            <br />
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Signup;
