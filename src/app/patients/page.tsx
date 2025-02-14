'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, ChatBubbleLeftIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline'

interface Patient {
  id: string
  name: string
  testType: string
  date: string
  status: 'pending' | 'in-progress' | 'completed'
  result?: string
  reportUrl?: string
}

const patients: Patient[] = [
  {
    id: 'p-1',
    name: 'John Doe',
    testType: 'Blood Test',
    date: '2024-02-15',
    status: 'completed',
    result: 'Normal',
    reportUrl: '#'
  },
  {
    id: 'p-2',
    name: 'Jane Smith',
    testType: 'X-Ray',
    date: '2024-02-16',
    status: 'in-progress'
  },
  {
    id: 'p-3',
    name: 'Mike Johnson',
    testType: 'MRI Scan',
    date: '2024-02-17',
    status: 'pending'
  }
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.testType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Patient Tests</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Add New Test
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search patients or tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Patient Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Test Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}`}
                      alt={patient.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-900">{patient.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{patient.testType}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{patient.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    patient.status === 'completed' ? 'bg-green-100 text-green-800' :
                    patient.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button className="text-primary hover:text-primary/80" title="Chat">
                      <ChatBubbleLeftIcon className="h-5 w-5" />
                    </button>
                    <button className="text-primary hover:text-primary/80" title="View Timeline">
                      <ClockIcon className="h-5 w-5" />
                    </button>
                    {patient.status === 'completed' && (
                      <button className="text-primary hover:text-primary/80" title="View Report">
                        <DocumentTextIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}