import { db, fieldValue } from '@/configs/firebase-admin';
import { withAuth } from '@/libs/middleware';

const handler = async (req, res) => {
  const { word, ...param } = req.body;

  try {
    if (!word) throw new Error('Invalid word');
    if (req.method !== 'POST') throw new Error('Method not supported');

    const dictionaryRef = db.collection('dictionary').doc('alphabet');
    const alphabetRef = dictionaryRef.collection(
      `${word[0].trimStart().toLowerCase()}`
    );
    const snapshot = await alphabetRef.where('word', '==', word).get();

    if (snapshot.empty) {
      const { id } = await alphabetRef.add({
        word,
        timestamp: fieldValue.serverTimestamp(),
        ...param,
      });

      res.status(201).json({
        data: { id },
        status: true,
        message: 'Created data successfully!',
      });
    } else {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(202).json({
        data,
        status: false,
        message: 'Document exist!',
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error?.code || error?.message || '',
    });
  }
};

export default withAuth(handler);
