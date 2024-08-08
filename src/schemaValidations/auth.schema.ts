import z from 'zod'

export const RegisterBody = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.string().email('Invalid email address.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .regex(/[a-zA-Z]/, 'Password must contain at least one letter.')
      .regex(/\d/, 'Password must contain at least one number.'),
  })
  .strict()

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const RegisterRes = z.object({
  access: z.object({
    token: z.string(),
    expires: z.string(),
  }),
  refresh: z.object({
    token: z.string(),
    expires: z.string(),
  }),
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginBody = z
  .object({
    email: z.string().email('Invalid email address.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .regex(/[a-zA-Z]/, 'Password must contain at least one letter.')
      .regex(/\d/, 'Password must contain at least one number.'),
    remember: z.boolean().default(false).optional(),
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = RegisterRes

export type LoginResType = z.TypeOf<typeof LoginRes>

export type TokensType = z.TypeOf<typeof LoginRes>

export const SlideSessionBody = z.object({}).strict()

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>
export const SlideSessionRes = RegisterRes

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>
