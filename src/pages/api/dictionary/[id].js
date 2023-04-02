import { firestore, serverTimesTamp } from '@/lib/firebase-admin';
import { verifyIdToken } from '@/lib/firebase-admin';

const handler = async (req, res) => {
  const { id } = req.query;

  try {
    switch (req.method) {
      case 'GET': {
        const doc = await firestore
          .collection(`${id[0]}`)
          .doc(id.slice(1))
          .get();

        if (!doc.exists) {
          res.status(404).json({
            code: 'failed',
            message: 'Document does not exist!',
          });
        } else {
          res.status(200).json({
            code: 'success',
            data: {
              id: doc.id,
              ...doc.data(),
            },
            message: 'Get data successfully!',
          });
        }
        break;
      }

      case 'DELETE':
      case 'PATCH':
      case 'PUT': {
        try {
          await verifyIdToken(req, res);
        } catch (error) {
          res.status(403).send('Unauthorized');
          break;
        }
      }

      case 'PATCH':
      case 'PUT': {
        await firestore
          .collection(`${id[0]}`)
          .doc(id.slice(1))
          .update({
            ...req.body,
            timestamp: serverTimesTamp(),
          });
        res.status(200).json({
          code: 'success',
          message: 'Update data successfully!',
        });
        break;
      }

      case 'DELETE': {
        await firestore.collection(`${id[0]}`).doc(id.slice(1)).delete();
        res.status(200).josn({
          code: 'success',
          message: 'Delete data successfully!',
        });
        break;
      }

      default: {
        res.status(400).end();
        break;
      }
    }
  } catch (e) {
    res.status(400).end();
  }
};

export default handler;
