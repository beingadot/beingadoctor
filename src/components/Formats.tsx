import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, Reveal } from "./shared";
import { FORMATS } from "../data";
import { cn } from "../utils/cn";

export default function Formats() {
  const [fi, setFi] = useState(0);
  const [reelIdx, setReelIdx] = useState(0); // 0 or 1 for two reels per format
  useEffect(() => {
    const id = setTimeout(() => {
      setFi((v) => (v + 1) % FORMATS.length);
      setReelIdx(0);
    }, 5000);
    return () => clearTimeout(id);
  }, [fi]);
  const f = FORMATS[fi];
  const currentImg = reelIdx === 0 ? f.img : f.img2;

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
                Five formats we make for doctors. The frames below are samples; your own Reels
                replace them. Tap a format to switch.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="no-scrollbar mt-7 max-lg:-mx-5 max-lg:flex max-lg:gap-2 max-lg:overflow-x-auto max-lg:px-5 max-lg:pb-1">
                {FORMATS.map((fm, k) => (
                  <button key={k} className={cn("fi", k === fi && "on")} onClick={() => { setFi(k); setReelIdx(0); }}>
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

          {/* right — phone preview */}
          <Reveal delay={0.15} className="justify-self-center">
            <div
              role="button"
              tabIndex={0}
              className="mx-auto w-fit cursor-pointer"
              onClick={() => setReelIdx((v) => (v + 1) % 2)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setReelIdx((v) => (v + 1) % 2)}
              aria-label="Next reel in this format"
            >
              <div className="phone">
                <div className="scr">
                  <div className="notch" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${fi}-${reelIdx}`}
                      className="absolute inset-0"
                      style={{ background: f.grad }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {currentImg && (
                        <img src={currentImg} alt="" className="absolute inset-0 h-full w-full object-cover kenburns" loading="lazy" />
                      )}
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,6,22,.82), rgba(3,6,22,.04) 55%, rgba(3,6,22,.3))" }} />
                    </motion.div>
                  </AnimatePresence>
                  <span className="nametag">{f.doc} · {f.spec}</span>
                  <div className="absolute left-3 right-3 top-9 z-[3] h-[3px] overflow-hidden rounded bg-white/25">
                    <b key={`bar-${fi}`} className="block h-full bg-ly" style={{ animation: "fillW 5s linear both" }} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 z-[2] p-4 pb-11 text-left">
                    <AnimatePresence mode="wait">
                      <div className="cap" key={`${fi}-${reelIdx}`}>
                        {f.cap.split(" ").map((w, k) => (
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
                </div>
              </div>
            </div>

            {/* two-reel thumbnails */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-[10px] text-white/40 font-semibold">2 Reels in this format</span>
              <div className="flex gap-2">
                {[f.img, f.img2].map((img, k) => (
                  <button
                    key={k}
                    onClick={() => setReelIdx(k)}
                    className={cn(
                      "h-12 w-9 overflow-hidden rounded-lg border-2 transition-all",
                      k === reelIdx ? "border-ly scale-110" : "border-white/20 opacity-60 hover:opacity-100",
                    )}
                  >
                    {img ? (
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full" style={{ background: f.grad }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3.5 max-lg:justify-center max-lg:text-center">
              <div>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={`${fi}-${reelIdx}`}
                    className="text-[clamp(20px,3vw,28px)]"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {f.cap}
                  </motion.h3>
                </AnimatePresence>
                <small className="text-[13px] text-[#8f8f98]">
                  {f.doc}, {f.spec} · Reel {String(fi + 1).padStart(2, "0")} of 05
                </small>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
