import React from 'react';
import './SettingsModal.css';

const Settings = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>⚙️ Sozlamalar</h2>
      <div className="setting-option">
        <label className="custom-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          <p className='setting-label'>Kunduzgi rejim</p>
        </label>
      </div>
      <button className="close-btn" onClick={onClose}>Yopish</button>
    </div>
  </div>
);

export default Settings;