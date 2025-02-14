'use client'

import { useState } from 'react'
import { BeakerIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'

interface LabTest {
  id: string
  name: string
  date: string
  status: 'completed' | 'pending' | 'processing'
  result?: string
  reportUrl?: string
}

const labTests: LabTest[] = [
  {
    id: 'test-1',
    name: 'Complete Blood Count',
    date: '2024-02-15',
    status: 'completed',
    result: 'Normal',
    reportUrl: '#'
  },
  {
    id: 'test-2',
    name: 'Lipid Profile',
    date: '2024-02-10',
    status: 'completed',
    result: 'Normal',
    reportUrl: '#'
  },
  {
    id: 'test-3',
    name: 'Blood Glucose',
    date: '2024-02-20',
    status: 'pending'
  }
]

export default function LabPage() {
  const [activeTab, setActiveTab] = useState<'results' | 'schedule'>('results')

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Laboratory</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Schedule New Test
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'results'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('results')}
            >
              Test Results
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'schedule'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('schedule')}
            >
              Schedule Test
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'results' ? (
            <div className="space-y-4">
              {labTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BeakerIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{test.name}</h3>
                      <p className="text-sm text-gray-500">{test.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      test.status === 'completed' ? 'bg-green-100 text-green-800' :
                      test.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                    </span>
                    {test.reportUrl && (
                      <button className="p-2 text-gray-600 hover:text-primary">
                        <DocumentArrowDownIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">Schedule a New Test</h3>
              <p className="mt-2 text-sm text-gray-500">
                Coming soon - Schedule your laboratory tests online
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}