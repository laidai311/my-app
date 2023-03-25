import admin from "firebase-admin";

// admin.initializeApp({
//     credential: admin.credential.cert({
//         projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//         privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//     }),
//     // databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
// });

var serviceAccount = require("./dailai-9966-firebase-adminsdk-1cadd-6f53a7d31e.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth();
export const db = admin.firestore();
export const fieldValue = admin.firestore.FieldValue;
