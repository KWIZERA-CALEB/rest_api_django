import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SingleTodo = () => {
    const { id } = useParams()
  return (
    <div>
      Single Todo
    </div>
  )
}

export default SingleTodo
