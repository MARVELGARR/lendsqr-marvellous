"use client"

import type React from "react"


import styles from "./userDetailsContent.module.scss"
import { useUserStore } from "../../store/userStore"
import useLocalStorage from "../../hooks/useLocalStorage"
import { UsersProp } from "../../actions/getUsers"
import { filterCacheForUser } from "./_UserProfileFunction/filterUser"

interface UserDetailsContentProps {
  userId: string
}

const UserDetailsContent: React.FC<UserDetailsContentProps> = ({ userId }) => {
  const {  activeTab } = useUserStore()
  const [users] = useLocalStorage<UsersProp[]>("users", [])
  
  const user = filterCacheForUser(userId)

  if (!user) {
    return <div>User not found</div>
  }

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className={styles.generalDetails}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Personal Information</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>FULL NAME</h4>
                  <p className={styles.detailValue}>{user.personalInfo.fullName}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>PHONE NUMBER</h4>
                  <p className={styles.detailValue}>{user.personalInfo.phoneNumber}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>EMAIL ADDRESS</h4>
                  <p className={styles.detailValue}>{user.personalInfo.email}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>BVN</h4>
                  <p className={styles.detailValue}>{user.personalInfo.bvn}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>GENDER</h4>
                  <p className={styles.detailValue}>{user.personalInfo.gender}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>MARITAL STATUS</h4>
                  <p className={styles.detailValue}>{user.personalInfo.maritalStatus}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>CHILDREN</h4>
                  <p className={styles.detailValue}>{user.personalInfo.children}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>TYPE OF RESIDENCE</h4>
                  <p className={styles.detailValue}>{user.personalInfo.residenceType}</p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Education and Employment</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>LEVEL OF EDUCATION</h4>
                  <p className={styles.detailValue}>{user.education.level}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>EMPLOYMENT STATUS</h4>
                  <p className={styles.detailValue}>{user.education.employmentStatus}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>SECTOR OF EMPLOYMENT</h4>
                  <p className={styles.detailValue}>{user.education.sector}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>DURATION OF EMPLOYMENT</h4>
                  <p className={styles.detailValue}>{user.education.duration}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>OFFICE EMAIL</h4>
                  <p className={styles.detailValue}>{user.education.officeEmail}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>MONTHLY INCOME</h4>
                  <p className={styles.detailValue}>{user.education.monthlyIncome}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>LOAN REPAYMENT</h4>
                  <p className={styles.detailValue}>{user.education.loanRepayment}</p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Socials</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>TWITTER</h4>
                  <p className={styles.detailValue}>{user.socials.twitter}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>FACEBOOK</h4>
                  <p className={styles.detailValue}>{user.socials.facebook}</p>
                </div>
                <div className={styles.detailItem}>
                  <h4 className={styles.detailLabel}>INSTAGRAM</h4>
                  <p className={styles.detailValue}>{user.socials.instagram}</p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Guarantor</h3>
              {user.guarantors.map((guarantor, index) => (
                <div key={index} className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <h4 className={styles.detailLabel}>FULL NAME</h4>
                    <p className={styles.detailValue}>{guarantor.fullName}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <h4 className={styles.detailLabel}>PHONE NUMBER</h4>
                    <p className={styles.detailValue}>{guarantor.phoneNumber}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <h4 className={styles.detailLabel}>EMAIL ADDRESS</h4>
                    <p className={styles.detailValue}>{guarantor.email}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <h4 className={styles.detailLabel}>RELATIONSHIP</h4>
                    <p className={styles.detailValue}>{guarantor.relationship}</p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )
      case "documents":
        return <div className={styles.tabContent}>Documents content</div>
      case "bank":
        return <div className={styles.tabContent}>Bank Details content</div>
      case "loans":
        return <div className={styles.tabContent}>Loans content</div>
      case "savings":
        return <div className={styles.tabContent}>Savings content</div>
      case "app":
        return <div className={styles.tabContent}>App and System content</div>
      default:
        return <div className={styles.tabContent}>Select a tab</div>
    }
  }

  return <div className={styles.detailsContent}>
    {renderTabContent()}</div>
}

export default UserDetailsContent
