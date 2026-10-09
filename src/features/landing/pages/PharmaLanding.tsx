
import { USE_CASES, FAQS } from "../content/pharma.content";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectorHero from "../components/SectorHero";
import SectorDemoCard from "../components/SectorDemoCard";
import SectorUseCases from "../components/SectorUseCases";
import SectorCampaignForm from "../components/SectorCampaignForm";
import SectorFAQ from "../components/SectorFAQ";

const heroDemoVideo = "/landing/conversimdemo3.webm";

export default function PharmaLanding() {

  function scrollToCampaign() {
    document.getElementById("campaign")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-aurora-bg text-aurora-text selection:bg-brand selection:text-white">
      <Header />

      <main className="z-content flex-grow pt-16 md:pt-20">
        <SectorHero
          eyebrow="AI roleplay for Pharma sales teams"
          heading={
            <>
              Train reps against
              <br />
              AI doctors who
              <br />
              <span className="text-brand">actually push back.</span>
            </>
          }
          subtext="ConverSim gives medical reps unlimited rehearsal time with AI personas built from real objection patterns - before they ever face a real HCP."
          primaryCta={{ label: "Start a campaign", onClick: scrollToCampaign }}
          secondaryCta={{
            label: "See use cases",
            onClick: () => document.getElementById("use-cases")?.scrollIntoView({ behavior: "smooth" }),
          }}
          visual={
            <SectorDemoCard
              videoSrc={heroDemoVideo}
              personaName="AI Roleplay Demo"
              personaRole="Live Session Preview"
              badgeLabel="Session active"
            />
          }
        />

        <SectorUseCases eyebrow="Use cases" heading="Built for every stage of the rep journey" items={USE_CASES} />

        <SectorCampaignForm
          eyebrow="Start a campaign"
          heading="Set up a training campaign for your team"
          subtext="Tell us about your team and therapy area - we'll follow up with a campaign plan."
          companyPlaceholder="Company / organization"
          secondaryField={{
            label: "Therapy area",
            placeholder: "Therapy area / product",
          }}
          teamUnitLabel="reps"
        />

        <SectorFAQ
          eyebrow="FAQ"
          heading="Questions, answered"
          intro="Everything you need to know about running pharma sales training on Conversim."
          items={FAQS}
        />
      </main>

      <Footer />

    </div>
  );
}
