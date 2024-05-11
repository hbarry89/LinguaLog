import { ToastContainer, Toast } from 'react-bootstrap';

const CustomToast = ({ message, variant, show, onClose }) => {
  return (
    <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1 }}>
      <Toast onClose={onClose} show={show} delay={2000} autohide>
        <Toast.Body className={`bg-${variant}`}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;