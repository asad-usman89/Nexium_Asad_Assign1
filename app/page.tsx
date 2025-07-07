"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Quote, Sparkles, Heart, Star } from "lucide-react"

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
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!topic.trim()) return

    setIsLoading(true)

    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800))

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
    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleTopicClick = async (topicName: string) => {
    setTopic(topicName)
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 600))

    const topicQuotes = quotesData[topicName as keyof typeof quotesData]
    const shuffled = [...topicQuotes].sort(() => Math.random() - 0.5)
    setDisplayedQuotes(shuffled.slice(0, 3))
    setSearchPerformed(true)
    setIsLoading(false)
  }

  const availableTopics = Object.keys(quotesData)

  const getGradientForIndex = (index: number) => {
    const gradients = [
      "from-purple-500 via-pink-500 to-red-500",
      "from-blue-500 via-purple-500 to-pink-500",
      "from-green-500 via-blue-500 to-purple-500",
    ]
    return gradients[index % gradients.length]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-12 p-6">
        {/* Header */}
        <div className="text-center space-y-6 pt-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Quote className="w-12 h-12 text-white drop-shadow-lg" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl">
            Quote Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover inspiring quotes that spark creativity and motivation. Enter a topic and let wisdom guide your
            journey.
          </p>
        </div>

        {/* Search Form */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-white text-2xl">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Search className="w-6 h-6" />
              </div>
              Find Your Inspiration
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Explore wisdom across motivation, success, life, wisdom, technology, and leadership
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="topic" className="text-white font-medium text-lg">
                Topic
              </Label>
              <div className="flex gap-3">
                <Input
                  id="topic"
                  placeholder="e.g., motivation, success, life..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-gray-400 text-lg h-12 backdrop-blur-sm focus:bg-white/20 transition-all duration-300"
                />
                <Button
                  onClick={handleSearch}
                  disabled={!topic.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Generating...
                    </div>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Generate Quotes
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Available Topics */}
            <div className="space-y-4">
              <Label className="text-gray-300 font-medium">Popular Topics:</Label>
              <div className="flex flex-wrap gap-3">
                {availableTopics.map((topicName, index) => (
                  <Badge
                    key={topicName}
                    variant="secondary"
                    className={`cursor-pointer bg-gradient-to-r ${getGradientForIndex(index)} text-white border-0 px-4 py-2 text-sm font-medium hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                    onClick={() => handleTopicClick(topicName)}
                  >
                    {topicName}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 text-white text-xl">
              <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
              Crafting your perfect quotes...
            </div>
          </div>
        )}

        {/* Quotes Display */}
        {searchPerformed && !isLoading && (
          <div className="space-y-8 animate-in fade-in duration-1000">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-white mb-2">
                {topic ? `Quotes about "${topic}"` : "Random Inspiration"}
              </h2>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Star className="w-5 h-5 text-yellow-400" />
                <p>3 handpicked quotes to inspire your journey</p>
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-1">
              {displayedQuotes.map((quote, index) => (
                <Card
                  key={index}
                  className={`backdrop-blur-lg bg-gradient-to-br ${getGradientForIndex(index)} p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] animate-in slide-in-from-bottom-4 delay-${index * 200}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 h-full">
                    <CardContent className="p-0">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <Quote className="w-10 h-10 text-white/60 flex-shrink-0 mt-1" />
                          <blockquote className="text-xl font-medium text-white leading-relaxed flex-1">
                            &quot;{quote.text}&quot;
                          </blockquote>
                        </div>
                        <div className="flex items-center justify-between">
                          <cite className="text-white/90 font-semibold text-lg flex items-center gap-2">
                            <Heart className="w-4 h-4 text-pink-300" />— {quote.author}
                          </cite>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!searchPerformed && !isLoading && (
          <Card className="backdrop-blur-lg bg-white/5 border-white/10 shadow-2xl animate-in fade-in duration-1000">
            <CardContent className="p-16 text-center space-y-6">
              <div className="relative inline-block">
                <Quote className="w-24 h-24 text-white/30 mx-auto" />
                <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-white">Ready for Inspiration?</h3>
              <p className="text-gray-300 max-w-lg mx-auto text-lg leading-relaxed">
                Enter a topic above or click on one of the beautiful topic badges to discover quotes that will ignite
                your passion and fuel your dreams.
              </p>
              <div className="flex items-center justify-center gap-2 text-purple-300">
                <Star className="w-5 h-5" />
                <span className="font-medium">Your journey to wisdom starts here</span>
                <Star className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
