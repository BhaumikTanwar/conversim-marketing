import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import WaitlistModal from "../components/WaitlistModal";
import RoleplayHero from "../components/sales-roleplay/RoleplayHero";
import ValuePropsSection from "../components/sales-roleplay/ValuePropsSection";
import FeaturesSection from "../components/sales-roleplay/FeaturesSection";
import RolesSection from "../components/sales-roleplay/RolesSection";
import LearningJourneySection from "../components/sales-roleplay/LearningJourneySection";
import CaseStudySection from "../components/sales-roleplay/CaseStudySection";
import RoleplayCtaSection from "../components/sales-roleplay/RoleplayCtaSection";
import IndustriesSection from "../components/sales-roleplay/IndustriesSection";
import FaqSection from "../components/sales-roleplay/FaqSection";

export default function SalesRoleplay() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  function openWaitlist() {
    setIsWaitlistOpen(true);
  }

  return (
    <div className="relative min-h-dvh flex flex-col bg-aurora-bg text-aurora-text selection:bg-brand selection:text-white overflow-hidden">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grow z-content pt-16 md:pt-20"
      >
        <RoleplayHero />
        <ValuePropsSection />
        <FeaturesSection />
        <RolesSection />
        <LearningJourneySection />
        <CaseStudySection />
        <RoleplayCtaSection onOpenWaitlist={openWaitlist} />
        <IndustriesSection />
        <FaqSection />
      </motion.main>

      <Footer />

      <Modal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)}>
        <WaitlistModal onClose={() => setIsWaitlistOpen(false)} />
      </Modal>
    </div>
  );
}
