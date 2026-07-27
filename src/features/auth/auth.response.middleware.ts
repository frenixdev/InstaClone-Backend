import { Response, Request } from 'express';
export const sendRegisterResponse = async (req: Request, res: Response) => {
  res.cookie('token', req.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  // res.cookie('token', req.token, {
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: 'lax',
  // });
  return res.status(201).json({
    success: true,
    message: 'user created successfully',
    data: req.result,
  });
};

export const sendLoginResponse = async (req: Request, res: Response) => {
  res.cookie('token', req.token, {
    httpOnly: true,
    secure: true,
  });
  // res.cookie('token', req.token, {
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: 'lax',
  // });
  return res.status(200).json({
    success: true,
    message: 'user logged in successfully',
    data: req.result,
  });
};
export const sendForgetResponse = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'forget successfully',
    data: req.result,
    token: req.token,
  });
};

export const sendGetMeResponse = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'user fetched successfully',
    data: req.result,
  });
};

export const sendLogoutResponse = async (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  return res.status(200).json({
    success: true,
    message: 'logged out successfully',
  });
};
