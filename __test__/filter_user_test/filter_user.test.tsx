import { UsersProp } from "../../actions/getUsers"
import { filterCacheForUser } from "../../components/user-profile/_UserProfileFunction/filterUser"
import useLocalStorage from "../../hooks/useLocalStorage"
import { PersistedClientState } from "../../types"

// Mock the useLocalStorage hook
jest.mock("@/hooks/useLocalStorage", () => ({
  __esModule: true,
  default: jest.fn()
}))


describe("filterCacheForUser", () => {
  const mockUser: UsersProp = {
    id: "123",
    userId: "user-123",
    organization: "Test Org",
    username: "TestUser",
    email: "test@example.com",
    phoneNumber: "123456789",
    dateJoined: "2025-01-01",
    status: "Active",
    avatar: "",
    accountBalance: 5000,
    bankInfo: { accountNumber: "12345678", bankName: "Test Bank" },
    personalInfo: {
      fullName: "John Doe",
      phoneNumber: "123456789",
      email: "john@example.com",
      bvn: "12345678901",
      gender: "Male",
      maritalStatus: "Single",
      children: "0",
      residenceType: "Owned",
    },
    education: {
      level: "Bachelors",
      employmentStatus: "Employed",
      sector: "Tech",
      duration: "2 years",
      officeEmail: "office@example.com",
      monthlyIncome: "2000",
      loanRepayment: "100",
    },
    socials: {
      twitter: "@test",
      facebook: "facebook.com/test",
      instagram: "@testgram",
    },
    guarantors: [
      {
        fullName: "Jane Doe",
        phoneNumber: "987654321",
        email: "jane@example.com",
        relationship: "Sibling",
      },
    ],
  }

  const mockPersistedState: PersistedClientState = {
    buster: "",
    timestamp: Date.now(),
    clientState: {
      mutations: [],
      queries: [
        {
          dehydratedAt: Date.now(),
          state: {
            data: [mockUser],
          },
        },
      ],
    },
  }

  it("should return null if no userId is provided", () => {
    (useLocalStorage as jest.Mock).mockReturnValue([mockPersistedState])
    const result = filterCacheForUser()
    expect(result).toBeNull()
  })

  it("should return the user if found", () => {
    (useLocalStorage as jest.Mock).mockReturnValue([mockPersistedState])
    const result = filterCacheForUser("123")
    expect(result).toEqual(mockUser)
  })

  it("should return null if user is not found", () => {
    (useLocalStorage as jest.Mock).mockReturnValue([mockPersistedState])
    const result = filterCacheForUser("not-found-id")
    expect(result).toBeNull()
  })

  it("should handle empty cache gracefully", () => {
    (useLocalStorage as jest.Mock).mockReturnValue([null])
    const result = filterCacheForUser("123")
    expect(result).toBeNull()
  })
})
