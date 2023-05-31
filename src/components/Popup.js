import React from 'react';
import { useEffect } from 'react';

function Popup({ isOpen, onClose, children, name }) {
  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlay}
    >
      <div
        className={`popup__${name === 'card' ? 'container-card' : 'container'}`}
      >
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}
export default Popup;
