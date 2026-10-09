import { FAQS } from "../content/healthcare.content";
import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import UseCasesSection from "../components/UseCasesSection";
import PreviewSection from "../components/PreviewSection";
import WaitlistSection from "../components/WaitlistSection";
import Modal from "../components/Modal";
import WaitlistModal from "../components/WaitlistModal";
import HealthcareLoop from "../components/HealthcareLoop";
import SectorHero from "../components/SectorHero";
import SectorDemoCard from "../components/SectorDemoCard";
import SectorFAQ from "../components/SectorFAQ";

const heroDemoVideo = "/landing/conversimdemo2.webm";

export default function HealthcareLanding() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  function openWaitlist() {
    setIsWaitlistOpen(true);
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-aurora-bg text-aurora-text selection:bg-brand selection:text-white">
      <Header />

      <main className="z-content flex-grow pt-16 md:pt-20">
        <SectorHero
          eyebrow="Healthcare training"
          heading={
            <>
              Master healthcare conversations{" "}
              <span className="text-brand">
                with AI simulations.
              </span>
            </>
          }
          subtext="Practice realistic healthcare conversations with AI-powered simulations, instant feedback, and repeatable training."
          primaryCta={{
            label: "Book a free demo",
            onClick: openWaitlist,
          }}
          secondaryCta={{
            label: "See how it works →",
            onClick: () => {
              document.getElementById("conversim-loop")?.scrollIntoView({ behavior: "smooth" });
            },
          }}
          visual={
            <SectorDemoCard
              videoSrc={heroDemoVideo}
              avatarEmoji="👩‍⚕️"
              personaName="Sarah"
              personaRole="Healthcare Professional"
              badgeLabel="Patient communication active"
            />
          }
        />

        <HealthcareLoop />

        <UseCasesSection />

        <PreviewSection />

        <WaitlistSection />

        <SectorFAQ
          eyebrow="Healthcare questions"
          heading="Frequently asked questions"
          intro="Everything you need to know about using Conversim for healthcare conversation training."
          items={FAQS}
        />
      </main>

      <Footer />

      <Modal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)}>
        <WaitlistModal onClose={() => setIsWaitlistOpen(false)} />
      </Modal>
    </div>
  );
}
