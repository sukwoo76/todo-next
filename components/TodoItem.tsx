'use client'

import type { Todo } from '@/app/page'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 group transform hover:scale-102 ${
      todo.completed
        ? 'bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200'
        : 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg'
    }`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-6 h-6 text-purple-500 rounded-lg cursor-pointer flex-shrink-0 accent-purple-500 transition-all duration-300"
      />
      <span
        className={`flex-1 text-lg font-medium transition-all duration-300 ${
          todo.completed
            ? 'text-gray-400 line-through'
            : 'text-gray-800'
        }`}
      >
        {todo.completed ? '✓ ' : ''}{todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 font-bold text-sm shadow-md hover:shadow-lg transform active:scale-95"
      >
        삭제
      </button>
    </div>
  )
}
