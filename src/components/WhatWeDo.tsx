import { ArrowRight, Search, Video, MousePointerClick, Phone, MessageCircle, CalendarCheck, BellRing, MapPin } from "lucide-react";
import { Head, Reveal } from "./shared";

export default function WhatWeDo() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1160px] px-5">
        <Head
          eyebrow="What we do"
          title="Everywhere your patients look"
          lead={<><b className="font-semibold text-ink">One team</b> for your whole online presence, built around Reels made with your AI clone.</>}
        />
        <p className="mt-3 text-[12px] text-mu">
          Illustrative screens using sample content. Your own listing, Reels and notifications
          replace them.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {/* be found */}
          <Reveal delay={0}>
            <div className="card h-full">
              <div className="im relative">
                {/* map mockup */}
                <div className="absolute inset-0 bg-[#e8e4dc]">
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0 40h80M40 0v80' stroke='%23bbb' stroke-width='.4'/%3E%3C/svg%3E\")" }} />
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-nv" />
                      <div>
                        <b className="block text-[11px] font-d font-bold">Dr. Meera Iyer</b>
                        <span className="text-[9px] text-mu">Dermatologist · Open now</span>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-nv px-2 py-0.5 text-[8px] font-semibold text-white"><Phone size={8} /> Call</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#25d366] px-2 py-0.5 text-[8px] font-semibold text-white"><MessageCircle size={8} /> WhatsApp</span>
                    </div>
                  </div>
                </div>
                {/* floating specialty badge */}
                <div className="absolute right-2 top-2 rounded-lg bg-nv px-2 py-1 text-right text-[8px] font-bold uppercase tracking-[0.1em] text-white shadow-lg">
                  Your specialty<br />
                  <span className="font-d text-[11px] text-ly">Dermatology</span>
                </div>
              </div>
              <h3><i><Search size={11} /></i>Be found</h3>
              <div className="flex items-center justify-between px-2 py-2.5 border-b border-ln">
                <div>
                  <b className="text-[14px] text-ink block">Google profile &amp; Maps</b>
                  <span className="text-[12.5px] text-mu">Set up, managed, every review answered.</span>
                </div>
                <ArrowRight size={16} className="text-mu flex-none" />
              </div>
              <div className="flex items-center justify-between px-2 py-2.5">
                <div>
                  <b className="text-[14px] text-ink block">Clinic website</b>
                  <span className="text-[12.5px] text-mu">Mobile-friendly and built for bookings.</span>
                </div>
                <ArrowRight size={16} className="text-mu flex-none" />
              </div>
            </div>
          </Reveal>

          {/* be trusted */}
          <Reveal delay={0.12}>
            <div className="card card-b h-full">
              <div className="im relative">
                <img
                  src="img/reel-2.jpg"
                  alt="Sample Reel frame: a dermatologist explaining a skin myth to camera"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* floating calendar card */}
                <div className="absolute right-2 top-2 rounded-lg bg-white p-2 shadow-lg text-[8px]">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="h-2 w-2 rounded bg-nv" /> This month
                    <span className="ml-auto text-[7px] font-semibold text-nv">Instagram</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {[1, 2, 3].map((k) => (
                      <div key={k} className="grid h-5 w-5 place-items-center rounded bg-[#e4e8f6] text-[7px] font-bold text-nv">✓</div>
                    ))}
                  </div>
                  <div className="mt-1 flex gap-1 text-[7px] text-mu">
                    <span className="flex items-center gap-0.5"><span className="h-1.5 w-1.5 rounded bg-nv" /> Posted</span>
                    <span className="flex items-center gap-0.5"><span className="h-1.5 w-1.5 rounded bg-ly" /> Planned</span>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 z-10 rounded-md bg-black/50 px-2 py-1 text-[9px] font-semibold text-white backdrop-blur-sm">
                  sugar blockage milta hai?
                </div>
              </div>
              <h3><i><Video size={11} /></i>Be trusted</h3>
              <div className="flex items-center justify-between px-2 py-2.5 border-b border-[#2a2a2e]">
                <div>
                  <b className="text-[14px] text-white block">AI-clone Reels</b>
                  <span className="text-[12.5px] text-[#8f8f98]">Your face and voice. You record once.</span>
                </div>
                <ArrowRight size={16} className="text-[#8f8f98] flex-none" />
              </div>
              <div className="flex items-center justify-between px-2 py-2.5">
                <div>
                  <b className="text-[14px] text-white block">Social media management</b>
                  <span className="text-[12.5px] text-[#8f8f98]">Your Instagram, planned and posted.</span>
                </div>
                <ArrowRight size={16} className="text-[#8f8f98] flex-none" />
              </div>
            </div>
          </Reveal>

          {/* get enquiries */}
          <Reveal delay={0.24}>
            <div className="card card-c h-full">
              <div className="im">
                <div className="w-full space-y-2 px-3">
                  {[
                    { icon: Phone, color: "bg-nv", label: "Phone", sub: "Incoming call", right: "now" },
                    { icon: MessageCircle, color: "bg-[#25d366]", label: "WhatsApp", sub: "New message", right: "now" },
                    { icon: CalendarCheck, color: "bg-nv", label: "Appointments", sub: "New appointment request", right: "now" },
                  ].map((n, k) => {
                    const Icon = n.icon;
                    return (
                      <div key={k} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 shadow-md" style={{ animationDelay: `${k * 0.3}s`, animation: "floaty8 3.5s ease-in-out infinite" }}>
                        <span className={`grid h-8 w-8 place-items-center rounded-full ${n.color} text-white flex-none`}><Icon size={14} /></span>
                        <div className="min-w-0 flex-1">
                          <b className="block text-[11px] text-ink">{n.label}</b>
                          <span className="text-[10px] text-mu font-semibold">{n.sub}</span>
                        </div>
                        <span className="text-[9px] text-mu font-semibold">{n.right}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h3><i><MousePointerClick size={11} /></i>Get enquiries</h3>
              <div className="flex items-center justify-between px-2 py-2.5 border-b border-[#d4e6a0]">
                <div>
                  <b className="text-[14px] text-ink block">Meta &amp; Google ads</b>
                  <span className="text-[12.5px] text-mu">Ads that reach people near your clinic.</span>
                </div>
                <ArrowRight size={16} className="text-mu flex-none" />
              </div>
              <div className="px-2 py-2.5 text-[12.5px] text-mu flex items-start gap-2">
                <BellRing size={14} className="text-nv flex-none mt-0.5" />
                Plus one-tap call and WhatsApp on your profile and website.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
