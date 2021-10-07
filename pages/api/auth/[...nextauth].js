import NextAuth from 'next-auth';
import { matchedPassword } from '../../../lib/auth';
import User from '../../../models/User';
import dbConnect from '../../../lib/dbConnect';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    session: {
        jwt: true,
    },
    site: process.env.NEXTAUTH_URL,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                await dbConnect();
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
