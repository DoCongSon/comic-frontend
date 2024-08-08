import http from '@/lib/http'
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
  TokensType,
} from '@/schemaValidations/auth.schema'
import { MessageResType } from '@/schemaValidations/common.schema'
import { ChangePasswordBodyType, UpdateProfileBodyType } from '@/schemaValidations/user.schema'
import { Changa } from 'next/font/google'

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<Omit<LoginResType, 'remember'>>('/auth/login', body),
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
  refreshToken: (refreshToken: string) => http.post<TokensType>('/auth/refresh-tokens', { refreshToken }),
  ChangePassword: (body: ChangePasswordBodyType) => http.post<null>('/auth/change-password', body),
}

export default authApiRequest
