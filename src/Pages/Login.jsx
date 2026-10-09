import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [inputValue, setInputVale] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleInputValu = (e) => {
    setInputVale({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignIn = async (e) => {
    e.preventDefault();

    setApiError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: inputValue.username.trim(),
          password: inputValue.password,
          expiresInMins: 30,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/");
    } catch (error) {
      if (error.response) {
        setApiError(
          error.response.data?.message || "Invalid username or password.",
        );
      } else {
        setApiError(
          "Unable to connect. Please check your internet connection.",
        );
      }
    } finally {
      setLoading(false);
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!inputValue.username.trim()) {
      newErrors.username = "Please enter your username.";
    }

    if (!inputValue.password) {
      newErrors.password = "Please enter your password.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="mb-5 w-full max-w-xs  text-sm">
          usernamer: emilys
          <br />
          password: emilyspass
          <hr className="h-1 w-full my-1 bg-slate-900" />
          usernmae: sophiab
          <br />
          password: sophiabpass
        </div>
        <div className="w-full max-w-xs">
          <form
            onSubmit={handleSignIn}
            className="bg-slate-900 shadow rounded-lg px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                value={inputValue.username}
                onChange={handleInputValu}
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-slate-900 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="Username"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-400">{errors.username}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                value={inputValue.password}
                onChange={handleInputValu}
                className="shadow appearance-none border  rounded-lg w-full py-2 px-3 text-slate-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="password"
                placeholder="******************"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password}</p>
              )}
            </div>
            {apiError && (
              <p role="alert" className="mb-4 text-sm text-red-400">
                {apiError}
              </p>
            )}
            <div className="flex items-center justify-between">
              <button
                disabled={loading}
                className="bg-white hover:bg-blue-500 transition-all ease-out text-slate-900 font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-white hover:text-blue-500"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} MAHMOUD. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
