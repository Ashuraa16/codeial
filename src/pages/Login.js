import { useState } from "react";
import styles from "../styles/login.module.css";
import { toast } from "react-toastify";
import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  // State variables to manage form inputs and logging in status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const auth=useAuth();
  console.log(auth)
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    // Check if email and password are provided
    if (!email || !password) {
      // Display error toast if email or password is missing
      toast.error("Please enter both email and password", {
        // Toast configuration
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Reset loggingIn status
      setLoggingIn(false);

      return;
    }

    // Make a login API request
    const response = await auth.login(email, password);

    // Display success or error toast based on API response
    if (response.success) {
      toast.success("Successfully logged in", {
        // Toast configuration
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error(response.message, {
        // Toast configuration
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    // Clear email and password fields, and reset loggingIn status
    setEmail("");
    setPassword("");
    setLoggingIn(false);
  };
  if(auth.user){
    return <Navigate to='/'/>;
  }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? "Logging in..." : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default Login;
