import React, { useState } from 'react';

const Popup = ({ onClose, onConfirm }: any) => {
  const [name, setName] = useState('');

  const handleConfirm = () => {
    if (name.trim()) {
      onConfirm(name);
      onClose();
    } else {
      alert('Please enter your name to proceed.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-2xl font-bold mb-4">Enter Your Name</h2>
        <input
          type="text"
          className="input input-bordered w-full mb-4"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
