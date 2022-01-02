const User = require("../models/User");
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const {full_name, email, phone, password} = req.body;
        if (!full_name) {
            return res.status(404).json({status: 404, message: "Full name required"})
        }
        if (!email) {
            return res.status(404).json({status: 404, message: "Email required"})
        }
        if (!phone) {
            return res.status(404).json({status: 404, message: "Phone required"})
        }
        if (!password) {
            return res.status(404).json({status: 404, message: "password required"})
        }

        const emailMatched = await User.findOne({email});
        const phoneMatched = await User.findOne({phone});

        if (emailMatched) {
            return res.status(400).json({status: 400, message: "Email id is already registered"});
        }
        if (phoneMatched) {
            return res.status(400).json({status: 400, message: "Phone number already registered"})
        }

        const user = new User({full_name, email, phone, password, isConfirmed: true});
        await user.save();
        return res.status(200).json({status: 200, message: "Registration successful"});

    } catch (error) {
        return res.status(500).json({status: 500, message: "Server internal problem"});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email) {
        return res.status(400).json({status: 400, message: "Email is required"});
    }
    if (!password) {
        return res.status(400).json({status: 400, message: "Password is required"});
    }

    try {
        const user = await User.findOne({email: email})
        if (!user) {
            return res.status(400).json({status: 400, message: "Email doesn't exist in our database"});
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (passwordMatched) {
            const token = await user.generateAuthToken();
            return res.status(200).json({
                status: 200,
                token: token,
                message: "Successfully logged in",
                name: user.full_name,
                email: user.email,
            })
        } else {
            return res.status(404).json({status: 404, message: "Email or password is not matching"});
        }

    } catch (error) {
        return res.status(500).json({status: 500, message: "Server internal problem"});
    }
}

const validateForget = async (req, res) => {
    try {
        const {otp} = req.body;
        if (!otp) {
            return res.status(404).json({status: 404, message: "otp required"})
        }
        const user = await User.findOne({_id: req.user._id});
        let time = Date.now();
        console.log(Date.now())
        if (time > user.forget_time)
            return res.status(400).json({status: 400, message: "Expired code"})
        console.log(user.forget_otp)
        console.log(otp)
        if (user.forget_otp === otp) {
            user.forget_time = null;
            user.forget_otp = null;
            await user.save();
            return res.status(200).json({status: 200, message: "Valid token"});
        } else {
            return res.status(400).json({status: 400, message: "Invalid otp"});
        }
    } catch (error) {
        return res.status(500).json({status: 500, message: "Server internal problem"});
    }
}

const forget = async (req, res) => {
    try {
        const email = req.body;
        if (!email) {
            return res.status(404).json({status: 404, message: "Email required"});
        }
        const user = await User.findOne(email);
        if (!user)
            return res.status(400).json({status: 400, message: "Invalid email id"});
        user.forget_time = Date.now() + 900000;
        user.forget_otp = Math.floor(100000 + Math.random() * 900000);
        await user.save();
        const token = await user.generateAuthToken();

        return res.status(200).json({status: 200, message: "Check mail ", token: token})

    } catch (error) {
        return res.status(500).json({status: 500, message: "Server internal problem"});
    }
}

const resendForget = async (req, res) => {
    try {
        const {email} = req.body;
        if (!email) {
            return res.status(404).json({status: 404, message: "Email is required"});
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({status: 404, message: "Invalid email"});
        }
        if (user.forget_time > Date.now())
            return res.status(200).json({status: 200, message: "Check your email"});

        user.forget_time = Date.now() + 900000;
        user.forget_otp = Math.floor(100000 + Math.random() * 900000);
        await user.save();

        return res.status(200).json({status: 200, message: "Check your email"});
    } catch (error) {
        return res.status(500).json({status: 500, message: "Server internal problem"});
    }
}

const changePassword = async (req, res) => {
    try{
        const {password, new_password} = req.body;
        if(!password) {
            return res.status(404).json({status: 404, message: "Password is required"});
        }
        if(!new_password){
            return res.status(404).json({status: 404, message: "New password is required"});
        }
        if(new_password.length < 8){
            return res.status(400).json({status: 400, message: " The password must contain at least three character "});
        }
        const user = await User.findOne({_id: req.user._id});
        if(await bcrypt.compare(password, user.password)){
            user.password = new_password;
            await user.save();
            return res.status(200).json({status: 200, message: "Password has been updated"});
        }
        else{
            return res.status(400).json({status: 400, message: "Wrong password"});
        }
    }
    catch (error){
        return res.status(500).json({status: 500, message: "Server internal problem"});
    }
}

const resetPassword = async (req, res) => {
    try{
        const {password} = req.body;
        const user = await User.findOne({_id: req.user._id});
        user.password = password;
        await user.save();
        return res.status(200).json({status: 200, message: "Password has been changed"});
    }
    catch (error){
        return res.status(500).json({status: 500, message: "Server internal problem"});
    }
}

module.exports = {register, login, validateForget, forget, resendForget, resetPassword, changePassword}
