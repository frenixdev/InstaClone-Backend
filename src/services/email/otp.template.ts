export const sendOtpTemplate = (otp: string) => {
  return `
  <div style="
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 40px 20px;
  ">
    <div style="
      max-width: 500px;
      margin: auto;
      background: white;
      padding: 40px 30px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    ">

      <h1 style="
        color: #262626;
        margin-bottom: 10px;
      ">
        Verify Your Account
      </h1>

      <p style="
        color: #555;
        font-size: 16px;
        line-height: 1.5;
      ">
        Use the OTP below to verify your account.
        This OTP will expire in <b>10 minutes</b>.
      </p>

      <div style="
        margin: 30px 0;
      ">
        <span style="
          display: inline-block;
          font-size: 32px;
          letter-spacing: 8px;
          font-weight: bold;
          color: white;
          background: #000;
          padding: 14px 24px;
          border-radius: 10px;
        ">
          ${otp}
        </span>
      </div>

      <p style="
        color: #777;
        font-size: 14px;
      ">
        If you didn’t request this, you can safely ignore this email.
      </p>

      <hr style="
        margin: 30px 0;
        border: none;
        border-top: 1px solid #eee;
      " />

      <p style="
        color: #999;
        font-size: 12px;
      ">
        © 2026 InstaClone. All rights reserved.
      </p>

    </div>
  </div>`;
};
