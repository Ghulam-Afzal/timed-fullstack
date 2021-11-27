import axios from 'axios'; 

// const baseUrl = '/api/signup'

const baseUrl = 'http://localhost:8080/api/signup'

const signup = async userInfo => {
    const response = await axios.post(baseUrl, userInfo)
    return response.data
}


export default { signup }; 