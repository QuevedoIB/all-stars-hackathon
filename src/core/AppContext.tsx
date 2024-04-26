import { useState, useCallback, createContext, PropsWithChildren } from "react";
import { v4 as uuidv4 } from "uuid";

import model1 from "/images/models/zara-model-1.jpg";
import model2 from "/images/models/zara-model-2.jpg";
import model3 from "/images/models/zara-model-3.jpg";
import model4 from "/images/models/zara-model-4.jpg";

export interface IUser {
  achievements: IAchievement[];
}

export interface IFeedItem {
  id: string;
  imageSrc: string;
  caption?: string;
  title?: string;
}

export interface IAchievement {
  id: string;
  title: string;
  prize: string;
  isObtained?: boolean;
  value: number;
}

const achievements: IAchievement[] = [
  {
    id: "achievement-1",
    title: "5% voucher",
    prize: uuidv4(),
    isObtained: true,
    value: 1000,
  },
  {
    id: "achievement-2",
    title: "10% voucher",
    prize: uuidv4(),
    isObtained: false,
    value: 2500,
  },
  {
    id: "achievement-3",
    title: "15% voucher",
    prize: uuidv4(),
    isObtained: false,
    value: 5000,
  },
  {
    id: "achievement-4",
    title: "20% voucher",
    prize: uuidv4(),
    isObtained: false,
    value: 7500,
  },
  {
    id: "achievement-5",
    title: "Custom bracelet",
    prize: uuidv4(),
    isObtained: false,
    value: 10000,
  },
];

interface IAppContext {
  user: IUser;
  feed: IFeedItem[];
  handleNextFeed: () => void;
  handleObtainAchievement: (id: string) => void;
}

const sampleFeeds = [
  {
    id: "feed-1",
    imageSrc: model1,
    title: "Elegant",
    caption: "Look at this georgeous dress for those special meetups!",
  },
  {
    id: "feed-2",
    imageSrc: model2,
    title: "Summer vibes",
    caption: "Don't miss the opportunity to wear this cool clothers",
  },
  {
    id: "feed-3",
    imageSrc: model3,
    title: "Amazing",
    caption: "Glad I found this combined clothes",
  },
  {
    id: "feed-4",
    imageSrc: model4,
    title: "Adventure clothes",
    caption: "Testing out this amazing pants",
  },
];

export const AppContext = createContext<IAppContext>({});

const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState({ achievements });
  const [feed, setFeed] = useState(sampleFeeds);

  const handleNextFeed = useCallback(() => {
    setFeed((curr) => {
      const updatedFeeds = curr.slice(0, -1);
      if (updatedFeeds.length === 2) {
        return [
          ...updatedFeeds,
          ...sampleFeeds.map((e, i) => ({ ...e, id: `${e.id}-${i}` })),
        ];
      }
      return updatedFeeds;
    });
  }, []);

  const handleObtainAchievement = (achievementId: string) => {
    setUser((curr) => ({
      ...curr,
      achievements: curr.achievements.map((e: IAchievement) =>
        e.id === achievementId ? { ...e, isObtained: true } : e
      ),
    }));
  };

  return (
    <AppContext.Provider
      value={{ user, feed, handleNextFeed, handleObtainAchievement }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
