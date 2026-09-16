require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Member = require("./models/Member");
const Expense = require("./models/Expense");
const app= express();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDBConnected");
    app.listen(PORT , () => {
        console.log("Server is running on port 5000");
    });
})
.catch((err) => {
    console.log(err);});

app.get("/",(req,res) => { res.send("Expense Manager Backend Running");});
const PORT = 5000;

app.post("/members", async(req,res) => {
    try {
        const member = new Member({
            name: req.body.name
        });
        await member.save();
        res.json({
            message: "Member added successfully",
            member: member
        });
    } catch(err){
        res.status(500).json({
            error:err.message
        });
    }
});

app.get("/members", async (req,res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.post("/expenses", async (req,res) => {
    try {
        const expense = new Expense({
            payer: req.body.payer,
            amount: req.body.amount,
            description: req.body.description,
            date: req.body.date
        });
        console.log(req.body);
        await expense.save();
        console.log("Expense saved:",expense)
        res.json({
            message: "Expense added successfully",
            expense: expense
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.get("/expenses", async (req,res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

