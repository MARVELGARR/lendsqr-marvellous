// Root structure
export interface PersistedClientState {
  buster: string;
  timestamp: number;
  clientState: {
    mutations: MutationState[];
    queries: QueryState[];
  };
}

// Mutation placeholder (empty structure in your example)
export interface MutationState {
  // Add fields if needed later
}

// Query state
export interface QueryState {
  dehydratedAt: number;
  state: {
    data: UserData[];
  };
}

// User structure
export interface UserData {
  id: string;
  userId: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Blacklisted" | string;
  avatar: string;
  accountBalance: number;
  bankInfo: BankInfo;
  personalInfo: PersonalInfo;
  education: Education;
  socials: Socials;
  guarantors: Guarantor[];
}

export interface BankInfo {
  accountNumber: string;
  bankName: string;
}

export interface PersonalInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residenceType: string;
}

export interface Education {
  level: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
}

export interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
}
