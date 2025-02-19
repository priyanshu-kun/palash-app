import Image from "next/image"
import { SignUpForm } from "@/app/components/forms/sign-up-form"
import Logo from "@/app/assets/logo-light.png";

export default function Page() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#fffefe] p-4 md:p-6">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="relative mx-auto mb-6 h-12 w-32">
          <Image
              src={Logo}
              alt="PALASH"
              className="object-contain"
            />
          </div>
        </div>
        <SignUpForm />
      </div>
    </main>
  )
}

