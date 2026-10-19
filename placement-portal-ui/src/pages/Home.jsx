import "../styles/Home.css";
import PlacementProcess from "../components/home/PlacementProcess";
import TopRecruiters from "../components/home/TopRecruiters";
import ActiveDrives from "../components/home/ActiveDrives";
import StatsStrip from "../components/home/StatsStrip";
import HeroSection from "../components/home/HeroSection";
import Announcements from "../components/home/Announcements";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <Announcements />
      <ActiveDrives />
      <PlacementProcess />
      <TopRecruiters />
      <Footer />

</>
    
  );
}

export default Home;