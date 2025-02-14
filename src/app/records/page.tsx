'use client'

import { useState } from 'react'
import { DocumentTextIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'

interface MedicalRecord {
  id: string
  title: string
  date: string
  type: 'report' | 'prescription' | 'test' | 'imaging'
  doctor: string
  description: string
  fileUrl?: string
}

const records: MedicalRecord[] = [
  {
    id: 'rec-1',
    title: 'Annual Physical Examination',
    date: '2024-02-15',
    type: 'report',
    doctor: 'Dr. James Bond',
    description: 'Complete physical examination report with blood work results',
    fileUrl: '#'
  },
  {
    id: 'rec-2',
    title: 'X-Ray Results',
    date: '2024-02-10',
    type: 'imaging',
    doctor: 'Dr. Sarah Jhons',
    description: 'Chest X-ray imaging results',
    fileUrl: '#'
  },
  {
    id: 'rec-3',
    title: 'Prescription History',
    date: '2024-02-05',
    type: 'prescription',
    doctor: 'Dr. Michael Chen',
    description: 'Complete medication history and current prescriptions',
    fileUrl: '#'
  }
]

export default function RecordsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || record.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Medical Records</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Types</option>
            <option value="report">Reports</option>
            <option value="prescription">Prescriptions</option>
            <option value="test">Test Results</option>
            <option value="imaging">Imaging</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    record.type === 'report' ? 'bg-blue-100' :
                    record.type === 'prescription' ? 'bg-green-100' :
                    record.type === 'test' ? 'bg-yellow-100' :
                    'bg-purple-100'
                  }`}>
                    <DocumentTextIcon className={`h-6 w-6 ${
                      record.type === 'report' ? 'text-blue-600' :
                      record.type === 'prescription' ? 'text-green-600' :
                      record.type === 'test' ? 'text-yellow-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{record.title}</h3>
                    <p className="text-sm text-gray-500">{record.date} • {record.doctor}</p>
                    <p className="text-sm text-gray-600 mt-1">{record.description}</p>
                  </div>
                </div>
                {record.fileUrl && (
                  <button className="flex items-center space-x-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg">
                    <DocumentArrowDownIcon className="h-5 w-5" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}