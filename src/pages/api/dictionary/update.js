import { db, fieldValue } from '@/configs/firebase-admin';
import { withAuth } from '@/libs/middleware';

const handler = async (req, res) => {
  const { id, ...param } = req.body;

  try {
    if (!id) throw new Error('Invalid id!');
    if (req.method !== 'POST') throw new Error('Method not supported!');

    const dictRef = db.collection('dictionary').doc('alphabet');
    const docRef = dictRef.collection(`${id[0]}`).doc(`${id.slice(1)}`);

    const res = await docRef.update({
      timestamp: fieldValue.serverTimestamp(),
      ...param,
    });
    console.log(res);

    res.status(201).json({
      // data: { id },
      status: true,
      code: 'success',
      message: 'Updated document successfully!',
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      code: 'error',
      message: error?.message || 'Error!',
    });
  }
};

export default withAuth(handler);
