const express = require('express');
const router = express.Router();
const BASE_URL = process.env.BASE_URL;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// These mehtods are used to get data and cookies from front-end
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

const Users = require('../models/userSchema');
const Message = require('../models/msgSchema');
const Admin = require('../models/adminSchema');
const Subscriptions = require('../models/subscriptions');

//FOrdot password Email
const nodemailer = require("nodemailer");
const crypto = require("crypto");

//subscriptions
router.post('/subscribe', async (req,res) =>{
    try {
        const email = req.body.subscriber;
        const subscribe = new Subscriptions({
            email: email
        });
        console.log('/subscribe' , email);
        const created = await subscribe.save();
        console.log('/subscribe');
        console.log(created);
        res.status(200).send('Subscribed Successfully');
    } catch (error) {
        res.status(400).send(error);
    }
})

//forgot-password
router.post("/forgot-password", async (req,res) =>{
    const email = req.body.user;
    try {
        const user = await Users.findOne({email: email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }else{
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; //1 hour
        await user.save();

        const resetUrl = `${BASE_URL}/Resetpassword/Resetpassword/${token}`;
        const message = `Hello ${user.username}, \n\n Please click on the following link ${resetUrl} to reset your password. \n\n If you did not requested please don't change, your password will remain unchanged.\n`;
        // await sendEmail(user.email, 'Reset Password', message);
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            // service: "gmail",
            auth:{
                user: 'akhilarora002@gmail.com',
                pass: 'qdecqypusyeuemvt',
            },
        });

        const mailOptions = {
            from: "noreply@DriversRoadTest.com",
            to: email,
            subject: "Reset Password",
            text: `As per your request a password reset link for your DriversRoadTest account have been generated. Please click on the following link to reset your password and it's available for one hour only: ${resetUrl}`,
        };

        await transporter.sendMail(mailOptions);
        res.json({message: "Reset email sent Successfully"});
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error occured!!!"});
    }
});

//Reset Password
router.post('/Resetpassword/:token', async (req,res)=>{
    const token = (req.params.token).trim();
    const password = (req.body.password).trim();
    try {
        const user = await Users.findOne({
            resetPasswordToken : token,
            resetPasswordExpires: {$gt: Date.now() },
        });
        if(!user){
            return res.status(404).json({message: "Invalid Token."});
        }
        user.password = password;
        user.resetPasswordExpires = null;
        user.resetPasswordToken = null;
        await user.save();
        res.json({message: 'Password Updated Successfully.'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server error"});
    }
})

//Registration
router.post('/register', async (req, res) => {
    try {
        //Get body or data
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const createUser = new Users({
            username: username,
            email: email,
            password: password
        });

        //Save method is used to create User or Insert user
        // But before saving or inserting , password will Hash
        // because of hashing. After hash it will be saved to db.
        const created = await createUser.save();
        console.log(created);
        //Generate Token which is defined in user Schema
        const token = await createUser.generateToken();
        res.cookie("jwt", token, {
            // Token Expires in 24 Hours
            expires: new Date(Date.now() + 86400000),
            httpOnly: true
        })
        res.cookie('email', createUser.email,{
            //  Expires in 24 Hours
            expires: new Date(Date.now() + 86400000),
            httpOnly: true
        });
        res.status(200).send("Registered");
    } catch (error) {
        res.status(400).send(error);
    }
})

//Login User
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        //Find if user exists
        const user = await Users.findOne({ email: email });
        if (user) {
            //Verify Password
            const isMatch = await bcryptjs.compare(password, user.password);

            if (isMatch) {
                //Generate Token which is defined in user Schema
                const token = await user.generateToken();
                res.cookie("jwt", token, {
                    // Token Expires in 24 Hours
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true
                })
                res.cookie('email', user.email,{
                    //  Expires in 24 Hours
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true
                });
                res.status(200).send("Logged In");
            } else {
                res.status(400).send('Invalid Password');
            }
        } else {
            res.status(400).send('Invalid Email');
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

//Message
router.post('/message', async (req, res) => {
    try {
        //Get body or data
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;

        const sendMsg = new Message({
            name: name,
            email: email,
            message: message
        });

        //Save method is used to create User or Insert user
        // But before saving or inserting , password will Hash
        // because of hashing. After hash it will be saved to db.
        const created = await sendMsg.save();
        console.log(created);
        res.status(200).send("Sent");
    } catch (error) {
        res.status(400).send(error);
    }
})

//Admin User 
router.post('/admin', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        //Find if user exists
        const admin = await Admin.findOne({ email: email });

        if (admin) {
            //Verify Password
            const isMatch = await bcryptjs.compare(password, admin.password);

            if (isMatch) {
                //Generate Token which is defined in user Schema
                const token = await admin.generateToken();
                res.cookie("jwt", token, {
                    // Token Expires in 24 Hours
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true
                })
                res.cookie('email', admin.email,{
                    //  Expires in 24 Hours
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true
                });
                if (admin.admin === "Akhilesh") {
                    res.status(200).send("Admin In");
                    console.log("Admin In");
                } else {
                    res.status(400).send('Invalid Admin');
                    console.log("Invalid Admin");
                }
            } else {
                res.status(400).send('Invalid Password');
                console.log("Invalid Password");
            }
        } else {
            res.status(400).send('Invalid Email');
            console.log("Invalid Email");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

//Logout
router.get('/logout', (req, res) => {
    res.clearCookie("jwt", { path: '/' });
    res.clearCookie("userEmail", { path: '/' });
    res.status(200).send("Logged Out");
})




module.exports = router;