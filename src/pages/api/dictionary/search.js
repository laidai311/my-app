import { db } from '@/configs/firebase-admin';

const handler = async (req, res) => {
  const { search, limit = 30 } = req.body;

  try {
    if (!search) throw new Error('Invalid search!');
    if (req.method !== 'POST') throw new Error('Method not supported!');

    const dictRef = db.collection('dictionary').doc('alphabet');
    const snapshot = await dictRef
      .collection(search[0].trimStart().toLowerCase())
      .where('word', '>=', search)
      .where('word', '<=', search + '\uf8ff')
      // .startAfter(lastWord)
      .limit(+limit)
      .get();

    if (snapshot.size) {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json({
        data,
        status: true,
        code: 'success',
        message: 'Get data successfully!',
      });
    } else {
      res.status(200).json({
        data: [],
        status: false,
        code: 'no-data',
        message: 'No data found!',
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      code: 'error',
      message: error?.message || 'Error!',
    });
  }
};

export default handler;
