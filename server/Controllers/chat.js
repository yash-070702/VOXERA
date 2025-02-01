const oneToOneMessage=require("../models/oneToOneMessage");

exports.getAllChats=async(req,res)=>{
    try{
    const this_user=req.body.user;
    
    const allChats = await oneToOneMessage.find({
        participants: this_user._id,
      });

      res.status(200).json({
        success:true,
        data:allChats,
        message:"All chats are found successfully",
      })

    }

    catch(error)
    {
   console.error(error);
   return res.status(500).json({
      success:false,
      message:error.message,
   })
    }
}