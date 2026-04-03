'use client'

import { useState, useEffect } from 'react'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

type FilterType = 'all' | 'pending' | 'completed'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    setMounted(true)
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos)
        setTodos(parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        })))
      } catch (error) {
        console.error('Failed to parse todos:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, mounted])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    }
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  if (!mounted) {
    return null
  }

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed
    if (filter === 'pending') return !todo.completed
    return true
  })

  return (
    <main className="min-h-screen py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl fade-in-up">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg">
          {/* Animated Header */}
          <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 pt-10 pb-8 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
            </div>
            <div className="relative">
              <div className="text-6xl mb-3 animate-bounce" style={{ animationDelay: '0s' }}>📝</div>
              <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">My Todo</h1>
              <p className="text-white/90 text-lg font-medium">오늘 뭘 해야 할까?</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            {/* Form */}
            <div className="mb-8 slide-in">
              <TodoForm onAdd={addTodo} />
            </div>

            {/* Filters */}
            <div className="flex gap-3 justify-center mb-8">
              {['all', 'pending', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as FilterType)}
                  className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                    filter === f
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/50 scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  {f === 'all' ? '전체' : f === 'pending' ? '진행중' : '완료됨'}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border-2 border-blue-200">
                <div className="text-sm text-blue-600 font-semibold">전체</div>
                <div className="text-4xl font-bold text-blue-600 mt-1">{stats.total}</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl border-2 border-green-200">
                <div className="text-sm text-green-600 font-semibold">완료</div>
                <div className="text-4xl font-bold text-green-600 mt-1">{stats.completed}</div>
              </div>
            </div>

            {/* Todo List */}
            <div className="space-y-3 min-h-[200px]">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">✨</div>
                  <p className="text-gray-400 text-lg font-medium">
                    {todos.length === 0 ? '할일을 추가해주세요!' : '해당하는 할일이 없습니다.'}
                  </p>
                </div>
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              )}
            </div>
          </div>

          {/* Clear Completed Button */}
          {stats.completed > 0 && (
            <button
              onClick={clearCompleted}
              className="w-full bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ✨ 완료된 항목 삭제 ({stats.completed})
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
