import Link from 'next/link'
import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-white border-b">
      <div className="flex space-x-4">
        <Link href="/" className="text-gray-600 hover:text-primary">Home</Link>
        <Link href="/about" className="text-gray-600 hover:text-primary">About Us</Link>
        <Link href="/services" className="text-gray-600 hover:text-primary">Our Services</Link>
        <Link href="/contact" className="text-gray-600 hover:text-primary">Contact</Link>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-primary">
          <BellIcon className="h-6 w-6" />
        </button>
        <button className="text-gray-600 hover:text-primary">
          <Cog6ToothIcon className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://ui-avatars.com/api/?name=Pharmacy"
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
          <span className="text-gray-700">Pharmacy</span>
        </div>
      </div>
    </div>
  )
}