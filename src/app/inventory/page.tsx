'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'

interface MedicationItem {
  id: string
  name: string
  category: string
  stock: number
  unit: string
  reorderPoint: number
  expiryDate: string
  manufacturer: string
}

const inventory: MedicationItem[] = [
  {
    id: 'MED-001',
    name: 'Amoxicillin 500mg',
    category: 'Antibiotics',
    stock: 500,
    unit: 'tablets',
    reorderPoint: 100,
    expiryDate: '2025-12-31',
    manufacturer: 'PharmaCorp'
  },
  {
    id: 'MED-002',
    name: 'Lisinopril 10mg',
    category: 'Blood Pressure',
    stock: 300,
    unit: 'tablets',
    reorderPoint: 50,
    expiryDate: '2025-06-30',
    manufacturer: 'MediCare'
  },
  {
    id: 'MED-003',
    name: 'Metformin 850mg',
    category: 'Diabetes',
    stock: 400,
    unit: 'tablets',
    reorderPoint: 75,
    expiryDate: '2025-09-30',
    manufacturer: 'HealthPharm'
  }
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const categories = Array.from(new Set(inventory.map(item => item.category)))

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          <PlusIcon className="h-5 w-5" />
          <span>Add Item</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Item Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Reorder Point</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Expiry Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Manufacturer</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredInventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.stock} {item.unit}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.reorderPoint} {item.unit}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.expiryDate}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.manufacturer}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.stock > item.reorderPoint
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.stock > item.reorderPoint ? 'In Stock' : 'Low Stock'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}