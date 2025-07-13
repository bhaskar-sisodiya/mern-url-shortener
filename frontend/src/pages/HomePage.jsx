import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-100  flex flex-col justify-center items-center p-4 -mt-32">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
            <UrlForm />
      </div>
    </div>
  )
}

export default HomePage