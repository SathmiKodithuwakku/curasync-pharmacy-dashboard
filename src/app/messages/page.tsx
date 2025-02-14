'use client'

import { useState } from 'react'
import { ChatBubbleLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

interface Message {
  id: string
  sender: {
    name: string
    role: 'doctor' | 'patient'
    avatar: string
  }
  content: string
  timestamp: string
  read: boolean
}

interface Conversation {
  id: string
  doctor: {
    name: string
    specialty: string
    avatar: string
  }
  lastMessage: string
  timestamp: string
  unread: number
}

const conversations: Conversation[] = [
  {
    id: 'conv-1',
    doctor: {
      name: 'Dr. James Bond',
      specialty: 'Neurologist',
      avatar: 'https://ui-avatars.com/api/?name=James+Bond'
    },
    lastMessage: 'Your test results are ready',
    timestamp: '10:30 AM',
    unread: 2
  },
  {
    id: 'conv-2',
    doctor: {
      name: 'Dr. Sarah Jhons',
      specialty: 'Surgeon',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Jhons'
    },
    lastMessage: 'How are you feeling today?',
    timestamp: '9:15 AM',
    unread: 0
  }
]

const messages: Message[] = [
  {
    id: 'msg-1',
    sender: {
      name: 'Dr. James Bond',
      role: 'doctor',
      avatar: 'https://ui-avatars.com/api/?name=James+Bond'
    },
    content: 'Your test results are ready',
    timestamp: '10:30 AM',
    read: false
  },
  {
    id: 'msg-2',
    sender: {
      name: 'Sarah Johnson',
      role: 'patient',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson'
    },
    content: 'Thank you, doctor. Can you explain the results?',
    timestamp: '10:32 AM',
    read: true
  }
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    // Handle sending message
    setNewMessage('')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-white">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-5rem)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedConversation === conversation.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={conversation.doctor.avatar}
                  alt={conversation.doctor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium truncate">{conversation.doctor.name}</h3>
                    <span className="text-sm text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600">{conversation.doctor.specialty}</p>
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full px-2 py-1">
                    {conversation.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center space-x-3">
                <img
                  src={conversations.find(c => c.id === selectedConversation)?.doctor.avatar}
                  alt="Doctor"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">
                    {conversations.find(c => c.id === selectedConversation)?.doctor.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {conversations.find(c => c.id === selectedConversation)?.doctor.specialty}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender.role === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${
                    message.sender.role === 'patient'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  } rounded-lg px-4 py-2`}>
                    <p>{message.content}</p>
                    <p className="text-xs opacity-75 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <ChatBubbleLeftIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No conversation selected</h3>
              <p className="mt-1 text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}