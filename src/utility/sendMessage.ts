import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default async function sendMessage(body) {
  let response = await axios.post(
    `https://graph.facebook.com/v25.0/${process.env.PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to: `${process.env.MY_PHONE_NUMBER}`,
      type: "text",
      text: {
        body,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response;
}
