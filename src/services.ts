import Axios from 'axios'
import { route } from 'preact-router'

const limit = 10

export const axios = Axios.create({
  baseURL: `${process.env.API_HOST}/api`,
})

axios.interceptors.response.use((res) => {
  return res
}, (err) => {
  if (err.response.status === 401) {
    route('/login')
    return
  }
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
  return axios.get<{ tags: string[] }>('/tags').then(res => res.data.tags)
}

export async function getArticles(page = 1) {
  const params = { limit, offset: (page - 1) * limit }
  return axios.get<ArticlesResponse>('/articles', { params })
    .then(res => res.data)
}

export async function getArticlesByTag(tagName: string, page = 1) {
  const params = { tag: tagName, limit, offset: (page - 1) * limit }
  return axios.get<ArticlesResponse>('/articles', { params })
    .then(res => res.data)
}

export async function postFavoriteArticle(slug: string) {
  return axios.post<ArticleResponse>(`/articles/${slug}/favorite`).then(res => res.data.article)
}

export async function deleteFavoriteArticle(slug: string) {
  return axios.delete<ArticleResponse>(`/articles/${slug}/favorite`).then(res => res.data.article)
}

export async function getProfile(username: string) {
  return axios.get<ProfileResponse>(`/profiles/${username}`).then(res => res.data.profile)
}

export async function postFollowProfile(username: string) {
  return axios.post<ProfileResponse>(`/profiles/${username}/follow`).then(res => res.data.profile)
}

export async function deleteFollowProfile(username: string) {
  return axios.delete<ProfileResponse>(`/profiles/${username}/follow`).then(res => res.data.profile)
}
