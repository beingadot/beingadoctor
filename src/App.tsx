import Hero, { Strip } from "./components/Hero";
import WhatWeDo from "./components/WhatWeDo";
import HowItWorks from "./components/HowItWorks";
import Formats from "./components/Formats";
import Pricing, { Services } from "./components/Pricing";
import Results, { Approval } from "./components/Results";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import { MotionConfig } from "framer-motion";
import { CookieConsent, Routes } from "./components/Pages";
import { UiProvider } from "./components/shared";

function Home() {
  return (
    <main id="main">
      <Hero />
      <Strip />
      <WhatWeDo />
      <HowItWorks />
      <Formats />
      <Pricing />
      <Services />
      <Results />
      <Approval />
      <Contact />
      <Faq />
    </main>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <UiProvider>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Routes home={<Home />} />
        <CookieConsent />
      </UiProvider>
    </MotionConfig>
  );
}
