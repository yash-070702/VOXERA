const otpGenerator = require("otp-generator");
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");
const OTP=require("../models/OTP");
const User = require("../models/User");

// const resetPassword = require("../Templates/Mail/resetPassword");
// const { promisify } = require("util");
// const catchAsync = require("../utils/catchAsync");

// this function will return you jwt token

// Register New User

exports.sendotp=async(req,res)=>{
  try{
  //email lekr aao from req ki body se 
  const{email}=req.body;

  // ab phle check karo ki user exist to nhi krta hai
  const checkUserPresent=await User.findOne({email});
  
  //agr exist krdeta hai to bhaga do use khkr ki tum to phle se hi presnet ho bhai 
  if(checkUserPresent){
      return res.status(500).json({
          success:false,
          message:`User Already exist`,
      })
  }

  //now generate otp
  var otp= otpGenerator.generate(6,{
    upperCaseAlphabhets:false,
    lowerCaseAlphabets:false,
    specialChars:false,
    digits:true,
  });
  console.log("OTP GENERATED",otp);

  //check that otp is unique is not 
  let result=await OTP.findOne({otp:otp});

// yhe jbtk otp generate karega tb tk unique na ban jae otp
  while(result){
    otp= otpGenerator.generate(6,{
        upperCaseAlphabhet:false,
        lowerCaseAlphabet:false,
        specialChars:false,
      });
      result=await OTP.findOne({otp:otp});
  }


  // ab db m entry bna rhe h 
const otpBody=await OTP.create({email,otp});
console.log(otpBody);

res.status(200).json({
    success:true,
    message:'OTP sent suucessfully',
    otp,
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
};

exports.signup=async(req,res)=>{
   
  try{
     //fetching data from req body
     const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      } = req.body;

      //validate krlo 

      if(!firstName || !lastName || !email || !confirmPassword || !password || !otp ){
        return res .status(403).json({
            success:false,
            message:"All fields are required",
        })
      }

      // check kro ki password and confirm password match krrre h ya nhi 
      if(password!==confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password and confirm password not match please try again"
        })
      }

      //check kro ki user exist krta hai 
      const existingUser=await User.findOne({email});
      if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User exist already"
        });
      }

      // ho skta hai ki user ne 2 baar otp generate krlia ho to mjhe lastets waala otp fetch krke lana hai database se 
const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);

// console.log(recentOtp);
console.log(recentOtp.otp);

//vaildate OTP 
if(recentOtp.length==0){
    return res.status(400).json({
        success:false,
        message:"OTP not found",
    })
}
else if(otp!==recentOtp[0].otp){
    //Invalid OTP
    return res.status(400).json({
        success:false,
        message:`Invalid  OTP`,
    });
}

//Hash password
const hashedPassword=await bcrypt.hash(password,10);

    // Create the user
    let approved = ""
    approved === "Instructor" ? (approved = false) : (approved = true)
    
 // Create the Additional Profile For User
// entry create in db

const user=await User.create({
     firstName,
      lastName,
      email,
      password: hashedPassword,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
})

return res.status(200).json({
    success:true,
    message:"User is Registered Sucessfully",
    user,
})
  }

  catch(error){
console.log(error);
res.status(500).json({
    success:false,
    message:error.message,
})
  }


}

exports.login=async(req,res)=>{
  try{
      // get data from req body
      const{email,password}=req.body;
      
      //validation data
      if(!email || !password){
          return res.status(403).json({
              success:false,
              message:"All fields are required,please try again",
          });
      }
      // check user exist or not 
      const user=await User.findOne({email});

      if(!user){
          return res.status(401).json({
              success:false,
              message:"User is not Registered,Please signup first",
          })
      }

      //password matching and creating jwt token 
      if(await bcrypt.compare(password,user.password)){
          const payload={
              email:user.email,
              id:user._id,
          }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
          expiresIn:"2h",
       
        });  
        user.token=token,
        user.password=undefined;
        const options={
          expires:new Date(Date.now()+3*24*60*60*1000),
          httpOnly: true,
          secure:true,
        }

        //create cookie and send response
        res.cookie("token",token,options).status(200).json({
          success:true,
          token,
          user,
          message:"Logged In successfully",
        })
      }
      else{
          return res.status(401).json({
              success:false,
              message:"Password is Incorrect",
          })
      }
  }
  catch(error){
console.log(error);
return res.status(500).json({
  success:false,
  message:error.message,
})
  }
}



exports.logout=async(req,res)=>{
 return res.status(200).cookie("token","",{expires:new Date(Date.now())})
 .json({
  success:true,
  message:"Logout Successfully"
 })
};



// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   // 1) Get user based on POSTed email
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return res.status(404).json({
//       status: "error",
//       message: "There is no user with email address.",
//     });
//   }

//   // 2) Generate the random reset token
//   const resetToken = user.createPasswordResetToken();
//   await user.save({ validateBeforeSave: false });

//   // 3) Send it to user's email
//   try {
//     const resetURL = `http://localhost:3000/auth/new-password?token=${resetToken}`;
//     // TODO => Send Email with this Reset URL to user's email address

//     console.log(resetURL);

//     mailService.sendEmail({
//       from: "shreyanshshah242@gmail.com",
//       to: user.email,
//       subject: "Reset Password",
//       html: resetPassword(user.firstName, resetURL),
//       attachments: [],
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Token sent to email!",
//     });
//   } catch (err) {
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });

//     return res.status(500).json({
//       message: "There was an error sending the email. Try again later!",
//     });
//   }
// });

// exports.resetPassword = catchAsync(async (req, res, next) => {
//   // 1) Get user based on the token
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(req.body.token)
//     .digest("hex");

//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });

//   // 2) If token has not expired, and there is user, set the new password
//   if (!user) {
//     return res.status(400).json({
//       status: "error",
//       message: "Token is Invalid or Expired",
//     });
//   }
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();

//   // 3) Update changedPasswordAt property for the user
//   // 4) Log the user in, send JWT
//   const token = signToken(user._id);

//   res.status(200).json({
//     status: "success",
//     message: "Password Reseted Successfully",
//     token,
//   });
// });