'use client'

import { useState, FormEvent } from 'react'

interface TodoFormProps {
  onAdd: (text: string) => void
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      onAdd(input)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="새로운 할 일을 입력하세요..."
        className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 bg-gray-50 hover:bg-white transition-all duration-300 placeholder-gray-400 font-medium shadow-sm focus:shadow-lg"
      />
      <button
        type="submit"
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform active:scale-95"
      >
        추가
      </button>
    </form>
  )
}
