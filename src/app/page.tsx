'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, DocumentTextIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface Patient {
  id: string
  name: string
  prescriptionId: string
  date: string
  status: 'pending' | 'processing' | 'ready' | 'completed'
  medications: {
    name: string
    dosage: string
    quantity: number
  }[]
}

const patients: Patient[] = [
  {
    id: 'pat-1',
    name: 'Sarah Johnson',
    prescriptionId: 'RX-2024-001',
    date: '2024-02-15',
    status: 'ready',
    medications: [
      {
        name: 'Amoxicillin',
        dosage: '500mg',
        quantity: 20
      }
    ]
  },
  {
    id: 'pat-2',
    name: 'Michael Brown',
    prescriptionId: 'RX-2024-002',
    date: '2024-02-16',
    status: 'processing',
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        quantity: 30
      }
    ]
  },
  {
    id: 'pat-3',
    name: 'Lisa Anderson',
    prescriptionId: 'RX-2024-003',
    date: '2024-02-17',
    status: 'pending',
    medications: [
      {
        name: 'Metformin',
        dosage: '850mg',
        quantity: 60
      }
    ]
  }
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'processing' | 'ready' | 'completed'>('all')

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.prescriptionId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'ready':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Patient Prescriptions</h1>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search by patient name or prescription ID"
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
          <option value="processing">Processing</option>
          <option value="ready">Ready</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Patient Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Prescription ID</th>
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
                <td className="px-6 py-4 text-sm text-gray-900">{patient.prescriptionId}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{patient.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    getStatusColor(patient.status)
                  }`}>
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      className="text-primary hover:text-primary/80" 
                      title="View Details"
                    >
                      <DocumentTextIcon className="h-5 w-5" />
                    </button>
                    <button 
                      className="text-primary hover:text-primary/80"
                      title="View History"
                    >
                      <ClockIcon className="h-5 w-5" />
                    </button>
                    {patient.status === 'ready' && (
                      <button 
                        className="text-primary hover:text-primary/80"
                        title="Mark as Completed"
                      >
                        <ArrowPathIcon className="h-5 w-5" />
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