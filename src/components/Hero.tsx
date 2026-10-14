import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, MessageCircle, BadgeCheck, ArrowLeftRight } from "lucide-react";
import { HERO_A, HERO_B, SPECIALTIES, wa, type HeroDoc } from "../data";
import { EASE, useUi } from "./shared";

/* Hinglish caption tracks, roughly 13 seconds each */
const REEL_LINES: Record<string, string[]> = {
  "Dr. Meera Iyer": [
    "Pimples ka reason sirf ganda chehra nahi hota.",
    "Hormones, stress aur diet sab matter karta hai.",
    "Week me ek baar basics theek rakho, skin khud sudhregi.",
  ],
  "Dr. Arjun Rao": [
    "Angiography me hota kya hai? Main 30 second me samjha deta hu.",
    "Dil ki artery me blockage hai ki nahi, yahi test batata hai.",
    "Tension lene ki zarurat nahi, procedure painless hota hai.",
  ],
};
const LINE_MS = 4500;

/* ------------------------------------------------------------------ */
/* caption player: timed Hinglish caption track over the still          */
/* ------------------------------------------------------------------ */
function ReelPlayer({ doc }: { doc: HeroDoc }) {
  const lines = REEL_LINES[doc.name] ?? [doc.cap.map((s) => s.t).join("")];
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setI((v) => (v + 1) % lines.length), LINE_MS);
    return () => clearTimeout(id);
  }, [i, playing, lines.length]);

  const words = lines[i].split(" ");

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <img src={doc.img} alt={`${doc.name}, ${doc.spec}`} className="kenburns absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(3,6,22,.86) 6%, rgba(3,6,22,.05) 55%, rgba(3,6,22,.35))" }}
      />

      {/* progress segments */}
      <div className="absolute left-3.5 right-16 top-3 z-10 flex gap-1.5" aria-hidden="true">
        {lines.map((_, k) => (
          <span key={k} className="h-[3px] flex-1 overflow-hidden rounded bg-white/30">
            <b
              key={`${k}-${i}-${playing}`}
              className="block h-full bg-ly"
              style={{
                width: k < i ? "100%" : k === i && playing ? "100%" : k === i ? "40%" : "0%",
                animation: k === i && playing ? `fillW ${LINE_MS}ms linear both` : undefined,
              }}
            />
          </span>
        ))}
      </div>

      <div className="absolute left-4 right-14 top-12 z-10 flex items-center gap-2">
        <img src={doc.img} alt="" aria-hidden="true" className="h-7 w-7 rounded-full object-cover" />
        <span className="text-[12px] font-semibold text-white drop-shadow">
          {doc.name}, {doc.spec}
        </span>
      </div>

      {/* caption with word-by-word text effect */}
      <div className="absolute inset-x-4 bottom-20 z-10">
        <AnimatePresence mode="wait">
          <p key={i} className="font-d text-[clamp(19px,5vw,26px)] font-extrabold uppercase leading-[1.15] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.6)]">
            {words.map((w, k) => (
              <motion.span
                key={`${i}-${k}`}
                className="mr-2 inline-block"
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.34, delay: k * 0.055, ease: EASE }}
              >
                {w}
              </motion.span>
            ))}
          </p>
        </AnimatePresence>
      </div>

      {/* transport */}
      <div className="absolute inset-x-4 bottom-6 z-10 flex items-center gap-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="grid h-10 w-10 place-items-center rounded-full bg-ly text-ink transition-transform hover:scale-105"
          aria-label={playing ? "Pause captions" : "Play captions"}
        >
          {playing ? <Pause size={17} fill="#111" /> : <Play size={17} fill="#111" />}
        </button>
        <span className="text-[11px] font-medium text-white/85">
          {playing ? "Playing" : "Paused"} · Hinglish captions · {String(i + 1).padStart(2, "0")}/
          {String(lines.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* hero: two doctors, click the small card to swap                     */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const [main, setMain] = useState<HeroDoc>(HERO_A);
  const [side, setSide] = useState<HeroDoc>(HERO_B);
  const [gen, setGen] = useState(0);
  const ui = useUi();

  const swap = useCallback(() => {
    setMain(side);
    setSide(main);
    setGen((g) => g + 1);
  }, [main, side]);

  return (
    <header id="top" className="overflow-hidden pb-14 pt-10 md:pb-16 md:pt-14">
      <div className="mx-auto grid max-w-[1160px] items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <motion.span
            className="pill"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            AI Reels &amp; digital marketing for doctors
          </motion.span>
          <motion.h1
            className="mt-5 text-[clamp(42px,7.4vw,84px)]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: EASE }}
          >
            Your expertise<span className="dot">.</span>
            <br />
            <span className="hl">
              More visible<span className="dot">.</span>
            </span>
          </motion.h1>
          <motion.p
            className="mt-5 text-lg text-mu"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: EASE }}
          >
            We build doctors&rsquo; personal brands using AI.
          </motion.p>
          <motion.div
            className="mt-7 flex flex-wrap gap-2.5 max-sm:[&>*]:flex-1"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
          >
            <a className="btn" href="#contact">
              Book a call
            </a>
            <a
              className="btn btn-lt gap-2"
              href={wa("Hi Beingadot, I am a doctor.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} aria-hidden="true" />
              <span className="max-sm:hidden">Chat on&nbsp;</span>WhatsApp
            </a>
          </motion.div>

          <motion.div
            className="trust mt-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-nv text-ly" aria-hidden="true">
              <BadgeCheck size={17} />
            </span>
            <span>
              <b className="text-ink">You approve every Reel</b>
              <br />
              on WhatsApp, before it is posted
            </span>
            <span className="border-l border-ln pl-4">
              From <b className="text-ink">₹15,000/month</b>
              <br />+ AI software
            </span>
          </motion.div>
        </div>

        {/* stage */}
        <motion.div
          className="stage grid min-h-[470px] place-items-center md:min-h-[560px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <div className="circle" aria-hidden="true" />

          {/* swap control */}
          <button
            onClick={swap}
            className="side group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            aria-label={`Swap: show ${side.name} in the main phone`}
          >
            <div className="t">
              <AnimatePresence mode="wait">
                <motion.img
                  key={side.name}
                  src={side.img}
                  alt={`${side.name}, ${side.spec}, preview clip`}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </AnimatePresence>
              <span className="absolute bottom-1.5 left-1.5 z-10 grid h-6 w-6 place-items-center rounded-full bg-ly text-ink opacity-90 transition-opacity group-hover:opacity-100">
                <ArrowLeftRight size={12} aria-hidden="true" />
              </span>
            </div>
            <small className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#25d366]" aria-hidden="true" />
              {side.format}
            </small>
          </button>

          {/* main phone */}
          <div className="phone">
            <div className="scr">
              <div className="notch" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={gen}
                  className="pslide on"
                  style={{ background: main.grad }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  <img src={main.img} alt={`${main.name}, ${main.spec}`} className="kenburns" />
                  <div className="scrim" />
                  <span className="nametag">
                    {main.name} · {main.spec}
                  </span>
                  <div className="cap">
                    {main.cap.map((sg, j) =>
                      sg.hl ? <b key={j}>{sg.t}</b> : <span key={j}>{sg.t}</span>,
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                className="playb"
                onClick={() => ui.open(<ReelPlayer doc={main} />, "video")}
                aria-label={`Play a sample Reel from ${main.name}`}
              >
                <Play size={20} fill="#111" />
              </button>
            </div>
          </div>

          <div className="b100">
            30 min
            <small>
              Your time
              <br />
              each month
            </small>
          </div>

          <p className="absolute -bottom-2 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap text-center text-[12px] text-mu md:block">
            Sample Reel · {main.name}, {main.spec}
          </p>
        </motion.div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* specialty marquee strip                                             */
/* ------------------------------------------------------------------ */
export function Strip() {
  return (
    <div className="border-y border-ln bg-white py-3.5">
      <div className="mx-auto flex max-w-[1160px] items-center gap-4 px-5">
        <div className="flex flex-none items-center gap-3 border-r border-ln pr-4">
          <span className="grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-nv text-white" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <b className="block font-d text-[15px] font-bold leading-tight">Made for doctors</b>
            <small className="text-[12px] text-mu max-sm:hidden">In every specialty</small>
          </div>
        </div>
        <div className="mqwrap">
          <div className="marq">
            {[...SPECIALTIES, ...SPECIALTIES].map((s, k) => (
              <span key={k}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
