import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { useAuth } from '../auth/AuthProvider'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function loadSessions() {
    const snap = await getDocs(collection(db, 'sessions'))
    setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }

  useEffect(() => { loadSessions() }, [])

  async function addSession() {
    if (!title) return
    await addDoc(collection(db, 'sessions'), { title, description, createdBy: user.uid, createdAt: new Date() })
    setTitle(''); setDescription(''); loadSessions()
  }

  async function removeSession(id) {
    await deleteDoc(doc(db, 'sessions', id))
    loadSessions()
  }

  return (
    <div className="min-h-screen p-4 bg-gray-900 text-white">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">لوحة الإدارة</h2>

        <div className="bg-gray-800 p-4 rounded-2xl soft-card mb-4">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="عنوان الحلقة" className="w-full border p-2 mb-2 rounded bg-gray-700 text-white" />
          <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="وصف" className="w-full border p-2 mb-2 rounded bg-gray-700 text-white" />
          <button onClick={addSession} className="w-full bg-blue-600 text-white py-2 rounded">إضافة حلقة</button>
        </div>

        <div>
          {sessions.map(s=>(
            <div key={s.id} className="flex justify-between bg-gray-800 border p-3 rounded mb-2">
              <div>
                <strong>{s.title}</strong>
                <div className="text-sm text-gray-400">{s.description}</div>
              </div>
              <button onClick={()=>removeSession(s.id)} className="text-red-400">حذف</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}