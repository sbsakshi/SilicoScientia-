"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown, Download, Trash2, RefreshCw, Bookmark, Bell } from "lucide-react"

export default function SilicoXplore() {
  // State management
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)
  const [dateRangeOpen, setDateRangeOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 days")
  const [filteredJobs, setFilteredJobs] = useState([])

  // Sample data for the jobs table
  const allJobs = [
    { id: "20250311170624_79d6d0b1", name: "Pocket_file", status: "Completed", result: "View Results" },
    { id: "20250311170624_79d6d0b1", name: "Ligand lock_file", status: "Running", result: "Processing..." },
    { id: "20250311170624_79d6d0b1", name: "PharmaK_file", status: "Failed", result: "View Error" },
    { id: "20250311170624_79d6d0b1", name: "Pocket_file", status: "Completed", result: "View Results" },
    { id: "20250311170624_79d6d0b1", name: "Ligand lock_file", status: "Running", result: "Processing..." },
    { id: "20250311170624_79d6d0b1", name: "PharmaK_file", status: "Failed", result: "View Error" },
    { id: "20250311170624_79d6d0b1", name: "Pocket_file", status: "Completed", result: "View Results" },
    { id: "20250311170624_79d6d0b1", name: "Ligand lock_file", status: "Running", result: "Processing..." },
    { id: "20250311170624_79d6d0b1", name: "PharmaK_file", status: "Failed", result: "View Error" },
    { id: "20250311170624_79d6d0b1", name: "Pocket_file", status: "Completed", result: "View Results" },
    { id: "20250311170624_79d6d0b1", name: "Ligand lock_file", status: "Running", result: "Processing..." },
    { id: "20250311170624_79d6d0b1", name: "PharmaK_file", status: "Failed", result: "View Error" },
    { id: "20250311170624_79d6d0b1", name: "Pocket_file", status: "Completed", result: "View Results" },
    { id: "20250311170624_79d6d0b1", name: "Ligand lock_file", status: "Running", result: "Processing..." },
    { id: "20250311170624_79d6d0b1", name: "PharmaK_file", status: "Failed", result: "View Error" },
  ]

  // Filter options
  const filterOptions = ["All", "Completed", "Running", "Failed"]
  const dateRangeOptions = ["Last 7 days", "Last 30 days", "Last 90 days", "Custom range"]

  // Items per page
  const itemsPerPage = 5

  // Calculate total pages
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)

  // Get current jobs for pagination
  const getCurrentJobs = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredJobs.slice(startIndex, endIndex)
  }

  // Filter jobs based on search query and selected filter
  useEffect(() => {
    let result = allJobs

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (job) =>
          job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply status filter
    if (selectedFilter !== "All") {
      result = result.filter((job) => job.status === selectedFilter)
    }

    setFilteredJobs(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, selectedFilter])

  // Initialize filtered jobs on component mount
  useEffect(() => {
    setFilteredJobs(allJobs)
  }, [])

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  // Handle job deletion
  const handleDeleteJob = (index) => {
    const updatedJobs = [...filteredJobs]
    updatedJobs.splice(index, 1)
    setFilteredJobs(updatedJobs)
  }

  // Handle job refresh/download
  const handleJobAction = (job, index) => {
    if (job.status === "Failed") {
      // Simulate refresh action
      alert(`Refreshing job: ${job.name}`)
    } else {
      // Simulate download action
      alert(`Downloading results for: ${job.name}`)
    }
  }

  // Handle view results/error
  const handleViewResult = (job) => {
    if (job.status === "Failed") {
      alert(`Viewing error details for: ${job.name}`)
    } else if (job.status === "Completed") {
      alert(`Viewing results for: ${job.name}`)
    }
  }

  // Get status badge styling based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium border border-green-200">
            {status}
          </span>
        )
      case "Running":
        return (
          <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium border border-yellow-200">
            {status}
          </span>
        )
      case "Failed":
        return (
          <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800 font-medium border border-red-200">
            {status}
          </span>
        )
      default:
        return <span>{status}</span>
    }
  }

  // Get result text styling based on status
  const getResultText = (job) => {
    switch (job.status) {
      case "Completed":
        return (
          <button
            onClick={() => handleViewResult(job)}
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
          >
            {job.result}
          </button>
        )
      case "Running":
        return <span className="text-gray-400">{job.result}</span>
      case "Failed":
        return (
          <button
            onClick={() => handleViewResult(job)}
            className="text-red-600 hover:text-red-800 hover:underline font-medium transition-colors"
          >
            {job.result}
          </button>
        )
      default:
        return <span>{job.result}</span>
    }
  }

  // Get action buttons based on status
  const getActionButtons = (job, index) => {
    return (
      <div className="flex space-x-3 justify-end">
        <button
          className="text-gray-600 hover:text-blue-600 transition-colors"
          onClick={() => handleJobAction(job, index)}
          title={job.status === "Failed" ? "Retry" : "Download"}
        >
          {job.status === "Failed" ? <RefreshCw size={18} /> : <Download size={18} />}
        </button>
        <button
          className="text-gray-600 hover:text-red-600 transition-colors"
          onClick={() => handleDeleteJob(index)}
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    )
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setFilterOpen(false)
      setDateRangeOpen(false)
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-teal-800 text-white p-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl font-bold">SilicoXplore</h1>
        <div className="flex items-center space-x-6">
          <nav className="flex space-x-6">
            <a href="#" className="hover:underline transition-all hover:text-teal-200">
              My Workflow
            </a>
            <a href="#" className="hover:underline font-medium border-b-2 border-white pb-0.5">
              My Result
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="hover:text-teal-200 transition-colors">
              <Bookmark size={20} />
            </button>
            <button className="hover:text-teal-200 transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-pink-300 overflow-hidden border-2 border-white shadow-sm">
              <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">My Result</h2>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs..."
              className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <button
                className="px-4 py-2.5 border border-gray-300 rounded-md bg-white flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  setFilterOpen(!filterOpen)
                  setDateRangeOpen(false)
                }}
              >
                Filter
                <ChevronDown size={16} />
              </button>
              {filterOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        selectedFilter === option ? "bg-teal-50 text-teal-800 font-medium" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedFilter(option)
                        setFilterOpen(false)
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="px-4 py-2.5 border border-gray-300 rounded-md bg-white flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  setDateRangeOpen(!dateRangeOpen)
                  setFilterOpen(false)
                }}
              >
                {selectedDateRange}
                <ChevronDown size={16} />
              </button>
              {dateRangeOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {dateRangeOptions.map((option) => (
                    <button
                      key={option}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        selectedDateRange === option ? "bg-teal-50 text-teal-800 font-medium" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedDateRange(option)
                        setDateRangeOpen(false)
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white border border-teal-200 rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Result
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCurrentJobs().map((job, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{job.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(job.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getResultText(job)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {getActionButtons(job, index)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {Math.min(1, filteredJobs.length)} to {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of{" "}
            {filteredJobs.length} results
          </p>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1.5 border border-gray-300 rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              // Show pages around current page
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <button
                  key={i}
                  className={`px-3 py-1.5 border border-gray-300 rounded-md ${
                    currentPage === pageNum
                      ? "bg-teal-700 text-white border-teal-700"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              )
            })}

            <button
              className={`px-3 py-1.5 border border-gray-300 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

