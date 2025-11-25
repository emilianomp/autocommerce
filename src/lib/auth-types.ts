import * as z from 'zod';

export const LoginCredentialsSchema = z.object({
  name: z.string(),
  password: z.string(),
});
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;

export const RegistrationDataSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
export type RegistrationData = z.infer<typeof RegistrationDataSchema>;
