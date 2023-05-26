import axios from 'axios';
export const userService = {
    getAll,
}

const base_url = 'https://localhost:44300/api'
const module = 'Users'
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
