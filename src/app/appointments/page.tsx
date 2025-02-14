'use client'

import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { CalendarIcon, ClockIcon, VideoCameraIcon } from '@heroicons/react/24/outline'

interface Appointment {
  id: string
  doctorName: string
  doctorSpecialty: string
  date: string
  time: string
  type: 'in-person' | 'video'
  status: 'upcoming' | 'completed' | 'cancelled'
}

const appointments: Appointment[] = [
  {
    id: 'apt-1',
    doctorName: 'Dr. James Bond',
    doctorSpecialty: 'Neurologist',
    date: '2024-02-25',
    time: '10:00',
    type: 'in-person',
    status: 'upcoming'
  },
  {
    id: 'apt-2',
    doctorName: 'Dr. Sarah Jhons',
    doctorSpecialty: 'Surgeon',
    date: '2024-02-20',
    time: '14:30',
    type: 'video',
    status: 'upcoming'
  },
  {
    id: 'apt-3',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialty: 'Cardiologist',
    date: '2024-02-15',
    time: '11:00',
    type: 'in-person',
    status: 'completed'
  }
]

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  const filteredAppointments = appointments.filter(apt => 
    activeTab === 'upcoming' 
      ? apt.status === 'upcoming'
      : apt.status === 'completed' || apt.status === 'cancelled'
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Book New Appointment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'upcoming'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Appointments
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'past'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('past')}
            >
              Past Appointments
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${
                      appointment.type === 'video' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {appointment.type === 'video' ? (
                        <VideoCameraIcon className="h-6 w-6 text-blue-600" />
                      ) : (
                        <CalendarIcon className="h-6 w-6 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{appointment.doctorName}</h3>
                      <p className="text-sm text-gray-500">{appointment.doctorSpecialty}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {format(parseISO(appointment.date), 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                    {appointment.status === 'upcoming' && (
                      <div className="mt-4 space-x-2">
                        {appointment.type === 'video' && (
                          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90">
                            Join Video Call
                          </button>
                        )}
                        <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
                          Reschedule
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}