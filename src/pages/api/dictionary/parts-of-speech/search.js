import { db } from '@/configs/firebase-admin';

const handler = async (req, res) => {
    try {
        const {
            search = '',
            // lastVisible = '',
            // limit = 30,
            // sort = 'desc',
        } = req.body;

        if (req.method !== 'POST') throw new Error('Method not supported!');

        const dictEEVRef = db.collection('dictionary').doc('EEV');

        const query = dictEEVRef
            .collection('partsOfSpeech')
            .where('search', '>=', search)
            .where('search', '<=', search + '\uf8ff');

        const snapshot = await query
            // .orderBy('order', sort)
            // .startAfter(lastVisible)
            // .limit(+limit)
            .get();

        if (snapshot.size) {
            const count = await query.count().get();

            // const [lastVisible] = [...snapshot.docs].reverse();

            const items = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            res.status(200).json({
                data: {
                    items: items.sort((a, b) => a?.order - b?.order),
                    total: count.data().count,
                },
                // next: {
                //     part_of_speech,
                //     lastVisible: lastVisible.data(),
                //     limit,
                //     sort,
                // },
                status: true,
                code: 'success',
                message: 'Get data successfully!',
            });
        } else {
            res.status(400).json({
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
