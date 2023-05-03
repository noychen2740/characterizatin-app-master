import axios from 'axios';
export const chapterService = {
    getById,
    create,
    update,
    remove,
    getAll,
}

const base_url = 'http://194.90.158.74/cgroup99/prod/api'
const module = 'traveldiary'
const userEmail = 'Benda669@gmail.com'


// https://localhost:44350/api/traveldiary/noycn27@gmail.com/chapters
async function getAll() {
    try {
        const res = await axios.get(`${base_url}/${module}/${userEmail}/chapters`)
        console.log({ res });
        return res.data
    } catch (err) {
        console.log({ err });
        return []
    }
}
// https://localhost:44350/api/traveldiary/Benda669@gmail.com/GetTravelDiaryChaptersById/טרק
async function getById(NameOfChapter) {
    try {
        const res = await axios.get(`${base_url}/${module}/${userEmail}/GetTravelDiaryChaptersById/${NameOfChapter}`)
        console.log({ res });
        return res.data[0]
    } catch (err) {
        console.log({ err });
    }
}

// post: https://localhost:44350/api/traveldiary/Post/noycn27@gmail.com/{newchap}
// api/traveldiary/PostCAP/{userImput}/

async function create(episode) {
  
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${base_url}/${module}/PostCAP/${userEmail}/`,
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json'
        },
        data : episode
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
}
//api/traveldiary/Put/{nameofchapterfromdb}/
async function update(episode) {
    try {
        console.log({ episode });
        const res = await axios.put(`${base_url}/${module}/PutUpdate/${episode.NameOfChapter}/`, episode)
        console.log({ res });
        return res.data
    } catch (err) {
        console.log({ err });
    }
}



async function remove(NameOfChapter) {
    try {
        const res = await axios.delete(`${base_url}/${module}/${userEmail}/deletechapter/${NameOfChapter}`)
        console.log({ res });
        return res.data
    } catch (err) {
        console.log({ err });
    }
}
