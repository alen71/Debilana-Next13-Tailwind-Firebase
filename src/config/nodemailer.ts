import { createTransport } from 'nodemailer'

const email = process.env.NEXT_PUBLIC_VERCEL_FORWARDING_EMAIL
const password = process.env.NEXT_PUBLIC_VERCEL_FORWARDING_EMAIL_PASS

export const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password
  }
})

export const emailOptions = {
  to: email
}
