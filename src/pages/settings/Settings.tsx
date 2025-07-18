// pages/settings/Settings.tsx
import { useState } from "react";
import "./settings.scss";

const Settings = () => {
  // User preferences state
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    emailAlerts: true,
    twoFactorAuth: false,
    language: "english",
    timezone: "UTC",
  });

  // Handle setting changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Save settings (would typically be an API call)
  const saveSettings = () => {
    console.log("Settings saved:", settings);
    // Here you would typically send to backend
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>
        <p className="subtitle">Manage your account preferences</p>
      </div>

      <div className="settings-sections">
        {/* Appearance Section */}
        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="setting-item">
            <label>Theme</label>
            <select 
              name="theme" 
              value={settings.theme}
              onChange={handleChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="settings-section">
          <h3>Notifications</h3>
          <div className="setting-item toggle">
            <div className="label-group">
              <label>Enable Notifications</label>
              <p className="description">Receive system notifications</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item toggle">
            <div className="label-group">
              <label>Email Alerts</label>
              <p className="description">Get important updates via email</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                name="emailAlerts"
                checked={settings.emailAlerts}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Security Section */}
        <div className="settings-section">
          <h3>Security</h3>
          <div className="setting-item toggle">
            <div className="label-group">
              <label>Two-Factor Authentication</label>
              <p className="description">Add an extra layer of security</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                name="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="settings-section">
          <h3>Preferences</h3>
          <div className="setting-item">
            <label>Language</label>
            <select 
              name="language" 
              value={settings.language}
              onChange={handleChange}
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Timezone</label>
            <select 
              name="timezone" 
              value={settings.timezone}
              onChange={handleChange}
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time (EST)</option>
              <option value="PST">Pacific Time (PST)</option>
              <option value="CET">Central European Time (CET)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="cancel-btn">Cancel</button>
        <button className="save-btn" onClick={saveSettings}>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;