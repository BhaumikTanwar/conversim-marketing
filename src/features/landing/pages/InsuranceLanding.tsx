
import { USE_CASES, FAQS } from "../content/insurance.content";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectorHero from "../components/SectorHero";
import SectorDemoCard from "../components/SectorDemoCard";
import SectorUseCases from "../components/SectorUseCases";
import SectorCampaignForm from "../components/SectorCampaignForm";
import SectorFAQ from "../components/SectorFAQ";

const heroDemoVideo = "/landing/conversimdemo3.webm";

export default function InsuranceLanding() {

  function scrollToCampaign() {
    document.getElementById("campaign")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-aurora-bg text-aurora-text selection:bg-brand selection:text-white">
      <Header />

      <main className="z-content flex-grow pt-16 md:pt-20">
        <SectorHero
          eyebrow="AI roleplay for Insurance sales teams"
          heading={
            <>
              Train agents against
              <br />
              AI customers who
              <br />
              <span className="text-brand">actually push back.</span>
            </>
          }
          subtext="ConverSim gives insurance agents unlimited rehearsal time with AI personas built from real objection patterns - before they ever face a real prospect or policyholder."
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

        <SectorUseCases eyebrow="Use cases" heading="Built for every stage of the agent journey" items={USE_CASES} />

        <SectorCampaignForm
          eyebrow="Start a campaign"
          heading="Set up a training campaign for your team"
          subtext="Tell us about your team and product lines - we'll follow up with a campaign plan."
          companyPlaceholder="Company / agency"
          secondaryField={{
            label: "Product line",
            placeholder: "Product line (auto, life, health...)",
          }}
          teamUnitLabel="agents"
        />

        <SectorFAQ
          eyebrow="FAQ"
          heading="Questions, answered"
          intro="Everything you need to know about running insurance sales training on Conversim."
          items={FAQS}
        />
      </main>

      <Footer />

    </div>
  );
}
