import { drives } from "../../data/drives";
import DriveCard from "./DriveCard";

function ActiveDrives(){
    return(
    <section className="active-drives">
        <div className="section-header">
            <h2>Active Drives</h2>
            <a href="#">View All →</a>
        </div>
        <div className="drive-grid">
            {drives.map((drive) => (
            <DriveCard key={drive.id} drive={drive} />
            ))}
        </div>
        </section>
    )
}

export default ActiveDrives;