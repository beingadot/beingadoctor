import { ArrowRight, MoveDown, Info, Paperclip, Camera, Mic, Wifi } from "lucide-react";
import { CountUp, Head, Reveal } from "./shared";
import { APPROVAL_STEPS, STATS, WA_CHATS, type WaChat } from "../data";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------ */
/* WhatsApp chat on a phone screen.                                    */
/* Doctor (incoming) sits on the LEFT, our reply (outgoing) on the RIGHT */
/* ------------------------------------------------------------------ */
function WaPhone({ chat, className }: { chat: WaChat; className?: string }) {
  return (
    <figure className={cn("mx-auto w-[264px] max-w-full", className)}>
      <div className="overflow-hidden rounded-[30px] border-[1.5px] border-[#34363c] bg-[#111]">
        {/* status bar */}
        <div className="flex items-center justify-between bg-[#1f2c33] px-4 py-1.5 text-[10px] font-medium text-white/80">
          <span>9:41</span>
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <Wifi size={11} strokeWidth={2.4} />
            <span className="text-[9px] tracking-tight">100%</span>
          </span>
        </div>

        {/* chat header */}
        <div className="flex items-center gap-2 bg-[#1f2c33] px-2 pb-2">
          <span aria-hidden="true" className="text-[#8fa3ad]">
            <ArrowRight size={14} className="rotate-180" />
          </span>
          <div className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[#00a884] font-d text-[10px] font-bold text-white">
            B
          </div>
          <div className="min-w-0">
            <div className="truncate text-[11px] font-semibold text-white">{chat.title}</div>
            <div className="truncate text-[8.5px] text-white/55">{chat.docName}, Beingadot, You</div>
          </div>
        </div>

        {/* messages */}
        <div className="space-y-1 bg-[#0b141a] px-2.5 py-3">
          <div className="mb-2 rounded-md bg-[#151e24] px-2 py-1 text-center text-[8.5px] uppercase tracking-[0.14em] text-white/45">
            Sample thread
          </div>
          {chat.messages.map((m, k) => {
            const ours = m.from === "b";
            return (
              <div
                key={k}
                className={cn(
                  "max-w-[86%] px-2.5 py-1.5 text-[11px] leading-[1.55] text-[#e9edef]",
                  ours
                    ? "ml-auto rounded-[10px] rounded-tr-sm bg-[#006a4d]"
                    : "rounded-[10px] rounded-tl-sm bg-[#202c33]",
                )}
              >
                {m.hl ? (
                  <span className="inline rounded-[5px] border-2 border-ly px-1 py-[1px] font-semibold">
                    {m.text}
                  </span>
                ) : (
                  m.text
                )}
                <span className="ml-1.5 align-baseline text-[8px] text-white/50">{m.time}</span>
              </div>
            );
          })}
        </div>

        {/* input bar */}
        <div className="flex items-center gap-2 bg-[#1f2c33] px-2 py-1.5">
          <Paperclip size={13} className="text-white/45" aria-hidden="true" />
          <div className="flex-1 rounded-full bg-[#2a3942] px-3 py-1.5 text-[10px] text-white/45">
            Message
          </div>
          <Camera size={13} className="text-white/45" aria-hidden="true" />
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#00a884]" aria-hidden="true">
            <Mic size={11} className="text-white" />
          </span>
        </div>
      </div>

      <figcaption className="mt-3 text-center text-[12px] leading-snug text-[#9aa0a6]">
        {chat.caption}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* results                                                             */
/* ------------------------------------------------------------------ */
export default function Results() {
  return (
    <section id="results" className="rounded-t-[40px] bg-bk py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <Head
          dark
          eyebrow="What you get"
          title="Numbers we can stand behind"
          lead="Published prices, published scope, and the time we ask of you. No invented ratings."
        />

        <Reveal delay={0.05}>
          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-[#2f2f35] pt-9 sm:grid-cols-3">
            {STATS.map((s, k) => (
              <div key={k}>
                <small className="text-[13px] text-[#9aa0a6]">{s.top}</small>
                <CountUp
                  to={s.c}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="block font-d text-[clamp(44px,6vw,76px)] font-extrabold leading-none tracking-tight text-ly"
                />
                <small className="mt-2.5 block max-w-[250px] text-[13px] font-medium leading-snug text-[#b9bcc2]">
                  {s.label}
                </small>
              </div>
            ))}
          </div>
        </Reveal>

        {/* approval chats */}
        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <h3 className="text-3xl">
              Approved on WhatsApp<span className="dot dot-dark">.</span>
            </h3>
            <p className="lead lead-dark mb-4 mt-3">
              Every Reel goes to you on WhatsApp before it is posted. In this thread the doctor's
              replies appear on the left and our replies on the right.
            </p>
            <div className="mt-5 flex gap-2.5 rounded-2xl border border-[#2f2f35] bg-[#111] p-4 text-[13px] leading-relaxed text-[#b9bcc2]">
              <Info size={16} className="mt-0.5 flex-none text-ly" aria-hidden="true" />
              <span>
                These are sample threads built for layout, using placeholder names. With written
                permission from each doctor we replace them with the real approved conversation
                before launch.
              </span>
            </div>
            <a
              href="#rev"
              className="mt-5 inline-flex items-center gap-1.5 font-semibold text-ly hover:text-white"
            >
              See how approval works <MoveDown size={15} aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="no-scrollbar -mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
              {WA_CHATS.map((chat, k) => (
                <div key={k} className={cn("flex-none snap-center", k === 1 && "sm:-translate-y-5")}>
                  <WaPhone chat={chat} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* approval workflow (replaces testimonials)                           */
/* ------------------------------------------------------------------ */
export function Approval() {
  return (
    <section id="rev" className="relative rounded-t-[40px] bg-cr py-16 md:py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.35fr]">
          <div>
            <Reveal>
              <div className="eb">How approval works</div>
              <h2 className="text-[clamp(32px,5.4vw,58px)]">
                You sign off every time<span className="dot">.</span>
              </h2>
              <p className="lead mb-7 mt-4">
                Five checkpoints in a month. Nothing is published unless you tap yes.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ol className="border-t border-ln">
                {APPROVAL_STEPS.map((s, k) => (
                  <li key={s.t} className="flex gap-4 border-b border-ln py-4">
                    <span className="font-d text-[11px] font-bold tracking-[0.18em] text-[#9a9a90]">
                      {String(k + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <b className="block font-d text-[16px]">{s.t}</b>
                      <small className="text-[13.5px] leading-relaxed text-mu">{s.d}</small>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="rc">
              <div
                className="pointer-events-none absolute -right-6 -top-10 select-none font-d text-[200px] font-extrabold leading-none text-white/[0.07]"
                aria-hidden="true"
              >
                &rdquo;
              </div>
              <p className="font-d text-[clamp(26px,4vw,42px)] font-extrabold leading-[1.12] tracking-tight">
                Nothing goes live without your <mark>yes</mark>.
              </p>
              <div className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-[#c3cbea]">
                You see the script before we record, and the finished Reel before we publish. If it
                does not sound like you, we redo it. Approvals stay on WhatsApp, so there is a written
                record of every decision.
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/15 pt-6">
                <a className="btn btn-ly" href="#contact">
                  Book a call
                </a>
                <a className="btn btn-ol" href="#pricing">
                  See plans and prices
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
