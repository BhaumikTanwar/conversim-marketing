import { useEffect } from "react";
import { Link } from "react-router";
import Header from "../landing/components/Header";
import Footer from "../landing/components/Footer";
import { EFFECTIVE_DATE, type LegalDoc } from "./legal.content";

export default function LegalPage({ doc, other }: { doc: LegalDoc; other: { to: string; label: string } }) {
  // Hidden page: reachable by URL only, kept out of search results.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <div className="relative min-h-dvh flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-brand selection:text-white">
      <Header />
      <main className="flex-grow z-content pt-16 md:pt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <header className="max-w-3xl mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-slate-900">
              {doc.title}
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed max-w-[65ch]">{doc.summary}</p>
            <p className="mt-4 text-sm text-slate-500">Effective {EFFECTIVE_DATE}</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-10 lg:gap-16">
            <nav aria-label="On this page" className="hidden lg:block">
              <ul className="sticky top-28 space-y-2.5 text-sm border-l border-slate-200 pl-4">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-slate-500 hover:text-slate-900 transition-colors">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="max-w-[65ch] space-y-12">
              {doc.sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-4">{s.title}</h2>
                  <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                    {s.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {s.list && (
                      <ul className="list-disc pl-5 space-y-2 marker:text-slate-400">
                        {s.list.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
              <p className="pt-8 border-t border-slate-200 text-sm text-slate-500">
                Also read our{" "}
                <Link to={other.to} className="text-brand hover:text-brand-hover underline underline-offset-2">
                  {other.label}
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
