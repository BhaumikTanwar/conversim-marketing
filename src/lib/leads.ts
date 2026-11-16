import { useState } from "react";
import { CONTACT_EMAIL } from "@/features/legal/legal.content";

const endpoint = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined;

async function postLead(source: string, fields: Record<string, string>) {
  // shortcut: without an endpoint, dev pretends success so the forms stay testable; production fails loudly. Remove once the endpoint is always set.
  if (!endpoint) {
    if (import.meta.env.DEV) return;
    throw new Error("VITE_LEAD_ENDPOINT is not set");
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source, page: window.location.pathname, ...fields }),
  });
  if (!res.ok) throw new Error(`Lead endpoint returned ${res.status}`);
}

/** Sends a form to the lead endpoint. `done` flips only after the endpoint accepts it. */
export function useLeadForm(source: string) {
  const [state, setState] = useState({ sending: false, done: false, error: "" });

  async function send(fields: Record<string, string>) {
    setState({ sending: true, done: false, error: "" });
    try {
      await postLead(source, fields);
      setState({ sending: false, done: true, error: "" });
    } catch (error) {
      console.error("Lead form failed", error);
      setState({ sending: false, done: false, error: `We couldn't send your request. Please email ${CONTACT_EMAIL}.` });
    }
  }

  return { ...state, send, reset: () => setState({ sending: false, done: false, error: "" }) };
}
