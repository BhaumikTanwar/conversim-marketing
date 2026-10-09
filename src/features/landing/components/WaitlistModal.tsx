import { useState, type SubmitEvent } from "react";
import { Button } from "@/shared/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/shared/ui/dialog";

interface WaitlistModalProps {
  onClose: () => void;
}

export default function WaitlistModal({ onClose }: WaitlistModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-[0_24px_80px_rgba(29,28,24,0.15)]">
      <DialogHeader className="mb-6 md:mb-8 gap-3">
        <DialogTitle className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight leading-tight">
          Ready to Elevate?
        </DialogTitle>
        <DialogDescription className="text-sm text-slate-600 leading-relaxed">
          Join the waitlist to get early access and start building your custom simulation library.
        </DialogDescription>
      </DialogHeader>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-emerald-600 text-2xl">check_circle</span>
            <p className="text-emerald-800 font-semibold">You're on the list!</p>
          </div>
          <p className="text-slate-600 text-sm">
            Hey <span className="text-slate-900 font-medium">{name}</span>, we'll reach out to{" "}
            <span className="text-slate-900 font-medium">{email}</span> when early access opens.
          </p>
          <Button variant="secondary" className="mt-5 px-6" onClick={onClose}>
            Close
          </Button>
        </div>
      ) : (
        <>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                autoFocus
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all shadow-2xs"
                placeholder="Your name"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all shadow-2xs"
                placeholder="Work email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-hover text-white font-semibold py-3 rounded-xl text-sm transition-colors shadow-[0_4px_16px_rgba(37,99,235,0.3)] active:scale-[0.97]"
            >
              Join Waitlist
            </button>
          </form>

          <p className="text-xs text-slate-500 mt-4">No spam. Unsubscribe at any time.</p>
        </>
      )}
    </div>
  );
}
