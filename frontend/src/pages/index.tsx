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

  async function generateImages(imagePrompt: string) {
    setIsLoading(true)

    var usedImagePrompt = imagePrompt || prompt
    usedImagePrompt = usedImagePrompt + '. Please use cartoon style for the image.'
    console.log('usedImagePrompt: ', usedImagePrompt)

    try {
      const requestData = {
        prompt: usedImagePrompt,
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

      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        requestData,
        {
          headers: headers
        }
      )

      setGeneratedImages(response.data.data)
      setAllGeneratedImages([...allGeneratedImages, ...response.data.data])
    } catch (error) {
      console.error('Error generating images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('I Only run once (When the component gets mounted)')
    const timer = setTimeout(() => {
      generateImages('')
      console.log('This runs 1 second after the component is rendered')
    }, 1000) // 1000 milliseconds = 1 second

    // Cleanup function to clear the timeout if the component unmounts before the timeout is completed
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

      {isLoading && <p className="mt-4 text-gray-600">Loading...</p>}
      {generatedImages.length > 0 && !showResult && (
        <div className="mt-4">
          {generatedImages.map((image, index) => (
            <div key={index} className="mt-4">
              <img
                src={image.url}
                alt={`Generated Image ${index}`}
                style={{ maxWidth: '90%', height: 'auto', maxHeight: '50%' }}
              />
            </div>
          ))}
        </div>
      )}


      <button
        onClick={generateImages}
        disabled={isLoading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isLoading ? 'Generating...' : 'Generate Images'}
      </button>

      {allGeneratedImages.length > 0 && showResult && 'Full Story'}
      {allGeneratedImages.length > 0 && showResult && (
        <div className="mt-4">
          {allGeneratedImages.map((image, index) => (
            <div key={index} className="mt-4">
              <img
                src={image.url}
                alt={`Generated Image ${index}`}
                style={{ maxWidth: '90%', height: 'auto', maxHeight: '50%' }}
              />
            </div>
          ))}
        </div>
      )}

      <button
        onClick={changeShowResult}
        disabled={isLoading}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {'Show Full Story'}
      </button>


      <MessagesProvider>
        <Layout>
          <MessagesList />
          <div className="fixed top-0 right-0 left-0">
            <MessageForm onSubmit={generateImages} />
          </div>
        </Layout>
      </MessagesProvider>
    </div>
  )
}

export default App
