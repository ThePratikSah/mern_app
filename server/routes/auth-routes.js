import express from 'express';

import expressValidator from 'express-validator';

import * as authController from '../controllers/auth-controller.js';

const router = express.Router();

//ADMINISTRATOR SIGNUP
router.post('/administrator/signup', [expressValidator.check('name').trim().not().isEmpty(),
    expressValidator.check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
    expressValidator.check('password').trim().isLength({
        min: 10
    })
], authController.administratorSignup);

//ADMINISTRATOR LOGIN
router.post('/administrator/login', [expressValidator.check('email').isEmail().normalizeEmail(),
        expressValidator.check('password').trim().isLength({
            min: 10
        })],
    authController.administratorLogin);

//ADMINISTRATOR GET-OTP
router.post('/administrator/get-otp',
  [expressValidator.check('email').isEmail().normalizeEmail()],
  authController.getOTPAdmin);

//ADMINISTRATOR RESET PASSWORD
router.post('/administrator/reset-password',
  [expressValidator.check('email').isEmail().normalizeEmail(),
    expressValidator.check('otp').not().isEmpty(),
    expressValidator.check('password').trim().isLength({
      min: 10
    })],
  authController.resetAdminPassword);

export default router;
