import dbConnect from "../../../lib/dbConnect";
import Izvoz from "../../../models/Izvoz";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const izvozi = await Izvoz.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: izvozi });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { naziv, narudzba, isporuka } = req.body;
        if (!naziv || !narudzba || !isporuka) {
          res.status(422).json({
            message: "Molimo popunite sva polja",
          });
          return;
        }
        const izvoz = await Izvoz.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: izvoz });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
