'use client'

import { useState } from 'react'
import { UserIcon, CalendarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

interface Doctor {
  id: string
  name: string
  specialization: string
  experience: string
  availability: string[]
  rating: number
  image: string
}

const doctors: Doctor[] = [
  {
    id: 'dr-1',
    name: 'Dr. James Bond',
    specialization: 'Neurologist',
    experience: '15 years',
    availability: ['Mon', 'Wed', 'Fri'],
    rating: 4.8,
    image: 'https://ui-avatars.com/api/?name=James+Bond'
  },
  {
    id: 'dr-2',
    name: 'Dr. Sarah Jhons',
    specialization: 'Surgeon',
    experience: '12 years',
    availability: ['Tue', 'Thu', 'Sat'],
    rating: 4.9,
    image: 'https://ui-avatars.com/api/?name=Sarah+Jhons'
  }
]

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Find a Doctor</h1>
        <div className="relative">
          <input
            type="search"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-lg">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialization}</p>
                <p className="text-sm text-gray-500">{doctor.experience} experience</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-gray-600">Available:</span>
              {doctor.availability.map((day) => (
                <span key={day} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {day}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-primary hover:bg-primary/10 rounded-full">
                  <CalendarIcon className="h-5 w-5" />
                </button>
                <button className="p-2 text-primary hover:bg-primary/10 rounded-full">
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                </button>
                <button className="p-2 text-primary hover:bg-primary/10 rounded-full">
                  <UserIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}