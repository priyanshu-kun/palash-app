"use client"

import { useState, type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { Badge } from "@/app/components/badge/badge"
import { Input } from "@/app/components/ui/input/input"

interface TagInputProps {
  placeholder?: string
  tags: string[]
  setTags: (tags: string[]) => void
  maxTags?: number
}

export function TagInput({ placeholder = "Add tag...", tags, setTags, maxTags = 10 }: TagInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag()
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const addTag = () => {
    const trimmedInput = inputValue.trim()
    if (trimmedInput && !tags.includes(trimmedInput) && tags.length < maxTags) {
      setTags([...tags, trimmedInput])
      setInputValue("")
    }
  }

  const removeTag = (index: number) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border bg-white pl-3">
      {tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="flex items-center gap-1 px-2 py-1">
          {tag}
          <button type="button" onClick={() => removeTag(index)} className="ml-1 rounded-full hover:bg-gray-200">
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {tag}</span>
          </button>
        </Badge>
      ))}
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}
