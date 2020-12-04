import expressValidator from'express-validator';

import jwt from'jsonwebtoken';

import bcrypt from'bcryptjs';

import Administrator from '../models/administrator.js';

//administrator signup
export const administratorSignup = async (req, res, next) => {
    validationErrorHandler(req, next);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const preExistingAdmin = await Administrator.findOne({email: email});
    if (preExistingAdmin) {
        const error = new Error('Admin with this email already exists');
        error.statusCode = 422;
        return next(error);
    }
    try {
        const hashedPwd = await bcrypt.hash(password, 12);
        const admin = new Administrator({
            email: email,
            password: hashedPwd,
            name: name
        });
        const result = await admin.save();
        res.status(201).json({
            message: 'Admin Created',
            userId: result._id
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};



//administrator login
export const administratorLogin = async (req, res, next) => {
    validationErrorHandler(req, next);
    const email = req.body.email;
    const password = req.body.password;
    let loadedAdmin;
    try {
        const admin = await Administrator.findOne({email: email});
        if (!admin) {
            const error = new Error('Admin with this email doesn\'t exist');
            error.statusCode = 401;
            throw error;
        }
        loadedAdmin = admin;
        const isPwdEqual = await bcrypt.compare(password, admin.password);
        if (!isPwdEqual) {
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedAdmin.email,
            userId: loadedAdmin._id.toString()
        }, 'yoursuperdupersecretkeythatisknownonlytoyouandtheserver', {
            expiresIn: '24h'
        });
        res.status(200).json({
            token: token,
            userId: loadedAdmin._id.toString()
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
//function to send otp to admin email
export const getOTPAdmin = async (req, res, next) => {
    validationErrorHandler(req, next);
    const email = req.body.email;
    let loadedAdmin;
    let generatedOTP;
    try {
        const admin = await Administrator.findOne({email: email});
        if (!admin) {
            const error = new Error('Admin with this email doesn\'t exist');
            error.statusCode = 401;
            throw error;
        }
        loadedAdmin = admin;
        generatedOTP = generateOTP();
        admin.resetToken = generatedOTP;
        admin.resetTokenExpiryDate = Date.now() + 3600000;
        await admin.save();
        //TODO attach function to send otp below
        // const data = await sendEmailToResetPassword(email, loadedAdmin.name, generatedOTP);
        res.status(200).json({
            message: 'OTP sent!',
            result: generatedOTP
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//function to reset admin password
export const resetAdminPassword = async (req, res, next) => {
    validationErrorHandler(req, next);
    const email = req.body.email;
    const oneTimePassword = req.body.otp;
    const password = req.body.password;
    
    try {
        const admin = await Administrator.findOne({
            resetToken: oneTimePassword,
            resetTokenExpiryDate: {
                $gt: Date.now()
            },
            email: email
        })
        if (!admin) {
            const error = new Error('Admin with this email doesn\'t exist');
            error.statusCode = 401;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        admin.password = hashedPassword;
        admin.resetToken = undefined;
        admin.resetTokenExpiryDate = undefined;
        await admin.save();
        res.status(201).json({
            message: 'Password Updated!',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//helper function to generate AlphaNumeric OTP 5 characters
const generateOTP = () => {
    const string = '0123456789';
    let OTP = '';
    const len = string.length;
    for (let i = 0; i < 5; i++) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
};

//helper function to pass error validation to central error handler
const validationErrorHandler= (req, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
};

