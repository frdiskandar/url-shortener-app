import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormUrl from './Form'

// Mock the global fetch API
global.fetch = vi.fn()

describe('FormUrl component', () => {
  const mockOnSuccess = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('enables submit when a valid URL is entered and calls the API with user_id=1', async () => {
    // Mock successful POST response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ shortUrl: 'abc123' }),
    })

    render(<FormUrl onSuccess={mockOnSuccess} />)

    const input = screen.getByPlaceholderText('https://') as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: /submit!/i })

    // Initially the button should be disabled because the field is empty
    expect(submitButton).toBeDisabled()

    // Type a valid URL
    await userEvent.type(input, 'https://example.com')

    // The button should become enabled
    await waitFor(() => expect(submitButton).toBeEnabled())

    // Click submit
    await userEvent.click(submitButton)

    // Verify fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledTimes(1)
    const [url, options] = (global.fetch as jest.Mock).mock.calls[0]
    expect(url).toBe('http://localhost:3030/shorted')
    expect(options?.method).toBe('POST')
    expect(options?.headers?.['Content-Type']).toBe('application/json')
    const body = JSON.parse(options?.body as string)
    expect(body).toMatchObject({
      url: 'https://example.com',
      user_id: 1,
    })

    // onSuccess callback should be invoked after a successful response
    await waitFor(() => expect(mockOnSuccess).toHaveBeenCalled())
  })

  it('shows validation error for non‑HTTPS URLs and keeps submit disabled', async () => {
    render(<FormUrl />)

    const input = screen.getByPlaceholderText('https://') as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: /submit!/i })

    // Type an invalid URL
    await userEvent.type(input, 'ftp://example.com')

    // Validation message should appear
    expect(screen.getByText(/must be https:///i)).toBeInTheDocument()
    // Submit remains disabled
    expect(submitButton).toBeDisabled()
  })
})
