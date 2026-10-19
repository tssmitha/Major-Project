import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  GraduationCap,
  Users,
  BriefcaseBusiness,
  BarChart3,
  Star,
} from "lucide-react";
import "../styles/login.css";
import logo from "../assets/Logo.png";
import campusImage from "../assets/nie-campus.png";
import { useNavigate } from "react-router-dom";
import { getSession, getDashboardPath } from "../auth/Session";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

async function handleSubmit(event) {
  event.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await fetch("http://localhost:8081/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    const data = await response.json();
    const destination = getDashboardPath(data.role);

    if (!destination || !data.token) {
      throw new Error("The server returned an invalid login response.");
    }

    localStorage.setItem("user", JSON.stringify(data));

    if (!getSession()) {
      localStorage.removeItem("user");
      throw new Error("Your session is invalid or expired. Please log in again.");
    }

    navigate(destination, { replace: true });
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="login-page">
      <section className="login-container">
        <div className="login-brand-panel" style={{
                    backgroundImage: `
                    linear-gradient(
                        rgba(6,27,54,0.78),
                        rgba(6,27,54,0.82)
                    ),
                    url(${campusImage})
                    `,
                }}>
          <div className="brand-overlay">
            <div className="brand-header">
              <img src={logo} alt="NIE Logo" className="brand-logo" />
              <div>
                <h2>NIE Mysuru</h2>
                <p>Placement Portal</p>
              </div>
            </div>

            <div className="brand-content">
              <span className="gold-line"></span>
              <h1>
                Welcome Back!
                <br />
                Let's continue your
                <br />
                placement journey.
              </h1>
              <span className="gold-line"></span>

              <div className="security-line">
                <ShieldCheck size={24} />
                <p>Secure. Reliable. Built for NIE Students.</p>
              </div>
            </div>

            <div className="brand-stats">
              <div>
                <Users size={26} />
                <h3>1000+</h3>
                <p>Students</p>
              </div>
              <div>
                <BriefcaseBusiness size={26} />
                <h3>200+</h3>
                <p>Recruiters</p>
              </div>
              <div>
                <BarChart3 size={26} />
                <h3>350+</h3>
                <p>Placement Offers</p>
              </div>
              <div>
                <Star size={26} />
                <h3>10+</h3>
                <p>Departments</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="lock-circle">
            <Lock size={30} />
          </div>

          <h1>Portal Login</h1>
          <p className="login-subtitle">
            Access your dashboard to manage applications,
            <br />
            track drives and stay updated.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <div className="input-box">
                <Mail size={22} />
                <input type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(event) =>setEmail(event.target.value)}
                        required />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-box">
                <Lock size={22} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>


            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="divider">
              <span></span>
              <p>or</p>
              <span></span>
            </div>

          </form>

          <div className="security-notice">
            <ShieldCheck size={32} />
            <p>
              This portal is exclusively for NIE students.
              <br />
              Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </section>

      <footer className="login-footer">
        © 2026 The National Institute of Engineering, Mysuru | Training &
        Placement Office
      </footer>
    </main>
  );
};

export default Login;