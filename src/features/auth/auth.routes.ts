import { Router } from 'express';
import { createTokenHandler, verifyTokenHandler } from 'middlewares';
import * as auth from './auth.controller';
import * as response from './auth.response.middleware';
const authRoutes = Router();

/***
 * @route Post /api/auth/register
 * @desc Register user -> create JWT -> send auth response
 * @access public
 *
 * @requestBody
 * {
 *  email: string,
 *  username: string,
 *  password: string
 * }
 * @responseBody
 * {
 *  success: boolean,
 *  message: string,
 *  token: string,
 *  data: object
 * }
 */
authRoutes.post(
  '/register',
  auth.registerController,
  createTokenHandler,
  response.sendRegisterResponse
);
/***
 * @route Post /api/auth/login
 * @desc check user into db  -> create jwt -> send auth response
 * @access public
 *
 * @requestBody
 * {
 *  username: string;
 *      or
 *  email: string;
 *  password: string;
 * }
 *
 *  @responseBody
 * {
 *  success: boolean,
 *  message: string,
 *  token: string,
 *  data: object
 * }
 */
authRoutes.post(
  '/login',
  auth.loginController,
  createTokenHandler,
  response.sendLoginResponse
);

authRoutes.post(
  '/forget',
  auth.forgetPasswordController,
  createTokenHandler,
  response.sendForgetResponse
);
authRoutes.get(
  '/getMe',
  verifyTokenHandler,
  auth.getMeController,
  response.sendGetMeResponse
);
authRoutes.post(
  '/logout',
  verifyTokenHandler,
  auth.logoutController,
  response.sendLogoutResponse
);
export { authRoutes };
