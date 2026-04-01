import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import VisionMission from "./components/VisionMission";
import Achievements from "./components/Achievements";
import GalleryPreview from "./components/GalleryPreview";
import NoticeBoard from "./components/NoticeBoard";
import PrincipalMessage from "./components/PrincipalMessage";
import PopupVideo from "./components/PopupVideo";

export default function Home() {
  return (
    <>
      <PopupVideo />
      <Hero />
      <AboutSection />
      <VisionMission />
      <Achievements />
      <GalleryPreview />
      <NoticeBoard />
      <PrincipalMessage />
    </>
  );
}
