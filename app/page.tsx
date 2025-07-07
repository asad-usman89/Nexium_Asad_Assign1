"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Quote } from "lucide-react"

// Local quotes data organized by topics
const quotesData = {
  motivation: [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  ],
  success: [
    { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
    { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  ],
  life: [
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
    {
      text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
      author: "Martin Luther King Jr.",
    },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  ],
  wisdom: [
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { text: "Yesterday is history, tomorrow is a mystery, today is a gift.", author: "Eleanor Roosevelt" },
    { text: "A wise man learns more from his enemies than a fool from his friends.", author: "Baltasar Gracián" },
    { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
    { text: "Knowledge speaks, but wisdom listens.", author: "Jimi Hendrix" },
  ],
  technology: [
    { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
    {
      text: "The advance of technology is based on making it fit in so that you don't really even notice it.",
      author: "Bill Gates",
    },
    { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
    { text: "The real problem is not whether machines think but whether men do.", author: "B.F. Skinner" },
    { text: "Technology is nothing. What's important is that you have a faith in people.", author: "Steve Jobs" },
  ],
  leadership: [
    { text: "A leader is one who knows the way, goes the way, and shows the way.", author: "John C. Maxwell" },
    { text: "The greatest leader is not necessarily the one who does the greatest things.", author: "Ronald Reagan" },
    {
      text: "Leadership is not about being in charge. It's about taking care of those in your charge.",
      author: "Simon Sinek",
    },
    {
      text: "A good leader takes a little more than his share of the blame, a little less than his share of the credit.",
      author: "Arnold H. Glasow",
    },
    { text: "Before you are a leader, success is all about growing yourself.", author: "Jack Welch" },
  ],
}

export default function Component() {
  const [topic, setTopic] = useState("")
  const [displayedQuotes, setDisplayedQuotes] = useState<Array<{ text: string; author: string }>>([])
  const [searchPerformed, setSearchPerformed] = useState(false)

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && topic.trim()) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (!topic.trim()) return

    const normalizedTopic = topic.toLowerCase().trim()

    const availableTopics = Object.keys(quotesData)

    // Find matching topic (exact match or partial match)
    let matchingTopic = availableTopics.find((t) => t === normalizedTopic)
    if (!matchingTopic) {
      matchingTopic = availableTopics.find((t) => t.includes(normalizedTopic) || normalizedTopic.includes(t))
    }

    if (matchingTopic) {
      const topicQuotes = quotesData[matchingTopic as keyof typeof quotesData]
      // Shuffle and take first 3 quotes
      const shuffled = [...topicQuotes].sort(() => Math.random() - 0.5)
      setDisplayedQuotes(shuffled.slice(0, 3))
    } else {
      // If no matching topic, show random quotes from all topics
      const allQuotes = Object.values(quotesData).flat()
      const shuffled = [...allQuotes].sort(() => Math.random() - 0.5)
      setDisplayedQuotes(shuffled.slice(0, 3))
    }

    setSearchPerformed(true)
  }

  const availableTopics = Object.keys(quotesData)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 pt-8">
          <div className="flex items-center justify-center gap-2">
            <Quote className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Quote Generator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover inspiring quotes by entering a topic.
          </p>
        </div>

        {/* Search Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Find Quotes by Topic
            </CardTitle>
            <CardDescription>
              Enter a topic to find inspiring quotes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <div className="flex gap-2">
                <Input
                  id="topic"
                  placeholder="e.g., motivation, success, life..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={!topic.trim()}>
                  <Search className="w-4 h-4 mr-2" />
                  Generate Quotes
                </Button>
              </div>

            {/* Available Topics */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Available Topics:</Label>
              <div className="flex flex-wrap gap-2">
                {availableTopics.map((topicName) => (
                  <Badge
                    key={topicName}
                    variant="secondary"
                    className="cursor-pointer hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                    onClick={() => {
                      setTopic(topicName)
                      const topicQuotes = quotesData[topicName as keyof typeof quotesData]
                      const shuffled = [...topicQuotes].sort(() => Math.random() - 0.5)
                      setDisplayedQuotes(shuffled.slice(0, 3))
                      setSearchPerformed(true)
                    }}
                  >
                    {topicName}
                  </Badge>
                ))}
              </div>
            </div>
            </div>
          </CardContent>
        </Card>

        {/* Quotes Display */}
        {searchPerformed && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Quotes {topic && `about "${topic}"`}</h2>
              <p className="text-gray-600">Here are 3 inspiring quotes for you</p>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
              {displayedQuotes.map((quote, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <Quote className="w-8 h-8 text-indigo-500 opacity-50" />
                      <blockquote className="text-lg font-medium text-gray-900 leading-relaxed">
                        &quot;{quote.text}&quot;
                      </blockquote>
                      <div className="flex items-center justify-end">
                        <cite className="text-indigo-600 font-semibold">— {quote.author}</cite>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}