import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../utils/cn";

export const EASE: [number, number, number, number] = [0.22, 0.9, 0.24, 1];

/* ---------------- scroll reveal ---------------- */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- section heading block ---------------- */
export function Head({
  eyebrow,
  title,
  lead,
  dark = false,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("grid items-end gap-x-10 gap-y-4 md:grid-cols-2", className)}>
      <Reveal>
        <div className={cn("eb", dark && "eb-dark")}>{eyebrow}</div>
        <h2 className="text-[clamp(32px,5.4vw,58px)]">
          {title}
          <span className={cn("dot", dark && "dot-dark")}>.</span>
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.12}>
          <div className={cn("lead md:justify-self-end md:text-right", dark && "lead-dark")}>{lead}</div>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ---------------- count-up number ---------------- */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (n: number) => {
      const k = Math.min(1, (n - t0) / 1600);
      setV(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(v).toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ---------------- global modal ---------------- */
type ModalVariant = "card" | "video";
interface UiApi {
  open: (node: ReactNode, variant?: ModalVariant) => void;
  close: () => void;
}
const UiCtx = createContext<UiApi>({ open: () => {}, close: () => {} });
export const useUi = () => useContext(UiCtx);

export function UiProvider({ children }: { children: ReactNode }) {
  const [node, setNode] = useState<ReactNode | null>(null);
  const [variant, setVariant] = useState<ModalVariant>("card");

  const open = useCallback((n: ReactNode, v: ModalVariant = "card") => {
    setNode(n);
    setVariant(v);
  }, []);
  const close = useCallback(() => setNode(null), []);

  const boxRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (node) {
      opener.current = (document.activeElement as HTMLElement) ?? null;
      document.body.style.overflow = "hidden";
      const t = window.setTimeout(() => boxRef.current?.focus(), 40);
      return () => window.clearTimeout(t);
    }
    document.body.style.overflow = "";
    opener.current?.focus?.();
    return () => {
      document.body.style.overflow = "";
    };
  }, [node]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [close]);

  return (
    <UiCtx.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {node && (
          <motion.div
            className="modal-bg"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              ref={boxRef}
              className={cn("modal-box", variant === "video" && "modal-video")}
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <button className="modal-x" onClick={close} aria-label="Close">
                <X size={18} />
              </button>
              {node}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </UiCtx.Provider>
  );
}
