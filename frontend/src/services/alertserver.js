import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

export default function AlertToast({ type = "success", message, onClose }) {
  if (!message) return null;

  const alertTypes = {
    success: {
      style: "alert-success",
      icon: <CheckCircle2 className="size-5" />,
    },
    error: {
      style: "alert-error",
      icon: <XCircle className="size-5" />,
    },
    warning: {
      style: "alert-warning",
      icon: <AlertTriangle className="size-5" />,
    },
    info: {
      style: "alert-info",
      icon: <Info className="size-5" />,
    },
  };

  const currentType = alertTypes[type] || alertTypes.info;

  return (
    <div className="toast toast-end toast-top z-50">
      <div
        className={`alert ${currentType.style} shadow-lg flex items-center gap-2`}
      >
        {currentType.icon}
        <span>{message}</span>
        {onClose && (
          <button onClick={onClose} className="btn btn-xs btn-ghost btn-circle">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
