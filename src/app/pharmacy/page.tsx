'use client'

import { useState } from 'react'
import { ClipboardDocumentListIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface Prescription {
  id: string
  date: string
  doctor: string
  medications: {
    name: string
    dosage: string
    frequency: string
    duration: string
  }[]
  status: 'active' | 'completed' | 'pending'
}

const prescriptions: Prescription[] = [
  {
    id: 'rx-1',
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
    id: 'rx-2',
    date: '2024-02-10',
    doctor: 'Dr. Sarah Jhons',
    medications: [
      {
        name: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'As needed',
        duration: '5 days'
      }
    ],
    status: 'completed'
  }
]

export default function PharmacyPage() {
  const [activeTab, setActiveTab] = useState<'prescriptions' | 'orders'>('prescriptions')

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pharmacy</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Order Medications
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'prescriptions'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('prescriptions')}
            >
              Prescriptions
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'orders'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'prescriptions' ? (
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">Prescription #{prescription.id}</h3>
                      <p className="text-sm text-gray-500">
                        {prescription.date} • {prescription.doctor}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      prescription.status === 'active' ? 'bg-green-100 text-green-800' :
                      prescription.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {prescription.medications.map((medication, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <div>
                          <p className="font-medium">{medication.name}</p>
                          <p className="text-sm text-gray-600">
                            {medication.dosage} • {medication.frequency} • {medication.duration}
                          </p>
                        </div>
                        {prescription.status === 'active' && (
                          <button className="flex items-center space-x-1 text-primary hover:text-primary/80">
                            <ArrowPathIcon className="h-4 w-4" />
                            <span className="text-sm">Refill</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">Medication Orders</h3>
              <p className="mt-2 text-sm text-gray-500">
                Coming soon - Track your medication orders and deliveries
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}