import { db } from "../firebase";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { userService } from "./user.service";
export const chatService = {
    getAllChats,
    getChat,
    createMsg,
    createChat,
    updateMsg,
    loadFullChats
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

async function loadFullChats() {
    const chats = []
    const users = await userService.getAll()
    console.log({ users });
    const querySnapshot = await getDocs(collection(db, "chats"));
    querySnapshot.forEach(async (document) => {
        const chat = { ...document.data(), id: document.id }
        const currentUser = users.find(u => u.UserEmail === chat.userEmail2)
        console.log({ currentUser });
       chat.messages=chat?.messages?.length? chat.messages:[];
        const promisses = await chat.messages.map(async (messageId) => {
            const docRef = doc(db, "messages", messageId);
            const docSnap = await getDoc(docRef);
            const meesage = { ...docSnap.data(), id: messageId }
            return meesage
        })
        chat.messages = await Promise.all(promisses);
        const unreadMsgs = chat.messages.filter((m) => !m?.isRead&&m.userEmail!==userEmail)
        console.log(unreadMsgs);
        chat.isRead = !unreadMsgs.length
        chat.username = `${currentUser?.UserFirstName} ${currentUser?.UserLastName}`
        chats.push(chat);
        console.log({chats});
    });
}

// 1.get all chats 
// 2.loop chats, and check each msgs if have isRead=false.
//     3.get the chat the have the unread msg and present on the screen.


async function createMsg(txt, chat) {
    // create msg into firebase collection
    console.log({ txt, chat });
    const docRef = await addDoc(collection(db, "messages"), {
        txt,
        userEmail,
        isRead: false,
        createdAt: new Date()
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


async function updateMsg(msgId) {
    console.log({msgId});
    const messageRef = doc(db, "messages", msgId);
    await updateDoc(messageRef, {
        isRead: true
    });
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



