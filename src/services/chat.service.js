import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { userService } from "./user.service";
export const chatService = {
    getAllChats,
    getChat
}

const userEmail = 'Benda669@gmail.com'

async function getAllChats() {
    try {
        const chats = []
        const users = await userService.getAll()
        const querySnapshot = await getDocs(collection(db, "chats"));
        querySnapshot.forEach((doc) => {
            const chat = { ...doc.data(), id: doc.id }
            const currentUser = users.find(u => u.UserEmail === chat.userEmail2)
            console.log({ currentUser });
            chats.push(chat)
        });
        console.log({ chats });
        return chats
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
}



async function getChat(userEmail2) {
    try {
        let chat;
        const q = query(collection(db, "chats"), where("userEmail2", "==", userEmail2));
        const chatSnapShot = await getDocs(q);
        return chatSnapShot
       
    
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
}


