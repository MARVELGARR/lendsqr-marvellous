"use client"

import { useState, useMemo } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
  type PaginationState,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { z } from "zod"
import FilterForm from "./FilterForm"
import ActionMenu from "./ActionMenu"
import { SortIcon } from "./icons"
import type { User } from "./data"
import styles from "./dataTable.module.scss"
import useGetUserDataHook from "../../hooks/getUsersDataHook"
import useGetUsersHooks from "../../hooks/getUsersDataHook"
import { UsersProp } from "../../actions/getUsers"

// Define the filter schema with Zod
export const filterSchema = z.object({
  organization: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  date: z.string().optional(),
  status: z.string().optional(),
})

export type FilterValues = z.infer<typeof filterSchema>

export default function DataTable() {
  // State for sorting, filtering, and pagination
  const [sorting, setSorting] = useState<SortingState>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState<FilterValues>({ status: "all" })
  const [filters, setFilters] = useState<FilterValues>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { users: UsersData, error, isLoading: isGettingUsersData } = useGetUsersHooks()
    const filteredData = useMemo(() => {
    if (!UsersData) return []

    return UsersData.filter((user) => {
      return Object.entries(columnFilters).every(([key, value]) => {
        if (!value || value === "all") return true
        const userValue = user[key as keyof UsersProp]
        return String(userValue).toLowerCase().includes(String(value).toLowerCase())
      })
    })
  }, [UsersData, columnFilters])


  // Define columns
  const columns = useMemo<ColumnDef<UsersProp>[]>(
    () => [
      {
        accessorKey: "organization",
        header: ({ column }) => (
          <div className={styles.columnHeader} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            ORGANIZATION
            <SortIcon />
          </div>
        ),
        cell: ({ row }) => <div className={styles.cell}>{row.original.organization}</div>,
      },
      {
        accessorKey: "username",
        header: ({ column }) => (
          <div className={styles.columnHeader} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            USERNAME
            <SortIcon />
          </div>
        ),
        cell: ({ row }) => <div className={styles.cell}>{row.original.username}</div>,
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <div className={styles.columnHeader} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            EMAIL
            <SortIcon />
          </div>
        ),
        cell: ({ row }) => <div className={styles.cell}>{row.original.email}</div>,
      },
      {
        accessorKey: "phoneNumber",
        header: ({ column }) => (
          <div className={styles.columnHeader} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            PHONE NUMBER
            <SortIcon />
          </div>
        ),
        cell: ({ row }) => <div className={styles.cell}>{row.original.phoneNumber}</div>,
      },
      {
        accessorKey: "dateJoined",
        header: ({ column }) => (
          <div className={styles.columnHeader} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            DATE JOINED
            <SortIcon />
          </div>
        ),
        cell: ({ row }) => <div className={styles.cell}>{row.original.dateJoined}</div>,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <div className={styles.columnHeader} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            STATUS
            <SortIcon />
          </div>
        ),
        cell: ({ row }) => (
          <div className={styles.cell}>
            <span className={`${styles.statusBadge} ${styles[row.original.status.toLowerCase()]}`}>
              {row.original.status}
            </span>
          </div>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className={styles.actionsCell}>
            <ActionMenu userId={row.original.id} />
          </div>
        ),
      },
    ],
    [],
  )

  // Initialize the table
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      pagination,
      globalFilter,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  // Handle filter submission
  const handleFilterSubmit = (values: FilterValues) => {
    setFilters(values)
    setPagination((prev) => ({ ...prev, pageIndex: 0 })) // Reset to first page when filtering
    setIsFilterOpen(false)
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  if (error) {
    return <div className={styles.errorMessage}>Error loading data: {error.message}</div>
  }


  return (

<div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <button data-testid="filterButton" className={styles.filterButton} onClick={toggleFilter}>
          Filter
        </button>
        {isFilterOpen && <FilterForm onSubmit={handleFilterSubmit} onClose={() => setIsFilterOpen(false)} />}
      </div>

      <div className={styles.tableWrapper}>
        {isGettingUsersData ? (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner}></div>
            <p>Loading data...</p>
          </div>
        ) : null}

        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.th}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={styles.tr}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.td}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {UsersData?.length === 0 && !isGettingUsersData && <div className={styles.noData}>No data found</div>}
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          <span>Showing</span>
          <select
            value={pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
            className={styles.pageSizeSelect}
          >
            {[10, 20, 30, 40, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>out of {filteredData?.length}</span>
        </div>

        <div className={styles.paginationControls}>
          <button
            className={styles.paginationButton}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            &lt;
          </button>

          {table.getPageCount() <= 7 ? (
            // Show all pages if there are 7 or fewer
            Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => (
              <button
                key={pageIndex}
                className={`${styles.pageNumber} ${pagination.pageIndex === pageIndex ? styles.activePage : ""}`}
                onClick={() => table.setPageIndex(pageIndex)}
              >
                {pageIndex + 1}
              </button>
            ))
          ) : (
            // Show limited pages with ellipsis for large page counts
            <>
              <button
                className={`${styles.pageNumber} ${pagination.pageIndex === 0 ? styles.activePage : ""}`}
                onClick={() => table.setPageIndex(0)}
              >
                1
              </button>

              {pagination.pageIndex > 2 && <span className={styles.ellipsis}>...</span>}

              {pagination.pageIndex > 1 && (
                <button className={styles.pageNumber} onClick={() => table.setPageIndex(pagination.pageIndex - 1)}>
                  {pagination.pageIndex}
                </button>
              )}

              {pagination.pageIndex > 0 && pagination.pageIndex < table.getPageCount() - 1 && (
                <button className={`${styles.pageNumber} ${styles.activePage}`}>{pagination.pageIndex + 1}</button>
              )}

              {pagination.pageIndex < table.getPageCount() - 2 && (
                <button className={styles.pageNumber} onClick={() => table.setPageIndex(pagination.pageIndex + 1)}>
                  {pagination.pageIndex + 2}
                </button>
              )}

              {pagination.pageIndex < table.getPageCount() - 3 && <span className={styles.ellipsis}>...</span>}

              {table.getPageCount() > 1 && (
                <button
                  className={`${styles.pageNumber} ${pagination.pageIndex === table.getPageCount() - 1 ? styles.activePage : ""}`}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                >
                  {table.getPageCount()}
                </button>
              )}
            </>
          )}

          <button
            className={styles.paginationButton}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>

  )
}
