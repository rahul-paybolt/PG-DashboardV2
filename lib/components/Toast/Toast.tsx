import React, { useEffect, useState } from "react";
import { ToastType } from "@/lib/enum/toast";
import HintIcon from "@/public/assests/Icon/HintIcon";
import CrossCloseIcon from "@/public/assests/Icon/CrossCloseIcon";
import SuccessIcon from "@/public/assests/Icon/SuccessIcon";
import WarnIcon from "@/public/assests/Icon/WarnIcon";
import ErrorIcon from "@/public/assests/Icon/ErrorIcon";
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
  const _defaultDuration = 5000;
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const toastClasses: Record<ToastType, JSX.Element> = {
    hint: <HintIcon />,
    success: <SuccessIcon />,
    warn: <WarnIcon />,
    error: <ErrorIcon />,
  };

  useEffect(() => {
    if (open && message) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(() => {
        handleClose();
      }, duration || _defaultDuration);
      setTimeoutId(id);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [open, message, duration, timeoutId]);

  const handleClose = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="min-w-80 bg-default-900 absolute bottom-4 z-max left-1/2 transform -translate-x-1/2 text-transparent inline-flex px-4 py-3 rounded items-center justify-between space-x-5">
      <div className="flex items-center">
        {toastClasses[type]}
        <p className="font-medium text-white text-sm capitalize">{message}</p>
      </div>
      <div className="flex items-center justify-center" onClick={handleClose}>
        <CrossCloseIcon />
      </div>
    </div>
  );
};

export default Toast;
