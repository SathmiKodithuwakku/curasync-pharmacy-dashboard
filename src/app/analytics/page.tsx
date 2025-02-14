'use client'

import { useState } from 'react'
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  UserGroupIcon,
  ClockIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline'

interface TestMetrics {
  totalTests: number
  completedTests: number
  pendingTests: number
  abnormalResults: number
  testTypes: {
    name: string
    count: number
    trend: 'up' | 'down'
    percentage: number
  }[]
  recentActivity: {
    id: string
    type: string
    description: string
    timestamp: string
  }[]
}

const metrics: TestMetrics = {
  totalTests: 1250,
  completedTests: 980,
  pendingTests: 270,
  abnormalResults: 85,
  testTypes: [
    {
      name: 'Blood Tests',
      count: 450,
      trend: 'up',
      percentage: 15
    },
    {
      name: 'X-Rays',
      count: 280,
      trend: 'down',
      percentage: 8
    },
    {
      name: 'MRI Scans',
      count: 175,
      trend: 'up',
      percentage: 12
    },
    {
      name: 'CT Scans',
      count: 145,
      trend: 'up',
      percentage: 5
    }
  ],
  recentActivity: [
    {
      id: 'act-1',
      type: 'Test Completed',
      description: 'Blood test results for John Doe have been processed',
      timestamp: '2024-02-17T10:30:00Z'
    },
    {
      id: 'act-2',
      type: 'New Test',
      description: 'MRI scan scheduled for Jane Smith',
      timestamp: '2024-02-17T09:15:00Z'
    },
    {
      id: 'act-3',
      type: 'Abnormal Result',
      description: 'Critical values detected in blood work for Mike Johnson',
      timestamp: '2024-02-17T08:45:00Z'
    }
  ]
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week')

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tests</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalTests}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Tests</p>
              <p className="text-2xl font-bold text-green-600">{metrics.completedTests}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Tests</p>
              <p className="text-2xl font-bold text-yellow-600">{metrics.pendingTests}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Abnormal Results</p>
              <p className="text-2xl font-bold text-red-600">{metrics.abnormalResults}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Types Distribution */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Test Types Distribution</h2>
          <div className="space-y-4">
            {metrics.testTypes.map((type) => (
              <div key={type.name} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{type.name}</span>
                    <span className="text-sm text-gray-600">{type.count} tests</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${type.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 flex items-center">
                  {type.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-5 w-5 text-red-500" />
                  )}
                  <span className={`ml-1 text-sm ${
                    type.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {type.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {metrics.recentActivity.map((activity) => (
              <div key={activity.id} className="border-l-4 border-primary pl-4 py-2">
                <p className="font-medium text-sm">{activity.type}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTimestamp(activity.timestamp)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}