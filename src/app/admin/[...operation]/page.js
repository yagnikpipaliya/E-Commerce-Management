"use client";
// import AdminState from "@/app/context/admin/AdminState";
// import adminStore from "../../context/admin/adminStore";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Create = ({ params }) => {
  let { operation } = params;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gst, setGst] = useState("");

  const [title, setTitle] = useState("Create");
  const router = useRouter();

  useEffect(() => {
    if (operation[0] == "update") {
      setTitle("Update");
      fetchStore();
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    operation[0] == "update" ? updateStore() : createStore();
  };

  const fetchStore = async () => {
    const response = await (await fetch(`http://localhost:3000/admin/store/${operation[1]}`)).json();
    console.log(response != null);
    if (response != null) {
      setUsername(response.username);
      setPassword(response.password);
      setGst(response.gst);
    }
  };

  const createStore = async () => {
    const response = await fetch("http://localhost:3000/admin/createstore", {
      method: "POST",
      body: JSON.stringify({ username, password, gst }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response.status == 201) {
      router.push("/admin");
    }
  };

  const updateStore = async () => {
    const response = await fetch(`http://localhost:3000/admin/updatestore/${operation[1]}`, {
      method: "PUT",
      body: JSON.stringify({ username, password, gst }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 200) {
      router.push("/admin");
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex justify-center items-center p-8 bg-white">
          {/* w-full */}
          <form onSubmit={onSubmit}>
            <h1 className="text-4xl pb-4 font-bold">
              {" "}
              <span className="capitalize">{title}</span> store{" "}
            </h1>
            <input
              type="text"
              className="w-full p-3 my-3 rounded border-none bg-gray-100"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <input
              type="text"
              className="w-full p-3 my-3 rounded border-none bg-gray-100"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <input
              type="text"
              className="w-full p-3 my-3 rounded border-none bg-gray-100"
              placeholder="GST No"
              onChange={(e) => setGst(e.target.value)}
              value={gst}
              required
            />
            <button type="submit" className="w-full p-3 mt-4 rounded border-slate-500 bg-gray-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
