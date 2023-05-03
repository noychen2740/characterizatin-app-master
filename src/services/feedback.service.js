import axios from 'axios';

export const feedbackService={
    getById,
    create,
    update,
    remove,
    getAll,
    createfromuser
}



const base_url = 'http://194.90.158.74/cgroup99/prod/api'
const module = 'Feedback'
const userEmail = 'Benda669@gmail.com'


// https://localhost:44350/api/traveldiary/noycn27@gmail.com/chapters
async function getAll() {
    try {
        const res = await axios.get(`${base_url}/${module}`)
        console.log({ res });
        return res.data
    } catch (err) {
        console.log({ err });
        return []
    }
}
// https://localhost:44350/api/traveldiary/Benda669@gmail.com/GetTravelDiaryChaptersById/טרק
async function getById(FeedbackKey) {
    try {
        const res = await axios.get(`${base_url}/${module}/${FeedbackKey}/GetByName`)
        console.log({ res });
        return res.data[0]
    } catch (err) {
        console.log({ err });
    }
}

// post: https://localhost:44300/api/Feedback/2/PostNew
async function create(feedback) {
    console.log({ feedback });
    try {
        const res = await axios.post(`${base_url}/${module}/${feedback.FeedbackKey}/PostNew`)
        console.log({ res });
        return res.data
    } catch (err) {
        console.log({ err });
    }
}
//api/Feedback/PostFeed/
async function createfromuser(feedback) {
    console.log({ feedback });
    try {
        const res = await axios.post(`${base_url}/${module}/PostFeed/`,feedback)
        console.log({ res });
        return res.data
    } catch (err) {
        console.log({ err });
    }
}


async function update(feedback) {
    try {
        const res = await axios.put(`${base_url}/${module}/Put/${feedback.NameOfChapter}/{newchap}`, feedback)
        console.log({ res });
        return res.data
    } catch (err) {
        console.log({ err });
    }
}


//api/Feedback/DeleteFeedback/{feedbackIDfromdb}
async function remove(FeedbackKey) {
    try {
        const res = await axios.delete(`${base_url}/${module}/DeleteFeedback/${FeedbackKey}`)
        console.log({ res });
        return res.data
    } catch (err) {
        console.log({ err });
    }
}
