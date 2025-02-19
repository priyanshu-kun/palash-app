import React from 'react'
import Image from "next/image";
import WellnessPath from "@/app/assets/wellnes_path.png";

function HowItsWork() {
    return (
        <div className="min-h-screen mt-8  p-6 flex items-center justify-center">
            <div className=" w-full max-w-[1000px] mx-auto ">
                <div className="relative bg-transparent  flex  p-8 overflow-hidden">


                    <div className='w-[800px] h-96 relative   '>
                        <Image src={WellnessPath} alt="wellness path" className='w-full h-full top-0 absolute' />
                    </div>


                    {/* Content */}
                    <div className="relative">


                        <div className="space-y-8">
                            {/* Step 1 */}
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-14 h-14 -ml-7 mt-4 rounded-full bg-[#E5C9BC] flex items-center justify-center text-[#1B4B44] font-medium">
                                    1
                                </div>
                                <div>
                                    <h2 className="text-xl text-[#E5C9BC] mb-2">Assessment</h2>
                                    <p className="text-[#9DB5B2] leading-relaxed">
                                        Our experienced therapist will assess and understand your mental health needs during counseling
                                        through some tests.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-14 h-14 -ml-7 mt-8 rounded-full bg-[#E5C9BC] flex items-center justify-center text-[#1B4B44] font-medium">
                                    2
                                </div>
                                <div>
                                    <h2 className="text-xl text-[#E5C9BC] mb-2">Sessions</h2>
                                    <p className="text-[#9DB5B2] leading-relaxed">
                                        We will decide on regular counseling or group support and execute based on the health test curated
                                        by our expert therapist.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-14 h-14 -ml-7 mt-7 rounded-full bg-[#E5C9BC] flex items-center justify-center text-[#1B4B44] font-medium">
                                    3
                                </div>
                                <div>
                                    <h2 className="text-xl text-[#E5C9BC] mb-2">Tracking</h2>
                                    <p className="text-[#9DB5B2] leading-relaxed">
                                        The therapist assigned to your case will monitor and adjust your therapy session progress to make
                                        sure you get the best experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItsWork