import { auth } from '@/configs/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import NextAuth from 'next-auth';

export const authOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'somebody@gmail.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials, req) {
                try {
                    const userCredential = await signInWithEmailAndPassword(
                        auth,
                        credentials.email,
                        credentials.password
                    );

                    // I want to get this token and save as Bearer Authorization token userCredential.idToken

                    if (userCredential.user)
                        return {
                            email: userCredential.user.email,
                            accessToken: userCredential.idToken,
                        };
                    else return null;
                } catch (error) {
                    throw new Error('Invalid email or password');
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ user, token }) {
            //   update token if user is returned
            if (user) {
                token.email = user.email;
                token.accessToken = user.accessToken;
            }
            //   return final_token
            return token;
        },
        async session({ session, token }) {
            //  update session from token
            session.email = token.email;
            session.accessToken = token.accessToken;
            return session;
        },
    },
};
export default NextAuth(authOptions);
