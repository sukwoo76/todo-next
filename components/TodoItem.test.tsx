import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from './TodoItem'
import type { Todo } from '@/app/page'

const createMockTodo = (overrides?: Partial<Todo>): Todo => ({
  id: '1',
  text: 'Test todo',
  completed: false,
  createdAt: new Date(),
  ...overrides,
})

describe('TodoItem', () => {
  it('should render todo text', () => {
    const todo = createMockTodo({ text: 'My Test Todo' })
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)

    expect(screen.getByText('My Test Todo')).toBeInTheDocument()
  })

  it('should render checkbox with correct initial state', () => {
    const todo = createMockTodo({ completed: false })
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('should render checked checkbox for completed todo', () => {
    const todo = createMockTodo({ completed: true })
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('should call onToggle when checkbox is clicked', async () => {
    const todo = createMockTodo({ id: 'test-id-123' })
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const user = userEvent.setup()

    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(mockToggle).toHaveBeenCalledWith('test-id-123')
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it('should apply strikethrough style when completed', () => {
    const todo = createMockTodo({ completed: true })
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)

    const todoText = screen.getByText('Test todo')
    expect(todoText).toHaveClass('line-through')
  })

  it('should not apply strikethrough style when not completed', () => {
    const todo = createMockTodo({ completed: false })
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)

    const todoText = screen.getByText('Test todo')
    expect(todoText).not.toHaveClass('line-through')
  })

  it('should call onDelete with correct id when delete button is clicked', async () => {
    const todo = createMockTodo({ id: 'delete-test-id' })
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const user = userEvent.setup()

    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)

    const deleteButton = screen.getByRole('button', { name: /삭제/i })
    await user.click(deleteButton)

    expect(mockDelete).toHaveBeenCalledWith('delete-test-id')
    expect(mockDelete).toHaveBeenCalledTimes(1)
  })

  it('should render checkmark when todo is completed', () => {
    const todo = createMockTodo({ completed: true, text: 'Completed task' })
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)

    expect(screen.getByText(/✓ Completed task/)).toBeInTheDocument()
  })

  it('should not render checkmark when todo is not completed', () => {
    const todo = createMockTodo({ completed: false, text: 'Pending task' })
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)

    expect(screen.queryByText(/✓ Pending task/)).not.toBeInTheDocument()
  })

  it('should handle multiple callbacks independently', async () => {
    const todo = createMockTodo({ id: 'multi-test' })
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()
    const user = userEvent.setup()

    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)

    const checkbox = screen.getByRole('checkbox')
    const deleteButton = screen.getByRole('button', { name: /삭제/i })

    await user.click(checkbox)
    expect(mockToggle).toHaveBeenCalledWith('multi-test')
    expect(mockDelete).not.toHaveBeenCalled()

    await user.click(deleteButton)
    expect(mockDelete).toHaveBeenCalledWith('multi-test')
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it('should render with special characters in text', () => {
    const todo = createMockTodo({ text: 'Buy milk & bread @ store!' })
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />)

    expect(screen.getByText('Buy milk & bread @ store!')).toBeInTheDocument()
  })
})
