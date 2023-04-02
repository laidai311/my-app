import { db, fieldValue } from '@/configs/firebase-admin';
import { withAuth } from '@/libs/middleware';

const handler = async (req, res) => {
  const { word, ...param } = req.body;

  try {
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

      res.status(200).json({
        data: { id },
        status: true,
        message: 'Created data successfully!',
      });
    } else {
      res.status(404).json({
        status: false,
        message: 'Document exist!',
      });
    }
  } catch (error) {
    res.status(400).end();
  }
};

export default withAuth(handler);
