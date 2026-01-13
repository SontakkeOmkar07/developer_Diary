import { useState } from "react";
import { postSignupData } from "../api/GetApi";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [signupForm, setSignUpForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  console.log(signupForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await postSignupData(signupForm);

      console.log(res);

      setSignUpForm({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  return (
    <>
      <section className="flex bg-slate-900 min-h-screen justify-center items-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-4 bg-slate-800 p-6 rounded-lg w-full max-w-md shadow-lg"
        >
          <h1 className="text-2xl font-semibold text-white text-center">
            Sign Up
          </h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-gray-300 font-medium">
              Name
            </label>
            <input
              value={signupForm.name}
              onChange={(e) => handleChange(e)}
              className="rounded-md px-4 py-2 bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Enter your name"
              type="text"
              name="name"
              id="name"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-300 font-medium">
              Email
            </label>
            <input
              onChange={(e) => handleChange(e)}
              value={signupForm.email}
              className="rounded-md px-4 py-2 bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Enter your email"
              name="email"
              type="email"
              id="email"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-gray-300 font-medium">
              Phone
            </label>
            <input
              onChange={(e) => handleChange(e)}
              value={signupForm.phone}
              className="rounded-md px-4 py-2 bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Enter your phone number"
              type="tel"
              name="phone"
              id="phone"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-gray-300 font-medium">
              Password
            </label>
            <input
              onChange={(e) => handleChange(e)}
              value={signupForm.password}
              className="rounded-md px-4 py-2 bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Enter your password"
              type="password"
              name="password"
              id="password"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-emerald-500 hover:bg-sky-600 text-white py-2 rounded-md font-semibold transition"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};
