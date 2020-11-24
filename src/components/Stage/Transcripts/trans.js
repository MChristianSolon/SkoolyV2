import axios from 'axios'

const transInstance = axios.create({
    baseURL: "https://video.google.com"
})

export default transInstance