import "../../styles/Home/HeroSection.css";

function HeroSection(){
    return(
    <section className="hero">
        <div className="hero-content">
            <div className="hero-label">
                <span>Training & Placement Office</span>
                <span>The National Institute of Engineering</span>
                <h1>
                    Connecting Talent <br />
                    with <span>Opportunity</span>
                    </h1>
            </div>

            <p className="hero-description">
            Explore campus recruitment drives, track your applications, monitor
            placement progress, and stay connected with the Training & Placement
            Office.
            </p>

            <div className="hero-buttons">
            <button className="primary-btn">View Active Drives</button>
            <button className="outline-btn">Placement Statistics</button>
            </div>
        </div>

        <div className="hero-card">
            <h3>Placement Season 2026</h3>

            <div className="hero-stat">
            <span>Active Drives</span>
            <strong>12</strong>
            </div>

            <div className="hero-stat">
            <span>Companies Visited</span>
            <strong>86</strong>
            </div>

            <div className="hero-stat">
            <span>Students Placed</span>
            <strong>420+</strong>
            </div>
        </div>
    </section>
    )
 }

 export default HeroSection;