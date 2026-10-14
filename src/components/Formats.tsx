import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, Reveal } from "./shared";
import { FORMATS } from "../data";
import { cn } from "../utils/cn";
import Media from "./Media";

export default function Formats() {
  const [fi, setFi] = useState(0);
  const [prog, setProg] = useState(0);
  const [sound, setSound] = useState(false);
  const [failed, setFailed] = useState(false); // video file missing: keep rotating on a timer
  const next = () => {
    setFi((v) => (v + 1) % FORMATS.length);
    setProg(0);
  };
  useEffect(() => {
    if (!failed) return;
    const id = setTimeout(next, 6000);
    return () => clearTimeout(id);
  }, [fi, failed]);
  const f = FORMATS[fi];
  const doc = f.doc;
  const li = Math.min(doc.lines.length - 1, Math.floor(prog * doc.lines.length));
  const line = doc.lines[li];

  return (
    <section id="reels" className="rounded-t-[40px] bg-bk py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* left */}
          <div>
            <Reveal>
              <div className="eb eb-dark">Formats we make</div>
              <h2 className="text-[clamp(32px,5.4vw,58px)]">
                What your patients will see<span className="dot dot-dark">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead lead-dark mt-4 max-w-[520px]">
                Four formats we make for doctors. The frames below are samples; your own Reels
                replace them. Tap a format to switch.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="no-scrollbar mt-7 max-lg:-mx-5 max-lg:flex max-lg:gap-2 max-lg:overflow-x-auto max-lg:px-5 max-lg:pb-1">
                {FORMATS.map((fm, k) => (
                  <button key={k} className={cn("fi", k === fi && "on")} onClick={() => { setFi(k); setProg(0); }}>
                    <span className="n">{fm.no}</span>
                    <div className="min-w-0">
                      <h3>{fm.title}</h3>
                      <p>{fm.desc}</p>
                    </div>
                    {k === fi && <span className="pg" key={`pg-${fi}`} />}
                  </button>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="limebox">
                <b className="mb-3.5 block font-d text-xl font-extrabold tracking-tight">
                  Reels like these, in your face and voice, every month.
                </b>
                <a className="btn" href="#pricing">See plans and prices →</a>
              </div>
            </Reveal>
          </div>

          {/* right: phone preview */}
          <Reveal delay={0.15} className="justify-self-center">
            <div className="mx-auto w-fit">
              <div className="phone">
                <div className="scr">
                  <div className="notch" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={fi}
                      className="absolute inset-0"
                      style={{ background: doc.grad }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Media
                        src={doc.video}
                        loop={false}
                        muted={!sound}
                        className="absolute inset-0 h-full w-full object-cover"
                        onProgress={setProg}
                        onEnded={next}
                        onFail={() => setFailed(true)}
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,6,22,.82), rgba(3,6,22,.04) 55%, rgba(3,6,22,.3))" }} />
                    </motion.div>
                  </AnimatePresence>
                  <span className="nametag">{doc.name} · {doc.spec}</span>
                  <div className="absolute left-3 right-3 top-9 z-[3] h-[3px] overflow-hidden rounded bg-white/25">
                    <b
                      key={failed ? `bar-${fi}` : "bar"}
                      className="block h-full bg-ly"
                      style={failed ? { animation: "fillW 6s linear both" } : { width: `${prog * 100}%` }}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 z-[2] p-4 pb-11 pr-14 text-left">
                    <AnimatePresence mode="wait">
                      <div className="cap" key={`${fi}-${li}`}>
                        {line.split(" ").map((w, k) => (
                          <motion.span
                            key={k}
                            className="mr-1.5 inline-block"
                            initial={{ opacity: 0, y: 14, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.32, delay: k * 0.05, ease: EASE }}
                          >
                            {w}
                          </motion.span>
                        ))}
                      </div>
                    </AnimatePresence>
                  </div>
                  <button
                    onClick={() => setSound((m) => !m)}
                    className="absolute bottom-3 right-3 z-[4] grid h-9 w-9 place-items-center rounded-full bg-ly text-ink"
                    aria-label={sound ? "Mute" : "Turn sound on"}
                  >
                    {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3.5 max-lg:justify-center max-lg:text-center">
              <div>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={fi}
                    className="text-[clamp(20px,3vw,28px)]"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {doc.lines[0]}
                  </motion.h3>
                </AnimatePresence>
                <small className="text-[13px] text-[#8f8f98]">
                  {doc.name}, {doc.spec} · Reel {String(fi + 1).padStart(2, "0")} of {String(FORMATS.length).padStart(2, "0")}
                </small>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
