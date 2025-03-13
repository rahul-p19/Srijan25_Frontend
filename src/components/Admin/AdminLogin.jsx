import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import GridLines from "../GridLines";
import { CONST } from "../../config";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("SrijanAdminAuthToken");
    if (token) {
      navigate("/admin/details", { replace: true });
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${CONST.env.API_SERVER}/adminLogin`, {
        username,
        password,
      });
      setLoading(false);
      localStorage.setItem("SrijanAdminAuthToken", response.data.token);
      navigate("/admin/details", { replace: true });
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error.message);
      } else {
        setError("Invalid Event Name or Password.");
      }
      setLoading(false)
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="w-full relative font-sometypeMono">
    <GridLines/>
      <div className="min-h-screen flex items-center justify-center p-4 font-['Source_Code_Pro']">
        <div className="w-full max-w-xl bg-black/20 rounded-2xl backdrop-blur-sm border border-white flex flex-col p-8 text-left">
          <h1 className="font-bold lg:text-2xl">
            Srijan-2025 Admin Login
          </h1>

          <div className="mt-6 mb-4 flex flex-wrap">
            <div className="w-full flex flex-col ">
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <form
                id="signupForm"
                className="space-y-4 mt-4"
                onSubmit={handleLogin}
              >
                <div className="mb-4">
                  <label className="block text-[#8420FF]">
                    Enter Event Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg bg-transparent text-white focus:outline-none focus:ring focus:ring-[#8420FF]"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[#8420FF]">Enter Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg bg-transparent text-white focus:outline-none focus:ring focus:ring-[#8420FF]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="w-full flex justify-center mt-8">
                  <button
                    type="submit"
                    className="bg-[#8420FF] text-white py-2 px-6 rounded-lg hover:bg-[#6a1ccc] transition"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
