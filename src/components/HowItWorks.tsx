import { useEffect, useState } from "react";
import Media from "./Media";
import { DOCTORS } from "../data";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  PhoneCall,
  Eye,
  MessageSquare,
  CalendarClock,
  MessageCircle,
  CalendarCheck,
  ClipboardList,
  PenLine,
  UserCheck,
  Mic,
  Scissors,
  CheckCircle2,
  Send,
} from "lucide-react";
import { Head, Reveal, EASE } from "./shared";
import { PIPE_8, POST_DAYS, wa, type PipeStep } from "../data";
import { cn } from "../utils/cn";

const CHECK_A = [
  { t: "One call", d: "Goals, topics and style.", icon: PhoneCall },
  { t: "One recording", d: "One video and one audio.", icon: Eye },
  { t: "Approve each Reel", d: "One tap, on WhatsApp.", icon: MessageSquare },
];
const CHECK_B = [
  { t: "More people see you", icon: Eye },
  { t: "More of them ask", icon: MessageSquare },
  { t: "More of them book", icon: CalendarCheck },
];

const PIPE_ICONS: Record<string, typeof Check> = {
  plan: ClipboardList,
  script: PenLine,
  face: UserCheck,
  voice: Mic,
  edit: Scissors,
  approve: CheckCircle2,
  posted: Send,
};

/* full loop for columns 02 and 03: 24 ticks x 1.5s = 36 seconds */
const LOOP = 24;

/* column 01 phase lengths in seconds: [call, recording, approval] */
const PHASES = [3, 5, 2];

export default function HowItWorks() {
  const [T, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 1) % LOOP), 1500);
    return () => clearInterval(id);
  }, []);

  /* column 01 has its own timer: 3s call, 5s recording, 2s approval */
  const [ph, setPh] = useState(0); // 0 = call, 1 = recording, 2 = approval
  const [sub, setSub] = useState(0); // seconds elapsed inside the current phase
  useEffect(() => {
    let p = 0;
    let s = 0;
    const id = setInterval(() => {
      s += 1;
      if (s >= PHASES[p]) {
        s = 0;
        p = (p + 1) % PHASES.length;
        setPh(p);
      }
      setSub(s);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  /* column 02 */
  const pipeIdx = Math.min(PIPE_8.length - 1, Math.floor(T / 3));
  const calDay = POST_DAYS[T % POST_DAYS.length];
  const reelsReady = Math.min(POST_DAYS.length, Math.floor(T / 1.7) + 1);

  return (
    <section id="how" className="rounded-t-[40px] bg-nv py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <Head
          dark
          eyebrow="How it works"
          title="Simple for you. We do the rest"
          lead={
            <>
              A few minutes from you.
              <br />
              <b className="font-semibold text-white">A month of Reels from us.</b>
            </>
          }
        />

        <div className="mt-14 grid gap-14 md:grid-cols-3 md:gap-0">
          {/* ============ 01 ============ */}
          <Reveal className="md:pr-7">
            <div className="big">01</div>
            <h3 className="mb-5 mt-1.5 text-2xl">You, once a month</h3>

            {CHECK_A.map((c, k) => {
              const Icon = c.icon;
              return (
                <div key={k} className={cn("ck", ph === k && "on")}>
                  <span className="dc" aria-hidden="true">
                    <Check size={12} strokeWidth={3.2} />
                  </span>
                  <div>
                    <b className="flex items-center gap-2">
                      <Icon size={13} className={ph === k ? "text-ly" : "text-white/45"} aria-hidden="true" />
                      {c.t}
                    </b>
                    {c.d}
                  </div>
                </div>
              );
            })}

            <div className="mini">
              <div className="scr">
                {/* strategy call (3 seconds) */}
                <div className={cn("ms ms-call", ph === 0 && "on")}>
                  <div className="avc" aria-hidden="true">B</div>
                  <b className="text-[12px]">Beingadot strategy call</b>
                  <div className="mb-1 mt-0.5 text-[10px] opacity-70">
                    00:{String(sub).padStart(2, "0")} · voice call
                  </div>
                  {["Your goals", "Monthly topics", "Your style"].map((s, k) => (
                    <div key={k} className={cn("ci", (ph > 0 || k <= sub) && "on")}>
                      {s}
                    </div>
                  ))}
                  <div className="mt-auto flex items-center justify-center gap-4 pb-1" aria-hidden="true">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
                      <Mic size={13} />
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
                      <MessageSquare size={13} />
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e5484d]">
                      <PhoneCall size={13} />
                    </span>
                  </div>
                </div>

                {/* recording (5 seconds) */}
                <div className={cn("ms ms-rec", ph === 1 && "on")}>
                  <video
                    src="/video/reel-2.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />
                  <div className="relative z-10 mt-1 text-[10px] font-semibold opacity-90">
                    <span className="recdot text-[#ff5b5b]">●</span> REC 00:0{ph === 1 ? sub + 1 : 0}
                  </div>
                  <b className="relative z-10 mt-1 text-[12px]">Video + voice</b>
                  <div className="relative z-10 mt-auto rounded-lg bg-black/55 p-2 text-[9.5px] leading-snug text-white/85">
                    One take per month. We do the rest.
                  </div>
                </div>

                {/* whatsapp approval (2 seconds) */}
                <div className={cn("ms ms-chat", ph === 2 && "on")}>
                  <div className="mb-1 flex items-center gap-2 border-b border-black/10 pb-1.5 text-left">
                    <span
                      className="grid h-6 w-6 place-items-center rounded-full bg-nv font-d text-[10px] font-extrabold text-white"
                      aria-hidden="true"
                    >
                      B
                    </span>
                    <div className="text-[10.5px] font-bold leading-tight">
                      Beingadot
                      <span className="block text-[8.5px] font-medium text-[#188a4c]">online</span>
                    </div>
                  </div>
                  <div className={cn("msg", ph === 2 && "on")}>
                    <img
                      src="/img/chatpic1.jpg"
                      alt="Chat preview"
                      className="mb-1.5 h-[80px] w-full rounded-md object-cover"
                    />
                    Your Reel on delayed periods is ready. Post it?
                  </div>
                  <div
                    className={cn("msg me", ph === 2 && sub >= 1 && "on")}
                    style={{ transitionDelay: "0.35s" }}
                  >
                    Yes, post it
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ============ 02 ============ */}
          <Reveal delay={0.12} className="md:border-l md:border-white/15 md:px-6">
            <div className="big">02</div>
            <h3 className="mb-5 mt-1.5 text-2xl">We make every Reel</h3>

            {/* calendar */}
            <div className="cal ml-auto max-md:ml-0">
              <div className="flex items-center justify-between">
                <b>October 2026</b>
                <span className="rounded-md bg-nv px-1.5 py-0.5 text-[8px] font-bold text-white">
                  {reelsReady} Reels
                </span>
              </div>
              <div className="calg">
                {"MTWTFSS".split("").map((d, k) => (
                  <i key={k} className="cald font-semibold text-black/45">
                    {d}
                  </i>
                ))}
                {Array.from({ length: 31 }, (_, k) => k + 1).map((d) => (
                  <i
                    key={d}
                    className={cn("cald relative", POST_DAYS.includes(d) && "p", d === calDay && "t")}
                  >
                    {d}
                    {POST_DAYS.includes(d) &&
                      POST_DAYS.indexOf(d) < reelsReady &&
                      d !== calDay && (
                        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#22a05b]" />
                      )}
                  </i>
                ))}
              </div>
            </div>

            {/* pipeline */}
            <div className="mt-6 grid grid-cols-4 gap-1.5">
              {PIPE_8.map((step: PipeStep, k) => {
                const Icon = PIPE_ICONS[step.icon] ?? ClipboardList;
                const done = k <= pipeIdx;
                const active = k === pipeIdx;
                return (
                  <div
                    key={step.label}
                    className={cn(
                      "relative flex flex-col items-center gap-1 rounded-lg border-2 p-1.5 text-center transition-all duration-500",
                      done ? "border-ly/55 bg-white/10" : "border-white/10 bg-white/5 opacity-45",
                      active && "scale-105 border-ly shadow-[0_0_22px_rgba(221,254,0,0.35)]",
                    )}
                    aria-current={active ? "step" : undefined}
                  >
                    <Icon size={16} className="text-ly" aria-hidden="true" />
                    <span className="text-[8px] font-bold leading-tight">{step.label}</span>
                    {active && (
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={step.label}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-ly px-2 py-0.5 text-[7.5px] font-bold text-ink"
                        >
                          {step.detail}
                        </motion.span>
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-1" aria-hidden="true">
              {PIPE_8.map((_, k) => (
                <div
                  key={k}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-all duration-500",
                    k <= pipeIdx ? "bg-ly" : "bg-white/15",
                  )}
                />
              ))}
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] font-semibold text-white/80">
              <span>Doctor records</span>
              <span>AI processes</span>
              <span>Published</span>
            </div>

            <AnimatePresence mode="wait">
              {T >= 20 && (
                <motion.div
                  className="mt-6 rounded-xl border border-ly/40 bg-ly/15 p-3 text-center"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  role="status"
                >
                  <span className="font-d text-xl font-extrabold text-ly">{reelsReady} Reels</span>
                  <span className="block text-[10px] text-white/75">ready this month</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>

          {/* ============ 03 ============ */}
          <Reveal delay={0.24} className="md:border-l md:border-white/15 md:pl-7">
            <div className="big">03</div>
            <h3 className="mb-5 mt-1.5 text-2xl">Patients reach you</h3>

            <div className={cn("nt", T >= 12 && "on")}>
              <small>
                <PhoneCall size={11} aria-hidden="true" /> Phone · <span className="font-semibold text-[#188a4c]">now</span>
              </small>
              <b>Call from a new patient</b>
              <br />
              Asked about timings
            </div>
            <div className={cn("nt", T >= 16 && "on")}>
              <small>
                <CalendarClock size={11} aria-hidden="true" /> Appointments · <span className="font-semibold text-[#188a4c]">now</span>
              </small>
              <b>New appointment</b>
              <br />
              Tomorrow, 11:00 am
            </div>
            <div className={cn("nt", T >= 20 && "on")}>
              <small>
                <MessageCircle size={11} aria-hidden="true" /> WhatsApp · <span className="font-semibold text-[#188a4c]">now</span>
              </small>
              Namaste doctor, I saw your Reel on chest pain. Can I book a consultation?
            </div>

            {CHECK_B.map((c, k) => {
              const Icon = c.icon;
              const on = T >= 14 + k * 4;
              return (
                <div key={k} className={cn("ck", on && "on")}>
                  <span className="dc" aria-hidden="true">
                    <Check size={12} strokeWidth={3.2} />
                  </span>
                  <div>
                    <b className="flex items-center gap-2">
                      <Icon size={13} className={on ? "text-ly" : "text-white/45"} aria-hidden="true" />
                      {c.t}
                    </b>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-3 rounded-2xl bg-white/[0.08] px-5 py-4 md:gap-4">
            <span className="text-[15px]">
              Your monthly investment: <b className="font-d text-ly">less than 30 minutes</b>
            </span>
            <a className="btn btn-ly max-md:w-full md:ml-auto" href="#contact">
              Book a call
            </a>
            <a
              className="btn btn-ol max-md:w-full"
              href={wa("Hi Beingadot, I am a doctor.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
