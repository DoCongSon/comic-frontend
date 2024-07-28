import { TokensType } from '@/schemaValidations/auth.schema'

export async function POST(request: Request) {
  const body: TokensType | null = await request.json()
  console.log('🚀 ~ body:', body)
  if (!body) {
    return Response.json(
      { message: 'Không nhận được session token' },
      {
        status: 400,
      }
    )
  }
  const accessExpires = new Date(body.access.expires).toUTCString()
  const refreshExpires = new Date(body.refresh.expires).toUTCString()
  return Response.json(body, {
    status: 200,
    headers: {
      'Set-Cookie': `accessToken=${body.access.token}; HttpOnly; Secure; SameSite=Strict; Expires=${accessExpires}; Path=/, refreshToken=${body.refresh.token}; HttpOnly; Secure; SameSite=Strict; Expires=${refreshExpires}; Path=/`,
    },
  })
}
