import { useRef, useState, type FormEvent } from "react";
import QRCode from "react-qr-code";
import { MessageCircle, Phone, Mail, Trash2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Reveal } from "./shared";
import { EMAIL, INTERESTS, PHONE_DISPLAY, PHONE_LINK, wa } from "../data";
import { cn } from "../utils/cn";

interface Status {
  type: "ok" | "err";
  msg: string;
  href?: string;
  hrefLabel?: string;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [spec, setSpec] = useState("Dermatologist");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [interests, setInterests] = useState<string[]>(["AI Reels"]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const toggle = (s: string) =>
    setInterests((v) => (v.includes(s) ? v.filter((x) => x !== s) : [...v, s]));

  const buildMsg = () =>
    [
      "Hi Beingadot, I am a doctor.",
      `Name: ${name}`,
      `Specialty: ${spec}`,
      `Phone: ${phone}`,
      `Interested in: ${interests.length ? interests.join(", ") : "Not sure yet"}`,
      note.trim() && `Note: ${note.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Please enter your name so we know who to reply to.";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) e.phone = "Enter a valid phone number, for example +91 98765 43210.";
    if (!consent) e.consent = "Please tick the box so we may contact you about this enquiry.";
    setErrors(e);
    if (Object.keys(e).length) {
      if (e.name) nameRef.current?.focus();
      else if (e.phone) phoneRef.current?.focus();
      else consentRef.current?.focus();
    }
    return Object.keys(e).length === 0;
  };

  const onWhatsApp = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      setStatus({
        type: "err",
        msg: "We could not continue yet. Check the highlighted fields, nothing has been sent.",
      });
      return;
    }
    const url = wa(buildMsg());
    let opened = false;
    try {
      const w = window.open(url, "_blank", "noopener,noreferrer");
      opened = !!w;
    } catch {
      opened = false;
    }
    setStatus(
      opened
        ? {
            type: "ok",
            msg: "WhatsApp is open with your details ready. Press send there to finish, and we usually reply the same day.",
            href: url,
            hrefLabel: "Open WhatsApp again",
          }
        : {
            type: "err",
            msg: "Your browser blocked the pop-up, so nothing opened and nothing was sent.",
            href: url,
            hrefLabel: "Open WhatsApp manually",
          },
    );
  };

  const onEmail = () => {
    if (!validate()) {
      setStatus({
        type: "err",
        msg: "We could not continue yet. Check the highlighted fields, nothing has been sent.",
      });
      return;
    }
    const url = `mailto:${EMAIL}?subject=${encodeURIComponent("Enquiry from a doctor")}&body=${encodeURIComponent(buildMsg())}`;
    window.location.href = url;
    setStatus({
      type: "ok",
      msg: "Your email app is opening with the message ready. Nothing is sent until you press send.",
      href: url,
      hrefLabel: "Open the email draft again",
    });
  };

  const Err = ({ k, id }: { k: string; id: string }) =>
    errors[k] ? (
      <span id={id} className="err-txt" role="alert">
        {errors[k]}
      </span>
    ) : null;

  return (
    <div className="cc relative z-[2] pt-16 md:pt-24" id="contact">
      <div className="mx-auto max-w-[1160px] px-5 pb-16 md:pb-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* left */}
          <div>
            <Reveal>
              <div className="eb cc-eb">Let&rsquo;s talk</div>
              <h2 className="text-[clamp(34px,5.6vw,58px)]">
                Let&rsquo;s make you more visible<span className="text-ink">.</span>
              </h2>
              <p className="mt-4 max-w-[440px] text-[15px] text-[#2b2b26]">
                Book a short call. We review your clinic online and suggest the right plan. We
                usually reply the same day.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-wrap gap-2.5 max-sm:[&>*]:w-full">
                <a
                  className="btn btn-bk gap-2"
                  href={wa("Hi Beingadot, I am a doctor.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} aria-hidden="true" /> WhatsApp us
                </a>
                <a className="btn btn-lt gap-2" href={`tel:${PHONE_LINK}`}>
                  <Phone size={16} aria-hidden="true" /> Call us: {PHONE_DISPLAY}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 grid gap-5">
                <div>
                  <small className="font-d text-[10px] font-bold tracking-[0.18em] text-[#2b2b26]">
                    CALL / WHATSAPP
                  </small>
                  <br />
                  <a
                    href={`tel:${PHONE_LINK}`}
                    className="font-d text-[clamp(22px,4vw,26px)] font-extrabold tracking-tight underline decoration-2 underline-offset-4 hover:decoration-nv"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div>
                  <small className="font-d text-[10px] font-bold tracking-[0.18em] text-[#2b2b26]">
                    EMAIL
                  </small>
                  <br />
                  <a
                    href={`mailto:${EMAIL}`}
                    className="font-d text-[clamp(19px,3.6vw,21px)] font-extrabold tracking-tight underline decoration-2 underline-offset-4 hover:decoration-nv"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="qr mt-7">
                <div className="rounded-lg bg-white p-1">
                  <QRCode
                    value={wa("Hi Beingadot, I am a doctor.")}
                    size={118}
                    fgColor="#111111"
                    bgColor="#ffffff"
                    aria-label="QR code linking to the Beingadot WhatsApp chat"
                    title="Scan to chat on WhatsApp"
                  />
                </div>
                <div className="mt-2 font-semibold">Scan to chat on WhatsApp</div>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("Data deletion request")}`}
                className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#2b2b26] underline underline-offset-4"
              >
                <Trash2 size={14} aria-hidden="true" /> Request deletion of my data
              </a>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={0.12}>
            <form ref={formRef} className="fc" onSubmit={onWhatsApp} noValidate>
              <div className="-m-1 flex items-center gap-3 rounded-2xl bg-cr p-3">
                <span
                  className="grid h-12 w-12 flex-none place-items-center rounded-full bg-nv font-d text-[17px] font-extrabold text-ly"
                  aria-hidden="true"
                >
                  B
                </span>
                <div className="text-[13px] leading-snug">
                  <small className="font-d text-[9.5px] font-bold tracking-[0.16em] text-mu">
                    MEET THE FOUNDER
                  </small>
                  <br />
                  <b className="font-d text-[15px]">Founder, Beingadot</b>
                  <br />
                  <a href={`tel:${PHONE_LINK}`} className="text-mu underline-offset-2 hover:underline">
                    Direct line: {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <h3 className="text-[22px]">Prefer to send your details?</h3>

              {status && (
                <div
                  className={cn("alert", status.type === "ok" ? "alert-ok" : "alert-err")}
                  role={status.type === "ok" ? "status" : "alert"}
                >
                  {status.type === "ok" ? (
                    <CheckCircle2 size={17} className="mt-0.5 flex-none" aria-hidden="true" />
                  ) : (
                    <AlertTriangle size={17} className="mt-0.5 flex-none" aria-hidden="true" />
                  )}
                  <span>
                    {status.msg}
                    {status.href && (
                      <>
                        {" "}
                        <a
                          href={status.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold underline"
                        >
                          {status.hrefLabel}
                        </a>
                      </>
                    )}
                  </span>
                </div>
              )}

              <label className="fl" htmlFor="f-name">
                Your name
                <input
                  id="f-name"
                  ref={nameRef}
                  className="inp"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                  }}
                  placeholder="Dr. …"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby="err-name"
                />
                <Err k="name" id="err-name" />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="fl" htmlFor="f-phone">
                  Phone / WhatsApp
                  <input
                    id="f-phone"
                    ref={phoneRef}
                    className="inp"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((p) => ({ ...p, phone: "" }));
                    }}
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    aria-describedby="err-phone"
                  />
                  <Err k="phone" id="err-phone" />
                </label>

                <label className="fl" htmlFor="f-spec">
                  Specialty
                  <select
                    id="f-spec"
                    className="sel"
                    value={spec}
                    onChange={(e) => setSpec(e.target.value)}
                  >
                    {[
                      "Dermatologist",
                      "Gynaecologist",
                      "Physician",
                      "Dentist",
                      "Cardiologist",
                      "Orthopaedic",
                      "Paediatrician",
                      "Other",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>

              <fieldset className="fl border-0 p-0">
                <legend className="fl mb-1.5 p-0">
                  Interested in (optional, choose any)
                </legend>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={cn("isel", interests.includes(s) && "on")}
                      onClick={() => toggle(s)}
                      aria-pressed={interests.includes(s)}
                    >
                      <span className="dck" aria-hidden="true">
                        {interests.includes(s) ? "✓" : ""}
                      </span>
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="fl" htmlFor="f-note">
                Anything we should know? (optional)
                <textarea
                  id="f-note"
                  className="txa"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={600}
                />
              </label>

              <label className="consent" htmlFor="f-consent">
                <input
                  id="f-consent"
                  ref={consentRef}
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (errors.consent) setErrors((p) => ({ ...p, consent: "" }));
                  }}
                  aria-invalid={!!errors.consent}
                  aria-describedby="err-consent"
                />
                <span>
                  I am 18 or older, and I agree that Beingadot may contact me about this enquiry
                  using the number above. No newsletter, no sharing, delete on request.{" "}
                  <a href="#/privacy" className="font-semibold text-nv underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
              <Err k="consent" id="err-consent" />

              <button className="btn w-full" type="submit">
                <MessageCircle size={16} aria-hidden="true" /> Send on WhatsApp
              </button>
              <button className="btn btn-lt w-full" type="button" onClick={onEmail}>
                <Mail size={16} aria-hidden="true" /> Send by email instead
              </button>

              <small className="text-[11.5px] leading-relaxed text-mu">
                Both options prepare the message for you. Nothing is sent until you press send.
                We only ask for your name, number, specialty and interests.
              </small>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}


