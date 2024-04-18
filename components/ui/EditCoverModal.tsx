import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/Dialog";
import ImageSelector from "@/components/ui/ImageSelector";
import ImageUpload from "@/components/ui/ImageUpload";
import { useImage } from "./ImageContext";

interface EditCoverModalProps {
  cardSlot: number;
  onSave: (cardSlot: number, imageUrl: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const EditCoverModal: React.FC<EditCoverModalProps> = ({
  cardSlot,
  onSave,
  isOpen,
  setIsOpen,
}) => {
  const { selectedImage } = useImage();

  const handleSave = () => {
    setIsOpen(false);
    onSave(cardSlot, selectedImage);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Cover Image</DialogTitle>
        </DialogHeader>
        <ImageSelector />
        <ImageUpload />
        <DialogFooter className="">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md border w-full max-w-sm border-black bg-neutral-100 text-neutral-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,100,0,0.25)] transition duration-200"
          >
            Save Changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCoverModal;
