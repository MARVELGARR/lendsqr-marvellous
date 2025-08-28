export interface UsersProp {
  id: string
  userId: string
  organization: string
  username: string
  email: string
  phoneNumber: string
  dateJoined: string
  status: "Active" | "Inactive" | "Blacklisted" | string // You can narrow this if all statuses are known
  avatar: string
  accountBalance: number
  bankInfo: {
    accountNumber: string
    bankName: string
  }
  personalInfo: {
    fullName: string
    phoneNumber: string
    email: string
    bvn: string
    gender: string
    maritalStatus: string
    children: string
    residenceType: string
  }
  education: {
    level: string
    employmentStatus: string
    sector: string
    duration: string
    officeEmail: string
    monthlyIncome: string
    loanRepayment: string
  }
  socials: {
    twitter: string
    facebook: string
    instagram: string
  }
  guarantors: {
    fullName: string
    phoneNumber: string
    email: string
    relationship: string
  }[]
}

const getUsers = async () : Promise<UsersProp[] | null> => {

    try{
        const res = await fetch('https://lendsqr.free.beeceptor.com/users', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(res.ok){
            const data = await res.json();
            return data;
        }
        return[]
    }
    catch(error){
       console.error("Error fetching users:", error)
    return []
    }

}
 
export default getUsers;