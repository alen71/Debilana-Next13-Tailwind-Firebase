// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { data } from 'autoprefixer'
import type { NextApiRequest, NextApiResponse } from 'next'
import { emailOptions, transporter } from '../../config/nodemailer'

type Data = {
  message: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const data = req.body

    try {
      await transporter.sendMail({
        ...emailOptions,
        subject: 'Debilana Info',
        text: data,
        html: `<a href='https://www.debilana.info/admin-page'>${data}</a>`
      })

      res.status(200).json({ message: 'Success!' })
    } catch (error: any) {
      console.log(error)
      return res.status(400).json({ message: error.message as string })
    }
  }
  res.status(400).json({ message: 'Bad Request' })
}

export default handler
