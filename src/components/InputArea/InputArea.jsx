import React from 'react';
import './InputArea.css';

const InputArea = ({ input, setInput, onSend }) => (
  <div className="input-area">
    <div className="input-wrapper">
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message..." />
      <button className="send-btn" onClick={onSend}>➔</button>
    </div>
  </div>
);

export default InputArea;