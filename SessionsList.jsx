import React from 'react'
import SessionCard from './SessionCard'

export default function SessionsList({ sessions }){
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl soft-card">
      <h3 className="text-right font-semibold mb-3">الحلقات المنضم إليها</h3>
      {sessions.length===0 ? (
        <div className="text-right text-gray-500 dark:text-gray-400">أنت لست منضمًا لأي حلقة حتى الآن.</div>
      ) : (
        sessions.map(s=> <SessionCard key={s.id} session={s} />)
      )}
    </div>
  )
}