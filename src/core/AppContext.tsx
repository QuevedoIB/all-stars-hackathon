import { useState, useCallback, createContext, PropsWithChildren } from "react";

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
    imageSrc: "/images/models/zara-model-1.jpg",
    title: "Elegant",
    caption: "Look at this georgeous dress for those special meetups!",
  },
  {
    id: "feed-2",
    imageSrc: "/images/models/zara-model-2.jpg",
    title: "Summer vibes",
    caption: "Don't miss the opportunity to wear this cool clothers",
  },
  {
    id: "feed-3",
    imageSrc: "/images/models/zara-model-3.jpg",
    title: "Amazing",
    caption: "Glad I found this combined clothes",
  },
  {
    id: "feed-4",
    imageSrc: "/images/models/zara-model-4.jpg",
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
