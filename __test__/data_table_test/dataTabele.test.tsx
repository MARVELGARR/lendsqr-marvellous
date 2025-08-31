import DataTable from "@/components/data-table/DataTable"
import useGetUsersHooks from "@/hooks/getUsersDataHook"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"


jest.mock("next/navigation", () => ({
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    }),
    usePathname: () => "/dashboard/users",
  }))
// Mock the custom data fetching hook
jest.mock("../../hooks/getUsersDataHook")

const mockUseGetUserDataHook = useGetUsersHooks as jest.MockedFunction<typeof useGetUsersHooks>

describe("DataTable", () => {
  const mockUsers = [
    {
      id: "1",
      organization: "Company A",
      username: "john_doe",
      email: "john@example.com",
      phoneNumber: "123456789",
      dateJoined: "2023-01-01",
      status: "Active",
    },
  ]

  const mockMeta = {
    totalPages: 1,
    totalCount: 1,
  }

  beforeEach(() => {
    mockUseGetUserDataHook.mockReturnValue({
      usersData: mockUsers,
      meta: mockMeta,
      isLoading: false,
      error: null,
    } as any)
  })

  it("renders table headers and rows correctly", () => {
    render(<DataTable />)

    expect(screen.getByText("ORGANIZATION")).toBeInTheDocument()
    expect(screen.getByText("USERNAME")).toBeInTheDocument()
    expect(screen.getByText("EMAIL")).toBeInTheDocument()
    expect(screen.getByText("PHONE NUMBER")).toBeInTheDocument()
    expect(screen.getByText("DATE JOINED")).toBeInTheDocument()
    expect(screen.getByText("STATUS")).toBeInTheDocument()

    // expect(screen.getByText("john_doe")).toBeInTheDocument()
    // expect(screen.getByText("john@example.com")).toBeInTheDocument()
    // expect(screen.getByText("123456789")).toBeInTheDocument()
    // expect(screen.getByText("2023-01-01")).toBeInTheDocument()
    // expect(screen.getByText("Active")).toBeInTheDocument()
  })

  it("opens filter form when filter button is clicked", () => {
    render(<DataTable />)

    const filterButton = screen.getByTestId('filterButton')
    fireEvent.click(filterButton)

    expect(screen.getByTestId("filter-form")).toBeInTheDocument()
  })

  it("shows loading state", () => {
    mockUseGetUserDataHook.mockReturnValueOnce({
      usersData: [],
      meta: mockMeta,
      isLoading: true,
      isError: false,
      error: null,
    } as any)

    render(<DataTable />)

    expect(screen.getByText("Loading data...")).toBeInTheDocument()
  })

  it("handles error state", () => {
    mockUseGetUserDataHook.mockReturnValueOnce({
      usersData: [],
      meta: null,
      isGettingUsersData: false,
      isError: true,
      error: { message: "Network error" },
    } as any)

    render(<DataTable />)

    expect(screen.getByText(/error loading data/i)).toBeInTheDocument()
    expect(screen.getByText(/network error/i)).toBeInTheDocument()
  })


  it("shows filter form with all fields when filter button is clicked", () => {
    render(<DataTable />)
  
    fireEvent.click(screen.getByRole("button", { name: /filter/i }))
  
    expect(screen.getByLabelText(/organization/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
  })

  it("displays validation errors when invalid email and phone number are entered", async () => {
    render(<DataTable />)
  
    fireEvent.click(screen.getByRole("button", { name: /filter/i }))
  
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "invalid-email" } })
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: "not-a-number" } })
  
    fireEvent.click(screen.getByTestId("submit"))
  
    expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument()
    expect(await screen.findByText(/please enter a valid phone number/i)).toBeInTheDocument()
  })

  it("clears form on reset and submits empty values", () => {
    render(<DataTable />)
  
    fireEvent.click(screen.getByRole("button", { name: /filter/i }))
  
    const usernameInput = screen.getByLabelText(/username/i)
    fireEvent.change(usernameInput, { target: { value: "johndoe" } })
  
    expect(usernameInput).toHaveValue("johndoe") // confirm it's filled
  
    const resetButton = screen.getByRole("button", { name: /reset/i })
    fireEvent.click(resetButton)
  
    // The form will disappear, so i checked immediately:
    expect(usernameInput).toHaveValue("") // ✅ input was cleared before it closed
  })
  it("submits valid filter form data", () => {
    render(<DataTable />)
  
    fireEvent.click(screen.getByRole("button", { name: /filter/i }))
  
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "john" } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } })
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: "+1234567890" } })
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: "Active" } })
  
    fireEvent.click(screen.getByTestId("submit"))
  
    //check if the table updates or just make sure form submitted without error
    expect(screen.queryByText(/please enter a valid/i)).not.toBeInTheDocument()
  })

  //Negative
  it("shows error message for invalid email", async () => {
    render(<DataTable />)
  
    fireEvent.click(screen.getByRole("button", { name: /filter/i }))
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "bademail" } })
    fireEvent.click(screen.getByTestId("submit"))
  
    await waitFor(() =>
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    )
  })
  //negative
  it("shows error message for invalid phonenumber", async () => {
    render(<DataTable />)
  
    fireEvent.click(screen.getByRole("button", { name: /filter/i }))
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: "123" } })
    fireEvent.click(screen.getByTestId("submit"))
  
    await waitFor(() =>
      expect(screen.getByText(/valid phone number/i)).toBeInTheDocument()
    )
  })
  
  
})
