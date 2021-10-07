import User from '../../../models/User';

export default async function (req, res) {
    const id = req.query.id;
    if (req.method === 'DELETE') {
        try {
            const user = await User.deleteOne({ _id: id });

            if (!user) {
                res.status(404).json({ message: 'Korisnik nije pronađen' });
                return;
            }
            res.status(200).json({ message: 'Obrisan korisnik' });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    } else if (req.method === 'GET') {
        const user = await User.findById({ _id: id });
        if (!user) {
            res.status(404).json({ message: 'Korisnik nije pronađen' });
            return;
        }
        res.status(200).json({ user });
        return;
    }
}
