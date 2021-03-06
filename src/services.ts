import FetchRequest from './utils/request'
import parseStorageGet from './utils/parse-storage-get'

export const limit = 10

export const request = new FetchRequest({
  prefix: `${process.env.API_HOST}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${parseStorageGet('user')?.token}`,
  },
})

export interface PostLoginForm {
  email: string;
  password: string;
}

export async function postLogin(form: PostLoginForm) {
  return request.post<UserResponse>('/users/login', { user: form }).then(res => res.user)
}

interface PostRegisterForm extends PostLoginForm {
  username: string;
}

export async function postRegister(form: PostRegisterForm) {
  return request.post<UserResponse>('/users', { user: form }).then(res => res.user)
}

export async function getAllTags() {
  return request.get<TagsResponse>('/tags').then(res => res.tags)
}

interface PostArticleForm {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export async function postArticle(form: PostArticleForm) {
  return request.post<ArticleResponse>('/articles', { article: form })
    .then(res => res.article)
}

export async function getArticle(slug: string) {
  return request.get<ArticleResponse>(`/articles/${slug}`).then(res => res.article)
}

export async function putArticle(slug: string, form: PostArticleForm) {
  return request.put<ArticleResponse>(`/articles/${slug}`, { article: form })
    .then(res => res.article)
}

export async function getArticles(page = 1) {
  const params = { limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles', { params })
}

export async function getFeeds(page = 1) {
  const params = { limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles/feed', { params })
}

export async function getArticlesByTag(tagName: string, page = 1) {
  const params = { tag: tagName, limit, offset: (page - 1) * limit }
  return request.get<ArticlesResponse>('/articles', { params })
}

export async function getProfileArticles(username: string, page = 1) {
  const params = { limit, offset: (page - 1) * limit, author: username }
  return request.get<ArticlesResponse>('/articles', { params })
}

export async function getFavoritedArticles(username: string, page = 1) {
  const params = { limit, offset: (page - 1) * limit, favorited: username }
  return request.get<ArticlesResponse>('/articles', { params })
}

export async function getCommentsByArticle(slug: string) {
  return request.get<CommentsResponse>(`/articles/${slug}/comments`).then(res => res.comments)
}

export async function deleteComment(slug: string, commentId: number) {
  return request.delete(`/articles/${slug}/comments/${commentId}`)
}

export async function postComment(slug: string, body: string) {
  return request.post<CommentResponse>(`/articles/${slug}/comments`, { comment: { body } })
    .then(res => res.comment)
}

export async function postFavoriteArticle(slug: string) {
  return request.post<ArticleResponse>(`/articles/${slug}/favorite`).then(res => res.article)
}

export async function deleteFavoriteArticle(slug: string) {
  return request.delete<ArticleResponse>(`/articles/${slug}/favorite`).then(res => res.article)
}

export async function getProfile(username: string) {
  return request.get<ProfileResponse>(`/profiles/${username}`).then(res => res.profile)
}

export async function putProfile(form: Partial<Profile>) {
  return request.put<ProfileResponse>('/user', form).then(res => res.profile)
}

export async function postFollowProfile(username: string) {
  return request.post<ProfileResponse>(`/profiles/${username}/follow`).then(res => res.profile)
}

export async function deleteFollowProfile(username: string) {
  return request.delete<ProfileResponse>(`/profiles/${username}/follow`).then(res => res.profile)
}
