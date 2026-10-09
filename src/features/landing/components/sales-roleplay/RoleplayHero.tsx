import { useState, type SubmitEvent } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

const inputClass =
  "bg-aurora-surface-2 border border-aurora-border rounded-xl px-4 py-3 text-sm text-aurora-text placeholder:text-aurora-text-3 focus:border-brand focus:bg-aurora-surface transition-colors";

export default function RoleplayHero() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    jobTitle: "",
    company: "",
    website: "",
    city: "",
    requirement: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="flex items-center justify-center py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-aurora-cyan/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1280px] 2xl:max-w-[1440px] 3xl:max-w-[1760px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center w-full relative z-10">
        <div className="flex flex-col gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md px-3.5 py-1.5 w-fit shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-POWERED SALES ROLEPLAY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-aurora-text tracking-tight leading-[1.1]"
          >
            An AI roleplay platform for{" "}
            <span className="text-brand">
              sales training.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="text-base sm:text-lg lg:text-xl text-aurora-text-2 leading-relaxed max-w-xl"
          >
            Simulate real sales conversations, practice objection handling, and sharpen selling skills with
            hyper-realistic AI avatars.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-aurora-surface border border-aurora-border rounded-2xl shadow-lg overflow-hidden"
        >
          {submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-10 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-semibold text-aurora-text">Request Received!</h3>
              <p className="text-sm text-aurora-text-2">
                Thanks, <span className="font-semibold text-aurora-text">{form.firstName}</span>. We will reach out to
                you at <span className="font-semibold text-aurora-text">{form.email}</span> soon.
              </p>
            </motion.div>
          ) : (
            <form className="p-6 md:p-8 flex flex-col gap-4" onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold text-aurora-text mb-1">See Conversim In Action</h2>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  className={inputClass}
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={update("firstName")}
                  required
                />
                <Input
                  className={inputClass}
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={update("lastName")}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  className={inputClass}
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={update("phone")}
                />
                <Input
                  className={inputClass}
                  type="email"
                  placeholder="Business Email"
                  value={form.email}
                  onChange={update("email")}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  className={inputClass}
                  placeholder="Job Title"
                  value={form.jobTitle}
                  onChange={update("jobTitle")}
                />
                <Input
                  className={inputClass}
                  placeholder="Company Name"
                  value={form.company}
                  onChange={update("company")}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  className={inputClass}
                  placeholder="Website URL"
                  value={form.website}
                  onChange={update("website")}
                />
                <Input
                  className={inputClass}
                  placeholder="City / Location"
                  value={form.city}
                  onChange={update("city")}
                />
              </div>

              <Textarea
                className={`${inputClass} resize-none`}
                rows={3}
                placeholder="What sales training challenges are you looking to solve?"
                value={form.requirement}
                onChange={update("requirement")}
              />

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full py-6 text-sm font-semibold bg-brand hover:bg-brand-hover text-white gap-2 shadow-md"
                >
                  Get Free Demo <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
