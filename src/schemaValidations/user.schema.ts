import z from 'zod'

export const UserRes = z
  .object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    avatar: z.string(),
    role: z.string(),
    verified: z.boolean(),
    history: z.array(
      z.object({
        chapter_name: z.number(),
        id: z.string(),
        comic: z.object({ id: z.string(), name: z.string(), slug: z.string(), thumb_url: z.string() }),
      })
    ),
    saved: z.array(z.object({ id: z.string(), name: z.string(), slug: z.string(), thumb_url: z.string() })),
    likes: z.array(z.object({ id: z.string(), name: z.string(), slug: z.string(), thumb_url: z.string() })),
    progress: z.object({
      level: z.number(),
      levelName: z.string(),
      points: z.number(),
      ruby: z.number(),
      achievements: z.array(z.object({ id: z.string(), name: z.string(), description: z.string() })),
    }),
  })
  .strict()

export type UserResType = z.TypeOf<typeof UserRes>

export const ChangePasswordBody = z.object({
  oldPassword: z.string().min(6).max(256),
  newPassword: z.string().min(6).max(256),
})

export type ChangePasswordBodyType = z.TypeOf<typeof ChangePasswordBody>

export const UpdateProfileBody = z.object({
  name: z.string().trim().min(2).max(256).optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
})

export type UpdateProfileBodyType = z.TypeOf<typeof UpdateProfileBody>
