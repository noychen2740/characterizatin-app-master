import { db } from "../firebase";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { userService } from "./user.service";
export const chatService = {
    getAllChats,
    getChat,
    createMsg,
    createChat
}

const userEmail = 'Benda669@gmail.com'

async function getAllChats() {
    try {
        const chats = []
        const users = await userService.getAll()
        console.log({ users });
        const querySnapshot = await getDocs(collection(db, "chats"));
        querySnapshot.forEach((doc) => {
            const chat = { ...doc.data(), id: doc.id }
            const currentUser = users.find(u => u.UserEmail === chat.userEmail2)
            console.log({ currentUser });
            chat.username = `${currentUser?.UserFirstName} ${currentUser?.UserLastName}`
            chats.push(chat)
        });
        console.log({ chats });
        return chats
    } catch (e) {
        console.log("Error getting cached document:", e);
    }
}

async function createMsg(txt, chat) {
    // create msg into firebase collection
    console.log({ txt, chat });
    const docRef = await addDoc(collection(db, "messages"), {
        txt,
        userEmail
    });
    console.log({ docRef });
    // get the current  chat
    const chatRef = doc(db, "chats", chat.id);
    console.log({ chatRef })
    //update the current chat with the new msg
    await updateDoc(chatRef, {
        messages: [...chat.messages?.map(m => m.id) || [], docRef.id]
    });
    return
}

async function getChat(userEmail2) {

    try {


        return query(collection(db, "chats"), where("userEmail2", "==", userEmail2));


        // const chatSnapShot = await getDocs(q);
        // return chatSnapShot


    } catch (e) {
        console.log("Error getting cached document:", e);
    }
}


async function createChat(userEmail2) {
    const docRef = await addDoc(collection(db, "chats"), {
        userEmail2,
        userEmail,
        messages: []
    });
}
// const q = query(collection(db, "cities"), where("state", "==", "CA"));
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   const cities = [];
//   querySnapshot.forEach((doc) => {
//       cities.push(doc.data().name);
//   });
//   console.log("Current cities in CA: ", cities.join(", "));
// });

