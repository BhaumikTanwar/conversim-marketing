import LegalPage from "./LegalPage";
import { PRIVACY } from "./legal.content";

export default function Privacy() {
  return <LegalPage doc={PRIVACY} other={{ to: "/terms", label: "Terms of Service" }} />;
}
