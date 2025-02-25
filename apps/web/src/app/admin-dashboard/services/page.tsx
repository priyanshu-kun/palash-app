import { ServiceList } from "@/app/components/admin-dashboard/services/ServiceList"
import { ServiceCard } from "@/app/components/service-card/ServiceCard"
import { PrimaryButton as Button } from "@/app/components/ui/buttons/index"
// import { ServiceList } from "@/components/services/service-list"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        <div className="flex items-center space-x-2">
          <Link href="/admin-dashboard/services/new">
            <Button>Add New Service</Button>
          </Link>
        </div>
      </div>
      <ServiceList />
    </div>
  )
}

