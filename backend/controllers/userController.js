const User = require('../models/userModel')
const mongoose = require('mongoose')
//get all users
const getUsers = async(req,res) => {
    const users = await User.find({}).sort({createdAt:-1})
    res.status(200).json(users)
}
//get single user
const getUser = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such suer"})
    }
    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user)
}

//create a new user
const createUser = async(req, res) => {
    const {firstName, lastName, questAns, textAns, isDoctor, doctorsPatients, profilePic} = req.body
    
    //add doc to db
    try{
        const user = await User.create({firstName, lastName, questAns, textAns, isDoctor, doctorsPatients, profilePic})
        res.status(200).json(user)
    } catch(error){
        res.status(400).json({error: error.message})
    }

}
//delete a user
const deleteUser = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such user"})
    }
    const user = await User.findOneAndDelete({_id: id})
    if(!user){
        return res.status(400).json({error:"No such user"})
    }
    res.status(200).json(user)
}
//update a user
const updateUser = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such user"})
    }

    const user = await User.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!user){
        return res.status(400).json({error:"No such user"})
    }
    res.status(200).json(user)
}

//getSingleTextAns
const getSingleTextAns = async(req,res)=>{
    console.log("Fetching single text answer", req.params);
    const { id, date } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such user" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "No such user" });
        }

        const text = user.textAns.get(date) || ""; // Get the text if exists, or "" if not
        res.json({ date: date, text: text });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateTextAns = async(req, res) => {
    console.log("Received Body:", req.body);
    console.log("Received ID:", req.params.id);
    console.log("Received Date:", req.params.date);
    console.log("Received Text:", req.body.text);

    const { id, date } = req.params;
    const { text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID provided" });
    }
    if (text === undefined) {
        return res.status(400).json({ error: "Text field is required" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "No such user" });
        }

        console.log("Current Text for Date:", user.textAns.get(date));

        user.textAns.set(date, text);
        await user.save();

        console.log("Updated Text for Date:", user.textAns.get(date));

        res.json({ date: date, text: user.textAns.get(date) });
    } catch (error) {
        console.error("Error in updateTextAns:", error);
        res.status(500).json({ error: error.message });
    }
};

const updateQuestAns = async (req, res) => {
    const { id, date } = req.params;
    const { answers } = req.body;
    console.log("Received ID:", id);
    console.log("Received Date:", date);
    console.log("Received Answers:", answers);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID provided" });
    }
    if (!answers) {
        return res.status(400).json({ error: "Answers field is required" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "No such user" });
        }

        console.log("Current Answers for Date before update:", user.questAns.get(date));
        user.questAns.set(date, answers);
        await user.save();
        console.log("Updated Answers for Date:", user.questAns.get(date));

        res.json({ date: date, questAns: user.questAns.get(date) });
    } catch (error) {
        console.error("Error in updateQuestAns:", error);
        res.status(500).json({ error: error.message });
    }
};




module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    getSingleTextAns,
    updateTextAns,
    updateQuestAns
}