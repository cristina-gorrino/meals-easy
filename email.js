require("dotenv").config();
const nodemailer = require("nodemailer");
const log = console.log;

// part 1
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // TODO: your gmail account
    pass: process.env.PASSWORD, // TODO: your gmail password
  },
});

// Step 2
let mailOptions = {
  from: "mealseasy3@gmail.com", // TODO: email sender
  to: "mealseasy_360@yahoo.com", // TODO: email receiver
  subject: "Nodemailer - Test email",
  text: "please tell me this email works",
};

// Step 3
transporter
  .sendMail(mailOptions)
  .then((data) => console.log(data))
  .catch((err) => {
    console.log(err);
    if (err) {
      return log("Error occurs");
    }
    return log("Email sent!!!");
  });
