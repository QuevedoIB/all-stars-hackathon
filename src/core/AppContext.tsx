import { useState, useCallback, createContext, PropsWithChildren } from "react";

import model1 from "/images/models/zara-model-1.jpg";
import model2 from "/images/models/zara-model-2.jpg";
import model3 from "/images/models/zara-model-3.jpg";
import model4 from "/images/models/zara-model-4.jpg";

export interface IUser {}

export interface IFeedItem {
  id: string;
  imageSrc: string;
  caption?: string;
  title?: string;
}

interface IAppContext {
  user: IUser;
  feed: IFeedItem[];
  handleNextFeed: () => void;
}

const initialStore = { user: {}, feed: [] };

export const AppContext = createContext<IAppContext>(
  initialStore as unknown as IAppContext
);

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

const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState({});
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

  return (
    <AppContext.Provider value={{ user, feed, handleNextFeed }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
