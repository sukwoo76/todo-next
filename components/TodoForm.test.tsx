import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoForm from './TodoForm'

describe('TodoForm', () => {
  it('should render input field and add button', () => {
    const mockOnAdd = vi.fn()
    render(<TodoForm onAdd={mockOnAdd} />)

    expect(screen.getByPlaceholderText('새로운 할 일을 입력하세요...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /추가/i })).toBeInTheDocument()
  })

  it('should call onAdd with input value when form is submitted', async () => {
    const mockOnAdd = vi.fn()
    const user = userEvent.setup()
    render(<TodoForm onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const button = screen.getByRole('button', { name: /추가/i })

    await user.type(input, 'Learn Vitest')
    await user.click(button)

    expect(mockOnAdd).toHaveBeenCalledWith('Learn Vitest')
    expect(mockOnAdd).toHaveBeenCalledTimes(1)
  })

  it('should clear input field after submission', async () => {
    const mockOnAdd = vi.fn()
    const user = userEvent.setup()
    render(<TodoForm onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...') as HTMLInputElement
    const button = screen.getByRole('button', { name: /추가/i })

    await user.type(input, 'Test todo')
    await user.click(button)

    await waitFor(() => {
      expect(input.value).toBe('')
    })
  })

  it('should not call onAdd with empty input', async () => {
    const mockOnAdd = vi.fn()
    const user = userEvent.setup()
    render(<TodoForm onAdd={mockOnAdd} />)

    const button = screen.getByRole('button', { name: /추가/i })
    await user.click(button)

    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('should not call onAdd with whitespace-only input', async () => {
    const mockOnAdd = vi.fn()
    const user = userEvent.setup()
    render(<TodoForm onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const button = screen.getByRole('button', { name: /추가/i })

    await user.type(input, '   ')
    await user.click(button)

    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('should submit on Enter key press', async () => {
    const mockOnAdd = vi.fn()
    const user = userEvent.setup()
    render(<TodoForm onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')

    await user.type(input, 'Todo with Enter')
    await user.keyboard('{Enter}')

    expect(mockOnAdd).toHaveBeenCalledWith('Todo with Enter')
  })

  it('should handle very long input text', async () => {
    const mockOnAdd = vi.fn()
    const user = userEvent.setup()
    const longText = 'a'.repeat(500)

    render(<TodoForm onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const button = screen.getByRole('button', { name: /추가/i })

    await user.type(input, longText)
    await user.click(button)

    expect(mockOnAdd).toHaveBeenCalledWith(longText)
  })

  it('should trim whitespace from input', async () => {
    const mockOnAdd = vi.fn()
    const user = userEvent.setup()
    render(<TodoForm onAdd={mockOnAdd} />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const button = screen.getByRole('button', { name: /추가/i })

    await user.type(input, '  Trimmed text  ')
    await user.click(button)

    expect(mockOnAdd).toHaveBeenCalledWith('Trimmed text')
  })
})
