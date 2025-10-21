import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useAuth } from '../auth/AuthProvider'
import { collection, getDocs, query } from 'firebase/firestore'
import SessionsList from './SessionsList'
import PlanCalendar from './PlanCalendar'
import Profile from './Profile'

export default function Dashboard(){
  const { user } = useAuth()
  const [sessions, setSessions] = useState([])

  useEffect(()=>{
    async function load(){
      const q = query(collection(db, 'sessions'))
      const snap = await getDocs(q)
      setSessions(snap.docs.map(d=>({id:d.id, ...d.data()})))
    }
    load()
    // apply dark by default
    document.documentElement.classList.add('dark')
    document.body.style.background = '#0f172a'
  },[])

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl soft-card mb-4">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">مرحبا</div>
              <div className="font-bold">{user?.email}</div>
            </div>
            <div className="flex items-center gap-3">
              <Profile />
              <button className="text-sm text-gray-600 dark:text-gray-300" onClick={()=>signOut(auth)}>تسجيل خروج</button>
            </div>
          </div>
        </div>

        <SessionsList sessions={sessions} />

        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl soft-card mt-4">
          <h3 className="text-right font-semibold mb-3">إدارة الخطة</h3>
          <PlanCalendar />
        </div>

      </div>
    </div>
  )
}