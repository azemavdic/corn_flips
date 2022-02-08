import User from '../../../models/User';
import dbConnect from '../../../lib/dbConnect';
import { getSession } from 'next-auth/client';
import { hashPassword, matchedPassword } from '../../../lib/auth';

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'PATCH':
            try {
                const session = await getSession({ req: req });

                if (!session) {
                    res.status(401).json({ poruka: 'Niste autorizovani!' });
                    return;
                }

                const email = session.user.email;
                const { staraSifra, novaSifra } = req.body;

                const user = await User.findOne({ email });

                if (!user) {
                    res.status(404).json({ poruka: 'Korisnik nije pronađen.' });
                    return;
                }

                const isValid = await matchedPassword(
                    staraSifra,
                    user.password
                );
                if (!staraSifra || !novaSifra) {
                    res.status(422).json({ poruka: 'Molimo popunite polja.' });
                    return;
                }
                if (!isValid) {
                    res.status(403).json({ poruka: 'Šifre se ne podudaraju.' });
                    return;
                }

                const hashedSifra = await hashPassword(novaSifra);

                const result = await user.updateOne({
                    email: email,
                    password: hashedSifra,
                });
                res.status(200).json({
                    poruka: 'Šifra je uspješno promijenjena.',
                });
            } catch (error) {
                res.status(400).json({ poruka: error });
            }
            break;
        default:
            res.status(400).json({
                poruka: `Nije dopuštena ${req.method} metoda.`,
            });
            break;
    }
}
