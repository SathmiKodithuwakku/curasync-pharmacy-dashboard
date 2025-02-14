'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, DocumentArrowDownIcon, EyeIcon } from '@heroicons/react/24/outline'

interface TestReport {
  id: string
  patientName: string
  testType: string
  date: string
  doctor: string
  status: 'normal' | 'abnormal' | 'critical'
  reportUrl: string
}

const reports: TestReport[] = [
  {
    id: 'r-1',
    patientName: 'John Doe',
    testType: 'Complete Blood Count',
    date: '2024-02-15',
    doctor: 'Dr. James Bond',
    status: 'normal',
    reportUrl: '#'
  },
  {
    id: 'r-2',
    patientName: 'Jane Smith',
    testType: 'Lipid Profile',
    date: '2024-02-16',
    doctor: 'Dr. Sarah Jhons',
    status: 'abnormal',
    reportUrl: '#'
  },
  {
    id: 'r-3',
    patientName: 'Mike Johnson',
    testType: 'Blood Glucose',
    date: '2024-02-17',
    doctor: 'Dr. Michael Chen',
    status: 'critical',
    reportUrl: '#'
  }
]

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'normal' | 'abnormal' | 'critical'>('all')
  const [showReportModal, setShowReportModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<TestReport | null>(null)

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleViewReport = (report: TestReport) => {
    setSelectedReport(report)
    setShowReportModal(true)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Test Reports</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Generate New Report
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search reports..."
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
          <option value="all">All Results</option>
          <option value="normal">Normal</option>
          <option value="abnormal">Abnormal</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Patient Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Test Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Doctor</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(report.patientName)}`}
                      alt={report.patientName}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-900">{report.patientName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{report.testType}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{report.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{report.doctor}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    report.status === 'normal' ? 'bg-green-100 text-green-800' :
                    report.status === 'abnormal' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleViewReport(report)}
                      className="text-primary hover:text-primary/80" 
                      title="View Report"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <a
                      href={report.reportUrl}
                      download
                      className="text-primary hover:text-primary/80"
                      title="Download Report"
                    >
                      <DocumentArrowDownIcon className="h-5 w-5" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report View Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">{selectedReport.testType} Report</h3>
                <p className="text-sm text-gray-500">Patient: {selectedReport.patientName}</p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>
            <div className="flex-1 p-4">
              <iframe
                src={selectedReport.reportUrl}
                className="w-full h-full rounded border"
                title={`${selectedReport.testType} Report`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}