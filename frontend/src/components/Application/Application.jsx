import React from 'react'

function Application() {
  return (
    <div>
        <h1 className='text-3xl font-bold text-center mt-10'>Application Page</h1>
        <p className='text-center mt-4 text-gray-600'>This is where users can apply for jobs.</p>
         <div className="flex items-center justify-center mt-10">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
            Apply Now
          </button>
        </div>

                        
    </div>
  )
}

export default Application