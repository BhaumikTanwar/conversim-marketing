import { EASE } from "../../../lib/animations";
import { useState, type SubmitEvent } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { motion, AnimatePresence } from "framer-motion";

interface SectorCampaignFormProps {
  eyebrow: string;
  heading: string;
  subtext: string;
  companyPlaceholder: string;
  secondaryField: { label: string; placeholder: string };
  teamUnitLabel: string;
}

interface CampaignFormState {
  company: string;
  email: string;
  secondary: string;
  teamSize: string;
  message: string;
}

const TEAM_SIZES = ["1-10", "11-50", "51-200", "200+"];

export default function SectorCampaignForm({
  heading,
  subtext,
  companyPlaceholder,
  secondaryField,
  teamUnitLabel,
}: SectorCampaignFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<CampaignFormState>({
    company: "",
    email: "",
    secondary: "",
    teamSize: TEAM_SIZES[0],
    message: "",
  });

  function update<K extends keyof CampaignFormState>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="campaign" className="px-4 sm:px-6 lg:px-8 py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="max-w-3xl mx-auto bg-aurora-surface border border-aurora-border rounded-3xl p-6 sm:p-10 shadow-[0_24px_60px_-28px_rgba(29,28,24,0.25)]"
      >
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.14, ease: EASE }}
          className="text-2xl md:text-3xl font-semibold text-aurora-text tracking-tight mb-2"
        >
          {heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.38, delay: 0.18, ease: EASE }}
          className="text-sm text-aurora-text-2"
        >
          {subtext}
        </motion.p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.38, ease: EASE }}
              className="mt-8 flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4"
            >
              <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-sm">check</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-800">Campaign request received</p>
                <p className="mt-1 text-sm text-aurora-text-2">
                  We'll follow up at {form.email || "your work email"} within one business day.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input required value={form.company} onChange={update("company")} placeholder={companyPlaceholder} />
                <Input required type="email" value={form.email} onChange={update("email")} placeholder="Work email" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input value={form.secondary} onChange={update("secondary")} placeholder={secondaryField.placeholder} />
                <Select value={form.teamSize} onValueChange={(value) => setForm((f) => ({ ...f, teamSize: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAM_SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size} {teamUnitLabel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <textarea
                value={form.message}
                onChange={update("message")}
                placeholder="Anything else we should know?"
                rows={4}
                className="w-full bg-aurora-surface-2 border border-aurora-border rounded-xl px-5 py-3 text-sm text-aurora-text outline-none transition-all placeholder:text-aurora-text-3 focus:border-brand focus:bg-aurora-surface focus:ring-2 focus:ring-indigo-100 resize-none shadow-2xs"
              />

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="w-full shadow-md">
                  Request Campaign Setup
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
