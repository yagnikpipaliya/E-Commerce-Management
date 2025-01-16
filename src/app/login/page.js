"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("store");
    const [err, setErr] = useState("");
    const router = useRouter();
    const [token, setToken] = useState("");
    const [user, setUser] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/admin/login", {
          method: "POST",
          body: JSON.stringify({ username: username, password: password, role: role }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (response.status == 200) {
          const data = await response.json();
          console.log(data);
          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.user);
          }
          role == "admin" ? router.push("/admin") : role == "store" ? router.push("/store") : router.push("/");
        }
        response.status == 404 ? setErr("Invalid credentials!") : response.status == 400 ? setErr("Invalid data") : setErr("");
      };

  

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center px-8 bg-primary">
        <form onSubmit={onSubmit}>
          <h1 className="text-4xl pb-4 font-bold">Login</h1>
          <select name="role" id="" className="w-full p-3 my-3 rounded border-none" onChange={(e) => setRole(e.target.value)} value={role} required>
            {/* defaultValue={"store"} */}
            <option value="admin">Admin</option>
            <option value="store">Seller</option>
          </select>
          <input type="text" className="w-full p-3 rounded border-none" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} required></input>
          <input type="text" className="w-full p-3 my-3 rounded border-none" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required></input>
          <div className="pt-3 text-red-500 font-semibold">{err}</div>
          <button type="submit" className="w-full p-3 mt-4 rounded border-slate-500 bg-white">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default Login;
