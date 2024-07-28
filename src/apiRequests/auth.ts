import http from '@/lib/http'
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
  TokensType,
} from '@/schemaValidations/auth.schema'
import { MessageResType } from '@/schemaValidations/common.schema'

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
  register: (body: RegisterBodyType) => http.post<RegisterResType>('/auth/register', body),
  auth: (body: TokensType | null) =>
    http.post('/api/auth', body, {
      baseUrl: '',
    }),
  logoutFromNextServerToServer: (refreshToken: string) => http.post<MessageResType>('/auth/logout', { refreshToken }),
  logoutFromNextClientToNextServer: (force?: boolean | undefined, signal?: AbortSignal | undefined) =>
    http.post<MessageResType>(
      '/api/auth/logout',
      {
        force,
      },
      {
        baseUrl: '',
        signal,
      }
    ),
  refreshToken: (refreshToken: string) => http.post<TokensType>('/auth/refreshToken', { refreshToken }),
}

export default authApiRequest
