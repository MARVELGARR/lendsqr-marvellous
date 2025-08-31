"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, ChevronDownIcon } from "./icons";
import styles from "./filterForm.module.scss";

// Define the Zod schema for form validation
export const filterSchema = z.object({
  organization: z.string().optional(),
  username: z.string().optional(),
  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  date: z.string().optional(),
  status: z.string().optional(),
});

// Export the type for use in other components
export type FilterValues = z.infer<typeof filterSchema>;

interface FilterFormProps {
  organsations: String[];
  onSubmit: (values: FilterValues) => void;
  onClose: () => void;
}

export default function FilterForm({
  onSubmit,
  onClose,
  organsations,
}: FilterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      organization: "",
      username: "",
      email: "",
      phoneNumber: "",
      date: "",
      status: "",
    },
  });

  const handleReset = () => {
    reset();
    // After resetting the form, also submit empty values to clear filters
    onSubmit({
      organization: "",
      username: "",
      email: "",
      phoneNumber: "",
      date: "",
      status: "",
    });
  };

  return (
    <div data-testid="filter-form" className={styles.filterFormContainer}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={styles.filterForm}
      >
        <div className={styles.formGroup}>
          <label htmlFor="organization" className={styles.label}>
            Organization
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="organization"
              {...register("organization")}
              className={styles.select}
              defaultValue={"Select an organization"}
            >
              
              {organsations?.map((org) => {
                return (
                  <option key={org as string} value={org as string}>
                    {org}
                  </option>
                );
              })}
            </select>
            <ChevronDownIcon className={styles.selectIcon} />
          </div>
          {errors.organization && (
            <p className={styles.errorMessage}>{errors.organization.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="User"
            {...register("username")}
            className={styles.input}
          />
          {errors.username && (
            <p className={styles.errorMessage}>{errors.username.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            {...register("email")}
            className={styles.input}
          />
          {errors.email && (
            <p data-testid="email-error" className={styles.errorMessage}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date" className={styles.label}>
            Date
          </label>
          <div className={styles.dateInputWrapper}>
            <input
              id="date"
              type="date"
              {...register("date")}
              className={styles.input}
              placeholder="Date"
            />
            <CalendarIcon className={styles.calendarIcon} />
          </div>
          {errors.date && (
            <p className={styles.errorMessage}>{errors.date.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber" className={styles.label}>
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            placeholder="Phone Number"
            {...register("phoneNumber")}
            className={styles.input}
          />
          {errors.phoneNumber && (
            <p className={styles.errorMessage}>{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>
            Status
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="status"
              {...register("status")}
              className={styles.select}
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Blacklisted">Blacklisted</option>
            </select>
            <ChevronDownIcon className={styles.selectIcon} />
          </div>
          {errors.status && (
            <p className={styles.errorMessage}>{errors.status.message}</p>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={handleReset}
            className={styles.resetButton}
          >
            Reset
          </button>
          <button
            type="submit"
            data-testid="submit"
            className={styles.filterButton}
          >
            Filter
          </button>
        </div>
      </form>
    </div>
  );
}
