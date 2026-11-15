import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { storyblokEditable } from "@storyblok/react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { EASE } from "../../../lib/animations";
import { sectionContainer, sectionSpacing } from "../sectionStyles";
import Modal from "./Modal";

export interface BookADemoBlok {
  _uid?: string;
  visible?: boolean;
  heading?: string;
  description?: string;
  micro_copy?: string;
  cta_label?: string;
  section_id?: string;
}

const TEAM_SIZES = ["1-10", "11-50", "51-200", "200+"];
const INDUSTRIES = ["Sales", "Banking & Financial Advisory", "Healthcare", "MedTech", "Other"];

interface DemoFormState {
  name: string;
  email: string;
  company: string;
  role: string;
  teamSize: string;
  industry: string;
  practiceTopic: string;
}

const initialForm: DemoFormState = {
  name: "",
  email: "",
  company: "",
  role: "",
  teamSize: TEAM_SIZES[0],
  industry: INDUSTRIES[0],
  practiceTopic: "",
};

export default function BookADemo({ blok }: { blok?: BookADemoBlok }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<DemoFormState>(initialForm);

  if (blok?.visible === false) return null;
  const heading = blok?.heading?.trim() || "Hear it for yourself";
  const ctaLabel = blok?.cta_label?.trim() || "Book a Demo";

  function update<K extends keyof DemoFormState>(key: K) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSubmitted(false);
    setForm(initialForm);
  }

  return (
    <section id={blok?.section_id} {...(blok?._uid ? storyblokEditable(blok as never) : {})} className={`${sectionSpacing("default")} px-4 sm:px-6 lg:px-8`}>
      <div className={`${sectionContainer("default")} mx-auto`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 px-8 py-14 text-center text-white md:px-16 md:py-16"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-[100px]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-[100px]" aria-hidden />

          <div className="relative mx-auto max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
            {blok?.description?.trim() && <p className="mt-4 text-base text-white/85 sm:text-lg">{blok.description}</p>}
            <Button size="lg" variant="secondary" className="mt-9 bg-white text-slate-900 shadow-lg hover:bg-slate-100" onClick={() => setIsOpen(true)}>{ctaLabel}</Button>
            {blok?.micro_copy?.trim() && <p className="mt-5 text-xs text-white/70">{blok.micro_copy}</p>}
          </div>
        </motion.div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(29,28,24,0.15)] md:p-10">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">Book a demo</h3>
          <p className="mt-2 text-sm text-slate-600">30 minutes · No commitment</p>

          {submitted ? (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
              <p className="text-sm font-semibold text-emerald-800">Request received</p>
              <p className="mt-1 text-sm text-slate-600">
                We'll follow up at {form.email || "your work email"} within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input required value={form.name} onChange={update("name")} placeholder="Name" />
                <Input required type="email" value={form.email} onChange={update("email")} placeholder="Work email" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input required value={form.company} onChange={update("company")} placeholder="Company" />
                <Input value={form.role} onChange={update("role")} placeholder="Role" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Select value={form.teamSize} onValueChange={(value) => setForm((f) => ({ ...f, teamSize: value }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TEAM_SIZES.map((size) => <SelectItem key={size} value={size}>{size} team size</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={form.industry} onValueChange={(value) => setForm((f) => ({ ...f, industry: value }))}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => <SelectItem key={industry} value={industry}>{industry}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Textarea value={form.practiceTopic} onChange={update("practiceTopic")} placeholder="What do you want to practise?" rows={3} />
              <Button type="submit" className="w-full">Request Demo</Button>
            </form>
          )}
        </div>
      </Modal>
    </section>
  );
}
