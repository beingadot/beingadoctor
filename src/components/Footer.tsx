import { MessageCircle } from "lucide-react";
import { EMAIL, PHONE_DISPLAY, PHONE_LINK, wa } from "../data";
import { NAV_LEGAL } from "../legal";
import { Reveal } from "./shared";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ft pb-7 pt-16 md:pt-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <Reveal>
            <h2 className="text-[clamp(36px,6vw,68px)] text-white">
              Your expertise<span className="text-ly">.</span>
              <br />
              <span className="serif-it text-ly">More visible.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="md:justify-self-end">
            <div className="flex flex-wrap gap-2.5 max-sm:[&>*]:flex-1">
              <a className="btn btn-ly" href="#contact">
                Book a call
              </a>
              <a
                className="btn btn-ol"
                href={wa("Hi Beingadot, I am a doctor.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-9 border-t border-[#2a2a2e] pt-9 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <a
              href="#top"
              className="flex items-center gap-2.5 font-d text-[19px] font-extrabold uppercase tracking-[0.02em] text-white"
            >
              <span className="grid h-[26px] w-[26px] place-items-center rounded-[9px] bg-ly" aria-hidden="true">
                <span className="h-[9px] w-[9px] rounded-full bg-bk" />
              </span>
              Beingadot<span className="text-ly">.</span>
            </a>
            <p className="mt-3 max-w-[300px] text-[14px] leading-relaxed text-[#a5a5ad]">
              We build doctors&rsquo; personal brands using AI. One recording a month, everything
              approved by you on WhatsApp.
            </p>
          </div>

          <div className="fcol">
            <h4>SERVICES</h4>
            <a href="#pricing">AI Reels packages</a>
            <a href="#svc">Google Business Profile</a>
            <a href="#svc">Meta and Google Ads</a>
            <a href="#svc">Clinic Website</a>
          </div>

          <div className="fcol">
            <h4>EXPLORE</h4>
            <a href="#how">How it works</a>
            <a href="#reels">Reels</a>
            <a href="#pricing">Pricing</a>
            <a href="#results">Results</a>
            <a href="#rev">Approval process</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="fcol">
            <h4>CONTACT</h4>
            <a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={wa("Hi Beingadot, I am a doctor.")} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Data deletion request")}`}>
              Request data deletion
            </a>
          </div>
        </div>

        <nav aria-label="Legal" className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#2a2a2e] pt-7 text-[13px]">
          {NAV_LEGAL.map((l) => (
            <a key={l.slug} href={`#/${l.slug}`} className="text-[#cfcfd6] hover:text-ly">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="text-[#cfcfd6] hover:text-ly">
            Contact
          </a>
          <a href="#top" className="text-[#cfcfd6] hover:text-ly">
            Back to top
          </a>
        </nav>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[12px] leading-relaxed text-[#8b8b93]">
          <span>
            &copy; {year} Beingadot. All rights reserved.
          </span>
          <span>
            Typefaces: Inter and Outfit, licensed under the SIL Open Font Licence. Illustrative
            images on this demo are placeholders.
          </span>
        </div>
      </div>
    </footer>
  );
}

export function WaFloat() {
  return (
    <a
      className="wa"
      href={wa("Hi Beingadot, I am a doctor.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Beingadot on WhatsApp"
    >
      <span className="wd" aria-hidden="true" />
      <MessageCircle size={20} className="sm:hidden" color="#111" aria-hidden="true" />
      <span className="wt">WhatsApp</span>
    </a>
  );
}
