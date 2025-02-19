import React from 'react'

export function Card({children, className = ""}: {children: Element; className: string;}) {
  return (
    <div className='w-80 h-full bg-white border-2 border-black'>Card</div>
  )
}
