import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import Home from './pages/home';
import Navbar from './components/navbar/Navbar';
import Leftbar from './components/leftbar/Leftbar';
import Rightbar from './components/rightbar/Rightbar';
import "./style/style.scss"
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {

  const queryClient = new QueryClient()
  const {currentUser} = useContext(AuthContext);
  const ProtectedRoute = ({children}) => {
    if (!currentUser){
      return <Navigate to="/login"></Navigate>
    }
    return children;
  }

  const {darkMode} = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar/>
        <div style={{display: "flex"}}>
          <Leftbar/>
          <div style={{flex: 6}}>
          <Outlet/>
          </div>
          <Rightbar/>
        </div>
      </div>
      </QueryClientProvider>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
