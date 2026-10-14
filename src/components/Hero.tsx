import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, MessageCircle, BadgeCheck, ArrowLeftRight } from "lucide-react";
import { HERO_A, HERO_B, SPECIALTIES, wa, type HeroDoc } from "../data";
import { EASE, useUi } from "./shared";
import Media from "./Media";

const initials = (n: string) =>
  n.replace(/^Dr\.?\s*/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

/* ------------------------------------------------------------------ */
/* reel player: the real video, with captions synced to what is said    */
/* ------------------------------------------------------------------ */
function ReelPlayer({ doc }: { doc: HeroDoc }) {
  const lines = doc.lines;
  const [prog, setProg] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [sound, setSound] = useState(false); // always starts silent; sound only on tap
  const i = Math.min(lines.length - 1, Math.floor(prog * lines.length));
  const words = lines[i].split(" ");

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: doc.grad }}>
      <Media
        src={doc.video}
        className="absolute inset-0 h-full w-full object-cover"
        muted={!sound}
        paused={!playing}
        onProgress={setProg}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(3,6,22,.86) 6%, rgba(3,6,22,.05) 55%, rgba(3,6,22,.35))" }}
      />

      {/* progress segments */}
      <div className="absolute left-3.5 right-16 top-3 z-10 flex gap-1.5" aria-hidden="true">
        {lines.map((_, k) => (
          <span key={k} className="h-[3px] flex-1 overflow-hidden rounded bg-white/30">
            <b
              className="block h-full bg-ly"
              style={{ width: `${Math.max(0, Math.min(1, prog * lines.length - k)) * 100}%` }}
            />
          </span>
        ))}
      </div>

      <div className="absolute left-4 right-14 top-12 z-10 flex items-center gap-2">
        <span
          className="grid h-7 w-7 flex-none place-items-center rounded-full bg-ly font-d text-[10px] font-extrabold text-ink"
          aria-hidden="true"
        >
          {initials(doc.name)}
        </span>
        <span className="text-[12px] font-semibold leading-tight text-white drop-shadow">
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
          className="grid h-10 w-10 flex-none place-items-center rounded-full bg-ly text-ink transition-transform hover:scale-105"
          aria-label={playing ? "Pause Reel" : "Play Reel"}
        >
          {playing ? <Pause size={17} fill="#111" /> : <Play size={17} fill="#111" />}
        </button>
        <span className="min-w-0 flex-1 text-[11px] font-medium text-white/85">
          Hinglish captions · {String(i + 1).padStart(2, "0")}/{String(lines.length).padStart(2, "0")}
        </span>
        <button
          onClick={() => setSound((m) => !m)}
          className="grid h-10 w-10 flex-none place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-transform hover:scale-105"
          aria-label={sound ? "Mute" : "Turn sound on"}
        >
          {sound ? <Volume2 size={17} /> : <VolumeX size={17} />}
        </button>
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
  const [sound, setSound] = useState(false); // main phone: silent until the unmute button is tapped
  const ui = useUi();

  const swap = useCallback(() => {
    setMain(side);
    setSide(main);
    setGen((g) => g + 1);
    setSound(false);
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
                <motion.div
                  key={side.id}
                  className="h-full w-full"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  style={{ background: side.grad }}
                  role="img"
                  aria-label={`${side.name}, ${side.spec}, preview clip`}
                >
                  <Media still src={side.video} className="h-full w-full object-cover" />
                </motion.div>
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
                  <Media src={main.video} muted={!sound} className="absolute inset-0 h-full w-full object-cover" />
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
                className="playb snd"
                onClick={() => setSound((m) => !m)}
                aria-label={sound ? "Mute" : "Turn sound on"}
              >
                {sound ? <Volume2 size={19} /> : <VolumeX size={19} />}
              </button>
              <button
                className="playb"
                onClick={() => ui.open(<ReelPlayer doc={main} />, "video")}
                aria-label={`Open ${main.name}'s Reel full size`}
              >
                <Play size={19} fill="#111" />
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
