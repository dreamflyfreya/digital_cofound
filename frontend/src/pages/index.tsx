import Layout from 'components/Layout'
import MessageForm from 'components/MessageForm'
import MessagesList from 'components/MessageList'
import { MessagesProvider } from 'utils/useMessages'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const OPENAI_API_KEY = '<Replace with your actual API>' // Replace with your actual API key

function App() {
  const [prompt, setPrompt] = useState('An orange cat starts an adventure in the enchanted forest')
  const [allGeneratedImages, setAllGeneratedImages] = useState([])
  const [generatedImages, setGeneratedImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  function changeShowResult() {
    setShowResult(true)
  }

  async function generateResponse(prompt: string) {
    setIsLoading(true)

    try {
      const requestData = {
        prompt: prompt,
        n: 1,
        size: '512x512' // Set the desired image size here
      }

      // Please see https://stackoverflow.com/questions/57009371/access-to-xmlhttprequest-at-from-origin-localhost3000-has-been-blocked
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      }

      // Please replace it to the GeminiAPI endpoint.
      if (prompt.includes('Please create a cofounder')) {
        
      }
      //const response = await axios.post(
      //  'https://api.openai.com/v1/images/generations',
      //  requestData,
      //  {
      //    headers: headers
      //  }
      //)

      //const response = await axios.post(
      //  'https://api.openai.com/v1/images/generations',
      //  requestData,
      //  {
      //    headers: headers
      //  }
      //)

    } catch (error) {
      console.error('Error generating images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('I Only run once (When the component gets mounted)')
    const timer = setTimeout(() => {
      generateResponse('')
      console.log('This runs 1 second after the component is rendered')
    }, 1000) // 1000 milliseconds = 1 second

    // Cleanup function to clear the timeout if the component unmounts before the timeout is completed
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">


      <MessagesProvider>
          <div>
          <MessagesList />
          </div>
          <div className="fixed top-0 right-0 left-0">
            <MessageForm onSubmit={generateResponse} />
          </div>
      </MessagesProvider>
    </div>
  )
}

export default App
