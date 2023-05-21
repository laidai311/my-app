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
            async authorize(credentials) {
                signInWithEmailAndPassword(
                    auth,
                    credentials?.username || '',
                    credentials?.password || ''
                )
                    .then((userCredential) => userCredential.user)
                    .catch((error) => null);
            },
        }),
    ],
};
export default NextAuth(authOptions);
