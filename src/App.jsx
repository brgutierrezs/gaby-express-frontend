import { AuthProvider } from './hooks/authContext'
import { AppRoutes } from './routes/Index'
import { RouterProvider } from 'react-router-dom'

function App() {


  return (
    <AuthProvider>
      <RouterProvider router={AppRoutes} />
    </AuthProvider>

  )
}

export default App
