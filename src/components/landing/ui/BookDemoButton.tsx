import type { ReactNode } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";

interface BookDemoButtonProps {
  children: ReactNode;
  className?: string;
}

export function BookDemoButton({ children, className }: BookDemoButtonProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (user) {
      navigate({ to: "/book-demo" });
      return;
    }

    setShowModal(true);
    setTimeout(() => {
      navigate({ to: "/login", search: { redirect: "/book-demo" } });
    }, 6000);
  };

  return (
    <>
      <button onClick={handleClick} className={className}>
        {children}
      </button>
      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-display text-2xl text-ink">Please sign in to book a demo</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You need to be signed in to access the demo booking page. Redirecting you to the login page shortly...
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="h-1 w-1 animate-pulse rounded-full bg-primary" />
          <div className="h-1 w-1 animate-pulse rounded-full bg-primary [animation-delay:200ms]" />
          <div className="h-1 w-1 animate-pulse rounded-full bg-primary [animation-delay:400ms]" />
        </div>
      </div>
    </div>
  );
}
