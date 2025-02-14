export default function Loading() {
  return (
    <div className="p-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="mb-4">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-4">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}