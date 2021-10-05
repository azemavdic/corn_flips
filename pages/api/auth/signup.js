import User from '../../../models/User';
import { hashPassword } from '../../../lib/auth';

export default async function (req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        if (
            !email ||
            !email.includes('@') ||
            !password ||
            password.trim().length < 7
        ) {
            res.status(422).json({
                message:
                    'Netačan unos podataka - šifra je minimalno 7 karaktera',
            });
            return;
        }

        const hashedPassword = await hashPassword(password);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(422).json({
                message: 'Korisnik postoji sa tom email adresom',
            });
            return;
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({ message: 'Kreiran korisnik' });
    }
}
