import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Grid, TextField, Button, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Fetch } from "../dbFetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpenseForm = () => {
  //intialize navigate hook

  //get the data from context api
  const { addExpense, setShowDialog} = useContext(ExpenseContext);

  const formik = useFormik({
    //intial value to the the expense form
    initialValues: {
      title: "",
      category: "",
      detail: "",
      amount: "",
    },
    //validation to the form
    validationSchema: yup.object({
      title: yup.string().required("required"),
      category: yup.string().required("required"),
      detail: yup.string(),
      amount: yup.string().required("required"),
    }),
    //All the value of form come here after submitting
    onSubmit: (values) => {     
      createExpenseApi(values);
    },
  });

  

  //create expense api fetching
  async function createExpenseApi(data) {
    const path = "/api/expense/create";
    const userId = localStorage.getItem("user");
    const dataWithUserId = { ...data, userId };
    const response = await Fetch(path, dataWithUserId);
    if (response.success) {
      addExpense(data);
      setShowDialog(false);
      toast.success("Expense Added");
    } else {
      toast.info("Please enter different title as this title is alreay present");
    }
  }

  return (
    <>
      <Paper elevation={0} style={{ width: "20rem", padding: "2rem" }}>
        <Typography>Add Your Expenses</Typography>
        <br />
        {/* form */}
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* Category */}
              <FormControl fullWidth>
                <InputLabel id="demo-select-small">Category</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={formik.values.category}
                  name="category"
                  label="Category"
                  onChange={formik.handleChange}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value={"saving"}>Saving</MenuItem>
                  <MenuItem value={"investment"}>Investment</MenuItem>
                  <MenuItem value={"expenditure"}>Expenditure</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {/* Title */}
              <TextField
                label="title"
                type="text"
                fullWidth
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                onBlur={formik.handleBlur}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Amount */}
              <TextField
                label="Amount"
                type="number"
                fullWidth
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                onBlur={formik.handleBlur}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Grid>
            <Grid item xs={12}>
              {/* date */}
              <TextField
                label="Detail"
                type="text"
                fullWidth
                name="detail"
                value={formik.values.detail}
                onChange={formik.handleChange}
                error={formik.touched.detail && Boolean(formik.errors.detail)}
                onBlur={formik.handleBlur}
                helperText={formik.touched.detail && formik.errors.detail}
              />
            </Grid>
            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default ExpenseForm;
