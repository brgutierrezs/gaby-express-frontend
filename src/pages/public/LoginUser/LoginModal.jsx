import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react';
import LoginModalCompoennt from '../../../components/login/LoginModalCompoennt';

const LoginModal = ({ isLoginOpen, toggleLoginModal }) => {


  const modalRef = useRef(null);

  // UseEffect para manejar el clic fuera del modal
  useEffect(() => {
    // Función para manejar el clic fuera del modal
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleLoginModal(); // Cierra el modal
      }
    };

    // Agregar el event listener al clic en el documento
    document.addEventListener('mousedown', handleClickOutside);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [toggleLoginModal]);

  if (!isLoginOpen) return null; // No renderizar nada si el modal no está abierto
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <LoginModalCompoennt modalRef={modalRef} toggleLoginModal={toggleLoginModal}/>
    </div>
  );

}

LoginModal.propTypes = {
  isLoginOpen: PropTypes.bool.isRequired,
  toggleLoginModal: PropTypes.func.isRequired
}

export default LoginModal