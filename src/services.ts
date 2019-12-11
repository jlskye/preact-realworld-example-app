import Axios from 'axios'

const axios = Axios.create({
  baseURL: `${process.env.API_HOST}/api`,
})

axios.interceptors.response.use((res) => {
  return res
}, (err) => {
  return Promise.reject(err.response.data)
})

export interface PostLoginForm {
  email: string;
  password: string;
}

export async function postLogin(form: PostLoginForm) {
  return axios.post('/users/login', { user: form })
}

interface PostRegisterForm extends PostLoginForm {
  username: string;
}

export async function postRegister(form: PostRegisterForm) {
  return axios.post('/users', { user: form })
}

export async function getAllTags() {
  return axios.get<{tags: string[]}>('/tags').then(res => res.data.tags)
}
