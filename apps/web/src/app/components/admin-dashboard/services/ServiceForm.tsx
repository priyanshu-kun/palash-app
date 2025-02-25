"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { PrimaryButton as Button } from "@/app/components/ui/buttons/index";
import { Input } from "@/app/components/ui/input/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card/Card";
import { TextArea } from "../../ui/textarea/Textarea";
import { X } from "lucide-react"; // For delete icon

interface FormData {
  name: string;
  price: number;
  description: string;
  images: File[];
}

export function ServiceForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 0,
    description: "",
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // Handle text and number input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value
    });
  };

  // Handle file input changes
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Convert FileList to Array and append to existing images
      const newFiles = Array.from(files);
      setFormData({
        ...formData,
        images: [...formData.images, ...newFiles]
      });
    }
  };

  // Remove a file from the selected files
  const removeFile = (indexToRemove: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, index) => index !== indexToRemove)
    });
  };

  // Temporary API call function
  const submitToAPI = async (data: FormData): Promise<{success: boolean, message: string}> => {
    return new Promise(resolve => resolve({success: true, message: "It's works"}));
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      // Create FormData for API request (useful for file uploads)
      const apiFormData = new FormData();
      apiFormData.append("name", formData.name);
      apiFormData.append("price", formData.price.toString());
      apiFormData.append("description", formData.description);
      
      // Append each file
      formData.images.forEach((file, index) => {
        apiFormData.append(`image_${index}`, file);
      });
      
      // Make API call
      const response = await submitToAPI(formData);
      
      if (response.success) {
        setSubmitMessage({type: 'success', message: response.message});
        // Reset form on success if needed
        // setFormData({ name: "", price: 0, description: "", images: [] });
      } else {
        setSubmitMessage({type: 'error', message: response.message});
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error', 
        message: "An error occurred while creating the service."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Service Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Service Name</label>
            <Input 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange} 
              placeholder="Enter service name" 
              className="rounded-lg bg-white"
              required
            />
          </div>

          {/* Price Field */}
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">Price</label>
            <Input 
              id="price"
              name="price"
              type="number"
              value={formData.price || ''} 
              onChange={handleInputChange}
              placeholder="Enter price" 
              className="rounded-lg bg-white"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <TextArea 
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your service"
              required
            />
          </div>

          {/* File Upload Field */}
          <div className="space-y-2">
            <label htmlFor="images" className="text-sm font-medium">Images</label>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-center w-full">
                <label 
                  htmlFor="dropzone-file" 
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <Input 
                    id="dropzone-file"
                    name="images"
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden"
                  />
                </label>
              </div>
              
              {/* Display selected files */}
              {formData.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Selected Files:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {formData.images.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="relative group">
                        <div className="bg-gray-100 rounded-lg p-2 overflow-hidden text-sm">
                          {file.type.startsWith('image/') && (
                            <div className="w-full h-24 relative">
                              <img 
                                src={URL.createObjectURL(file)} 
                                alt={file.name} 
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                          )}
                          <p className="mt-1 text-xs truncate">{file.name}</p>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 rounded-full bg-red-500 text-white p-1 opacity-80 hover:opacity-100"
                            aria-label="Remove file"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Message */}
          {submitMessage && (
            <div className={`p-3 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {submitMessage.message}
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Service..." : "Create Service"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

