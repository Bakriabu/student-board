import React, { useState, useEffect } from 'react'
import { auth, storage, db } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useAuth } from '../auth/AuthProvider'

export default function Profile(){
  const { user } = useAuth()
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(()=>{
    async function load(){
      try{
        const snap = await getDoc(doc(db, 'users', user.uid))
        if(snap.exists()) setAvatarUrl(snap.data().avatar)
      }catch(e){}
    }
    if(user) load()
  },[user])

  async function onFile(e){
    const file = e.target.files[0]
    if(!file) return
    setUploading(true)
    try{
      const storageRef = ref(storage, `avatars/${user.uid}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      await setDoc(doc(db, 'users', user.uid), { avatar: url, email: user.email }, { merge: true })
      setAvatarUrl(url)
    }catch(err){
      alert('فشل رفع الصورة: '+ err.message)
    }finally{ setUploading(false) }
  }

  return (
    <div className="flex items-center gap-3">
      <label className="w-10 h-10 rounded-full overflow-hidden border">
        <img src={avatarUrl||'https://via.placeholder.com/80?text=صورة'} alt="avatar" className="w-full h-full object-cover"/>
        <input onChange={onFile} type="file" accept="image/*" className="hidden" />
      </label>
    </div>
  )
}