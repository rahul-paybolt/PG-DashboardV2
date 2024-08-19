"use client";
import { ToastType } from "@/lib/enum/toast";
import ErrorIcon from "@/public/assests/Icon/ErrorIcon";
import HintIcon from "@/public/assests/Icon/HintIcon";
import SuccessIcon from "@/public/assests/Icon/SuccessIcon";
import WarnIcon from "@/public/assests/Icon/WarnIcon";
import { useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
interface ToastProps {
  open: boolean;
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  open,
  message,
  type,
  onClose,
  duration,
}) => {
  console.log(
    "Message inside toast compoenents",
    message,
    "type-inside component",
    type
  );
  const _defaultDuration = 3000;
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Map each toast type to its corresponding icon
  const toastClasses: Record<ToastType, JSX.Element> = {
    hint: <HintIcon />,
    success: <SuccessIcon />,
    warn: <WarnIcon />,
    error: <ErrorIcon />,
  };

  // Effect to handle the toast auto-close functionality
  useEffect(() => {
    if (open && message) {
      // Clear any existing timeout to reset the timer
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout to close the toast after the duration
      const id = setTimeout(() => {
        handleClose();
      }, duration || _defaultDuration);

      setTimeoutId(id);
    }

    // Cleanup function to clear timeout when component unmounts or dependencies change
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Function to handle manual toast close
  const handleClose = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    onClose();
  };

  // Return null if the toast is not open
  if (!open) return null;

  return (
    <div className=" flex items-center justify-center">
      <Popover
        placement="top"
        isOpen={open}
        classNames={{
          base: [
            // arrow color
            "flex items-center justify-center ",
          ],
          content: [
            "py-3 px-4 border border-default-200",
            "bg-gradient-to-br from-white to-default-300",
            "dark:from-default-100 dark:to-default-50",
          ],
        }}
        onOpenChange={handleClose}
      >
        <PopoverContent>
          <PopoverTrigger>
            <div className="flex items-center gap-x-4">
              {toastClasses[type]}
              <p className="font-medium text-white text-sm capitalize">
                {message}
              </p>
            </div>
          </PopoverTrigger>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Toast;
