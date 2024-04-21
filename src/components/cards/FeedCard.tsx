import { useState, Dispatch, SetStateAction } from "react";

import { Player } from "@lottiefiles/react-lottie-player";
import lottieJson from "@/assets/animations/lottie.json";
import { useMediaQuery } from "usehooks-ts";

import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import { themeColors } from "@/core/theme";

import { IFeedItem } from "@/components/lists/FeedList";

type Props = {
  id?: number;
  data: IFeedItem;
  setCardDrivenProps: Dispatch<SetStateAction<any>>;
  setIsDragging: Dispatch<SetStateAction<any>>;
  isDragging: boolean;
  setIsDragOffBoundary: Dispatch<SetStateAction<any>>;
};

const FeedCard = ({
  id,
  data,
  setCardDrivenProps,
  setIsDragging,
  isDragging,
  setIsDragOffBoundary,
}: Props) => {
  const [imgLoadingComplete, setImgLoadingComplete] = useState(false);

  console.log({ data, imgLoadingComplete });

  const { imageCaption, imageSrc } = data;
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
  // let drivenBg = useTransform(x, inputX, outputMainBgColor);
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
        id={`cardDrivenWrapper-${id}`}
        className="absolute bg-white p-8 rounded-lg text-center w-full aspect-[100/150] pointer-events-none text-black origin-bottom shadow-card select-none"
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
        }}
      >
        <div
          id="illustration"
          className="w-full mx-auto max-w-[250px] aspect-square rounded-full relative"
        >
          <div
            id="imgPlaceholder"
            className="bg-gameSwipe-neutral absolute object-cover w-full h-full"
            style={{
              maskImage: `url('/')`,
              WebkitMaskImage: `url(/images/placeholder.png)`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          ></div>
          <img
            className={`absolute object-cover object-center ${
              imgLoadingComplete ? "opacity-100" : "opacity-0"
            } duration-500 ease-out`}
            src={imageSrc}
            sizes={`(max-width: 768px) 100vw, 250px`}
            alt="car"
            style={{
              maskImage: `url('/images/placeholder.png')`,
              WebkitMaskImage: `url(/images/placeholder.png)`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
            onLoad={(img) => setImgLoadingComplete(true)}
          />
        </div>
        <p id="affirmation" className="mt-2 text-[20px] leading-tight">
          {imageCaption}
        </p>
      </motion.div>

      <motion.div
        id={`cardDriverWrapper-${id}`}
        className={`absolute w-full aspect-[100/150] ${
          !isDragging ? "hover:cursor-grab" : ""
        }`}
        drag="x"
        dragSnapToOrigin
        dragElastic={isMobile ? 0.2 : 0.06}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_, info) => {
          const offset = info.offset.x;

          if (offset < 0 && offset < offsetBoundary * -1) {
            setIsDragOffBoundary("left");
          } else if (offset > 0 && offset > offsetBoundary) {
            setIsDragOffBoundary("right");
          } else {
            setIsDragOffBoundary(null);
          }
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          setIsDragOffBoundary(null);
          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
          const direction = info.offset.x > 0 ? "right" : "left";

          if (isOffBoundary) {
            // setGame({
            //   ...game,
            //   cards: game.cards.slice(0, -1),
            // });
          }
        }}
        style={{ x }}
      ></motion.div>
    </>
  );
};

export default FeedCard;
