import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Loader, Navbar } from './';
import { Home, Login } from '../pages';
import { useAuth } from '../hooks';
import Signup from '../pages/Signup';
import Settings from '../pages/Settings';
import UserProfile from '../pages/UserProfile';

function PrivateRoute({ children }) {
  const auth = useAuth();
  if (auth.user) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

const Page404 = () => {
  return <h1>Page 404</h1>;
};

function App() {
  const auth = useAuth();
  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/user/:userId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
