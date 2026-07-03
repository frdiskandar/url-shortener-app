import { getShorteners } from './handler'
import { ServiceGetShortener } from './service'

// Mock the ServiceGetShortener function
vi.mock('./service', () => ({
  ServiceGetShortener: vi.fn(),
}))

describe('getShorteners handler', () => {
  let mockRequest: any
  let mockResponse: any
  let mockNext: any

  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      json: vi.fn(),
    }
    mockNext = vi.fn()

    vi.clearAllMocks()
  })

  it('should return shorteners for a valid userID', async () => {
    const mockData = [
      { id: 1, original_url: 'https://example.com', shorted_url: 'abc123' },
    ]

    // Mock the service to return mock data
    ;(ServiceGetShortener as jest.Mock).mockResolvedValue(mockData)

    // Set up the request body with a userID
    mockRequest.body = { userID: 1 }

    // Call the handler
    await getShorteners(mockRequest, mockResponse, mockNext)

    // Verify the response
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: mockData,
    })
    expect(mockNext).not.toHaveBeenCalled()
  })

  it('should call next with an error when userID is missing', async () => {
    // Mock the service to throw an error
    ;(ServiceGetShortener as jest.Mock).mockRejectedValue(new Error('needed userID'))

    // Call the handler without userID in the request body
    await getShorteners(mockRequest, mockResponse, mockNext)

    // Verify that next was called with the error
    expect(mockNext).toHaveBeenCalledWith(expect.any(Error))
    expect(mockResponse.json).not.toHaveBeenCalled()
  })
})
