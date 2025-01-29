import { useAuth } from "../hooks/authContext"
import PublicLayout from "./public/PublicLayout";
import PrivateLayout from "./private/PrivateLayout";
//import AdminLayout from "./admin/AdminLayout";

//este index layout va a administrar si el layout que se va a mostrar es publico o de usuario registrado o de admin
const IndexLayout = () => {

    const { auth } = useAuth();

    // descomentar luego ya que se ocupara luego para el admin
    // if (auth.isAuthenticated && auth.user.role === 'admin') {
    //     return <AdminLayout>AdminLayout</AdminLayout>
    // }

    if (auth.isAuthenticated) {
        return <PrivateLayout>PrivateLayout</PrivateLayout>
    }




    return (
        <PublicLayout />
    )
}

export default IndexLayout