const mongoose=require("mongoose");
const mailSender=require("../utils/mailSender");
const emailTemplate=require('../mail/templates/emailVerificationTemplate');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Automatically set to current date and time when the document is created
        expires: '5m'       // TTL index to delete documents 5 minutes after creation
    }
});

// OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: 20 });

// const OTP = mongoose.model('OTP', OTPSchema);

// OTP.on('index', (error) => {
//   if (error) {
//     console.error('Index creation error:', error);
//   } else {
//     console.log('Indexes created successfully');
//   }
// });
async function sendVerificationEmail(email, otp) {

	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} 
    catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}
OTPSchema.pre("save", async function (next) {
	// console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

module.exports=mongoose.model("OTP",OTPSchema);