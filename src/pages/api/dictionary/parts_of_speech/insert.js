import { db, fieldValue } from '@/configs/firebase-admin';
import { withAuth } from '@/libs/middleware';

const handler = async (req, res) => {
    const { code, ...params } = req.body;

    try {
        if (!code) throw new Error('Invalid code!');
        if (req.method !== 'POST') throw new Error('Method not supported!');

        const dictEEVRef = db.collection('dictionary').doc('EEV');
        const parts_of_speechRef = dictEEVRef.collection('parts_of_speech');
        const parts_of_speechSnapshot = await parts_of_speechRef
            .where('code', '==', code)
            .get();

        if (parts_of_speechSnapshot.empty) {
            const { id } = await parts_of_speechRef.add({
                code,
                timestamp: fieldValue.serverTimestamp(),
                ...params,
            });

            res.status(201).json({
                data: { id },
                status: true,
                code: 'success',
                message: 'Inserted document successfully!',
            });
        } else {
            const data = parts_of_speechSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            res.status(202).json({
                data,
                status: false,
                code: 'exist',
                message: 'Document exist!',
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

export default withAuth(handler);
