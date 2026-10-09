import LegalPage from "./LegalPage";
import { TERMS } from "./legal.content";

export default function Terms() {
  return <LegalPage doc={TERMS} other={{ to: "/privacy", label: "Privacy Policy" }} />;
}
