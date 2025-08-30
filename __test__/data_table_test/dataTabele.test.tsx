import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import useGetUsersHooks from "../../hooks/getUsersDataHook";
import { filterForOrganisations } from "../../components/user-profile/_UserProfileFunction/filterUser";
import DataTable from "../../components/data-table/DataTable";


// Mock child components
jest.mock("@/components/data-table/ActionMenu", () => () => <div data-testid="mock-action-menu">ActionMenu</div>);
jest.mock("@/components/data-table/FilterForm", () => ({ organsations, onSubmit, onClose }: any) => (
  <div data-testid="mock-filter-form">
    FilterForm
    <button onClick={() => onSubmit({ status: "active" })}>Apply Filter</button>
    <button onClick={onClose}>Close</button>
  </div>
));

// Mock hooks and helpers
jest.mock("@/hooks/getUsersDataHook", () => jest.fn());
jest.mock("@/components/user-profile/_UserProfileFunction/filterUser", () => ({
  filterForOrganisations: jest.fn(),
}));

describe("DataTable Component", () => {
  const mockUsers = [
    {
      id: "1",
      organization: "Test Org",
      username: "john_doe",
      email: "john@example.com",
      phoneNumber: "123456789",
      dateJoined: "2025-01-01",
      status: "Active",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useGetUsersHooks as jest.Mock).mockReturnValue({
      users: mockUsers,
      error: null,
      isLoading: false,
    });
    (filterForOrganisations as jest.Mock).mockReturnValue(["Test Org"]);
  });

  it("renders table headers and user data", () => {
    render(<DataTable />);

    // Check headers
    expect(screen.getByText(/ORGANIZATION/i)).toBeInTheDocument();
    expect(screen.getByText(/USERNAME/i)).toBeInTheDocument();

    // Check user data
    expect(screen.getByText("Test Org")).toBeInTheDocument();
    expect(screen.getByText("john_doe")).toBeInTheDocument();
  });

  it("shows loading spinner when fetching data", () => {
    (useGetUsersHooks as jest.Mock).mockReturnValue({
      users: [],
      error: null,
      isLoading: true,
    });

    render(<DataTable />);
    expect(screen.getByText(/Loading data.../i)).toBeInTheDocument();
  });

  it("handles API error state", () => {
    (useGetUsersHooks as jest.Mock).mockReturnValue({
      users: [],
      error: { message: "Failed to fetch" },
      isLoading: false,
    });

    render(<DataTable />);
    expect(screen.getByText(/Error loading data: Failed to fetch/i)).toBeInTheDocument();
  });

  it("toggles filter modal when filter button is clicked", () => {
    render(<DataTable />);

    const filterButton = screen.getByTestId("filterButton");
    fireEvent.click(filterButton);

    expect(screen.getByTestId("mock-filter-form")).toBeInTheDocument();
  });

  it("applies filter and closes modal", () => {
    render(<DataTable />);

    const filterButton = screen.getByTestId("filterButton");
    fireEvent.click(filterButton);

    const applyButton = screen.getByText("Apply Filter");
    fireEvent.click(applyButton);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(screen.queryByTestId("mock-filter-form")).not.toBeInTheDocument();
  });

  it("shows 'No data found' message when user list is empty", () => {
    (useGetUsersHooks as jest.Mock).mockReturnValue({
      users: [],
      error: null,
      isLoading: false,
    });

    render(<DataTable />);
    expect(screen.getByText(/No data found/i)).toBeInTheDocument();
  });
});
