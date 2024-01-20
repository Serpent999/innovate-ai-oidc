import React, { useState } from 'react';
const Inputbar = ({ onSend }) => {
  const [input, setInput] = useState('');
  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };
  return (
    <div className="input-bar">
      <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
export default Inputbar;
