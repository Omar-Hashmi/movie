import express from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../utils/token';
import {ERROR_MESSAGES, HTTP_STATUS} from "../utils/httpResponses";
import { sendResponse, sendErrorResponse, jsonResponse } from '../utils/httpResponses';

const router = express.Router();

/**
 * Login route to authenticate user and generate JWT tokens
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    //  Incase user is not found or password is incorrect
    if (!user){
        sendErrorResponse(res, HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
        return;
    }

    //  If user is found, compare the password
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            // res.status(HTTP_STATUS.UNAUTHORIZED).send(ERROR_MESSAGES.INVALID_CREDENTIALS);
            sendErrorResponse(res, HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
            return;
        }
    }

    //  Generate JWT tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    jsonResponse(res, { token: accessToken });

});

/**
 * Register route to create a new user
 */
router.post('/register', async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;
    try {
        const user = new User({ username, email, phoneNumber, password });
        await user.save();
        sendErrorResponse(res, HTTP_STATUS.REGISTERED, ERROR_MESSAGES.REGISTER_SUCCESSFUL);
    } catch (error) {
        sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.REGISTER_FAILED);
    }
});

export default router;