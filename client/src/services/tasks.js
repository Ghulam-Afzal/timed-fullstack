import axios from 'axios'; 

// const baseUrl = '/api/tasks'

const baseUrl = 'http://localhost:8080/api/tasks'

let token = null 

// '/api/tasks/gettasks'
const setToken = newToken => {
    token = `bearer ${newToken}`
}


const getAll = async () => { 
    const data = JSON.parse(window.localStorage.getItem("loggedTaskAppUser"));
    const user = data["id"];
    const object = { user }
    const response = await axios.post('http://localhost:8080/api/tasks/gettasks', object)
    return response.data
}

const createNew = async (title, taskTime, userId) => {
    const config = {
        headers: { authorization: token}
    }
    const object = { title, taskTime, userId }
    const response = await axios.post(baseUrl, object, config)
    return response.data
}


export default { 
    getAll,
    createNew, 
    setToken
}