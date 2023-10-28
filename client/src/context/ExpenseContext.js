import React, { createContext, useState, useEffect } from "react";
import { Get } from "../dbFetch";
import { Delete } from "../dbFetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ExpenseContext = createContext();

function ExpenseProvider(props) {
  //All the states are defined here
  const [expenses, setExpenses] = useState([]);
  const [login, setLogin] = useState(false);
  const [savingAmount, setSavingAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [investAmount, setInvestAmount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  //when the server load frist it get initialised
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("user");
        const response = await Get(`/api/expense/detail/${userId}`);
        setExpenses(response.expenses);
        setAmounts(response.expenses);
      } catch (error) {
        toast.error("Error in loading..");
      }
    };
    fetchData();
  }, []);

  function setAmounts(data){
    //for setting the savingAmount state
    const result = data.filter((item) => item.category === "saving");
    const totalSavingAmount = result.reduce((acc, curr) => acc + curr.amount, 0);
    
    setSavingAmount(totalSavingAmount);

    //for setting the investmentAmount state
    const resultInvest = data.filter((item) => item.category === "investment");
    const totalInvestAmount = resultInvest.reduce((acc, curr) => acc + curr.amount, 0); 
    setInvestAmount(totalInvestAmount);

     //for setting the expenseAmount state
     const resultExpense = data.filter((item) => item.category === "expenditure");
     const totalExpenseAmount = resultExpense.reduce((acc, curr) => acc + curr.amount, 0); 
     setExpenseAmount(totalExpenseAmount);

     //for setting the totalAMount state
     const total = data.reduce((acc, curr) => acc + curr.amount, 0);
     setTotalAmount(total);
  }

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
    if(newExpense.category === 'saving'){
      setSavingAmount( savingAmount+ newExpense.amount);
      setTotalAmount(totalAmount+newExpense.amount);
    }else if(newExpense.category === 'investment'){
      setInvestAmount( investAmount+ newExpense.amount);
      setTotalAmount(totalAmount+newExpense.amount);
    }else{
      setExpenseAmount( expenseAmount+ newExpense.amount);
      setTotalAmount(totalAmount+newExpense.amount);
    }
    
  };

  //remove the the expense
  const removeExpense = async (title) => {
    try {
      //deleting the expense      
      const res = await Delete(`/api/expense/delete/${title}`);
      
        //handle this in state locally
        if(res.success){
          const updatedExpenses = [...expenses];
          updatedExpenses.splice(title, 1);
          setExpenses(updatedExpenses);
          //change the state after deleting
          const indexOfExpense = expenses.findIndex((expense) => expense.title === title);
          const deletedExpense = expenses[indexOfExpense];
          changeStateOfExpenseAfterDelete(deletedExpense);
          //showing toaster after successfully deleted
           toast.success("Deleted successfully"); 
        }         
    } catch (error) {
      toast.error("Error in deleting..");
    }
  };

  function changeStateOfExpenseAfterDelete(newExpense){
    if(newExpense.category === 'saving'){
      setSavingAmount( savingAmount - newExpense.amount);
      setTotalAmount(totalAmount - newExpense.amount);
    }else if(newExpense.category === 'investment'){
      setInvestAmount( investAmount - newExpense.amount);
      setTotalAmount(totalAmount - newExpense.amount);
    }else{
      setExpenseAmount( expenseAmount - newExpense.amount);
      setTotalAmount(totalAmount - newExpense.amount);
    }

  }

  return (
    // passess all the state and function throght the values
    <ExpenseContext.Provider
      value={{
        savingAmount,
        expenseAmount,
        totalAmount,
        investAmount,
        setExpenseAmount,
        setInvestAmount,
        setTotalAmount,
        setSavingAmount,
        expenses,
        addExpense,
        removeExpense,
        login,
        setLogin,
        showDialog,
        setShowDialog,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseProvider;
