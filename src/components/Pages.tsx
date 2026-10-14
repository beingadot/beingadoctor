import { useEffect, useState, type ReactNode } from "react";
import { NAV_LEGAL, POLICIES, type Policy } from "../legal";
import Nav from "./Nav";
import Footer, { WaFloat } from "./Footer";

/* ------------------------------------------------------------------ */
/* hash router:  #/privacy  #/terms  #/refunds  #/cookies  anything else */
/* in-page anchors (#contact, #pricing) stay on the home page            */
/* ------------------------------------------------------------------ */
const SLUGS = NAV_LEGAL.map((l) => l.slug);

export function useHashRoute() {
  const read = () => {
    const h = window.location.hash;
    if (!h.startsWith("#/")) return "";
    const slug = h.slice(2).split("?")[0].replace(/\/$/, "");
    if (!slug) return "";
    return SLUGS.includes(slug) ? slug : "404";
  };
  const [route, setRoute] = useState(read);

  useEffect(() => {
    const onHash = () => setRoute(read());
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /* settle the viewport once the new view is painted */
  useEffect(() => {
    const h = window.location.hash;
    const sectionId = h && !h.startsWith("#/") ? h.slice(1) : "";
    const t = window.setTimeout(() => {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 70);
    return () => window.clearTimeout(t);
  }, [route]);

  useEffect(() => {
    const titles: Record<string, string> = {
      privacy: "Privacy Policy | Beingadot",
      terms: "Terms of Service | Beingadot",
      refunds: "Refund Policy | Beingadot",
      cookies: "Cookie Policy | Beingadot",
      "404": "Page not found | Beingadot",
      "": "Beingadot | AI Reels and Digital Marketing for Doctors",
    };
    document.title = titles[route] ?? titles[""];
  }, [route]);

  return route;
}

/* ------------------------------------------------------------------ */
/* policy page                                                         */
/* ------------------------------------------------------------------ */
function PolicyPage({ policy }: { policy: Policy }) {
  return (
    <main id="main" className="bg-cr">
      <div className="mx-auto max-w-[840px] px-5 pb-24 pt-12 md:pt-16">
        <a href="#/" className="text-[13px] font-semibold text-nv hover:underline">
          &larr; Back to home
        </a>
        <div className="eb mt-8">Legal</div>
        <h1 className="text-[clamp(34px,6vw,56px)]">
          {policy.title}
          <span className="dot">.</span>
        </h1>
        <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-mu">
          Last updated {policy.updated}
        </p>
        <p className="lead mt-5 max-w-[720px] text-[16px]">{policy.intro}</p>

        <div className="mt-9 grid gap-7">
          {policy.sections.map((s) => (
            <section key={s.h} className="border-t border-ln pt-6">
              <h2 className="text-[21px]">{s.h}</h2>
              {s.p.map((t, i) => (
                <p key={i} className="mt-3 text-[15px] leading-relaxed text-mu">
                  {t}
                </p>
              ))}
              {s.list && (
                <ul className="mt-3 grid gap-2">
                  {s.list.map((li, i) => (
                    <li key={i} className="flex gap-2.5 text-[14.5px] text-mu">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-ly [box-shadow:0_0_0_1px_rgba(15,46,126,.5)]" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 rounded-2xl border border-ln bg-white p-5">
          <span className="text-[14px]">Read also:</span>
          {POLICIES.filter((p) => p.slug !== policy.slug).map((p) => (
            <a key={p.slug} href={`#/${p.slug}`} className="text-[14px] font-semibold text-nv hover:underline">
              {p.title}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* 404                                                                 */
/* ------------------------------------------------------------------ */
function NotFound() {
  return (
    <main id="main" className="bg-cr">
      <div className="mx-auto flex min-h-[70vh] max-w-[840px] flex-col justify-center px-5 py-16">
        <div className="eb">Error 404</div>
        <h1 className="text-[clamp(46px,10vw,96px)]">
          Page not found<span className="dot">.</span>
        </h1>
        <p className="lead mt-4 max-w-[520px]">
          The page you were looking for does not exist, or the link is old. Everything on this site
          is one scroll away from the home page.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="btn" href="#/">
            Back to home
          </a>
          <a className="btn btn-lt" href="#/privacy">
            Privacy Policy
          </a>
          <a className="btn btn-lt" href="#contact">
            Contact us
          </a>
        </div>
        <div className="mt-10 flex flex-wrap gap-3 text-[14px]">
          {NAV_LEGAL.map((l) => (
            <a key={l.slug} href={`#/${l.slug}`} className="font-semibold text-nv hover:underline">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* cookie consent                                                      */
/* ------------------------------------------------------------------ */
const KEY = "bead-consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = setTimeout(() => setShow(true), 900);
        return () => clearTimeout(t);
      }
    } catch {
      /* storage blocked, stay quiet */
    }
  }, []);

  const decide = (v: string) => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-3 left-3 right-3 z-[120] max-w-[430px] rounded-2xl border border-ln bg-white p-4 shadow-[0_24px_60px_-24px_rgba(11,11,12,.45)] sm:bottom-5 sm:left-5 sm:right-auto"
    >
      <b className="font-d text-[15px]">Cookies on this site</b>
      <p className="mt-1.5 text-[13px] leading-relaxed text-mu">
        This site has no analytics and no advertising trackers. We store one preference so we do not
        ask you again, plus an optional local draft of your form text.{" "}
        <a href="#/cookies" className="font-semibold text-nv underline" onClick={() => setShow(false)}>
          Cookie Policy
        </a>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button className="btn !min-h-0 !py-2.5 !text-[13px]" onClick={() => decide("all")}>
          Accept
        </button>
        <button className="btn btn-lt !min-h-0 !py-2.5 !text-[13px]" onClick={() => decide("essential")}>
          Essential only
        </button>
        <a
          href="#/privacy"
          onClick={() => setShow(false)}
          className="btn btn-lt !min-h-0 !py-2.5 !text-[13px]"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* root router                                                         */
/* ------------------------------------------------------------------ */
export function Routes({ home }: { home: ReactNode }) {
  const route = useHashRoute();
  const policy = POLICIES.find((p) => p.slug === route);
  const view = policy ? (
    <PolicyPage policy={policy} />
  ) : route === "404" ? (
    <NotFound />
  ) : (
    <>{home}</>
  );

  return (
    <>
      <Nav key={route} />
      {view}
      <Footer />
      <WaFloat />
    </>
  );
}


