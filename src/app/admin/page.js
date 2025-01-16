"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchStore, deleteStore } from "../redux/e-commerce/adminSlice";

const Admin = () => {
  // const [store, setStore] = useState([]);
  const {store} = useSelector((state) => state.admin || [])
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStore());
    // fetchStore()
    console.log(store)
  }, []);

  // const fetchStore = async () => {
  //   const response = await (await fetch("http://localhost:3000/admin/store")).json();
  //   console.log(response);
  //   setStore(response);
  // };

  // const deleteStore = async (id) => {
  //   const response = await fetch(`http://localhost:3000/admin/deletestore/${id}`, {
  //     method: "DELETE",
  //   });
  //   if (response.status == 200) {
  //     fetchStore();
  //   }
  // };

  return (
    <>
      <div className="flex min-h-screen flex-col  justify-center px-8 py-12 max-h-screen">
        {/* items-center */}
        <div className="flex justify-between items-center w-full bg-white p-4 pt-8">
          <div className="text-4xl font-semibold">Hi, Admin</div>
          <Link href={`/admin/create`}>
            <button className="bg-gray-100 px-4 py-2 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
              </svg>
              <span className="ms-1">Create</span>
            </button>
          </Link>
        </div>
        <div className="p-4 pb-10 bg-white d-flex overflow-scroll max-h-screen no-scrollbar">
          <table className="w-full  p-4 rounded text-center overflow-scroll px-8 ">
            <thead className="bg-gray-100">
              <tr>
                <td className="p-4 font-semibold">ID</td>
                <td className="p-4 font-semibold">Username</td>
                {/* <td className="p-4 font-semibold">Password</td> */}
                <td className="p-4 font-semibold">GST</td>
                <td className="p-4 font-semibold">Action</td>
              </tr>
            </thead>
            <tbody className="">
              {store.map((store, i) => {
                return (
                  <tr key={i} className="border-b">
                    <td className="p-3">{store._id}</td>
                    <td className="p-3">{store.username}</td>
                    {/* <td className="p-3">{store.password}</td> */}
                    <td className="p-3">{store.gst}</td>
                    <td className="p-3">
                      <Link href={`/admin/update/${store._id}`}>
                        <button type="submit" className="p-2 px-3 mr-2 bg-green-100 text-green-800 hover:font-semibold">
                          Edit
                        </button>
                      </Link>
                      <button
                        type="submit"
                        onClick={() => {
                          dispatch(deleteStore(store._id));
                          // deleteStore(store._id);
                        }}
                        className="p-2 rounded bg-red-100 text-red-800 hover:font-semibold"
                      >
                        Delete
                      </button>
                      {/* onSubmit={deleteStore(store._id)} */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Admin;
