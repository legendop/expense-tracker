const Expense = require("../models/expense");

//expense create from comes here and create the expense
module.exports.create = async function (req, res) {
  try {
    //create the object
    const expense = await Expense.findOne({ title: req.body.data.title });
    if (!expense) {
      const newExpense = await Expense.create(req.body.data);
      //sending the response
      return res
        .status(200)
        .json({ success: true, message: "Expense created successfully" });
    } else {
      return res.json({
        success: false,
        message: "Expense with this title already exists",
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//show details api req to this controller
module.exports.showdata = async function (req, res) {
  const userId = req.params.id;
  try {
    //getting the expenses of the particular person from the database
    const expenses = await Expense.find({ userId: userId });
    //sending the respons to the data base
    return res.json({
      success: true,
      message: "Expense created successfully",
      expenses,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//deleting the expense data from the data base
module.exports.destroy = async function (req, res) {
  try {
    const response = await Expense.deleteOne({ title: req.params.title });
    if (response.deletedCount === 1) {
      return res
        .status(200)
        .json({ success: true, message: "Expense deleted successfully" });
    } else {
      return res.json({
        success: false,
        message: "Expense not deleted",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
