import useToggle from "@/hooks/useToggle";
import CreateFeedModal from "@/components/modals/CreateFeedModal";
import IconAdd from "@/assets/images/add.component.svg";

const CreateFeed = () => {
  const [isCreateVisible, toggleCreate] = useToggle();

  const handleClose = () => toggleCreate(false);

  return (
    <div className="w-fit	rounded-full bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg fixed bottom-8 right-8 md:bottom-20 md:right-20 z-50">
      <button
        type="button"
        className="font-bold text-xl bg-white p-4 rounded-full text-blue-500"
        onClick={() => toggleCreate(true)}
      >
        <IconAdd />
      </button>
      {isCreateVisible && <CreateFeedModal onClose={handleClose} />}
    </div>
  );
};

export default CreateFeed;
