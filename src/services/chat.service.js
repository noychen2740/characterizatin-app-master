import { doc, getDocFromCache } from "firebase/firestore";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
export const chatService = {
    getAllChats
}


async function getAllChats() {
    try {
        const chats = []
        
        const querySnapshot = await getDocs(collection(db, "chats"));
        querySnapshot.forEach((doc) => {
            chats.push(doc.data())
        });
        console.log({chats});
        return chats
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
}