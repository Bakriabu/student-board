import React, {useState} from 'react'
import { motion } from 'framer-motion'

export default function App(){
  const [lang, setLang] = useState('ar') // 'ar' or 'en'
  const isAr = lang === 'ar'
  return (
    <div className={`min-h-screen ${isAr ? 'rtl' : 'ltr'}`}>
      <div className="min-h-screen bg-deep text-gray-100 flex items-center justify-center p-6">
        <main className="max-w-3xl w-full">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">حلقتي</h1>
              <p className="text-sm text-gray-400">A place that connects values and knowledge</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={()=>setLang(isAr ? 'en' : 'ar') } className="bg-white/6 hover:bg-white/10 px-3 py-1 rounded">
                {isAr ? 'EN' : 'ع'}
              </button>
            </div>
          </header>

          <motion.section initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="card bg-black/30 p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-3">{isAr ? 'مكان يجمع القيم والمعرفة' : 'A place that connects values and knowledge'}</h2>
            <p className="text-gray-300 leading-relaxed">
              {isAr
                ? 'حلقتي تهدف إلى تقديم محتوى تعليمي ودعوي موجه لجميع الأعمار، يمزج بين العلم والدين والقيم الاجتماعية.'
                : 'Halaqti aims to provide educational and value-based content for all ages, blending science, faith and social values.'}
            </p>
          </motion.section>

          <motion.section initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.8}} className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="card bg-black/30 p-6 rounded-2xl">
              <h3 className="font-semibold mb-2">{isAr ? 'أهدافنا' : 'Our Goals'}</h3>
              <ul className="text-gray-300 list-disc list-inside">
                <li>{isAr ? 'نشر الوعي الثقافي والديني' : 'Spread cultural and religious awareness'}</li>
                <li>{isAr ? 'تقديم محتوى علمي مبسط' : 'Deliver easy-to-understand scientific content'}</li>
                <li>{isAr ? 'تشجيع النقاش الأخلاقي البناء' : 'Encourage constructive ethical discussions'}</li>
              </ul>
            </div>

            <div className="card bg-black/30 p-6 rounded-2xl">
              <h3 className="font-semibold mb-2">{isAr ? 'تواصل معنا' : 'Contact'}</h3>
              <form onSubmit={(e)=>{e.preventDefault(); alert(isAr? 'تم إرسال الرسالة!':'Message sent!')}} className="space-y-3">
                <input placeholder={isAr ? 'الاسم' : 'Name'} className="w-full p-2 rounded bg-white/5 text-gray-100" />
                <input placeholder={isAr ? 'البريد الإلكتروني' : 'Email'} className="w-full p-2 rounded bg-white/5 text-gray-100" />
                <textarea placeholder={isAr ? 'الرسالة' : 'Message'} className="w-full p-2 rounded bg-white/5 text-gray-100" rows="4"></textarea>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded text-white">{isAr ? 'أرسل' : 'Send'}</button>
              </form>
            </div>
          </motion.section>

          <footer className="text-center text-gray-500 mt-8">
            © {new Date().getFullYear()} حلقتي — Halaqti
          </footer>
        </main>
      </div>
    </div>
  )
}
