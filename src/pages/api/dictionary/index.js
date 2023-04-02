// import { firestore, fieldValue } from '@/configs/firebase-admin';

// export default async (req, res) => {
//     if (req.method !== 'POST') res.status(400).end()

//     try {
//         const { word, search, limit = 20, ...param } = req.body;

//         if (search) {
//             const snapshot = await firestore
//                 .collection(search[0])
//                 .where('word', '>=', search)
//                 .where('word', "<=", search + "\uf8ff")
//                 .limit(Number(limit))
//                 .get()

//             const data = snapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));

//             if (data.length) {
//                 res.status(200).json({
//                     status: true,
//                     data,
//                     message: 'Get data successfully!',
//                 });
//             } else {
//                 res.status(200).json({
//                     status: false,
//                     message: 'Not found!',
//                 });
//             }

//         } else {
//             const alphabetRef = firestore
//                 .collection(`${word[0].toLowerCase()}`)

//             const snapshot = await alphabetRef.where('word', '==', word).get();

//             if (snapshot.empty) {
//                 const { id } = await alphabetRef.add({
//                     word,
//                     timestamp: fieldValue.serverTimestamp(),
//                     ...param,
//                 });

//                 res.status(200).json({
//                     data: { id },
//                     status: true,
//                     message: 'Created data successfully!',
//                 });
//                 return;
//             } else {
//                 res.status(404).json({
//                     status: false,
//                     message: 'Document exist!',
//                 });
//             }
//         }
//     } catch (e) {
//         res.status(400).end();
//     }
// }
