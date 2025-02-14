'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

interface Laboratory {
  id: string
  name: string
  labName: string
  district: string
  contactNo: string
}

const laboratories: Laboratory[] = [
  {
    id: 'lab-1',
    name: 'KLP Prasad',
    labName: 'A & A Pharmacy',
    district: 'Colombo',
    contactNo: '0713300238'
  },
  {
    id: 'lab-2',
    name: 'KLP Prasad',
    labName: 'A & A Pharmacy',
    district: 'Colombo',
    contactNo: '0713300238'
  },
  {
    id: 'lab-3',
    name: 'KLP Prasad',
    labName: 'A & A Pharmacy',
    district: 'Colombo',
    contactNo: '0713300238'
  }
]

export default function LabsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-96">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search to find Lab"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Add
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name of the Lab</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Lab Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">District</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Contact No</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Messaging</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {laboratories.map((lab) => (
              <tr key={lab.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{lab.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{lab.labName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{lab.district}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{lab.contactNo}</td>
                <td className="px-6 py-4">
                  <button className="text-primary hover:text-primary/80">
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}