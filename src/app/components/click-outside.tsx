import React, { useEffect, useRef } from "react";

interface ClickOutsideComponentProps {
  onClose: (event: MouseEvent) => void;
  children: React.ReactNode;
}

const ClickOutside: React.FC<ClickOutsideComponentProps> = ({
  onClose,
  children,
}) => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        onClose(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return <div ref={componentRef}>{children}</div>;
};

export default ClickOutside;