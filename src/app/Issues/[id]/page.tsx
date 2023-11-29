import IssueStatusBadge from '@/components/IssueStatusBadge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import prisma from '@/lib/db/prisma'
import axios from 'axios'
import { Pencil, PencilLine, Trash } from 'lucide-react'
import Link from 'next/link'
import { notFound} from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown';
import DeleteIssueBtn from '../components/DeleteIssueBtn'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssignSelect from './AssignSelect'

interface Props {
    params: {id:string}
}

const IssueDetailPage = async({params}: Props) => {
  const session = await getServerSession(authOptions)
  const issue = await prisma.issue.findUnique({
    where: {id: String(params.id)}
  })  

  if(!issue){
    console.log(issue)
    return notFound()
  }

  return (
    <div>
      <div className='max-w-4xl mx-auto m-4 p-4 space-y-2 bg-secondary rounded-md'>
        <div className='flex flex-row justify-between'>
          <h1 className='font-semibold text-2xl mr-2'>{issue.title}</h1>
          {session && <div className='flex flex-col sm:flex-row gap-2'>
            <AssignSelect issues={issue}/>
            <Button className=''>
              <PencilLine className='w-4 mr-2'/>
              <Link href={`/Issues/${issue.id}/edit`}>Accept</Link>
            </Button>
            <DeleteIssueBtn issueId={issue.id}/>
          </div>}
        </div>
        <div className='flex flex-row gap-2'>
          <IssueStatusBadge status={issue.status}/>
          <p>{issue.createdAt.toDateString()}</p>
        </div>
        <Card className='rounded-md p-2 prose'>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </div>
    </div>
  )
}

export default IssueDetailPage