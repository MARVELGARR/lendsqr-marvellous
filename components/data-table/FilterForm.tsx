"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarIcon, ChevronDownIcon } from "./icons"
import styles from "./filterForm.module.scss"
import { useState } from "react"

// Define the Zod schema for form validation
export const filterSchema = z.object({
  organization: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  date: z.string().optional(),
  status: z.string().optional(),
})

// Export the type for use in other components
export type FilterValues = z.infer<typeof filterSchema>

interface FilterFormProps {
  onSubmit: (values: FilterValues) => void
  onClose: () => void
}

export default function FilterForm({ onSubmit, onClose }: { onSubmit: (values: FilterValues) => void; onClose: () => void }) {
  const [filters, setFilters] = useState<FilterValues>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(filters)
  }

  return (
    <div className={styles.filterForm}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Organization</label>
          <input
            value={filters.organization || ""}
            onChange={(e) => setFilters((prev) => ({ ...prev, organization: e.target.value }))}
            placeholder="Filter by organization"
          />
        </div>
        <div>
          <label>Username</label>
          <input
            value={filters.username || ""}
            onChange={(e) => setFilters((prev) => ({ ...prev, username: e.target.value }))}
            placeholder="Filter by username"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            value={filters.email || ""}
            onChange={(e) => setFilters((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="Filter by email"
          />
        </div>
        <div>
          <label>Status</label>
          <select
            value={filters.status || "all"}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
          >
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>
        <div>
          <button type="submit">Apply</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}