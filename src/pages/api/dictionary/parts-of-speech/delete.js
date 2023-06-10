import { db } from '@/configs/firebase-admin';
import { withAuth } from '@/libs/middleware';

const handler = async (req, res) => {
    const { id } = req.body;

    try {
        if (!id) throw new Error('Invalid id!');
        if (req.method !== 'POST') throw new Error('Method not supported!');

        const dictEEVRef = db.collection('dictionary').doc('EEV');
        const parts_of_speechRef = dictEEVRef
            .collection('parts_of_speech')
            .doc(id);

        await parts_of_speechRef.delete();

        res.status(201).json({
            status: true,
            code: 'success',
            message: 'Delete document successfully!',
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
