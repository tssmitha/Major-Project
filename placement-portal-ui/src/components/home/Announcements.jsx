import { Megaphone } from "lucide-react";
import "../../styles/Home/Announcements.css";

const announcements = [
  {
    text: "Resume verification for 2026 batch starts this week",
    link: "/resources/resume-verification",
  },
  {
    text: "Infosys registration closes tomorrow",
    link: "/drives/infosys",
  },
  {
    text: "TCS shortlist has been published",
    link: "/announcements/tcs-shortlist",
  },
];

function Announcements() {
  return (
    <section className="announcement-ticker">
      <div className="ticker-label">
        <Megaphone size={20} />
        <span>Announcements</span>
      </div>

      <div className="ticker-window">
        <div className="ticker-track">
          {[...announcements, ...announcements].map((item, index) => (
            <a href={item.link} className="ticker-item" key={index}>
                {item.text}
            </a>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Announcements;