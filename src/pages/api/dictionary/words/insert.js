import { db, fieldValue } from '@/configs/firebase-admin';
import { withAuth } from '@/libs/middleware';

const handler = async (req, res) => {
    const { word, ...params } = req.body;

    try {
        if (!word) throw new Error('Invalid word!');
        if (req.method !== 'POST') throw new Error('Method not supported!');

        const dictEEVRef = db.collection('dictionary').doc('EEV');
        const wordsRef = dictEEVRef.collection('words');
        const wordSnapshot = await wordsRef.where('word', '==', word).get();

        if (wordSnapshot.empty) {
            const { id } = await wordsRef.add({
                word,
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
            const data = wordSnapshot.docs.map((doc) => ({
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
