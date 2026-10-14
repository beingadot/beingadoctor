import { useEffect, useRef } from "react";

type Props = {
  src: string;
  className?: string;
  /** show a single frame, never plays (cheap, for small decorative spots) */
  still?: boolean;
  loop?: boolean;
  muted?: boolean;
  paused?: boolean;
  /** 0..1 playback position, fired while playing */
  onProgress?: (p: number) => void;
  onEnded?: () => void;
  onFail?: () => void;
};

/* A looping, muted, inline <video> that only plays while it is on screen. */
export default function Media({
  src,
  className,
  still,
  loop = true,
  muted = true,
  paused = false,
  onProgress,
  onEnded,
  onFail,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  // React does not reliably update the muted attribute, so set the property.
  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted]);

  // play only while visible and not paused
  useEffect(() => {
    const v = ref.current;
    if (!v || still) return;
    let visible = true;
    const sync = () => {
      if (visible && !paused) {
        v.play().catch(() => {
          // browser refused sound without a tap: fall back to muted playback
          v.muted = true;
          v.play().catch(() => {});
        });
      } else v.pause();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    sync();
    return () => io.disconnect();
  }, [paused, still, src]);

  return (
    <video
      ref={ref}
      className={className}
      src={`${src}#t=${still ? 0.5 : 0.1}`}
      muted
      playsInline
      loop={still ? false : loop}
      autoPlay={!still}
      preload={still ? "metadata" : "auto"}
      aria-hidden="true"
      tabIndex={-1}
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        if (onProgress && v.duration) onProgress(v.currentTime / v.duration);
      }}
      onEnded={onEnded}
      onError={onFail}
    />
  );
}
