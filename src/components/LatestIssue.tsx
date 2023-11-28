import { Status } from '@prisma/client'
import React from 'react'
import { Card } from './ui/card'
import Link from 'next/link'


interface Props {
    open: number,
    inProgress: number,
    closed: number
}

const LatestIssue = ({open, inProgress,closed}: Props) => {
    const containers: {label:string, value: number, status: Status}[] = [
        {label: 'Open Issues', value:open, status:'OPEN'},
        {label: 'In-Progress Issues', value:inProgress, status:'IN_PROGRESS'},
        {label: 'Closed Issues', value:closed, status:'CLOSED'}
    ]
  return (
    <div className='flex flex-row gap-4'>
        {containers.map(container=>(
            <Card key={container.label}>
                <div className='flex flex-col p-4'>
                    <Link href={`/Issues?status=${container.status}`}><p className='text-sm'>{container.label}</p></Link>
                    <h1 className=' text-lg font-bold'>{container.value}</h1>
                </div>
            </Card>
        ))}
    </div>
  )
}

export default LatestIssue