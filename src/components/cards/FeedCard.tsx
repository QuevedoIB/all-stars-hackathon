import { Dispatch, SetStateAction, useContext } from "react";

import { useMediaQuery } from "usehooks-ts";

import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import { themeColors } from "@/core/theme";

import { AppContext, IFeedItem } from "@/core/AppContext";
import useToggle from "@/hooks/useToggle";

type Props = {
  id?: string;
  data: IFeedItem;
  setCardDrivenProps: Dispatch<SetStateAction<any>>;
  setIsDragging: Dispatch<SetStateAction<any>>;
  isDragging: boolean;
};

const FeedCard = ({
  id,
  data,
  setCardDrivenProps,
  setIsDragging,
  isDragging,
}: Props) => {
  const [isImgLoaded, toggleImgLoaded] = useToggle();
  const { handleNextFeed } = useContext(AppContext);

  const { caption, imageSrc } = data;
  const x = useMotionValue(0);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const offsetBoundary = 150;

  const inputX = [offsetBoundary * -1, 0, offsetBoundary];
  const outputX = [-200, 0, 200];
  const outputY = [50, 0, 50];
  const outputRotate = [-40, 0, 40];
  const outputActionScaleBadAnswer = [3, 1, 0.3];
  const outputActionScaleRightAnswer = [0.3, 1, 3];
  const outputMainBgColor = [
    themeColors.gameSwipe.left,
    themeColors.gameSwipe.neutral,
    themeColors.gameSwipe.right,
  ];

  let drivenX = useTransform(x, inputX, outputX);
  let drivenY = useTransform(x, inputX, outputY);
  let drivenRotation = useTransform(x, inputX, outputRotate);
  let drivenActionLeftScale = useTransform(
    x,
    inputX,
    outputActionScaleBadAnswer
  );
  let drivenActionRightScale = useTransform(
    x,
    inputX,
    outputActionScaleRightAnswer
  );
  let drivenBg = useTransform(x, [-20, 0, 20], outputMainBgColor);

  useMotionValueEvent(x, "change", (latest) => {
    //@ts-ignore
    setCardDrivenProps((state) => ({
      ...state,
      cardWrapperX: latest,
      buttonScaleBadAnswer: drivenActionLeftScale,
      buttonScaleGoodAnswer: drivenActionRightScale,
      mainBgColor: drivenBg,
    }));
  });

  return (
    <>
      <motion.div
        className="absolute bg-white p-8 rounded-lg text-center w-full aspect-[100/150] pointer-events-none text-black origin-bottom shadow-card select-none"
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
        }}
      >
        <div className="w-full mx-auto max-w-[250px] aspect-square rounded-full relative">
          <img
            className={`absolute object-cover object-center ${
              isImgLoaded ? "opacity-100" : "opacity-0"
            } duration-500 ease-out`}
            src={imageSrc}
            sizes={`(max-width: 768px) 100vw, 250px`}
            alt="feed-outfit"
            draggable="false"
            onLoad={() => toggleImgLoaded(true)}
          />
        </div>
        <p id="affirmation" className="mt-2 text-[20px] leading-tight">
          {caption}
        </p>
      </motion.div>

      <motion.div
        className={`absolute w-full aspect-[100/150] ${
          !isDragging ? "hover:cursor-grab" : ""
        }`}
        drag="x"
        dragSnapToOrigin
        dragElastic={isMobile ? 0.2 : 0.06}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
          const direction = info.offset.x > 0 ? "right" : "left";
          // api call with feed id and swipe direction to upvote / pass

          if (isOffBoundary) {
            handleNextFeed();
          }
        }}
        style={{ x }}
      ></motion.div>
    </>
  );
};

export default FeedCard;