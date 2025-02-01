const express = require("express")
const router = express.Router();

const {getUser, getRequests, getFriends,getSendRequests}=require("../Controllers/user");

// Route for getting all user accept those who are already my freinds and except me to sent freind request
router.post("/get-users",getUser);
 
router.post("/get-friends",getFriends);

router.post("/get-friend-requests",getRequests);

router.post("/get-send-requests",getSendRequests);

module.exports = router