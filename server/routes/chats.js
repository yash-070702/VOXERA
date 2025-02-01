const express = require("express")
const router = express.Router();

const {getAllChats}=require("../Controllers/chat");

// Route for getting all user accept those who are already my freinds and except me to sent freind request
router.post("/get-chats",getAllChats);


module.exports = router