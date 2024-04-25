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
import { DirectionType } from "@/types/common";

type Props = {
  data: IFeedItem;
  setBackgroundColor: Dispatch<SetStateAction<string>>;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  setDirection: Dispatch<SetStateAction<DirectionType | "">>;
  isDragging: boolean;
};

const offsetBoundary = 150;

const inputX = [offsetBoundary * -1, 0, offsetBoundary];
const outputX = [-200, 0, 200];
const outputY = [50, 0, 50];
const outputRotate = [-40, 0, 40];
const outputMainBgColor = [
  themeColors.gameSwipe.left,
  themeColors.gameSwipe.neutral,
  themeColors.gameSwipe.right,
];

const FeedCard = ({
  data: { title, caption, imageSrc },
  setBackgroundColor,
  setIsDragging,
  setDirection,
  isDragging,
}: Props) => {
  const [isImgLoaded, toggleImgLoaded] = useToggle();
  const { handleNextFeed } = useContext(AppContext);

  const x = useMotionValue(0);

  const isMobile = useMediaQuery("(max-width: 768px)");

  let drivenX = useTransform(x, inputX, outputX);
  let drivenY = useTransform(x, inputX, outputY);
  let drivenRotation = useTransform(x, inputX, outputRotate);
  let drivenBg = useTransform(x, [-50, 0, 50], outputMainBgColor);

  useMotionValueEvent(x, "change", () => {
    //@ts-ignore
    setBackgroundColor(drivenBg);
  });

  return (
    <>
      <motion.div
        className="absolute bg-white p-8 rounded-lg w-full aspect-[100/150] pointer-events-none text-black origin-bottom shadow-card select-none max-w-lg max-h-96 "
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
        }}
      >
        <div className="flex flex-col md:flex-row h-full w-full">
          <div className="aspect-square rounded-full relative mb-8 md:mb-0 w-full md:w-6/12 flex justify-center md:justify-between">
            <img
              className={`absolute h-full object-cover object-center ${
                isImgLoaded ? "opacity-100" : "opacity-0"
              } duration-500 ease-out`}
              src={imageSrc}
              sizes={`(max-width: 768px) 100vw, 250px`}
              alt="feed-outfit"
              draggable="false"
              onLoad={() => toggleImgLoaded(true)}
            />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <span className="text-gray-800 font-semibold">John Doe</span>
              </div>
              <span className="text-xs text-gray-600">2 hours ago</span>
            </div>
            <h2 className="text-l font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-sm leading-tight">{caption}</p>
          </div>
        </div>
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
        onDrag={(_, info) => {
          const direction = info.offset.x > 0 ? "right" : "left";
          setDirection(direction);
        }}
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
      />
    </>
  );
};

export default FeedCard;
