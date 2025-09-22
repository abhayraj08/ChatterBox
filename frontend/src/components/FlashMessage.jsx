
import { useEffect } from "react";

export default function FlashMessage({ message, type = "error", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 3000); // auto close in 3 sec
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        padding: "12px 20px",
        background: type === "error" ? "#f44336" : "#4caf50",
        color: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
}
