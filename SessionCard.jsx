import React from 'react'

export default function SessionCard({ session }){
  return (
    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-xl border mb-3">
      <div className="text-right">
        <div className="font-bold">{session.title}</div>
        <div className="text-sm text-gray-500 dark:text-gray-300">{session.description}</div>
      </div>
      <img src={session.logo||'https://via.placeholder.com/80?text=شعار'} alt="logo" className="w-12 h-12 rounded-full border" />
    </div>
  )
}