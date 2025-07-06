"use client"

import type React from "react"
import { useState } from "react"

export default function Component() {
  const [topic, setTopic] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl font-bold text-gray-900">Quote Generator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover inspiring quotes by entering a topic.
          </p>
        </div>
      </div>
    </div>
  )
}