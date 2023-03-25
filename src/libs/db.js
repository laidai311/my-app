import { db } from "../configs/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default {
    addNoteDoc: async (data) => {
        try {
            const dbInstance = collection(db, "notes");
            const docRef = await addDoc(dbInstance, data);
            return docRef;
        } catch (error) {
            throw error;
        }
    },
    getNoteDocs: async () => {
        try {
            const dbInstance = collection(db, "notes");
            const querySnapshot = await getDocs(dbInstance);
            return querySnapshot.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            throw error;
        }
    },
    addUsersDoc: async (data) => {
        try {
            const dbInstance = collection(db, "users");
            const docRef = await addDoc(dbInstance, data);
            return docRef;
        } catch (error) {
            throw error;
        }
    },
};
