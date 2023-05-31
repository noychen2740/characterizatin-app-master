import axios from 'axios';
export const userService = {
    getAll,
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
