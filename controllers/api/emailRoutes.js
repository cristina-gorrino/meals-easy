const router = require("express").Router();
const nodemailer = require("nodemailer");
const { User } = require("../../models");

// TODO: Trigger this route after a successful purchase
// Send confirmation email
router.get("/", async (req, res, ) => {
    const userData = await User.findByPk(req.session.user_id,{});
    const user = userData.get({plain:true});
    const name = user.username;
    const email= user.email;
    //TODO : get order information and add to the email
  // transporter for nodemailer
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD, 
    },
  });
      let message = {
        to: 'mealseasy_360@yahoo.com', //`${name} <${email}>`, 
        from: "Meals Easy mealseasy3@gmail.com",
        subject: `Your Meals Easy Order`,
        text: ``,
        html: `<p>Hello ${name},</p>
        <div>Your order was successful. Your meal will be on the way soon! </div>
          <br/>
          <div>Regards,</div>
          <div>The Meals Easy Team</div>
          <br/>
          <br/>
          <br/>`,
      };
      transporter
        .sendMail(message)
        .then(response => {
          res.status(200).send(response);
        })
        .catch(err => {
          console.log(err);
          res.status(400).send(err);
        });
  });

  module.exports = router;