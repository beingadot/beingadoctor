import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { EASE, Reveal } from "./shared";
import { FAQS, wa } from "../data";
import { cn } from "../utils/cn";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="rounded-t-[40px] bg-cr pb-24 pt-16 md:pt-20 relative z-[2]">
      <div className="mx-auto max-w-[1160px] px-5">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="text-[clamp(32px,5.4vw,58px)]">
                Questions doctors ask us<span className="dot">.</span>
              </h2>
              <p className="lead mt-4">
                Something else?{" "}
                <a
                  href={wa("Hi Beingadot, I have a question.")}
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-nv underline"
                >
                  Message us on WhatsApp
                </a>
                .
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 flex max-w-[520px] flex-wrap items-center gap-3 rounded-2xl border border-ln bg-white px-5 py-4">
                <span className="font-semibold">Still have a question?</span>
                <a className="btn ml-auto min-h-0! py-2.5!" href="#contact">
                  Book a call
                </a>
                <a
                  className="btn btn-lt min-h-0! py-2.5!"
                  href={wa("Hi Beingadot, I have a question.")}
                  target="_blank"
                  rel="noopener"
                >
                  WhatsApp us
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div>
              {FAQS.map((f, k) => (
                <div key={k} className="fqi">
                  <button className={cn("fqs", open === k && "open")} onClick={() => setOpen(open === k ? -1 : k)}>
                    {f.q}
                    <span className="fqp">
                      <Plus size={16} strokeWidth={2.6} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === k && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        style={{ overflow: "hidden" }}
                      >
                        <p>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
