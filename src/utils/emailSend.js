export const emailSend = async (email, username) => {

      const response = await fetch(`/api/auth/email/send?email=${email}&&username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      return response;
}

export default emailSend;