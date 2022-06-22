import axios from 'axios'


export const cafeApi = axios.create(
    {
        //baseURL: 'http://192.168.100.24:8080/api'
        //baseURL: 'https://jomilimon.herokuapp.com/api'
        //baseURL: 'http://192.168.195.29:80/api'
        //baseURL: 'http://167.71.26.102:80/api'
        // baseURL: 'http://localhost:90/api'
        baseURL: 'http://68.183.97.92:90/api' //doctor
        // baseURL: 'http://167.71.26.102:90/api' //mantalents
    }
)