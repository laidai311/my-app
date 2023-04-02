import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.NEXT_PUBLIC_TYPE,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      private_key_id: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID,
      privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      auth_uri: process.env.NEXT_PUBLIC_AUTH_URI,
      token_uri: process.env.NEXT_PUBLIC_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.NEXT_PUBLIC_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.NEXT_PUBLIC_CLIENT_EMAIL_X509_CERT_URL,
    }),
  });
}

export const auth = admin.auth();
export const db = admin.firestore();
export const fieldValue = admin.firestore.FieldValue;
