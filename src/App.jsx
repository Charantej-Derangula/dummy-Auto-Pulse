import {
  LayoutDashboard,
  Car,
  Stethoscope,
  Wrench,
  MapPin,
  History,
  Bell,
  Settings,
  Search,
  Fuel,
  Receipt,
  FileText,
  HeartPulse,
  Battery,
  CircleGauge,
  CalendarDays,
  ChevronRight,
  Upload,
  Lightbulb,
  Menu,
  X,
  Plus,
  Thermometer,
  Zap,
  Gauge
} from "lucide-react";

import { useState, useEffect } from "react";
import "./App.css";

const DEMO_VEHICLES = [
  { manufacturer: "Honda", model: "City", variant: "ZX CVT", year: "2023", type: "Petrol", odometer: "42680", capacity: "40" },
  { manufacturer: "Hyundai", model: "Creta", variant: "SX(O)", year: "2022", type: "Diesel", odometer: "35000", capacity: "50" },
  { manufacturer: "Tata", model: "Nexon", variant: "Fearless", year: "2024", type: "Petrol", odometer: "5000", capacity: "44" },
  { manufacturer: "Toyota", model: "Innova", variant: "HyCross ZX", year: "2023", type: "Hybrid", odometer: "12000", capacity: "52" },
  { manufacturer: "Tesla", model: "Model 3", variant: "Long Range", year: "2024", type: "EV", odometer: "8000", capacity: "82" },
  { manufacturer: "Tata", model: "Nexon EV", variant: "Empowered+", year: "2024", type: "EV", odometer: "6000", capacity: "40.5" },
];

function SidebarItem({ icon: Icon, label, active, onClick }) {
  return (
    <div className={`sidebar-item ${active ? "active" : ""}`} onClick={onClick}>
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );
}

function MyVehicleView({ vehicle, onSave }) {
  const [formData, setFormData] = useState(
    vehicle || {
      manufacturer: "",
      model: "",
      variant: "",
      year: "",
      type: "Petrol",
      odometer: "",
      capacity: ""
    }
  );

  const handleSelectDemo = (e) => {
    const selected = DEMO_VEHICLES.find(v => v.model === e.target.value);
    if (selected) {
      setFormData(selected);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleClear = () => {
    onSave(null);
  };

  return (
    <div className="panel" style={{ margin: "20px" }}>
      <div className="section-header">
        <h3>{vehicle ? "Edit Vehicle" : "Add Vehicle"}</h3>
      </div>
      
      {!vehicle && (
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", color: "#aeb9ca", fontSize: "13px" }}>Quick Select Demo Vehicle</label>
          <select className="simple-input" style={{ marginTop: 0 }} onChange={handleSelectDemo} defaultValue="">
            <option value="" disabled>Select a demo vehicle...</option>
            {DEMO_VEHICLES.map(v => (
              <option key={v.model} value={v.model}>{v.manufacturer} {v.model}</option>
            ))}
          </select>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Manufacturer</label>
            <input required name="manufacturer" value={formData.manufacturer} onChange={handleChange} className="simple-input" style={{ marginTop: 0 }} placeholder="e.g. Honda" />
          </div>
          <div className="form-group">
            <label>Model</label>
            <input required name="model" value={formData.model} onChange={handleChange} className="simple-input" style={{ marginTop: 0 }} placeholder="e.g. City" />
          </div>
          <div className="form-group">
            <label>Variant</label>
            <input name="variant" value={formData.variant} onChange={handleChange} className="simple-input" style={{ marginTop: 0 }} placeholder="e.g. ZX CVT" />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input required type="number" min="1950" max="2026" name="year" value={formData.year} onChange={handleChange} className="simple-input" style={{ marginTop: 0 }} placeholder="e.g. 2023" />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="simple-input" style={{ marginTop: 0 }}>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Hybrid</option>
              <option>EV</option>
            </select>
          </div>
          <div className="form-group">
            <label>Odometer (km)</label>
            <input required type="number" min="0" name="odometer" value={formData.odometer} onChange={handleChange} className="simple-input" style={{ marginTop: 0 }} placeholder="e.g. 42680" />
          </div>
          <div className="form-group">
            <label>{formData.type === "EV" ? "Battery Capacity (kWh)" : "Fuel Capacity (Liters)"}</label>
            <input required type="number" step="0.1" min="1" name="capacity" value={formData.capacity} onChange={handleChange} className="simple-input" style={{ marginTop: 0 }} placeholder={formData.type === "EV" ? "e.g. 82" : "e.g. 40"} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button" style={{ width: "auto", padding: "10px 24px" }}>
            {vehicle ? "Update Vehicle" : "Save Vehicle"}
          </button>
          {vehicle && (
            <button type="button" onClick={handleClear} className="outline-button" style={{ width: "auto", padding: "10px 24px", color: "#ff6b6b", borderColor: "rgba(255, 107, 107, 0.4)" }}>
              Remove Vehicle
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("garage_vehicle");
    if (saved) {
      try {
        setVehicle(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse vehicle", e);
      }
    }
  }, []);

  const saveVehicle = (v) => {
    setVehicle(v);
    if (v) {
      localStorage.setItem("garage_vehicle", JSON.stringify(v));
    } else {
      localStorage.removeItem("garage_vehicle");
    }
    setActiveTab("Dashboard");
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <Car size={30} />
          </div>
          <div>
            <h1>GARAGE<span>+</span></h1>
            <p>Drive Smarter. Stay Ahead.</p>
          </div>
          {isSidebarOpen && (
            <button className="menu-btn" onClick={() => setIsSidebarOpen(false)} style={{ marginLeft: "auto" }}>
              <X size={24} />
            </button>
          )}
        </div>

        <nav>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === "Dashboard"} onClick={() => { setActiveTab("Dashboard"); setIsSidebarOpen(false); }} />
          <SidebarItem icon={Car} label="My Vehicle" active={activeTab === "My Vehicle"} onClick={() => { setActiveTab("My Vehicle"); setIsSidebarOpen(false); }} />
          <SidebarItem icon={Stethoscope} label="Diagnose Issue" active={activeTab === "Diagnose Issue"} onClick={() => setIsSidebarOpen(false)} />
          <SidebarItem icon={Wrench} label="Service & Maintenance" active={activeTab === "Service & Maintenance"} onClick={() => setIsSidebarOpen(false)} />
          <SidebarItem icon={Fuel} label="Fuel & Expenses" active={activeTab === "Fuel & Expenses"} onClick={() => setIsSidebarOpen(false)} />
          <SidebarItem icon={FileText} label="Documents" active={activeTab === "Documents"} onClick={() => setIsSidebarOpen(false)} />
          <SidebarItem icon={Bell} label="Reminders" active={activeTab === "Reminders"} onClick={() => setIsSidebarOpen(false)} />
          <SidebarItem icon={History} label="Service History" active={activeTab === "Service History"} onClick={() => setIsSidebarOpen(false)} />
          <SidebarItem icon={MapPin} label="Find Garage" active={activeTab === "Find Garage"} onClick={() => setIsSidebarOpen(false)} />
          <SidebarItem icon={Settings} label="Settings" active={activeTab === "Settings"} onClick={() => setIsSidebarOpen(false)} />
        </nav>

        <div className="sidebar-quote">
          <p>"A well-maintained car takes you further in life."</p>
        </div>
      </aside>

      <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>

      {/* MAIN */}
      <main className="main">
        {/* TOP BAR */}
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="search">
              <Search size={20} />
              <input placeholder="Search services, garages, or tips..." />
            </div>
          </div>

          <div className="top-actions">
            <div className="weather">
              ☀️
              <div>
                <strong>28°C</strong>
                <small>Hyderabad</small>
              </div>
            </div>
            <Bell size={21} />
            <div className="profile">
              <div className="avatar">C</div>
              <div>
                <strong>Charantej</strong>
                <small>Car Enthusiast</small>
              </div>
              <span>⌄</span>
            </div>
          </div>
        </header>

        {/* PAGE INTRO */}
        <section className="intro">
          <div>
            <h2>Good Morning, Charantej</h2>
            <p>Drive safe. Every journey counts.</p>
          </div>
          <blockquote>
            "Not just a machine,
            <br />
            but a part of your story."
          </blockquote>
        </section>

        {activeTab === "My Vehicle" ? (
          <MyVehicleView vehicle={vehicle} onSave={saveVehicle} />
        ) : (
          <>
            {/* HERO VEHICLE SECTION */}
            <section className="hero-grid">
              {!vehicle ? (
                <div className="vehicle-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '315px' }}>
                  <div style={{ zIndex: 2 }}>
                    <h3 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>Add your vehicle</h3>
                    <p style={{ color: '#91a0b4', maxWidth: '300px', margin: '0 auto 25px auto', lineHeight: '1.5' }}>
                      Tell Garage+ about your vehicle to unlock personalized maintenance and safety insights.
                    </p>
                    <button className="primary-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', width: 'auto', padding: '12px 24px' }} onClick={() => setActiveTab("My Vehicle")}>
                      <Plus size={18} /> Add Vehicle
                    </button>
                  </div>
                  <div className="car-area">
                    <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80" alt="Car" style={{ opacity: 0.3, filter: 'grayscale(100%)' }} />
                  </div>
                </div>
              ) : (
                <div className="vehicle-card">
                  <div className="vehicle-info">
                    <div className="vehicle-title">
                      <div className="vehicle-logo">
                        {vehicle.manufacturer.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3>{vehicle.manufacturer} {vehicle.model}</h3>
                        <p>
                          {vehicle.variant} &nbsp; | &nbsp; {vehicle.year} &nbsp; | &nbsp; {vehicle.type}
                        </p>
                      </div>
                    </div>

                    <div className="vehicle-stats">
                      <div>
                        <strong>{parseInt(vehicle.odometer).toLocaleString()} km</strong>
                        <span>Total Distance</span>
                      </div>
                      <div className="condition">
                        <span className="status-dot"></span>
                        Good Condition
                      </div>
                    </div>
                  </div>

                  <div className="car-area">
                    <img
                      src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
                      alt="Car"
                    />
                  </div>

                  <div className="vehicle-bottom">
                    <p>
                      "Well maintained
                      <br />
                      tomorrows take you further."
                    </p>
                    <button onClick={() => setActiveTab("My Vehicle")}>
                      View Vehicle Details
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* NEXT SERVICE */}
              <div className="service-card">
                <div className="service-heading">
                  <div className="round-icon blue">
                    <Wrench size={22} />
                  </div>
                  <h3>Next Recommended Service</h3>
                </div>

                <h2>General Service</h2>
                <p>at {vehicle ? (parseInt(vehicle.odometer) + 7320).toLocaleString() : "50,000"} km</p>

                <div className="service-progress">
                  <div className="progress-text">
                    <strong>7,320 km</strong>
                    <span>left</span>
                  </div>
                  <strong>85%</strong>
                </div>

                <div className="progress-bar">
                  <div style={{ width: "85%" }}></div>
                </div>

                <div className="due-date">
                  <CalendarDays size={19} />
                  <div>
                    <span>Estimated Due</span>
                    <strong>Dec 2025</strong>
                  </div>
                </div>

                <button className="primary-button">
                  Book a Service
                </button>
              </div>
            </section>


            {/* ACTION CARDS */}
            <section className="three-column">
              {/* DIAGNOSE */}
              <div className="panel diagnose">
                <div className="panel-title">
                  <Stethoscope size={25} />
                  <div>
                    <h3>What's the issue?</h3>
                    <p>Tell us what's happening with your vehicle.</p>
                  </div>
                </div>
                <div className="diagnose-input">
                  <Search size={19} />
                  <input placeholder="e.g. brake noise, engine light, vibration..." />
                  <button>Get Diagnosis</button>
                </div>
                <div className="popular">
                  <span>Brake noise</span>
                  <span>Engine warning light</span>
                  <span>Low mileage</span>
                  <span>AC not cooling</span>
                  <span>Starting problem</span>
                </div>
              </div>

              {/* ESTIMATE */}
              <div className="panel estimate">
                <div className="panel-title">
                  <FileText size={24} />
                  <div>
                    <h3>Service Estimate Check</h3>
                    <p>Already have a garage quote?<br />Upload it and we'll analyze it.</p>
                  </div>
                </div>
                <div className="upload-box">
                  <Upload size={30} />
                  <strong>Upload Estimate</strong>
                  <span>PDF, Image (JPG, PNG)</span>
                </div>
                <button className="outline-button">Analyze Estimate</button>
              </div>

              {/* GARAGE */}
              <div className="panel garage">
                <div className="panel-title">
                  <div className="round-icon blue">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3>Find a Garage</h3>
                    <p>Discover trusted garages near you.</p>
                  </div>
                </div>
                <input className="simple-input" placeholder="Enter location (e.g. Hyderabad)" />
                <select className="simple-input">
                  <option>Select service type</option>
                  <option>General Service</option>
                  <option>Engine</option>
                  <option>Brakes</option>
                  <option>Tyres</option>
                  <option>AC</option>
                </select>
                <button className="outline-button">Find Garages</button>
              </div>
            </section>


            {/* LOWER SECTION */}
            <section className="three-column lower">
              {/* RECENT ACTIVITY */}
              <div className="panel">
                <div className="section-header">
                  <h3>Recent Activity</h3>
                  <span>View All →</span>
                </div>
                <Activity icon={<Fuel />} title="Engine Oil Change" date="Aug 28, 2025" amount="₹2,500" />
                <Activity icon={<Wrench />} title="Service Completed" date="Aug 10, 2025" amount="₹8,400" />
                <Activity icon={<Car />} title="Tyre Rotation" date="Jul 22, 2025" amount="₹1,200" />
                <Activity icon={<Receipt />} title="Insurance Renewed" date="Jun 15, 2025" amount="₹12,300" />
              </div>

              {/* HEALTH */}
              <div className="panel health">
                <div className="section-header">
                  <div className="health-title">
                    <HeartPulse />
                    <h3>Vehicle Health</h3>
                  </div>
                  <span className="good">Good</span>
                </div>
                <p className="health-subtitle">Overall Condition</p>

                <div className="health-grid">
                  {vehicle?.type === 'EV' ? (
                    <>
                      <HealthItem icon={<Battery />} label="Battery Health" value="98%" />
                      <HealthItem icon={<Thermometer />} label="Battery Temp" value="32°C" />
                      <HealthItem icon={<Zap />} label="Charging" value="Good" />
                      <HealthItem icon={<Gauge />} label="Est Range" value="410km" />
                      <HealthItem icon={<Battery />} label="Degradation" value="2.1%" />
                      <HealthItem icon={<CircleGauge />} label="Tyres" value="75%" />
                      <HealthItem icon={<CircleGauge />} label="Brakes" value="92%" />
                    </>
                  ) : (
                    <>
                      <HealthItem icon={<Car />} label="Engine" value="92%" />
                      <HealthItem icon={<CircleGauge />} label="Tyres" value="68%" />
                      <HealthItem icon={<CircleGauge />} label="Brakes" value="85%" />
                      <HealthItem icon={<Battery />} label="Battery" value="90%" />
                    </>
                  )}
                </div>
              </div>

              {/* QUICK TIP */}
              <div className="panel tip">
                <div className="section-header">
                  <div className="health-title">
                    <Lightbulb />
                    <h3>Quick Tip</h3>
                  </div>
                  <span>● ● ●</span>
                </div>
                <div className="tip-image">
                  <img src="https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=900&q=80" alt="Road" />
                  <div>
                    Check tyre pressure<br />at least once a month.
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

/* ACTIVITY COMPONENT */
function Activity({ icon, title, date, amount }) {
  return (
    <div className="activity">
      <div className="activity-icon">
        {icon}
      </div>
      <div className="activity-info">
        <strong>{title}</strong>
        <span>{date}</span>
      </div>
      <strong>{amount}</strong>
    </div>
  );
}

/* HEALTH COMPONENT */
function HealthItem({ icon, label, value }) {
  return (
    <div className="health-item">
      <div className="health-icon">
        {icon}
      </div>
      <strong>{label}</strong>
      <div className="health-bar">
        {/* We skip rendering a visual progress bar if value is not a percentage to avoid invalid CSS. Simple check: */}
        {value.includes('%') ? (
          <div style={{ width: value }}></div>
        ) : (
          <div style={{ width: '100%', background: '#3ee69b' }}></div>
        )}
      </div>
      <span>{value}</span>
    </div>
  );
}

export default App;