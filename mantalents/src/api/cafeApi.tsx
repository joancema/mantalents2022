import axios from 'axios'


export const cafeApi = axios.create(
    {
        //baseURL: 'https://jomilimon.herokuapp.com/api'
        //baseURL: 'http://localhost:80/api'
        baseURL: 'http://198.199.81.154:80/api'
        //baseURL: 'http://192.168.100.24:8080/api'
    }
)