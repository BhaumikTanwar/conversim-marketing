import type { ReactNode } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Overrides the default max-w-2xl - pass a narrower class for small, single-purpose forms. */
  maxWidthClassName?: string;
}

export default function Modal({ isOpen, onClose, children, maxWidthClassName = "max-w-2xl" }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className={cn("w-full gap-0 border-0 bg-transparent p-0 shadow-none overflow-visible", maxWidthClassName)}
      >
        <DialogTitle className="sr-only">Dialog</DialogTitle>
        <DialogClose
          aria-label="Close"
          className="absolute top-2 right-2 md:-top-3 md:-right-3 z-20 w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </DialogClose>
        {children}
      </DialogContent>
    </Dialog>
  );
}
