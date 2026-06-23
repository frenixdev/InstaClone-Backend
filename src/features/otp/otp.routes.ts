import {  Router } from 'express';
import * as otp from "./otp.controller"

export const otpRoutes = Router();

otpRoutes.post('/get-otp', otp.getOtpController);
otpRoutes.post('/verify-otp', otp.verifyOtpController)
