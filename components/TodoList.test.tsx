import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from './TodoList'
import type { Todo } from '@/app/page'

const createMockTodo = (id: string, text: string, completed = false): Todo => ({
  id,
  text,
  completed,
  createdAt: new Date(),
})

describe('TodoList', () => {
  it('should render empty list when no todos provided', () => {
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    const { container } = render(
      <TodoList todos={[]} onToggle={mockToggle} onDelete={mockDelete} />
    )

    expect(container.querySelector('.space-y-2')).toBeInTheDocument()
  })

  it('should render all todos in the list', () => {
    const todos = [
      createMockTodo('1', 'First todo'),
      createMockTodo('2', 'Second todo'),
      createMockTodo('3', 'Third todo'),
    ]
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(<TodoList todos={todos} onToggle={mockToggle} onDelete={mockDelete} />)

    expect(screen.getByText('First todo')).toBeInTheDocument()
    expect(screen.getByText('Second todo')).toBeInTheDocument()
    expect(screen.getByText('Third todo')).toBeInTheDocument()
  })

  it('should render todos with correct completed states', () => {
    const todos = [
      createMockTodo('1', 'Completed', true),
      createMockTodo('2', 'Pending', false),
    ]
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(<TodoList todos={todos} onToggle={mockToggle} onDelete={mockDelete} />)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()
  })

  it('should call onToggle when todo checkbox is clicked', async () => {
    const todos = [createMockTodo('toggle-test', 'Toggle me')]
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const user = userEvent.setup()

    render(<TodoList todos={todos} onToggle={mockToggle} onDelete={mockDelete} />)

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(mockToggle).toHaveBeenCalledWith('toggle-test')
  })

  it('should call onDelete when delete button is clicked', async () => {
    const todos = [createMockTodo('delete-test', 'Delete me')]
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const user = userEvent.setup()

    render(<TodoList todos={todos} onToggle={mockToggle} onDelete={mockDelete} />)

    const deleteButton = screen.getByRole('button', { name: /삭제/i })
    await user.click(deleteButton)

    expect(mockDelete).toHaveBeenCalledWith('delete-test')
  })

  it('should handle large number of todos', () => {
    const todos = Array.from({ length: 100 }, (_, i) =>
      createMockTodo(String(i), `Todo ${i + 1}`)
    )
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(<TodoList todos={todos} onToggle={mockToggle} onDelete={mockDelete} />)

    expect(screen.getByText('Todo 1')).toBeInTheDocument()
    expect(screen.getByText('Todo 50')).toBeInTheDocument()
    expect(screen.getByText('Todo 100')).toBeInTheDocument()

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(100)
  })

  it('should render todos with special characters', () => {
    const todos = [
      createMockTodo('1', 'Get 🎁 for birthday'),
      createMockTodo('2', 'Learn <TypeScript>'),
      createMockTodo('3', 'Fix bug: "null" error'),
    ]
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(<TodoList todos={todos} onToggle={mockToggle} onDelete={mockDelete} />)

    expect(screen.getByText('Get 🎁 for birthday')).toBeInTheDocument()
    expect(screen.getByText('Learn <TypeScript>')).toBeInTheDocument()
    expect(screen.getByText('Fix bug: "null" error')).toBeInTheDocument()
  })

  it('should update when todos prop changes', () => {
    const initialTodos = [createMockTodo('1', 'Initial')]
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    const { rerender } = render(
      <TodoList todos={initialTodos} onToggle={mockToggle} onDelete={mockDelete} />
    )

    expect(screen.getByText('Initial')).toBeInTheDocument()

    const updatedTodos = [
      createMockTodo('1', 'Updated'),
      createMockTodo('2', 'New todo'),
    ]

    rerender(
      <TodoList todos={updatedTodos} onToggle={mockToggle} onDelete={mockDelete} />
    )

    expect(screen.getByText('Updated')).toBeInTheDocument()
    expect(screen.getByText('New todo')).toBeInTheDocument()
  })

  it('should maintain separate callback handlers for each todo', async () => {
    const todos = [
      createMockTodo('id-1', 'Todo 1'),
      createMockTodo('id-2', 'Todo 2'),
    ]
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const user = userEvent.setup()

    render(<TodoList todos={todos} onToggle={mockToggle} onDelete={mockDelete} />)

    const checkboxes = screen.getAllByRole('checkbox')
    const deleteButtons = screen.getAllByRole('button', { name: /삭제/i })

    await user.click(checkboxes[0])
    expect(mockToggle).toHaveBeenCalledWith('id-1')

    await user.click(deleteButtons[1])
    expect(mockDelete).toHaveBeenCalledWith('id-2')
  })
})
