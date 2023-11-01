import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import { ExpenseContext } from "../context/ExpenseContext";
import {ArcElement} from "chart.js";
import { Typography,Grid,Paper } from "@mui/material";
import Crop169Icon from '@mui/icons-material/Crop169';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
Chart.register(ArcElement);

const Graph = () => {
  //getting the state from the useContext
  const { savingAmount, expenseAmount, totalAmount, investAmount } = useContext(ExpenseContext);
   
  //data labels intialize 
  const data = {
    labels: ["Savings", "Investments", "Expenditures"],
    datasets: [
      {
        data: [savingAmount, investAmount, expenseAmount],
        backgroundColor: ["#3be84a", "#e6f540", "#f54045"],        
      },
    ],
  };

  function getPositiveNumber(num) {
    if (isNaN(num) || num < 0) {
      return 0;
    }else{
      return num;
    }
  }
  

  
  return (
    <>
    <Doughnut data={data} />
    {/* //Describing  the donut chart and their color and als show total amount   */}
    <Paper elevation={3} style={{ padding: "16px", margin: "16px", backgroundColor: "#fff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)" }}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography>
            <Crop169Icon style={{ marginRight: "8px", color: "#44ff55", backgroundColor:'#44ff55' }} />
            Saving Amount {getPositiveNumber((savingAmount*100/totalAmount).toFixed(0)) }%
          </Typography>
          <Typography>
            <Crop169Icon style={{ marginRight: "8px" ,color: "#ff5544", backgroundColor:'#ff5544' }} />
            Invest Amount {getPositiveNumber((investAmount*100/totalAmount).toFixed(0)) }% 
          </Typography>
          <Typography>
            <Crop169Icon style={{ marginRight: "8px", color: "#5544ff" , backgroundColor:'#5544ff'}} />
            Expense Amount  {getPositiveNumber((expenseAmount*100/totalAmount).toFixed(0)) }%
          </Typography>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <Typography>Total Amount : <CurrencyRupeeIcon style={{fontSize:'15px'}}/>{totalAmount}</Typography>
        </Grid>
      </Grid>
    </Paper>    
    </>
  )
};

export default Graph;



