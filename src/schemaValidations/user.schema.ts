import z from 'zod'

export const UserRes = z
  .object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    avatar: z.string(),
    role: z.string(),
    verified: z.boolean(),
    history: z.array(z.string()),
    saved: z.array(z.string()),
    likes: z.array(z.string()),
    process: z.object({
      level: z.number(),
      levelName: z.string(),
      points: z.number(),
      ruby: z.number(),
      achievements: z.array(z.string()),
    }),
  })
  .strict()

export type UserResType = z.TypeOf<typeof UserRes>

export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256).optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
  history: z.array(z.string()).optional(),
  saved: z.array(z.string()).optional(),
  likes: z.array(z.string()).optional(),
})

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>
