import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import registerimg from "../assets/registerimage-removebg-preview.png";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    setIsLoading(true);
    setErrorMsg("");

    try {
      await API.post("/auth/register", {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
      });

      // Agar registration successful ho jaye, toh direct login pe bhej dein
      navigate("/login");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        /* Same clean modern font as the Login page */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .split-layout {
          display: flex;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          background-color: #ffffff;
        }

        /* Left Side: Branding & Image (Hidden on small screens) */
        .hero-section {
          flex: 1;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .hero-image {
          width: 100%;
          max-width: 450px;
          object-fit: contain;
          z-index: 2;
          filter: drop-shadow(0 20px 30px rgba(0,0,0,0.08));
          transition: transform 0.3s ease;
        }

        .hero-image:hover {
          transform: translateY(-5px);
        }

        .hero-content {
          text-align: center;
          margin-top: 32px;
          z-index: 2;
        }

        .hero-content h3 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .hero-content p {
          font-size: 15px;
          color: #64748b;
          max-width: 350px;
          line-height: 1.5;
        }

        /* Right Side: Form */
        .form-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: white;
        }

        .form-container {
          width: 100%;
          max-width: 400px;
        }

        .form-header {
          margin-bottom: 32px;
        }

        .form-header h2 {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
        }

        .form-header p {
          color: #64748b;
          font-size: 15px;
          margin: 0;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #334155;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .modern-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 15px;
          color: #0f172a;
          transition: all 0.2s ease;
          box-sizing: border-box;
          outline: none;
        }

        .modern-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .modern-input::placeholder {
          color: #94a3b8;
        }

        /* Eye Icon Button */
        .toggle-password {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        .toggle-password:hover {
          color: #0f172a;
        }

        .submit-btn {
          width: 100%;
          margin-top: 12px;
          padding: 14px;
          border-radius: 8px;
          background: #0f172a;
          color: white;
          font-weight: 600;
          font-size: 15px;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .submit-btn:hover:not(:disabled) {
          background: #1e293b;
        }

        .submit-btn:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }

        .error-message {
          background: #fef2f2;
          border-left: 4px solid #ef4444;
          color: #b91c1c;
          padding: 12px 16px;
          border-radius: 4px;
          font-size: 14px;
          margin-bottom: 24px;
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .split-layout {
            flex-direction: column;
          }
          .hero-section {
            padding: 40px 20px;
            background: #f8fafc;
          }
          .hero-image {
            max-width: 250px;
          }
          .hero-content {
            display: none; /* Hide text on mobile to save space */
          }
          .form-section {
            padding: 32px 24px;
          }
        }
      `}</style>

      <div className="split-layout">
        
        {/* Left Visual Section with your Custom Image */}
        <div className="hero-section">
          <img src={registerimg} alt="Register Illustration" className="hero-image" />
          <div className="hero-content">
            <h3>Start Your Journey</h3>
            <p>Join our community today and start creating content that matters.</p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="form-section">
          <div className="form-container">
            
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Sign up to get started with your new blog.</p>
            </div>

            {errorMsg && <div className="error-message">{errorMsg}</div>}

            <form onSubmit={submitHandler}>
              
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <input
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="modern-input"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="modern-input"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                    className="modern-input"
                    style={{ paddingRight: "40px" }}
                  />
                  
                  {/* Password Toggle Button */}
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Register Now"}
              </button>

            </form>

            <p style={{ textAlign: "center", fontSize: "14px", color: "#64748b", marginTop: "32px" }}>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{ color: "#0f172a", fontWeight: "600", cursor: "pointer" }}
              >
                Log in
              </span>
            </p>

          </div>
        </div>

      </div>
    </>
  );
}