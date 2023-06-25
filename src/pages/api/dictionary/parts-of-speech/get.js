import { db } from '@/configs/firebase-admin';

const handler = async (req, res) => {
    try {
        const { id } = req.body;

        if (typeof id === 'undefined') throw new Error('Field id not on body!');
        if (req.method !== 'POST') throw new Error('Method not supported!');

        const dictEEVRef = db.collection('dictionary').doc('EEV');

        const query = dictEEVRef.collection('parts_of_speech').doc(id);

        const doc = await query.get();

        if (doc.exists) {
            res.status(200).json({
                data: {
                    id: doc.id,
                    ...doc.data(),
                },
                status: true,
                code: 'success',
                message: 'Get data successfully!',
            });
        } else {
            res.status(200).json({
                status: false,
                code: 'empty',
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
