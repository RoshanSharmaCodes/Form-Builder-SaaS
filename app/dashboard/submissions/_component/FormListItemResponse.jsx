import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function FormListItemResponse({formRecord, jsonResponse}) {
    console.log("Submission Items", formRecord)
    console.log("Json Response", jsonResponse)
  return (
    <div className="border shadow-sm rounded-lg p-4">
      <h2 className="text-lg text-black">{jsonResponse?.formTitle}</h2>
      <h2 className="text-sm text-gray-500">{jsonResponse?.formSubheading}</h2>
      <hr className="my-4"></hr>
      <div className="flex justify-between items-center">
            <h2 className='text-sm text-gray-700'><strong>45</strong> Submissions</h2>
            <Button> <Download/> Download Responses</Button>
      </div>
    </div>
  )
}
