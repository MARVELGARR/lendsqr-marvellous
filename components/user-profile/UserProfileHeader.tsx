"use client"

import type React from "react"
import Image from "next/image"
import { StarIcon, StarOutlineIcon, UserIcon } from "./icons"
import styles from "./userProfileHeader.module.scss"
import { useUserStore } from "../../store/userStore"
import useLocalStorage from "../../hooks/useLocalStorage"
import { UsersProp } from "../../actions/getUsers"
import { tabsFont } from "../../styles/fonts"

interface UserProfileHeaderProps {
  userId: string
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ userId }) => {
  const {  setActiveTab, activeTab } = useUserStore()
  const [users] = useLocalStorage<UsersProp[]>("users", null)
  const user = users.find((u) => u.id === userId)

  if (!user) {
    return <div>User not found</div>
  }

  const tabs = [
    { id: "general", label: "General Details" },
    { id: "documents", label: "Documents" },
    { id: "bank", label: "Bank Details" },
    { id: "loans", label: "Loans" },
    { id: "savings", label: "Savings" },
    { id: "app", label: "App and System" },
  ]

  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileInfo}>
        <div className={styles.avatarSection}>
          {user.avatar ? (
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={`${user.personalInfo.fullName}'s avatar`}
              width={100}
              height={100}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <UserIcon />
            </div>
          )}
        </div>

        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{user.personalInfo.fullName}</h2>
          <p className={styles.userId}>{user.userId}</p>
        </div>

        <div className={styles.userTier}>
          <p className={styles.tierLabel}>User&apos;s Tier</p>
          <div className={styles.stars}>
            <StarIcon />
            <StarOutlineIcon />
            <StarOutlineIcon />
          </div>
        </div>

        <div className={styles.accountInfo}>
          <h3 className={styles.accountBalance}>₦{user.accountBalance.toLocaleString()}</h3>
          <p className={styles.bankInfo}>
            {user.bankInfo.accountNumber}/{user.bankInfo.bankName}
          </p>
        </div>
      </div>

      <div style={tabsFont.style} className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserProfileHeader
