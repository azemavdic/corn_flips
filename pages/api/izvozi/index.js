import dbConnect from '../../../lib/dbConnect';
import Pet from '../../../models/Pet';
import Izvoz from '../../../models/Izvoz';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const izvozi = await Izvoz.find(
                    {}
                ); /* find all the data in our database */
                res.status(200).json({ success: true, data: izvozi });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
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
