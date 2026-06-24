import express from "express";
import dotenv from "dotenv";

import sendMessage from "../src/utility/sendMessage.ts";
import { parseConversionRequest } from "../src/utility/parser.ts";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/server/server", (req, res) => {
  console.log(`
        
        query params received from meta webhook verification:
        ${JSON.stringify(req.query, null, 2)}
        `);

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.status(403).send("verification failed");
  }
});
app.post("/server/server", async (req, res) => {
  console.log(`webhook received : ${JSON.stringify(req.body, null, 2)}`);

  const messageObject = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  try {
    if (messageObject?.text?.body) {
      const from = messageObject.from;
      const messageText = messageObject.text.body || "100 USD to EUR";
      console.log(`Received message from ${from}: ${messageText}`);

      const parsedRequest = parseConversionRequest(messageText);
      if (parsedRequest === null) {
        await sendMessage(
          `Invalid conversion request. Please use the format: "<amount> <from_currency> to <to_currency>". Example: "100 USD to EUR"`,
        );
        return;
      }

      let response = await sendMessage(
        `converting ${parsedRequest.amount} ${parsedRequest.from} to ${parsedRequest.to}`,
      );

      console.log(
        `Message sent successfully: ${JSON.stringify(response.data, null, 2)}`,
      );
    }
  } catch (error: any) {
    if (error.response) {
      console.error(
        "Error sending message:",
        `status=${error.response.status}`,
        JSON.stringify(error.response.data, null, 2),
      );
    } else {
      console.error("Error sending message:", error.message, error.stack);
    }
  }

  res.status(200).json({ message: "webhook received" });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
