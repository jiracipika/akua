import Cursor from "@/components/cursor";
import Intro from "@/components/intro";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import TrackGallery from "@/components/track-gallery";
import VisualBreak from "@/components/visual-break";
import SpotifyCta from "@/components/spotify-cta";
import Footer from "@/components/footer";
import Konami from "@/components/konami";

export default function Home() {
  return (
    <Cursor>
      <Intro />
      <Konami />
      <div className="grain">
        <Nav />
        <main>
          <Hero />
          <Marquee text="AKUA" duration={26} />
          <TrackGallery />
          <VisualBreak />
          <Marquee text="LISTEN NOW" reverse duration={18} accent size="clamp(28px, 5vw, 64px)" />
          <SpotifyCta />
        </main>
        <Footer />
      </div>
    </Cursor>
  );
}
