import axios from 'axios'


export const cafeApi = axios.create(
    {
        //baseURL: 'https://jomilimon.herokuapp.com/api'
        baseURL: 'http://localhost:8080/api'
        //baseURL: 'http://192.168.100.24:8080/api'
    }
)