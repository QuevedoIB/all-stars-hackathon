import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import Background from "@/components/common/Background";
import { themeColors, easeOutExpo } from "@/core/theme";
import FeedCardButton from "@/components/buttons/FeedCardButton";
import FeedCard from "@/components/cards/FeedCard";
import { DirectionType } from "@/types/common";

const initialDrivenProps = {
  cardWrapperX: 0,
  buttonScaleBadAnswer: 1,
  buttonScaleGoodAnswer: 1,
  mainBgColor: themeColors.gameSwipe.neutral,
};

export interface IFeedItem {
  id: string;
  imageSrc: string;
  imageCaption: string;
}

const cards: IFeedItem[] = [
  {
    id: "sample-id",
    imageSrc:
      "https://static9.depositphotos.com/1431107/1154/i/950/depositphotos_11542091-stock-photo-sample-stamp.jpg",
    imageCaption: "Sample image",
  },
];

const FeedList = () => {
  const [direction, setDirection] = useState<DirectionType | "">("");
  const [isDragOffBoundary, setIsDragOffBoundary] =
    useState<DirectionType | null>(null);
  const [cardDrivenProps, setCardDrivenProps] = useState(initialDrivenProps);
  const [isDragging, setIsDragging] = useState(false);

  const handleActionBtnOnClick = (btn: DirectionType) => {
    setDirection(btn);
  };

  useEffect(() => {
    if (["left", "right"].includes(direction)) {
    }

    setDirection("");
  }, [direction]);

  const cardVariants = {
    upcoming: {
      opacity: 0.5,
      y: 67,
      scale: 0.9,
      transition: { duration: 0.3, ease: easeOutExpo, delay: 0 },
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
      transition: { duration: 0.3, ease: easeOutExpo },
    },
  };

  return (
    <motion.div
      className={`flex p-5 min-h-screen h-full flex-col justify-center items-center overflow-hidden  ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      style={{ backgroundColor: cardDrivenProps.mainBgColor }}
    >
      <Background />

      <div
        id="gameUIWrapper"
        className="flex flex-col gap-6 w-full items-center justify-center relative z-10"
      >
        <div
          id="cardsWrapper"
          className="w-full aspect-[100/150] max-w-xs mb-[20px] relative z-10"
        >
          <AnimatePresence>
            {cards.map((card, i) => {
              const isUpcoming = i === cards.length - 2;
              return (
                <motion.div
                  key={`card-${i}`}
                  id={`card-${card.id}`}
                  className={`relative `}
                  variants={cardVariants}
                  initial="remainings"
                  animate={isUpcoming ? "upcoming" : "remainings"}
                  exit="exit"
                >
                  <FeedCard
                    data={card}
                    id={card.id}
                    setCardDrivenProps={setCardDrivenProps}
                    setIsDragging={setIsDragging}
                    isDragging={isDragging}
                    setIsDragOffBoundary={setIsDragOffBoundary}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div
          id="actions"
          className="flex items-center justify-center w-full  gap-4 relative z-10"
        >
          <FeedCardButton
            direction="left"
            ariaLabel="swipe left"
            scale={cardDrivenProps.buttonScaleBadAnswer}
            isDragOffBoundary={isDragOffBoundary}
            onClick={() => handleActionBtnOnClick("left")}
          />
          <FeedCardButton
            direction="right"
            ariaLabel="swipe right"
            scale={cardDrivenProps.buttonScaleGoodAnswer}
            isDragOffBoundary={isDragOffBoundary}
            onClick={() => handleActionBtnOnClick("right")}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default FeedList;
