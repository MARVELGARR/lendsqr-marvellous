import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { filterCacheForUser } from "../../components/user-profile/_UserProfileFunction/filterUser";
import useLocalStorage from "../../hooks/useLocalStorage";
import UserDetailsContent from "../../components/user-profile/UserDetailsContent";
import { UsersProp } from "../../actions/getUsers";
import { useUserStore } from "../../store/userStore";

// Mock the hooks and helpers
jest.mock("@/components/user-profile/_UserProfileFunction/filterUser", () => ({
  filterCacheForUser: jest.fn(),
}));
jest.mock("@/hooks/useLocalStorage", () => jest.fn());
jest.mock("@/store/userStore", () => ({
  useUserStore: jest.fn(),
}));

describe("UserDetailsContent", () => {
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
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders 'User not found' if no user is returned", () => {
    (filterCacheForUser as jest.Mock).mockReturnValue(null);
    (useUserStore as unknown as jest.Mock).mockReturnValue({ activeTab: "general" });
    (useLocalStorage as jest.Mock).mockReturnValue([[]]);

    render(<UserDetailsContent userId="non-existent-id" />);
    expect(screen.getByText(/User not found/i)).toBeInTheDocument();
  });

  it("renders general details tab when activeTab is 'general'", () => {
    (filterCacheForUser as jest.Mock).mockReturnValue(mockUser);
    (useUserStore as unknown as jest.Mock).mockReturnValue({ activeTab: "general" });
    (useLocalStorage as jest.Mock).mockReturnValue([[mockUser]]);

    render(<UserDetailsContent userId="123" />);

    // Check if personal info renders correctly
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("123456789")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("renders correct content for 'documents' tab", () => {
    (filterCacheForUser as jest.Mock).mockReturnValue(mockUser);
    (useUserStore as unknown as jest.Mock).mockReturnValue({ activeTab: "documents" });
    (useLocalStorage as jest.Mock).mockReturnValue([[mockUser]]);

    render(<UserDetailsContent userId="123" />);
    expect(screen.getByText(/Documents content/i)).toBeInTheDocument();
  });

  it("renders correct content for 'bank' tab", () => {
    (filterCacheForUser as jest.Mock).mockReturnValue(mockUser);
    (useUserStore as unknown as jest.Mock).mockReturnValue({ activeTab: "bank" });
    (useLocalStorage as jest.Mock).mockReturnValue([[mockUser]]);

    render(<UserDetailsContent userId="123" />);
    expect(screen.getByText(/Bank Details content/i)).toBeInTheDocument();
  });
});
