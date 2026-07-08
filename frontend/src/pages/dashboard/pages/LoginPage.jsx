import DashboardImg from "../../../assets/DashboardImg.png";
import { PiSignInBold } from "react-icons/pi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "./../context/AuthContext";
import { AdminLoginApi } from "../../../services/auth.service";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = UseAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();

      setError("");
      setLoading(true);

      try {
        const response = await AdminLoginApi({
          email,
          password,
        });

        login(
          response.data.user,
          response.data.token
        );

        navigate("/dashboard");
      } catch (err) {
        setError(
          err.response?.data?.message || "Login failed"
        );
      } finally {
        setLoading(false);
      }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col md:flex-row">

        {/* الصورة */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <img
            src={DashboardImg}
            alt="Dashboard"
            className="w-full"
          />
        </div>

        {/* الفورم */}
        <div className="w-full h-screen md:w-1/2 bg-[#EDAEC2] flex items-center justify-center p-6">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8">
            <h1 className="mb-2 text-3xl font-medium text-[#32393f] sm:text-4xl">
              Welcome Back
            </h1>

            <h3 className="mb-8 text-sm font-normal text-[#6b6c6e] sm:text-base">
              Welcome back! Please enter your details.
            </h3>

            {/* ✅ form بدل div عشان الـ submit يشتغل */}
            <form onSubmit={handleSubmit} className="flex flex-col">

              <label htmlFor="username" className="pb-2 font-medium text-[#32393f]">
                Username/Email :
              </label>
              <input
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dashboard.com"
                required
                type="text"
                className="mb-6 w-full rounded border border-[#d1d3d4] p-3 focus:border-[#808081] focus:outline-none"
              />

              <label htmlFor="password" className="pb-2 font-medium text-[#32393f]">
                Password :
              </label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                type="password"
                className="mb-4 w-full rounded border border-[#d1d3d4] p-3 focus:border-[#808081] focus:outline-none"
              />

              {/* ✅ Error Message */}
              {error && (
                <p className="mb-4 text-sm text-red-700! text-center">
                  ⚠️ {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`flex w-full items-center justify-center gap-2 rounded border border-[#d1d3d4] bg-[#E6709C] p-3 text-[20px] font-normal text-white transition sm:text-[22px]
                  ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#c24271]"}`}
              >
                {loading ? "loading..." : "Sign In"}
                {!loading && <PiSignInBold className="text-[22px]" />}
              </button>

            </form>
          </div>
        </div>

      </div>
    </>
  );
}