'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, DocumentTextIcon, PrinterIcon } from '@heroicons/react/24/outline'

interface Prescription {
  id: string
  patientName: string
  date: string
  doctor: string
  medications: {
    name: string
    dosage: string
    frequency: string
    duration: string
  }[]
  status: 'active' | 'completed' | 'expired'
}

const prescriptions: Prescription[] = [
  {
    id: 'RX-2024-001',
    patientName: 'Sarah Johnson',
    date: '2024-02-15',
    doctor: 'Dr. James Bond',
    medications: [
      {
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '7 days'
      }
    ],
    status: 'active'
  },
  {
    id: 'RX-2024-002',
    patientName: 'Michael Brown',
    date: '2024-02-10',
    doctor: 'Dr. Sarah Jhons',
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days'
      }
    ],
    status: 'active'
  }
]

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'expired'>('all')

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = 
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || prescription.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Prescriptions</h1>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search prescriptions..."
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
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredPrescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{prescription.patientName}</h3>
                <p className="text-sm text-gray-500">
                  Prescription ID: {prescription.id}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {prescription.date}
                </p>
                <p className="text-sm text-gray-500">
                  Doctor: {prescription.doctor}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-primary hover:bg-gray-50 rounded-full">
                  <DocumentTextIcon className="h-5 w-5" />
                </button>
                <button className="p-2 text-primary hover:bg-gray-50 rounded-full">
                  <PrinterIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Medications</h4>
              <div className="space-y-2">
                {prescription.medications.map((medication, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{medication.name}</p>
                    <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-gray-600">
                      <p>Dosage: {medication.dosage}</p>
                      <p>Frequency: {medication.frequency}</p>
                      <p>Duration: {medication.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}