import { env } from '@/config';
import sgMail from '@sendgrid/mail';
import { sendOtpTemplate } from "./otp.template";

sgMail.setApiKey(env.SENDGIRD_API_KEY);

export const sendOtpEmail = async (userEmail: string, otp: string) => {
  try {
    const res = await sgMail.send({
      from:`InstaClone <${ env.USER_EMAIL}>`,
      to: userEmail,
      subject: 'Verify your account',
      html: sendOtpTemplate(otp),
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
