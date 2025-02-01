const nodemailer=require("nodemailer");

const mailSender=async(email,title,body)=>{
    try {
        let transporter = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
       
        })
    
        let info = await transporter.sendMail({
          from: `"VOXERA |Y.AGGARWAL" <${process.env.MAIL_USER}>`, // sender address
          to: `${email}`, // list of receivers
          subject: `${title}`, 
          html: `${body}`, 
        })
        console.log(info.response)
        return info
      }
    catch(error){
        console.error(error.message);
    }
} 
module.exports=mailSender;
