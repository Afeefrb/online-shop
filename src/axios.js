import axios from 'axios'

const instance = axios.create({
    baseURL:"http://localhost:5001/online-shop-mall/us-central1/api" //API Cloud funcitons
})

export default instance;