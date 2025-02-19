"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import Carda from "@/app/assets/card_a.png";
import Cardb from "@/app/assets/card_b.png";
import Cardc from "@/app/assets/card_c.png";
import Cardd from "@/app/assets/card_d.png";
import Carde from "@/app/assets/card_e.png";
import { PrimaryButton } from '../ui/buttons';
import { ArrowBigRight, ArrowRight } from 'lucide-react';
// import { Card } from '@/app/components/ui/card/Card';

const StackedCards = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const cards = [
    { id: 1, img: Carda, offset: 0, text: "Medatation" },
    { id: 2, img: Cardb, offset: 186, text: "Spiritual" },
    { id: 3, img: Cardc, offset: 366, text: "Yoga" },
    { id: 4, img: Cardd, offset: 546, text: "Social Sh" },
    { id: 5, img: Carde, offset: 750, text: "Yoga" }
  ];

  return (
    <div className="w-full  max-w-[1200px] mx-auto p-8 mt-12">
      <div className="relative h-80 w-full   ">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ x: card.offset, y: 0 }}
            animate={{
              x: card.offset,
              y: hoveredId === card.id ? -16 : 0,
              zIndex: hoveredId === card.id ? 50 : card.id,
              scale: hoveredId === card.id ? 1.05 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            whileHover={{ cursor: "pointer" }}
            onHoverStart={() => setHoveredId(card.id)}
            onHoverEnd={() => setHoveredId(null)}
            className="absolute top-0"
          >
            <motion.div
              initial={{ rotateZ: 0 }}
              animate={{ 
                rotateZ: hoveredId === card.id ? 0 : Math.random() * 2 - 1 
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <div className={`w-96 h-80 border border-solid border-gray-300 bg-white  rounded-xl`}>
                <motion.div 
                  className=" text-white relative h-full flex items-center justify-center"
                //   animate={{
                //     boxShadow: hoveredId === card.id 
                //       ? "0 20px 25px -5px rgb(0 0 0 / 0.2)" 
                //       : "0 4px 6px -1px rgb(0 0 0 / 0.2)",
                //   }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    <Image src={card.img} className='absolute bg-cover bg-center w-[350px] h-[300px] ' alt="card-a" />
                    <PrimaryButton className='absolute top-4 right-4 bg-secondary_button'>
                        <ArrowRight />
                    </PrimaryButton>
                    <span className='font-semibold text-sm text-gray-800 absolute bottom-4 left-3'>{card.text}</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StackedCards;