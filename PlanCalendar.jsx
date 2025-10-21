import React, { useRef, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'

export default function PlanCalendar(){
  const calendarRef = useRef(null)
  const [start, setStart] = useState(dayjs('2025-09-23'))
  const [end, setEnd] = useState(dayjs('2025-10-23'))
  const events = [
    { title: 'حصة مراجعة', start: '2025-10-20' },
    { title: 'اختبار', start: '2025-10-23' }
  ]

  useEffect(()=>{},[])

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}}>
      <div className="mb-4">
        <button className="w-full border border-blue-200 text-blue-700 dark:text-blue-300 dark:border-blue-700 py-2 rounded-xl">الخطة قيد المراجعة</button>
      </div>

      <div className="rounded-xl bg-white dark:bg-gray-900 p-3 soft-card">
        <div className="text-center font-semibold mb-3">{start.format('MMMM YYYY')}</div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height={400}
          events={events}
          ref={calendarRef}
          dir="rtl"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-center">تاريخ البدء<br/><strong>{start.format('D MMMM YYYY')}</strong></div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-center">تاريخ الانتهاء<br/><strong>{end.format('D MMMM YYYY')}</strong></div>
      </div>
    </motion.div>
  )
}