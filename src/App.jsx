import { AuthProvider, useAuth } from './hooks/authContext'
import { AppRoutes } from './routes/Index'
import { RouterProvider } from 'react-router-dom'

function App() {

  return (

    <AuthProvider>
      <AuthWrapper>
      <RouterProvider router={AppRoutes} />
      </AuthWrapper>
    </AuthProvider>

  )
}

export default App

import PropTypes from 'prop-types';

function AuthWrapper({ children }) {
  const { auth } = useAuth();

  
  if (auth.loading) {
    return <p>Cargando...</p>;
  }

  if (auth.error) {
    return <p>Error de autenticación: {auth.error.message || 'Error desconocido'}</p>;
  
}

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
  return children;
}