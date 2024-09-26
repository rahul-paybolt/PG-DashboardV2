import { ReactNode } from "react";

const CustomModal = ({ children, onClose }: { children: ReactNode, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-96">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;