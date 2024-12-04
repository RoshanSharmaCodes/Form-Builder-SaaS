import { Button } from '@/components/ui/button'
import React from 'react'
import CreateForm from './_component/CreateForm'

export default function page() {
  return (
    <div className='p-10 flex items-center justify-between'>
      <h2 className='font-bold text-3xl'>Dashboard</h2>
      <CreateForm/>
    </div>
  )
}
