import { NextApiRequest, NextApiResponse } from 'next'

export default async function createMessage(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = req.body
  const apiKey = process.env.OPENAI_API_KEY
  // const url = 'https://api.openai.com/v1/chat/completions'

  console.log('messages: ' + messages[-1])
  var lastMessage = messages[messages.length - 1]['content']
  if (lastMessage.includes('finish')) {
    const url = 'http://localhost:61001/api/create_cofounder'

    //const body = JSON.stringify({
    //  messages,
    //  model: 'gpt-3.5-turbo',
    //  stream: false
    //})
    const body = {}

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body
      })
      // const data = await response.json()
      const content0 = await response.json()
      var content = "We have created a co-founder [Tom] for you! \n"
      var data = {
        choices: [
          {
            finish_reason: 'stop',
            index: 0,
            message: {
              content: content,
              role: 'assistant'
            },
            logprobs: null
          }
        ],
        created: 1677664795,
        id: 'chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW',
        model: 'gpt-3.5-turbo-0613',
        object: 'chat.completion',
        usage: {
          completion_tokens: 17,
          prompt_tokens: 57,
          total_tokens: 74
        }
      }

      res.status(200).json({ data })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    const url = 'http://localhost:61001/api/do_task'

    //const body = JSON.stringify({
    //  messages,
    //  model: 'gpt-3.5-turbo',
    //  stream: false
    //})
    const body = {}

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body
      })
      // const data = await response.json()
      const content = await response.json()
      // var content = "The 2020 World Series was played in Texas at Globe Life Field in Arlington."
      var data = {
        choices: [
          {
            finish_reason: 'stop',
            index: 0,
            message: {
              content: content,
              role: 'cofounder'
            },
            logprobs: null
          }
        ],
        created: 1677664795,
        id: 'chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW',
        model: 'gpt-3.5-turbo-0613',
        object: 'chat.completion',
        usage: {
          completion_tokens: 17,
          prompt_tokens: 57,
          total_tokens: 74
        }
      }

      res.status(200).json({ data })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }

  }
}
