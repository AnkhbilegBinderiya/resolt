export const emailVerify = async (email, verifyCode) => {

      const response = await fetch(`/api/auth/email/verify?email=${email}&code=${verifyCode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      return response;
}

export default emailVerify;