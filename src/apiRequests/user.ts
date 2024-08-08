import http from '@/lib/http'
import { UpdateProfileBodyType, UserResType } from '@/schemaValidations/user.schema'

const userApiRequest = {
  me: () => http.get<UserResType>('/auth/me'),
  updateProfile: (body: UpdateProfileBodyType) => http.post<UserResType>('/auth/update-profile', body),
  getTopUsers: () => http.get<UserResType[]>('/users/top-users', { cache: 'no-store' }),
}

export default userApiRequest
