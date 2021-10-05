import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { matchedPassword } from '../../../lib/auth';
import User from '../../../models/User';

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                // await dbConnect();
                const user = await User.findOne({
                    name: credentials.name,
                });

                if (!user) {
                    throw new Error('Korisnik nije pronađen');
                }
                const isValid = await matchedPassword(
                    credentials.password,
                    user.password
                );
                if (!isValid) {
                    throw new Error('Šifra nije tačna.');
                }

                return { name: user.name };
            },
        }),
    ],
});
