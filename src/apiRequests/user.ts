import http from '@/lib/http'
import { UserResType } from '@/schemaValidations/user.schema'

const userApiRequest = {
  me: (accessToken: string) => http.get<UserResType>('/auth/me'),
}

export default userApiRequest
