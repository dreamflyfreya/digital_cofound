import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi, ImagesResponseDataInner } from 'openai'
import { createReadStream } from 'fs'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

type Data = {
  result: ImagesResponseDataInner[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { fileName, maskFileName, prompt, n, size } = req.body
  const result = await openai.createImageEdit(
    createReadStream(fileName) as unknown as File,
    createReadStream(maskFileName) as unknown as File,
    prompt,
    n,
    size
  )
  res.status(200).json({ result: result.data.data })
}
