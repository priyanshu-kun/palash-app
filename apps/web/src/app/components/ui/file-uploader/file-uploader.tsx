"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, FileText } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  value: File[] | null
  onChange: (files: File[]) => void
  maxFiles?: number
  maxSize?: number
  accept?: Record<string, string[]>
}

export function FileUploader({
  value,
  onChange,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = {
    "image/*": [".png", ".jpg", ".jpeg"],
  },
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>(value || [])
  const [error, setError] = useState<string | null>(null)

  console.log("FILES: ", files)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null)

      if (files.length + acceptedFiles.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} files`)
        return
      }

      const newFiles = [...files, ...acceptedFiles]
      setFiles(newFiles)
      onChange(newFiles)
    },
    [files, maxFiles, onChange],
  )

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    onChange(newFiles)
    setError(null)
  }

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    maxSize,
    accept,
    multiple: true,
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
          isDragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-300 hover:bg-gray-50",
          isDragReject && "border-red-500 bg-red-50",
          error && "border-red-500",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="mb-2 h-10 w-10 text-gray-400" />
          <p className="mb-1 text-sm font-medium">
            {isDragActive ? "Drop the files here" : "Drag & drop files here or click to browse"}
          </p>
          <p className="text-xs text-gray-500">
            Upload up to {maxFiles} images (max {maxSize / (1024 * 1024)}MB each)
          </p>
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {files.map((file, index) => (
            <div key={index} className="group relative rounded-lg border bg-white p-2">
              {file.type.startsWith("image/") ? (
                <div className="relative aspect-square w-full overflow-hidden rounded-md">
                  <Image
                    src={URL.createObjectURL(file) || "/placeholder.svg"}
                    alt={file.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded-md bg-gray-100">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div className="mt-2 flex items-center justify-between">
                <p className="truncate text-xs text-gray-500" title={file.name}>
                  {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                </p>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
