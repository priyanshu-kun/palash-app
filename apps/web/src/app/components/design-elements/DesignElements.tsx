import React from 'react'

function DesignElements({text, className = ""}: {text: string; className: string;}) {
  return (
    <div className={`${className} flex items-center justify-center`}>
        <div className='h-12 w-12 bg-white/20 rounded-full flex items-center justify-center'>
            <div className='h-8 w-8 bg-white/40 rounded-full flex items-center justify-center'>
                <div className='h-4 w-4 bg-white/60 rounded-full'>

                </div>
            </div>
        </div>
        <span className='ml-2 text-white'>{text}</span>
    </div>
  )
}

export default DesignElements