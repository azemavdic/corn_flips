import User from '../../../models/User';

export default async function (req, res) {
    if (req.method === 'GET') {
        const users = await User.find().lean();
        res.status(200).json(users);
    }
}
