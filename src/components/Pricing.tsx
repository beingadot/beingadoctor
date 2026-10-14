import { useEffect, useState } from "react";
import { Check, ArrowRight, MapPin, Megaphone, Globe } from "lucide-react";
import { Head, Reveal, useUi } from "./shared";
import { INCLUDES, PLANS, SERVICES, inr, wa, type Service } from "../data";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------ */
/* pricing                                                             */
/* ------------------------------------------------------------------ */
export default function Pricing() {
  const [ii, setIi] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIi((v) => (v + 1) % (INCLUDES.length + 2)), 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="pricing" className="rounded-t-[40px] bg-cr py-16 md:py-24 relative z-[1]">
      <div className="mx-auto max-w-[1160px] px-5">
        <Head
          eyebrow="Social media management · AI Reels · three monthly packages"
          title="Your AI clone. Your voice. Your Reels"
          lead={
            <>
              Record once. We create a steady flow of Reels that look and sound like you.
              <div className="no-scrollbar mt-5 flex items-center overflow-x-auto rounded-2xl border border-ln bg-white px-4 py-3.5 text-left">
                <span className="mr-3.5 shrink-0 whitespace-nowrap font-d text-[9px] font-bold tracking-[0.12em] text-mu">
                  EVERY PACKAGE
                  <br />
                  INCLUDES
                </span>
                {INCLUDES.map((s, k) => (
                  <span key={k} className="contents">
                    {k > 0 && <span className="incl" />}
                    <span className={cn("incs", k <= ii && "on")}>
                      <i>{k + 1}</i>
                      {s}
                    </span>
                  </span>
                ))}
              </div>
            </>
          }
        />

        <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 pt-5 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:pt-3">
          {PLANS.map((p, k) => (
            <Reveal key={p.name} delay={k * 0.12} className="min-w-[84%] snap-center sm:min-w-[360px] md:min-w-0">
              <div className={cn("pr h-full", p.pop && "pop")}>
                {p.pop && (
                  <span className="tg absolute -top-3 left-6 tracking-[0.08em]">MOST POPULAR</span>
                )}
                <small className="sub">{p.name}</small>
                <div className="bignum">{p.reels}</div>
                <small className="font-medium opacity-70">Reels / month</small>
                <div className="boxx">
                  <small className="tracking-normal">Beingadot service</small>
                  <div className="pp">
                    {inr(p.price)}
                    <small className="font-i text-[12px] font-medium"> /month</small>
                  </div>
                  <span className="tg">Special offer</span>
                  <s className="text-[12px] opacity-60">was {inr(p.was)}</s>
                </div>
                <div className="boxx flex items-center justify-between">
                  <span>
                    AI software
                    <br />
                    <small className="font-normal tracking-normal opacity-70">cloning &amp; video tools</small>
                  </span>
                  <b className="font-d">{inr(p.ai)} /mo</b>
                </div>
                <a
                  className={cn("btn mt-6 w-full", p.pop ? "btn-ly" : "btn-lt")}
                  href={wa(
                    `Hi Beingadot, I would like to book a call about the ${p.name.charAt(0) + p.name.slice(1).toLowerCase()} package (${p.reels} Reels / month).`
                  )}
                  target="_blank"
                  rel="noopener"
                >
                  Ask about {p.name.charAt(0) + p.name.slice(1).toLowerCase()} on WhatsApp
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 grid gap-4 rounded-2xl border border-ln bg-white p-5 text-[13px] sm:grid-cols-3">
            <div>
              <b className="block font-d">Reels in Hindi, English and Hinglish</b>
              Whatever your patients are most comfortable with.
            </div>
            <div>
              <b className="block font-d">Two parts each month</b>
              Our service, and the AI software that powers your clone.
            </div>
            <div>
              <b className="block font-d">Ask on WhatsApp</b>
              The message is drafted for you. Nothing is sent until you press send.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* other services                                                      */
/* ------------------------------------------------------------------ */
const S_ICONS = { map: MapPin, ad: Megaphone, web: Globe };

function ServiceModal({ s }: { s: Service }) {
  return (
    <div>
      <div className="eb">What’s included</div>
      <h3 className="mb-1 text-[24px]">{s.title}</h3>
      <div className="ppbox">
        {s.price}
        <small>{s.note}</small>
      </div>
      <ul>
        {s.items.map((it, k) => (
          <li key={k} className="svli">
            <span className="dck">
              <Check size={10} strokeWidth={3.4} />
            </span>
            {it}
          </li>
        ))}
      </ul>
      <a
        className="btn mt-5 w-full"
        href={wa(`Hi Beingadot, I would like to know more about ${s.key}.`)}
        target="_blank"
        rel="noopener"
      >
        Ask about {s.key} on WhatsApp
      </a>
    </div>
  );
}

export function Services() {
  const ui = useUi();
  return (
    <section id="svc" className="pb-16 md:pb-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <Head
          eyebrow="Other services · Google profile · Ads · Website"
          title="Everything else your clinic needs online"
          lead={
            <div className="w-full rounded-3xl bg-nv p-5 text-left text-white md:max-w-[430px]">
              <b className="font-d text-[19px]">Need a custom package?</b>
              <p className="mt-1 text-[13px] text-[#c3cbea]">
                Combine any services. We’ll plan it around your clinic on a call.
              </p>
              <a className="btn btn-ly mt-3.5 min-h-0! py-2.5!" href="#contact">
                Book a call <ArrowRight size={15} />
              </a>
            </div>
          }
        />

        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 pt-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:pt-0">
          {SERVICES.map((s, k) => {
            const Icon = S_ICONS[s.icon];
            return (
              <Reveal key={s.title} delay={k * 0.12} className="min-w-[84%] snap-center sm:min-w-[360px] md:min-w-0">
                <div className="svc h-full">
                  <h3 className="flex items-center gap-2.5 text-xl">
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-nv text-white">
                      <Icon size={16} />
                    </span>
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] text-mu">{s.blurb}</p>
                  <div className="ppbox">
                    {s.price}
                    <small>{s.note}</small>
                  </div>
                  <small className="font-d text-[10px] font-bold tracking-[0.14em] text-mu">
                    WHAT’S INCLUDED
                  </small>
                  <ul className="mt-1">
                    {s.items.slice(0, 4).map((it, j) => (
                      <li key={j} className="svli">
                        <span className="dck">
                          <Check size={10} strokeWidth={3.4} />
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-2">
                    <button className="lk" onClick={() => ui.open(<ServiceModal s={s} />)}>
                      See all {s.items.length} included <ArrowRight size={14} />
                    </button>
                    <a
                      className="lk"
                      href={wa(`Hi Beingadot, I would like to know more about ${s.key}.`)}
                      target="_blank"
                      rel="noopener"
                    >
                      Ask about {s.key} on WhatsApp <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
