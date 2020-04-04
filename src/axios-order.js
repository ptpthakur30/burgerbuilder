import Axios from 'axios'

const instance = Axios.create({
    baseURL : 'https://burger-builder-7d519.firebaseio.com/'
})

export default instance
