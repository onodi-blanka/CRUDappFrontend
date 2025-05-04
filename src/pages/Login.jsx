import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-pink-100">
      <div className="bg-white/80 border border-white rounded-2xl p-6 w-[600px] flex flex-col shadow-xl">
        <div className="text-center text-[50px] text-slate-500">Log in</div>

        <div className="flex flex-col justify-center items-center mt-4">
          <div className="flex items-center gap-2 mb-4 w-full px-4">
            <label className="text-[20px] text-slate-500 w-[100px] text-right">
              Username:
            </label>
            <input
              type="email"
              placeholder="Enter your username"
              className="border border-slate-300 rounded px-2 py-1 flex-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 mb-4 w-full px-4">
            <label className="text-[20px] text-slate-500 w-[100px] text-right">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border border-slate-300 rounded px-2 py-1 flex-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="bg-pink-200 text-black rounded px-4 py-2 mb-2"
            onClick={handleLogin}
          >
            LogIn
          </button>

          {message && (
            <div className="text-center text-red-500 mt-2">{message}</div>
          )}

          <Link to="/register" className="mt-6 text-blue-500 underline">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
