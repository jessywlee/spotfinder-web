import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <p className="text-center text-md font-semibold mb-4">회원 탈퇴 되었습니다.</p>
        <button
          onClick={onClose}
          className="w-full py-2 text-white bg-black rounded-md focus:outline-none"
        >
          확인
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
