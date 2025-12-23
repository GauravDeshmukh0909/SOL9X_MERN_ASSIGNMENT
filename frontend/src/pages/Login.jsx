import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice.js";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student", 
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  const res = await dispatch(loginUser(form));

  if (res.meta.requestStatus === "fulfilled") {
    const actualRole = res.payload.user.role;
    const selectedRole = form.role;

    // Role mismatch check
    if (actualRole !== selectedRole) {
      setError(`You are not authorized to login as ${selectedRole}`);
      setIsLoading(false);
      return;
    }

    // Correct role → navigate
    if (actualRole === "admin") {
      navigate("/admin");
    } else {
      navigate("/student");
    }
  } else {
    setError("Invalid email or password. Please try again.");
  }

  setIsLoading(false);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">

        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Login As
  </label>

  <div className="grid grid-cols-2 gap-3">
    {/* Student */}
    <label
      className={`cursor-pointer rounded-lg border px-3 py-2 text-center transition-all
        ${
          form.role === "student"
            ? "border-indigo-600 bg-indigo-50 shadow-sm"
            : "border-gray-300 hover:border-indigo-400"
        }
      `}
    >
      <input
        type="radio"
        name="role"
        value="student"
        checked={form.role === "student"}
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
        className="hidden"
      />
      <div className="text-lg">🎓</div>
      <p className="text-sm font-semibold text-gray-800">Student</p>
    </label>

    {/* Admin */}
    <label
      className={`cursor-pointer rounded-lg border px-3 py-2 text-center transition-all
        ${
          form.role === "admin"
            ? "border-indigo-600 bg-indigo-50 shadow-sm"
            : "border-gray-300 hover:border-indigo-400"
        }
      `}
    >
      <input
        type="radio"
        name="role"
        value="admin"
        checked={form.role === "admin"}
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
        className="hidden"
      />
      <div className="text-lg">🛠️</div>
      <p className="text-sm font-semibold text-gray-800">Admin</p>
    </label>
  </div>
</div>



          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Signup */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
