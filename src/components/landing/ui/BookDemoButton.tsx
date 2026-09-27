import type { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";

interface BookDemoButtonProps {
  children: ReactNode;
  className?: string;
}

export function BookDemoButton({ children, className }: BookDemoButtonProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate({ to: "/book-demo" });
  };

  return (
    <button onClick={handleClick} className={className} type="button">
      {children}
    </button>
  );
}
