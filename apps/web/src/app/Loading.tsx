// "use client"
// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';

// const LoadingScreen = ({ children }: { children: React.ReactNode }) => {
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     // Listen for page load complete
//     const handleComplete = () => {
//       // Add a small delay to ensure smooth transition
//       setTimeout(() => setLoading(false), 800);
//     };

//     // Check if the window is already loaded
//     if (document.readyState === 'complete') {
//       handleComplete();
//     } else {
//       window.addEventListener('load', handleComplete);
//       // Also handle route changes in Next.js
//       router.events.on('routeChangeComplete', handleComplete);
//       router.events.on('routeChangeError', handleComplete);
//     }

//     return () => {
//       window.removeEventListener('load', handleComplete);
//       router.events.off('routeChangeComplete', handleComplete);
//       router.events.off('routeChangeError', handleComplete);
//     };
//   }, [router]);

//   return (
//     <>
//       <AnimatePresence mode="wait">
//         {loading && (
//           <motion.div
//             initial={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900"
//           >
//             <div className="w-full max-w-md px-8 space-y-6">
//               {/* Progress circle animation */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="flex justify-center"
//               >
//                 <svg className="w-16 h-16" viewBox="0 0 50 50">
//                   <motion.circle
//                     cx="25"
//                     cy="25"
//                     r="20"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                     strokeLinecap="round"
//                     initial={{ pathLength: 0 }}
//                     animate={{ pathLength: 1 }}
//                     transition={{
//                       duration: 1.5,
//                       repeat: Infinity,
//                       ease: "linear"
//                     }}
//                     className="text-blue-500"
//                   />
//                 </svg>
//               </motion.div>

//               {/* Loading text */}
//               <motion.p
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 className="text-center text-gray-600 dark:text-gray-400 text-sm font-light"
//               >
//                 Loading your experience...
//               </motion.p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//       {children}
//     </>
//   );
// };

// export default LoadingScreen;

import React from 'react'

function Loading() {
  return (
    <div>Loading</div>
  )
}

export default Loading