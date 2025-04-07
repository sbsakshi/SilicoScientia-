"use client"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"

export function FileUpload({
    label,
    description,
    onFileSelect,
    accept = ".csv,.txt,.sdf,.mol,.pdb",
    className = "",
}) {
    const [isDragging, setIsDragging] = useState(false)
    const [fileName, setFileName] = useState(null)
    const fileInputRef = useRef(null)

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0]
            setFileName(file.name)
            onFileSelect(file)
        }
    }

    const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFileName(file.name)
      onFileSelect(file)
    }
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 
          flex flex-col items-center justify-center cursor-pointer
          transition-colors duration-200 ease-in-out
          bg-[#00B3DC]/20 hover:bg-[#00B3DC]/30
          ${isDragging ? "border-[#006F7F] bg-[#00B3DC]/30" : "border-[#00B3DC]/50"}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input type="file" ref={fileInputRef} className="hidden" accept={accept} onChange={handleFileSelect} />
        <Upload className="h-10 w-10 text-[#006F7F] mb-2" />
        {fileName ? (
          <p className="text-sm font-medium">{fileName}</p>
        ) : (
          <>
            <p className="text-sm font-medium">Drop Files Here</p>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          </>
        )}
      </div>
    </div>
  )
}

