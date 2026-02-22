import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .dashboard-container {
          font-family: 'Inter', sans-serif;
          color: #0f172a;
        }

        .header-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #0f172a;
        }

        .header-subtitle {
          font-size: 15px;
          color: #64748b;
          margin: 0 0 32px 0;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        /* Stat Card */
        .stat-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px -8px rgba(0,0,0,0.1);
        }

        .icon-box {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-info h3 {
          font-size: 14px;
          font-weight: 500;
          color: #64748b;
          margin: 0 0 4px 0;
        }

        .stat-info p {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1;
        }

        /* Bottom Section Grid */
        .bottom-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        /* Panels */
        .panel {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .panel-header {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 20px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .chart-placeholder {
          height: 300px;
          background: #f8fafc;
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          font-weight: 500;
        }

        /* Activity List */
        .activity-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .activity-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .activity-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #eff6ff;
          color: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .activity-text p {
          margin: 0 0 4px 0;
          font-size: 14px;
          color: #334155;
          font-weight: 500;
        }

        .activity-text span {
          font-size: 12px;
          color: #94a3b8;
        }

        /* Skeleton Animation */
        .skeleton {
          background: #e2e8f0;
          border-radius: 8px;
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        /* Responsive */
        @media (max-width: 992px) {
          .bottom-grid {
            grid-template-columns: 1fr; /* Stacks chart and activity on smaller screens */
          }
        }
      `}</style>

      <div className="dashboard-container">
        <h1 className="header-title">Dashboard Overview</h1>
        <p className="header-subtitle">Welcome back! Here's what's happening today.</p>

        {loading ? (
          /* 🔥 Skeleton Loading State */
          <>
            <div className="stats-grid">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="stat-card" style={{ height: "106px" }}>
                  <div className="skeleton" style={{ width: "56px", height: "56px", borderRadius: "14px" }}></div>
                  <div style={{ flex: 1 }}>
                    <div className="skeleton" style={{ width: "60%", height: "14px", marginBottom: "8px" }}></div>
                    <div className="skeleton" style={{ width: "40%", height: "28px" }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bottom-grid">
               <div className="skeleton" style={{ height: "400px", borderRadius: "16px" }}></div>
               <div className="skeleton" style={{ height: "400px", borderRadius: "16px" }}></div>
            </div>
          </>
        ) : (
          /* 🚀 Actual Content */
          <>
            <div className="stats-grid">
              <StatCard 
                title="Total Users" 
                value={stats?.totalUsers || 0} 
                color="#3b82f6" 
                bgColor="#eff6ff"
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
              />
              <StatCard 
                title="Total Blogs" 
                value={stats?.totalBlogs || 0} 
                color="#10b981" 
                bgColor="#ecfdf5"
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>}
              />
              <StatCard 
                title="Published Blogs" 
                value={stats?.publishedBlogs || 0} 
                color="#f59e0b" 
                bgColor="#fffbeb"
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>}
              />
              <StatCard 
                title="Hidden Blogs" 
                value={stats?.hiddenBlogs || 0} 
                color="#ef4444" 
                bgColor="#fef2f2"
                icon={<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>}
              />
            </div>

            <div className="bottom-grid">
              {/* Chart Section */}
              <div className="panel">
                <h2 className="panel-header">
                  <svg width="20" height="20" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  Blog Activity
                </h2>
                <div className="chart-placeholder">
                  <span>Interactive Chart goes here (e.g., Recharts or Chart.js)</span>
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className="panel">
                <h2 className="panel-header">
                  <svg width="20" height="20" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  Recent Activity
                </h2>
                <ul className="activity-list">
                  <li className="activity-item">
                    <div className="activity-icon">✨</div>
                    <div className="activity-text">
                      <p>New blog uploaded by Admin</p>
                      <span>Just now</span>
                    </div>
                  </li>
                  <li className="activity-item">
                    <div className="activity-icon">👤</div>
                    <div className="activity-text">
                      <p>User registered successfully</p>
                      <span>2 hours ago</span>
                    </div>
                  </li>
                  <li className="activity-item">
                    <div className="activity-icon">🔄</div>
                    <div className="activity-text">
                      <p>Blog status updated (Published → Hidden)</p>
                      <span>Yesterday</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// Reusable Stat Card Component
function StatCard({ title, value, color, bgColor, icon }) {
  return (
    <div className="stat-card">
      <div className="icon-box" style={{ backgroundColor: bgColor, color: color }}>
        {icon}
      </div>
      <div className="stat-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}