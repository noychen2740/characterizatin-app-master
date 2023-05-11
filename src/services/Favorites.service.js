import axios from 'axios';

export const favoriteservice={
    getByName,
    // create,
    PutFavourites,
    DeleteFavourites,
    Getall,
    // createfromuser
}



const base_url = 'http://194.90.158.74/cgroup99/prod/api'
const module = 'Favourites'
const userEmail = 'Benda669@gmail.com'


// https://localhost:44350/api/traveldiary/noycn27@gmail.com/chapters
async function Getall() {
    try {
        const res = await axios.get(`${base_url}/${module}/Getall/${userEmail}`)
        console.log({ res });
        return res.data
    } catch (err) {
        console.log({ err });
        return []
    }
}
// https://localhost:44350/api/traveldiary/Benda669@gmail.com/GetTravelDiaryChaptersById/טרק
async function getByName(FavKey) {
    try {
        const res = await axios.get(`${base_url}/${module}/${FavKey}/GetByName`)
        console.log({ res });
        return res.data[0]
    } catch (err) {
        console.log({ err });
    }
}

// post: https://localhost:44300/api/Feedback/2/PostNew
// async function create(feedback) {
//     console.log({ feedback });
//     try {
//         const res = await axios.post(`${base_url}/${module}/${feedback.FeedbackKey}/PostNew`)
//         console.log({ res });
//         return res.data
//     } catch (err) {
//         console.log({ err });
//     }
// }
//api/Feedback/PostFeed/
// async function createfromuser(feedback) {
//     console.log({ feedback });
//     try {
//         const res = await axios.post(`${base_url}/${module}/PostFeed/`,feedback)
//         console.log({ res });
//         return res.data
//     } catch (err) {
//         console.log({ err });
//     }
// }


async function PutFavourites(id) {
    try {
        const res = await axios.put(`${base_url}/${module}/${id}/PutFavourites`)
        console.log({ res });
        return res.data
    } catch (err) {
        console.log({ err });
    }
}


//api/Feedback/DeleteFeedback/{feedbackIDfromdb}
async function DeleteFavourites(DeleteFavouritesIDfromdb) {
    try {
        const res = await axios.delete(`${base_url}/${module}/DeleteFeedback/${DeleteFavouritesIDfromdb}`)
        console.log({ res });
        return res.data
    } catch (err) {
        console.log({ err });
    }
}