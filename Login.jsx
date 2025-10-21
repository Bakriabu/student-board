import React, { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [mode, setMode] = useState('login')
  const nav = useNavigate()
  const [err, setErr] = useState('')

  async function submit(e){
    e.preventDefault(); setErr('')
    try{
      if(mode === 'login'){
        await signInWithEmailAndPassword(auth, email, pass)
      } else {
        await createUserWithEmailAndPassword(auth, email, pass)
      }
      nav('/')
    }catch(e){ setErr(e.message) }
  }

  async function signInWithGoogle(){
    setErr('')
    try{
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      nav('/')
    }catch(e){ setErr(e.message) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded-2xl soft-card">
        <h2 className="text-right text-xl font-semibold mb-3">{mode==='login' ? 'تسجيل الدخول' : 'إنشاء حساب'}</h2>
        {err && <div className="text-sm text-red-600 mb-2">{err}</div>}
        <label className="block text-right text-sm">البريد الإلكتروني</label>
        <input dir="ltr" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" />
        <label className="block text-right text-sm">كلمة المرور</label>
        <input dir="ltr" type="password" value={pass} onChange={e=>setPass(e.target.value)} className="w-full mb-4 p-2 border rounded" />
        <button className="w-full bg-blue-600 text-white py-2 rounded mb-2">{mode==='login' ? 'دخول' : 'إنشاء'}</button>

        <button type="button" onClick={signInWithGoogle} className="w-full bg-white border py-2 rounded mb-2 flex items-center justify-center gap-2">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google" className="w-5 h-5"/>
          <span>تسجيل الدخول عبر جوجل</span>
        </button>

        <div className="text-sm text-center text-gray-600">{mode==='login' ? 'لا تملك حساباً؟' : 'لديك حساب؟'} <button type="button" onClick={()=>setMode(mode==='login'?'signup':'login')} className="text-blue-600">اضغط هنا</button></div>
      </form>
    </div>
  )
}