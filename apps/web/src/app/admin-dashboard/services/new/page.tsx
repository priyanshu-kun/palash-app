import { ServiceForm } from "@/app/components/admin-dashboard/services/ServiceForm";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function NewServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-16 mt-6 w-[64%] mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl flex items-center gap-2">
          <Link href="/admin-dashboard/services" className="text-gray-500 p-2 rounded-full  hover:bg-black/10 transition-colors">
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          Create New Service</h1>
        <p className="mt-2 text-gray-600">Add a new wellness service to your offerings</p>
      </div>
      <ServiceForm />
    </div>
  )
}
