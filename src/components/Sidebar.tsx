'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  UserIcon,
  ChatBubbleLeftIcon,
  BellIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div className="w-64 bg-white border-r h-screen p-4">
      <div className="flex items-center mb-8">
        <img src="/logo.svg" alt="CuraSync" className="h-8" />
        <span className="ml-2 text-xl font-semibold text-primary">CuraSync</span>
      </div>
      
      <nav className="space-y-4">
        <Link 
          href="/" 
          className={`flex items-center space-x-3 p-2 rounded-lg ${
            isActive('/') 
              ? 'bg-primary text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <UserIcon className="h-6 w-6" />
          <span>Patients</span>
        </Link>

        <Link 
          href="/prescriptions" 
          className={`flex items-center space-x-3 p-2 rounded-lg ${
            isActive('/prescriptions') 
              ? 'bg-primary text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <DocumentTextIcon className="h-6 w-6" />
          <span>Prescriptions</span>
        </Link>

        <Link 
          href="/inventory" 
          className={`flex items-center space-x-3 p-2 rounded-lg ${
            isActive('/inventory') 
              ? 'bg-primary text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ClipboardDocumentListIcon className="h-6 w-6" />
          <span>Inventory</span>
        </Link>

        <Link 
          href="/messages" 
          className={`flex items-center space-x-3 p-2 rounded-lg ${
            isActive('/messages') 
              ? 'bg-primary text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
          <span>Messages</span>
        </Link>

        <Link 
          href="/notifications" 
          className={`flex items-center space-x-3 p-2 rounded-lg ${
            isActive('/notifications') 
              ? 'bg-primary text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <BellIcon className="h-6 w-6" />
          <span>Notifications</span>
        </Link>

        <Link 
          href="/settings" 
          className={`flex items-center space-x-3 p-2 rounded-lg ${
            isActive('/settings') 
              ? 'bg-primary text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Cog6ToothIcon className="h-6 w-6" />
          <span>Settings</span>
        </Link>
      </nav>

      <div className="absolute bottom-4 flex items-center space-x-3 p-4">
        <img
          src="https://ui-avatars.com/api/?name=City+Pharmacy"
          className="h-10 w-10 rounded-full"
          alt="Pharmacy profile"
        />
        <div>
          <p className="font-medium">City Pharmacy</p>
          <p className="text-sm text-gray-500">License: PH-12345</p>
        </div>
      </div>
    </div>
  )
}