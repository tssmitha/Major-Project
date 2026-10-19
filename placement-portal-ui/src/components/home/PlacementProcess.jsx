import {
  ClipboardEdit,
  Send,
  Laptop,
  Users,
  MailCheck,
} from "lucide-react";
import "../../styles/Home/PlacementProcess.css";

const steps = [
  {
    no: "01",
    title: "Register",
    desc: "Complete your profile and get verified",
    icon: ClipboardEdit,
  },
  {
    no: "02",
    title: "Apply",
    desc: "Apply to the drives you are eligible for",
    icon: Send,
  },
  {
    no: "03",
    title: "Assessment",
    desc: "Online test / technical assessment",
    icon: Laptop,
  },
  {
    no: "04",
    title: "Interview",
    desc: "Technical, HR and other rounds",
    icon: Users,
  },
  {
    no: "05",
    title: "Offer",
    desc: "Receive offer and begin your journey",
    icon: MailCheck,
  },
];

function PlacementProcess() {
  return (
    <section className="placement-process">
      <h2>Placement Process</h2>

      <div className="process-wrapper">
        <div className="process-line-bg"></div>

        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div className="process-item" key={step.no}>
              <div className="process-circle">
                <Icon size={30} strokeWidth={1.8} />
              </div>

              <span className="process-no">{step.no}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              <div className="small-underline"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PlacementProcess;