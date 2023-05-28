import { db } from '@/configs/firebase-admin';

const handler = async (req, res) => {
    const { word, lastVisible = 0, limit = 30, sort = 'desc' } = req.body;

    try {
        if (req.method !== 'POST') throw new Error('Method not supported!');

        const dictEEVRef = db.collection('dictionary').doc('EEV');
        const query = dictEEVRef
            .collection('words')
            .where('word', '>=', word)
            .where('word', '<=', word + '\uf8ff');

        const snapshot = await query
            // .orderBy('timestamp', sort)
            // .startAfter(lastVisible)
            .limit(+limit)
            .get();

        const total = await query.count().get();

        if (snapshot.size) {
            const [lastVisible] = [...snapshot.docs].reverse();

            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            res.status(200).json({
                data,
                total,
                next: {
                    word,
                    lastVisible: lastVisible.data(),
                    limit,
                    sort,
                },
                status: true,
                code: 'success',
                message: 'Get data successfully!',
            });
        } else {
            res.status(200).json({
                data: [],
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
