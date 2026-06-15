export default async function handler(req, res) {
  if (req.method !== "'POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  console.log(`webhook received : ${JSON.stringify(req.body)}`);

  res.status(200).json({ message: "webhook received" });
}
