const nodemailer = require("nodemailer");
const userotp = require("../schemas/userOtp");
const users = require("../schemas/userSchema");



const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
    }
})
exports.register = async (req, res) => {
  const { person_name, email, phone } = req.body;

  if (!person_name || !email || !phone) {
    res.status(400).json({ error: "please enter all input data" });
  }

  try {
    const user = await users.findOne({ email: email });
    if (user) {
      res.status(400).json("This User is Already exist");
    } else {
      const register = new users({
        person_name,
        email,
        phone,
      });
      const Data = await register.save();
      res.status(200).json(Data);
    }
  } catch (error) {
    res.status(400).json({ error: "Please enter valid details", error })
  }
};

// otp wala part

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Please Enter Your Email" })
  }

  try {
    const user = await users.findOne({ email: email });
    if (user) {
      const OTP = Math.floor(1000 + Math.random() * 9000); // four digit random number gener

      const existEmail = await userotp.findOne({ email: email });

      if (existEmail) {
        const updateData = await userotp.findByIdAndUpdate(
          { _id: existEmail._id },
          {
            otp: OTP,
          },
          { new: true }
        );
        await updateData.save();
        const mailOptions = {
            from:process.env.EMAIL,
            to:email,
            subject:"Sending email for otp validation",
            text: `OTP:- ${OTP}`

        }
        mailer.sendMail(mailOptions,(error,info)=>{
            if(error)
            {
                res.status(400).json({error:"Email Not Sent"})
            }
            else
            {
                console.log("otp sent");
                res.status(200).json({message:"Email Sent Successfully"})
            }
        })
      } else {
        const saveOtpData = new userotp({
            email,otp:OTP
        });
        await saveOtpData.save();
        const mailOptions = {
            from:process.env.EMAIL,
            to:email,
            subject:"Sending email for otp validation",
            text: `OTP:- ${OTP}`

        }
        mailer.sendMail(mailOptions,(error,info)=>{
            if(error)
            {
                
                res.status(400).json({error:"Email Not Sent"})
            }
            else
            {
                console.log("otp sent");
                res.status(200).json({message:"Email Sent Successfully"})
            }
        })
      }
    } else {
      res.status(400).json("This User is not exist");
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};


// otp verified 

exports.Loginuser=async(req,res)=>{
  const {email,otp} = req.body;
  try {
    const otpEmailed = await userotp.findOne({ email: email});
    if(otpEmailed.otp===otp)
    {
              const user = await users.findOne({ email: email})
              const token = await user.generateAuthtoken();
              console.log(token);
              res.status(200).json({ message: "Loggedin Successfully",userToken:token,user:user});


    }
    else
    {
      res.status(400).json({ error: "Invalid Otp" });
    }
  } catch (error) {
    res.status(400).json({error:"Invalid Otp"});
  }
}

//update user
exports.updateUser= async (req, res) => {
  const { name,email,phoneNo } = req.body;
  if (!email) {
    res.status(400).json({ error: "Please Enter Your Email" })
  }

  try {
    const user = await users.findOne({ email: email });
    if (user) {
      const updateData = await users.findByIdAndUpdate(
        { _id: user._id },
        {
          person_name:name,
          email:email,
          phone:phoneNo,
        },
        { new: true }
      );
      await updateData.save();
    }
    else {
      res.status(400).json("This User is not exist");
    }
  } catch (error) {
    res.status(400).json({ error: "Cannot Edit Details", error });
  }
};