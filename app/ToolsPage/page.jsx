"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Search,
  ChevronDown,
  X,
  Bookmark,
  BookmarkIcon as BookmarkFilled,
  ChevronDownCircle,
  Filter,
  SlidersHorizontal,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Tool data
const allTools = [
  {
    id: 1,
    name: "Ant Dock",
    description: "Advanced Docking Solution with Ant Dock",
    icon: "/placeholder.svg?height=50&width=50",
    category: "Docking",
    categoryColor: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    name: "Ligand Lock",
    description: "Explore the Power of Molecular docking with Ligand Lock",
    icon: "/placeholder.svg?height=50&width=50",
    category: "Docking",
    categoryColor: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    name: "Diffuse Blind",
    description:
      "State-of-the-art protein-ligand docking using a diffusion model without requiring a known binding site.",
    icon: "/placeholder.svg?height=50&width=50",
    category: "Docking",
    categoryColor: "bg-amber-100 text-amber-600",
  },
  {
    id: 4,
    name: "BINA Dock",
    description: "A molecular Docking Tool",
    icon: "/placeholder.svg?height=50&width=50",
    category: "Docking",
    categoryColor: "bg-green-100 text-green-600",
  },
  {
    id: 5,
    name: "Molecular Viewer",
    description: "Interactive 3D visualization of molecular structures",
    icon: "/placeholder.svg?height=50&width=50",
    category: "Visualization",
    categoryColor: "bg-blue-100 text-blue-600",
  },
  {
    id: 6,
    name: "Protein Analyzer",
    description: "Comprehensive protein structure analysis tool",
    icon: "/placeholder.svg?height=50&width=50",
    category: "Analytics",
    categoryColor: "bg-purple-100 text-purple-600",
  },
]

// Categories
const categories = ["All Categories", "Docking", "Analytics", "Prediction", "Visualization"]

// Sort options
const sortOptions = ["Relevance", "Name (A-Z)", "Name (Z-A)", "Newest", "Oldest"]

// Custom BookmarkIcon component with animation
const BookmarkIcon = ({ filled }) => {
  return (
    <div className="relative">
      {filled ? (
        <BookmarkFilled className="h-5 w-5 transform transition-transform duration-300 scale-110" />
      ) : (
        <Bookmark className="h-5 w-5 transition-transform duration-300" />
      )}
    </div>
  )
}

export default function SilicoXploreTools() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState(["Anti Dock", "Ligand Lock"])
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("Relevance")
  const [activeTab, setActiveTab] = useState("tools")
  const [bookmarkedTools, setBookmarkedTools] = useState([])
  const [visibleTools, setVisibleTools] = useState([])
  const [displayedTools, setDisplayedTools] = useState([])
  const [loadedCount, setLoadedCount] = useState(12)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const searchRef = useRef(null)

  // Initialize tools
  useEffect(() => {
    // Create multiple copies of the tools to fill the grid
    const multipleTools = Array(12)
      .fill(null)
      .map((_, index) => {
        const baseTool = allTools[index % allTools.length]
        return { ...baseTool, id: index + 1 }
      })
    setVisibleTools(multipleTools)
    setTotalResults(multipleTools.length)
  }, [])

  // Filter tools based on search and active filters
  useEffect(() => {
    let filtered = visibleTools

    // Apply active filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter((tool) =>
        activeFilters.some((filter) => tool.name.toLowerCase().includes(filter.toLowerCase())),
      )
    }

    // Apply category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory)
    }

    // Apply sorting
    if (sortBy === "Name (A-Z)") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "Name (Z-A)") {
      filtered.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sortBy === "Newest") {
      filtered.sort((a, b) => b.id - a.id)
    } else if (sortBy === "Oldest") {
      filtered.sort((a, b) => a.id - b.id)
    }

    setTotalResults(filtered.length)
    setDisplayedTools(filtered.slice(0, loadedCount))
  }, [activeFilters, selectedCategory, sortBy, visibleTools, loadedCount])

  // Generate suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const term = searchTerm.toLowerCase()
    const matchedSuggestions = allTools
      .filter((tool) => tool.name.toLowerCase().includes(term) || tool.description.toLowerCase().includes(term))
      .map((tool) => tool.name)

    // Add category suggestions
    categories.forEach((category) => {
      if (category.toLowerCase().includes(term) && category !== "All Categories") {
        matchedSuggestions.push(category)
      }
    })

    // Remove duplicates and already active filters
    const uniqueSuggestions = [...new Set(matchedSuggestions)].filter(
      (suggestion) => !activeFilters.includes(suggestion),
    )

    setSuggestions(uniqueSuggestions)
    setShowSuggestions(uniqueSuggestions.length > 0)
  }, [searchTerm, activeFilters])

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target )) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Add a filter
  const addFilter = (filter) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
    setSearchTerm("")
    setShowSuggestions(false)
  }

  // Remove a filter
  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters([])
    setSelectedCategory("All Categories")
  }

  // Toggle bookmark
  const toggleBookmark = (id, event) => {
    event.stopPropagation() // Prevent card click

    if (bookmarkedTools.includes(id)) {
      setBookmarkedTools(bookmarkedTools.filter((toolId) => toolId !== id))
    } else {
      setBookmarkedTools([...bookmarkedTools, id])
    }
  }

  // Load more tools
  const loadMoreTools = () => {
    setLoadedCount((prev) => prev + 4)
  }

  // Handle card click
  const handleCardClick = (toolId) => {
    // In a real app, this would navigate to the tool detail page
    console.log(`Navigating to tool ${toolId}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Bar */}
      <header className="bg-[#1d4d40] text-white p-4 flex items-center justify-between sticky top-0 z-20 shadow-md">
        <div className="flex items-center space-x-2">
          <Image
            src="/placeholder.svg?height=30&width=30"
            alt="SilicoXplore Logo"
            width={30}
            height={30}
            className="mr-2"
          />
          <span className="text-xl font-semibold">SilicoXplore</span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:underline">
            My Workflow
          </a>
          <a href="#" className="hover:underline">
            My Result
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#2a5d50] transition-colors relative">
            <Bookmark className="h-5 w-5" />
            {bookmarkedTools.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {bookmarkedTools.length}
              </span>
            )}
          </Button>
          <div className="relative">
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              1
            </span>
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#2a5d50] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </Button>
          </div>
          <div className="h-8 w-8 rounded-full bg-[#e6a48b] flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition-opacity">
            <span>👤</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">SilicoXplore Tools</h1>
            <p className="text-gray-600">Discover and access our comprehensive suite of biotech research tools</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1" ref={searchRef}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search tools..."
                  className="pl-10 border-gray-300 rounded-md w-full"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    if (e.target.value.trim() !== "") {
                      setShowSuggestions(true)
                    }
                  }}
                  onFocus={() => {
                    if (searchTerm.trim() !== "" && suggestions.length > 0) {
                      setShowSuggestions(true)
                    }
                  }}
                />

                {/* Autocomplete Dropdown */}
                {showSuggestions && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {suggestions.length > 0 ? (
                      suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onClick={() => addFilter(suggestion)}
                        >
                          <Search className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{suggestion}</span>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">No matching tools found</div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                      <Filter className="h-4 w-4" />
                      {selectedCategory}
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn("cursor-pointer", selectedCategory === category && "bg-gray-100 font-medium")}
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                      <SlidersHorizontal className="h-4 w-4" />
                      {sortBy}
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => setSortBy(option)}
                        className={cn("cursor-pointer", sortBy === option && "bg-gray-100 font-medium")}
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 items-center">
                  {activeFilters.map((filter) => (
                    <Badge
                      key={filter}
                      variant="secondary"
                      className="bg-[#c5d8d1] text-black hover:bg-[#b5c8c1] px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      {filter}
                      <X
                        size={14}
                        className="cursor-pointer hover:text-red-600 transition-colors"
                        onClick={() => removeFilter(filter)}
                      />
                    </Badge>
                  ))}

                  {activeFilters.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-500 hover:text-red-600 transition-colors h-7 px-2"
                      onClick={clearAllFilters}
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                <div className="mt-2 text-sm text-gray-500">
                  Showing {displayedTools.length} of {totalResults} results
                </div>
              </div>
            )}

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="border-b">
              <TabsList className="bg-transparent">
                <TabsTrigger
                  value="tools"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#1d4d40] rounded-none"
                >
                  Tools
                </TabsTrigger>
                <TabsTrigger
                  value="docking"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#1d4d40] rounded-none"
                >
                  Docking
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#1d4d40] rounded-none"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="prediction"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#1d4d40] rounded-none"
                >
                  Prediction
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Tool Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {displayedTools.length > 0 ? (
              displayedTools.map((tool) => (
                <Card
                  key={tool.id}
                  className="overflow-hidden relative p-6 flex flex-col shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-gray-50 cursor-pointer active:bg-gray-100 active:scale-[0.99]"
                  onClick={() => handleCardClick(tool.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <Image
                      src={tool.icon || "/placeholder.svg"}
                      alt={tool.name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <Badge className={`${tool.categoryColor} font-normal`}>{tool.category}</Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                  <div className="mt-auto flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`${bookmarkedTools.includes(tool.id) ? "text-[#1d4d40]" : "text-gray-400"} hover:text-[#1d4d40] transition-colors`}
                      onClick={(e) => toggleBookmark(tool.id, e)}
                    >
                      <BookmarkIcon filled={bookmarkedTools.includes(tool.id)} />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto opacity-30" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No tools found</h3>
                <p className="text-gray-500 mt-1">Try adjusting your filters or search criteria</p>
                <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {displayedTools.length < totalResults && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
                onClick={loadMoreTools}
              >
                Load More Tools
                <ChevronDownCircle size={16} />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

