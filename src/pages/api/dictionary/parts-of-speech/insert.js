import { db, fieldValue } from '@/configs/firebase-admin';
import { withAuth } from '@/libs/middleware';

const handler = async (req, res) => {
    const { search, ...params } = req.body;

    try {
        if (!search) throw new Error('Invalid search!');
        if (req.method !== 'POST') throw new Error('Method not supported!');

        const dictEEVRef = db.collection('dictionary').doc('EEV');
        const parts_of_speechRef = dictEEVRef.collection('partsOfSpeech');
        const query = parts_of_speechRef.where('search', '==', search);
        const snapshot = await query.get();

        if (snapshot.empty) {
            const { id } = await parts_of_speechRef.add({
                search,
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
            const count = await query.count().get();

            const items = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            res.status(202).json({
                data: {
                    items,
                    total: count.data().count,
                },
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
