export default function UserProfile() {
  return (
    <div className="card p-6">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl font-medium text-gray-700">MO</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Michael Obrien</h3>
        <p className="text-sm text-gray-600">London, UK</p>
        
        <div className="flex justify-center space-x-6 mt-4">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">89</p>
            <p className="text-xs text-gray-600">PHOTOS</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">354</p>
            <p className="text-xs text-gray-600">FOLLOWERS</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">945</p>
            <p className="text-xs text-gray-600">FOLLOWING</p>
          </div>
        </div>
      </div>
    </div>
  )
}
