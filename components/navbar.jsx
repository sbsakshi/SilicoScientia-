import React from 'react'
import { Upload, Settings, Bookmark, Bell, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react'


const Navbar = () => {
  return (
    <div> <header className="bg-[#2db1c3] text-white p-4 flex items-center justify-between shadow-md">
    <h1 className="text-xl font-bold">
      SilicoXplore
    </h1>
    
    <nav className="hidden md:flex items-center space-x-6">
      <a href="#" className="hover:text-emerald-200 transition-colors">
        My Workflow
      </a>
      <a href="#" className="hover:text-emerald-200 transition-colors">
        My Result
      </a>
    </nav>
    
    <div className="flex items-center space-x-4">
      <button 
        className="p-1 rounded-full hover:bg-emerald-700 transition-colors"
        aria-label="Bookmark"
      >
        <Bookmark className="h-5 w-5" />
      </button>
      <button 
        className="p-1 rounded-full hover:bg-emerald-700 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
      </button>
      <button 
        className="p-1 rounded-full hover:bg-emerald-700 transition-colors"
        aria-label="User profile"
      >
        <UserCircle className="h-6 w-6" />
      </button>
    </div>
  </header></div>
  )
}

export default Navbar