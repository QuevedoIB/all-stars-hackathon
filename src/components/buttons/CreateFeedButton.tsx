import { useMediaQuery } from "usehooks-ts";

import useToggle from "@/hooks/useToggle";
import CreateFeedModal from "@/components/modals/CreateFeedModal";

const CreateFeed = () => {
  const [isCreateVisible, toggleCreate] = useToggle();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleClose = () => toggleCreate(false);

  return (
    <div className="flex max-w-sm rounded-xl bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg">
      <button
        type="button"
        className="flex-1 font-bold text-xl bg-white px-6 py-3 rounded-xl"
        onClick={() => toggleCreate(true)}
      >
        Add new feed
      </button>
      {isCreateVisible && <CreateFeedModal onClose={handleClose} />}
    </div>
  );
};

export default CreateFeed;
