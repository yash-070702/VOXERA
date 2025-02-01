const User = require("../models/User")
const FriendRequest=require("../models/friendRequest");
exports.getUser=async(req,res)=>{
  const all_users=await User.find({},"firstName lastName _id");
 
  const this_user=req.body.user;
  console.log(this_user);

  const remaining_users=all_users.filter((user)=>!this_user?.friends?.includes(user?._id) && user?._id.toString()!==this_user?._id.toString());
console.log(remaining_users);
  res.status(200).json({
    success:true,
    data:remaining_users,
    message:"User Found Successfully",
  })
};


exports.getFriends = async (req, res) => {
    
    const this_user = await User.findById(req.body.user?._id).populate(
      "friends",
      "_id firstName lastName"
    );
    res.status(200).json({
      success:true,
      data: this_user?.friends,
      message: "Friends found successfully!",
    });
  };


exports.getSendRequests=async(req,res)=>{
  const requests = await FriendRequest.find({ sender: req.body.user?._id })
      .populate("recipient","_id firstName lastName")
      
      // const data=requests.recipient;
  
    res.status(200).json({
      success:true,
      data: requests,
      message: "Requests found successfully",
    });
}
  exports.getRequests = async (req, res) => {
    const requests = await FriendRequest.find({ recipient: req.body.user?._id })
      .populate("sender")
      .select("_id firstName lastName");
  
    res.status(200).json({
      success:true,
      data:requests,
      message: "Requests found successfully!",
    });
  }