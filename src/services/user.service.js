import axios from 'axios';
export const userService = {
    getAll,
    updateIMG,
}

const base_url = 'http://194.90.158.74/cgroup99/prod/api'
const module = 'Users'
async function getAll() {
    try {
        const res = await axios.get(`${base_url}/${module}/getnmame/`)
        console.log({ res });
        return res.data
    } catch (err) {
        console.log({ err });
        return []
    }
}

    ///http://194.90.158.74/cgroup99/prod/api/users/PutImg/?email=Benda669@gmail.com
    //api/traveldiary/Put/{nameofchapterfromdb}/
    async function updateIMG(file) {
        try {
            console.log({ file });
            const res = await axios.put(`${base_url}/${module}/PutImg/?email=Benda669@gmail.com`, file)
            console.log({ res });
            return res.data
        } catch (err) {
            console.log({ err });
        }
    }
