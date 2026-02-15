import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import BugsOverlay from "./components/BugsOverlay.jsx";
import CookieBanner from "./components/CookieBanner.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";

import Home from "./pages/Home.jsx";
import Domains from "./pages/Domains.jsx";
import Services from "./pages/Services.jsx";
import Legislation from "./pages/Legislation.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/domenii" element={<Domains />} />
          <Route path="/servicii" element={<Services />} />
          <Route path="/legislatie" element={<Legislation />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />

      {/* Overlays */}
      <BugsOverlay count={12} respawnAllAfterMs={0} />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}

