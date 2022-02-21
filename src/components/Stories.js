import React from 'react'
import AddStory from './AddStory'
import Story from './Story'

export default function Stories() {
  return (
    <div className='flex space-x-4 p-4 pt-16 overflow-x-??? border-b'>
        <AddStory/>
        <Story seen={true}/>
        <Story/>
        <Story/>
        <Story/>
        <Story/>

    </div>
  )
}
