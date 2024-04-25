import { useContext, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import Background from "@/components/common/Background/Background";
import { themeColors, easeOut } from "@/core/theme";
import FeedCard from "@/components/cards/FeedCard";
import { DirectionType } from "@/types/common";
import CreateFeed from "@/components/buttons/CreateFeedButton";
import { AppContext } from "@/core/AppContext";

const FeedList = () => {
  const { feed } = useContext(AppContext);
  const [direction, setDirection] = useState<DirectionType | "">("");
  const [backgroundColor, setBackgroundColor] = useState(
    themeColors.gameSwipe.neutral
  );
  const [isDragging, setIsDragging] = useState(false);

  const cardVariants = {
    current: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: easeOut },
    },
    upcoming: {
      opacity: 0.5,
      y: 67,
      scale: 0.9,
      transition: { duration: 0.3, ease: easeOut, delay: 0 },
    },
    remainings: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    exit: {
      opacity: 0,
      x: direction === "left" ? -300 : 300,
      y: 40,
      rotate: direction === "left" ? -20 : 20,
      transition: { duration: 0.3, ease: easeOut },
    },
  };

  return (
    <>
      <motion.div
        className={`flex flex-1 p-5 flex-col justify-center items-center overflow-hidden  ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        style={{ backgroundColor }}
      >
        <Background />

        <div className="flex flex-col gap-6 w-full items-center justify-center relative z-10">
          <div className="w-full aspect-[100/150] max-w-lg max-h-96 mb-[20px] relative z-10">
            <AnimatePresence>
              {feed.map((item, i) => {
                const isLast = i === feed.length - 1;
                const isUpcoming = i === 1;
                return (
                  <motion.div
                    key={item.id}
                    className="relative"
                    variants={cardVariants}
                    initial="remainings"
                    animate={
                      isLast
                        ? "current"
                        : isUpcoming
                        ? "upcoming"
                        : "remainings"
                    }
                    exit="exit"
                  >
                    <FeedCard
                      data={item}
                      setBackgroundColor={setBackgroundColor}
                      setIsDragging={setIsDragging}
                      setDirection={setDirection}
                      isDragging={isDragging}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      <CreateFeed />
    </>
  );
};

export default FeedList;
