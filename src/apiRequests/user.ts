import http from '@/lib/http'
import { UpdateProfileBodyType, UserResType } from '@/schemaValidations/user.schema'

const userApiRequest = {
  me: () => http.get<UserResType>('/auth/me'),
  updateProfile: (body: UpdateProfileBodyType) => http.post<UserResType>('/auth/update-profile', body),
  getTopUsers: () => http.get<UserResType[]>('/users/top-users', { cache: 'no-store' }),
  deleteHistory: (chapterId: string) => http.delete<UserResType>(`/users/history/${chapterId}`),
  addLike: (comicId: string) => http.post<UserResType>(`/users/like`, { comicId }),
  deleteLike: (comicId: string) => http.delete<UserResType>(`/users/like/${comicId}`),
  addSave: (comicId: string) => http.post<UserResType>(`/users/save`, { comicId }),
  deleteSave: (comicId: string) => http.delete<UserResType>(`/users/save/${comicId}`),
}

export default userApiRequest
