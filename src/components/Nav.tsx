import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_LINK, wa } from "../data";
import { cn } from "../utils/cn";
import { EASE } from "./shared";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const prog = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.3 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-42% 0px -52% 0px" }
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onR = () => window.innerWidth > 860 && setOpen(false);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-ln/80 bg-cr/90 backdrop-blur-md">
        <motion.div
          className="absolute inset-x-0 top-0 z-10 h-[2.5px] origin-left bg-ly"
          style={{ scaleX: prog, boxShadow: "0 0 1px rgba(0,0,0,.3)" }}
        />
        <div className="mx-auto flex h-16 max-w-[1160px] items-center gap-6 px-5">
          <a href="#top" className="flex items-center gap-2.5 font-d text-[19px] font-extrabold uppercase tracking-[0.02em] text-nv">
            <span className="grid h-[26px] w-[26px] place-items-center rounded-[9px] bg-nv">
              <span className="h-[9px] w-[9px] rounded-full bg-ly" />
            </span>
            Beingadot<span className="text-ly [text-shadow:0_0_1px_rgba(0,0,0,.35)]">.</span>
          </a>

          <div className="ml-auto hidden items-center gap-7 text-sm font-medium md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "relative py-1.5 transition-colors duration-200",
                  active === l.href ? "font-semibold text-nv" : "text-ink hover:text-nv"
                )}
              >
                {l.label}
                {active === l.href && (
                  <motion.span
                    layoutId="navul"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] rounded bg-ly"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
              </a>
            ))}
          </div>

          <a href="#contact" className="btn ml-auto min-h-0! py-2.5! max-[380px]:hidden md:ml-0">
            Book a call
          </a>
          <button
            className="grid h-[42px] w-[42px] place-items-center rounded-xl border-[1.5px] border-nv text-nv md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-auto bg-cr px-5 pb-10 pt-2 md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {[...NAV_LINKS, { href: "#svc", label: "Services" }, { href: "#rev", label: "Reviews" }, { href: "#contact", label: "Contact" }].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-ln py-4 text-[17px] font-medium"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-5 flex gap-2.5">
              <a href="#contact" onClick={() => setOpen(false)} className="btn flex-1">
                Book a call
              </a>
            </div>
            <div className="mt-2.5 flex gap-2.5">
              <a href={wa("Hi Beingadot, I am a doctor.")} target="_blank" rel="noopener" className="btn btn-lt flex-1 gap-2">
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href={`tel:${PHONE_LINK}`} className="btn btn-lt flex-1 gap-2">
                <Phone size={16} /> Call us
              </a>
            </div>
            <p className="mt-5 text-[13px] text-mu">
              Phone &amp; WhatsApp:{" "}
              <a href={`tel:${PHONE_LINK}`} className="font-semibold text-nv underline">
                {PHONE_DISPLAY}
              </a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
