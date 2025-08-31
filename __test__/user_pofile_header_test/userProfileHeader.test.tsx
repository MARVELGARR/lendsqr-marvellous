import { filterCacheForUser, filterForOrganisations } from "@/components/user-profile/_UserProfileFunction/filterUser"
import useLocalStorage from "@/hooks/useLocalStorage"
import { PersistedClientState } from "@/types"


// Mock the useLocalStorage hook
jest.mock("@/hooks/useLocalStorage", () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe("filterCacheForUser", () => {
  it("should return null if no userId is provided", () => {
    const result = filterCacheForUser()
    expect(result).toBeNull()
  })

  it("should return the user if found in persisted cache", () => {
    const mockData = {
      clientState: {
        queries: [
          {
            state: {
              data: [
                { id: "1", organization: "Org1", name: "John Doe" },
                { id: "2", organization: "Org2", name: "Jane Smith" },
              ],
            },
          },
        ],
      },
    } as unknown as PersistedClientState

    ;(useLocalStorage as jest.Mock).mockReturnValue([mockData])

    const result = filterCacheForUser("1")
    expect(result).toEqual({ id: "1", organization: "Org1", name: "John Doe" })
  })

  it("should return null if user is not found in persisted cache", () => {
    const mockData = {
      clientState: {
        queries: [
          {
            state: {
              data: [
                { id: "2", organization: "Org2", name: "Jane Smith" },
              ],
            },
          },
        ],
      },
    } as unknown as PersistedClientState

    ;(useLocalStorage as jest.Mock).mockReturnValue([mockData])

    const result = filterCacheForUser("3")
    expect(result).toBeNull()
  })
})

describe("filterForOrganisations", () => {
  it("should return an empty array if input is empty", () => {
    const result = filterForOrganisations([])
    expect(result).toEqual([])
  })

  it("should return unique organisation names", () => {
    const input = [
      { id: "1", organization: "Org1" },
      { id: "2", organization: "Org2" },
      { id: "3", organization: "Org1" },
    ] as any[]

    const result = filterForOrganisations(input)
    expect(result).toEqual(["Org1", "Org2"])
  })
})
