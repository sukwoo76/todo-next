import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './page'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Home Page', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('should render page title and description', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('My Todo')).toBeInTheDocument()
      expect(screen.getByText('오늘 뭘 해야 할까?')).toBeInTheDocument()
    })
  })

  it('should render input field and filter buttons', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('새로운 할 일을 입력하세요...')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /전체/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /진행중/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /완료됨/i })).toBeInTheDocument()
    })
  })

  it('should display empty state when no todos', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('할일을 추가해주세요!')).toBeInTheDocument()
    })
  })

  it('should add a new todo when form is submitted', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const addButton = screen.getByRole('button', { name: /추가/i })

    await user.type(input, 'New todo item')
    await user.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('New todo item')).toBeInTheDocument()
    })
  })

  it('should update stats when todo is added', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const addButton = screen.getByRole('button', { name: /추가/i })

    await user.type(input, 'Task 1')
    await user.click(addButton)

    await waitFor(() => {
      expect(screen.getByText(/전체:\s*1/)).toBeInTheDocument()
      expect(screen.getByText(/완료:\s*0/)).toBeInTheDocument()
    })
  })

  it('should toggle todo completion status', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const addButton = screen.getByRole('button', { name: /추가/i })

    await user.type(input, 'Completable todo')
    await user.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Completable todo')).toBeInTheDocument()
    })

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    await waitFor(() => {
      expect(checkbox).toBeChecked()
      expect(screen.getByText(/완료:\s*1/)).toBeInTheDocument()
    })
  })

  it('should delete a todo', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const addButton = screen.getByRole('button', { name: /추가/i })

    await user.type(input, 'Delete me')
    await user.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Delete me')).toBeInTheDocument()
    })

    const deleteButton = screen.getByRole('button', { name: /삭제/i })
    await user.click(deleteButton)

    await waitFor(() => {
      expect(screen.queryByText('Delete me')).not.toBeInTheDocument()
      expect(screen.getByText('할일을 추가해주세요!')).toBeInTheDocument()
    })
  })

  it('should filter todos by status', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const addButton = screen.getByRole('button', { name: /추가/i })

    // Add two todos
    await user.type(input, 'Pending task')
    await user.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Pending task')).toBeInTheDocument()
    })

    await user.type(input, 'Completed task')
    await user.click(addButton)

    // Complete the second todo
    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[1])

    // Click "진행중" filter
    const pendingButton = screen.getByRole('button', { name: /진행중/i })
    await user.click(pendingButton)

    await waitFor(() => {
      expect(screen.getByText('Pending task')).toBeInTheDocument()
      expect(screen.queryByText('Completed task')).not.toBeInTheDocument()
    })
  })

  it('should show clear completed button when there are completed todos', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const addButton = screen.getByRole('button', { name: /추가/i })

    await user.type(input, 'Todo to complete')
    await user.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Todo to complete')).toBeInTheDocument()
    })

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /완료된 항목 삭제/i })
      ).toBeInTheDocument()
    })
  })

  it('should clear all completed todos', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const addButton = screen.getByRole('button', { name: /추가/i })

    // Add and complete two todos
    await user.type(input, 'Complete 1')
    await user.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Complete 1')).toBeInTheDocument()
    })

    await user.type(input, 'Complete 2')
    await user.click(addButton)

    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])
    await user.click(checkboxes[1])

    const clearButton = screen.getByRole('button', { name: /완료된 항목 삭제/i })
    await user.click(clearButton)

    await waitFor(() => {
      expect(screen.queryByText('Complete 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Complete 2')).not.toBeInTheDocument()
      expect(screen.getByText('할일을 추가해주세요!')).toBeInTheDocument()
    })
  })

  it('should persist todos to localStorage', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const addButton = screen.getByRole('button', { name: /추가/i })

    await user.type(input, 'Persist me')
    await user.click(addButton)

    await waitFor(() => {
      const stored = localStorageMock.getItem('todos')
      expect(stored).toBeTruthy()
      const parsed = JSON.parse(stored || '[]')
      expect(parsed[0].text).toBe('Persist me')
    })
  })

  it('should load todos from localStorage on mount', async () => {
    const initialTodos = [
      {
        id: '1',
        text: 'Loaded todo',
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]
    localStorageMock.setItem('todos', JSON.stringify(initialTodos))

    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText('Loaded todo')).toBeInTheDocument()
    })
  })

  it('should handle multiple operations in sequence', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const addButton = screen.getByRole('button', { name: /추가/i })

    // Add 3 todos
    for (let i = 1; i <= 3; i++) {
      await user.type(input, `Task ${i}`)
      await user.click(addButton)
    }

    // Check all are present
    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
      expect(screen.getByText('Task 2')).toBeInTheDocument()
      expect(screen.getByText('Task 3')).toBeInTheDocument()
    })

    // Complete first two
    const checkboxes = screen.getAllByRole('checkbox')
    await user.click(checkboxes[0])
    await user.click(checkboxes[1])

    // Verify stats
    await waitFor(() => {
      expect(screen.getByText(/완료:\s*2/)).toBeInTheDocument()
    })

    // Filter to pending only
    const pendingButton = screen.getByRole('button', { name: /진행중/i })
    await user.click(pendingButton)

    // Should only show Task 3
    await waitFor(() => {
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument()
      expect(screen.getByText('Task 3')).toBeInTheDocument()
    })
  })

  it('should show message when filter results are empty', async () => {
    const user = userEvent.setup()
    render(<Home />)

    const input = screen.getByPlaceholderText('새로운 할 일을 입력하세요...')
    const addButton = screen.getByRole('button', { name: /추가/i })

    await user.type(input, 'Task')
    await user.click(addButton)

    // Filter to completed (no completed todos)
    const completedButton = screen.getByRole('button', { name: /완료됨/i })
    await user.click(completedButton)

    await waitFor(() => {
      expect(screen.getByText('해당하는 할일이 없습니다.')).toBeInTheDocument()
    })
  })
})
