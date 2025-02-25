import { ServiceCard } from "@/app/components/service-card/ServiceCard"
import type { Service } from "@/app/@types/interface"
import YogaImg from "@/app/assets/yoga.jpg";
import MedatationImg from "@/app/assets/medatation.jpg";
import WellnessImg from "@/app/assets/wellness-services-img.jpg";
import Navbar from "../components/layout/Navbar";

// This would typically come from your database
const services: Service[] = [
  {
    id: "1",
    name: "Meditation Session",
    description:
      "Experience deep relaxation and mindfulness with our guided meditation sessions. Perfect for beginners and experienced practitioners alike.",
    price: 49.99,
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    reviews: [
      {
        id: "r1",
        name: "Sarah Johnson",
        rating: 5,
        comment: "Amazing session! Really helped me relax and center myself.",
        date: "2024-02-20",
      }
    ],
  },
  {
    id: "2",
    name: "Yoga Class",
    description:
      "Join our expert-led yoga classes suitable for all levels. Focus on flexibility, strength, and inner peace.",
    price: 39.99,
    image: "https://images.pexels.com/photos/355863/pexels-photo-355863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    reviews: [
      {
        id: "r3",
        name: "Emily White",
        rating: 5,
        comment: "The best yoga class I've ever taken! Very attentive instructor.",
        date: "2024-02-19",
      },
    ],
  },
  {
    id: "3",
    name: "Wellness Consultation",
    description: "Get personalized advice on nutrition, exercise, and lifestyle changes for optimal well-being.",
    price: 89.99,
    image: "https://images.pexels.com/photos/2529375/pexels-photo-2529375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    reviews: [
      {
        id: "r4",
        name: "David Brown",
        rating: 4,
        comment: "Very informative session. Got great tips for improving my lifestyle.",
        date: "2024-02-17",
      },
    ],
  },
]

export default function Page() {
  return (
    <div className="container mx-auto py-12">
      <Navbar />
      <h1 className="text-xl font-bold  mb-8 mt-32 underline opacity-80 ml-4">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

