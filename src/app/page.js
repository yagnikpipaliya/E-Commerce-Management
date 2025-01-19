// https://mejuri.com/world/en
// https://blog.logrocket.com/guide-adding-google-login-react-app/
"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import GoogleSignIn from "./components/GoogleSignIn";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "./redux/e-commerce/authSlice";
import { fetchProducts } from "./redux/e-commerce/productSlice";

import Top from "./assets/images/Top.avif";
import TShirts from "./assets/images/TShirts.avif";
import Keyboard from "./assets/images/Keyboard.avif";
import Hoodie from "./assets/images/Hoodie.avif";
import Headphone from "./assets/images/Headphone.avif";
import Dress from "./assets/images/Dress.avif";
import Cosmetic1 from "./assets/images/Cosmetic-1.avif";
import Cosmetic2 from "./assets/images/Cosmetic-2.avif";
import { addToCart } from "./redux/e-commerce/addToCart";

const Home = () => {
  const dispatch = useDispatch();
  const { cartItemCount } = useSelector((state) => state.AddToCart);
  const { profile, loading, error } = useSelector((state) => state.auth);
  const router = useRouter();
  const { products } = useSelector((state) => state.products);

  const [role, setRole] = useState("store");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    // if (localStorage.getItem("token") != null) {
    //   router.push("/store");
    // }
    // getAllProducts()
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [itemCount, setItemCount] = useState(3);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);
  const items = [
    {
      id: 1,
      title: "Product 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 49.99,
      image: "1712753465611_2458663.jpg", // Replace with actual image path
    },
    {
      id: 2,
      title: "Product 2",
      description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      price: 29.99,
      image: "1712753465611_2458663.jpg", // Replace with actual image path
    },
    {
      id: 3,
      title: "Product 3",
      description: "Nulla facilisi. Sed id orci quis metus lacinia consectetur.",
      price: 79.99,
      image: "1712753465611_2458663.jpg", // Replace with actual image path
    },
    {
      id: 4,
      title: "Product 4",
      description: "Fusce vehicula, dui sit amet mattis vehicula, leo ex ultricies nisl, nec varius arcu urna id ligula.",
      price: 99.99,
      image: "1712753465611_2458663.jpg", // Replace with actual image path
    },
  ];
  const settings = {
    dots: false, // Disable dots
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false, // Ensure dots are disabled on responsive breakpoints
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false, // Ensure dots are disabled on responsive breakpoints
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false, // Ensure dots are disabled on responsive breakpoints
        },
      },
    ],
  };

  // Load the profile from localStorage in useEffect (client-side only)
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const storedProfile = localStorage.getItem("profile");
  //     if (storedProfile) {
  //       dispatch(loginWithGoogle.fulfilled(JSON.parse(storedProfile)));
  //     }
  //   }
  // }, [dispatch]);

  const getAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "GET",
      });
    } catch (error) {
      console.error("getAllProducts err: ", error);
    }
  };
  console.log("cartItemCount", cartItemCount);
  const handleAddTocart = (product) => dispatch(addToCart(product));

  return (
    <>
    
    {/* <main className="container mx-auto p-4"></main> */}
      <HeroProducts settings={settings} />

      <section className="bg-primary">
        <div className=" max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 ms-2">Featured Items</h2>
          <Slider {...settings}>
            {items.map((item) => (
              <div key={item.id} className="group overflow-hidden transition-shadow duration-300 hover:shadow-md hover:border hover:border-gray-200 hover:bg-white">
                {/* relative hover:shadow-md*/}
                <div className="p-2 pb-0 w-full h-64 overflow-hidden relative">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1670793631008-7b01f8f7c5ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 -z-10"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1720065527129-e50696c384a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
                    alt={item.title}
                    loading="lazy"
                    className="p-2 pb-0 w-full h-64 object-cover absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 -z-0"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-700">{item.price}</p>
                  <button onClick={() => handleAddTocart(item)} className="mt-3 px-4 py-2 w-full bg-[#057C80] text-white hover:bg-opacity-90 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className=" max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 ms-2">Featured Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-3 gap-4">
            {products?.length > 0 && products?.map((item) => (
              <div key={item._id} className="group overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:bg-white">
                {/* relative */}
                <div className="p-2 pb-0 w-full h-64 overflow-hidden relative">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1670793631008-7b01f8f7c5ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
                    alt={item?.image}
                    loading="lazy"
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 -z-10"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1720065527129-e50696c384a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
                    alt={item?.image}
                    loading="lazy"
                    className="p-2 pb-0 w-full h-64 object-cover absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 -z-0"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-700">{item.price}</p>
                  <button onClick={() => handleAddTocart(item)} className="mt-3 px-4 py-2 w-full bg-[#057C80] text-white hover:bg-opacity-90 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-[#057C80] mb-8">FEATUERD ITEMS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <img src="https://via.placeholder.com/300" loading="lazy" alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-[#057C80]">{item.title}</h3>
                <p className="text-gray-700">{item.price}</p>
                <button className="mt-4 px-4 py-2 w-full bg-[#057C80] text-white rounded hover:bg-opacity-90 transition duration-300">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;

const HeroProducts = ({ settings }) => {
  const HomeBannerData = [
    {
      id: 1,
      title: "Product 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "$49.99",
      image: Top,
    },
    {
      id: 2,
      title: "Product 2",
      description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      price: "$29.99",
      image: TShirts,
    },
    {
      id: 3,
      title: "Product 3",
      description: "Nulla facilisi. Sed id orci quis metus lacinia consectetur.",
      price: "$79.99",
      image: Keyboard,
    },
    {
      id: 4,
      title: "Product 4",
      description: "Fusce vehicula, dui sit amet mattis vehicula, leo ex ultricies nisl, nec varius arcu urna id ligula.",
      price: "$99.99",
      image: Hoodie,
    },
    {
      id: 5,
      title: "Product 4",
      description: "Fusce vehicula, dui sit amet mattis vehicula, leo ex ultricies nisl, nec varius arcu urna id ligula.",
      price: "$99.99",
      image: Headphone,
    },
    {
      id: 6,
      title: "Product 4",
      description: "Fusce vehicula, dui sit amet mattis vehicula, leo ex ultricies nisl, nec varius arcu urna id ligula.",
      price: "$99.99",
      image: Dress,
    },
    {
      id: 7,
      title: "Product 4",
      description: "Fusce vehicula, dui sit amet mattis vehicula, leo ex ultricies nisl, nec varius arcu urna id ligula.",
      price: "$99.99",
      image: Cosmetic1,
    },
    {
      id: 8,
      title: "Product 4",
      description: "Fusce vehicula, dui sit amet mattis vehicula, leo ex ultricies nisl, nec varius arcu urna id ligula.",
      price: "$99.99",
      image: Cosmetic2,
    },
  ];

  const HeroSliderSetting = {
    ...settings,
    infinite: true, // Ensure infinite scrolling
    autoplay: true, // Enable autoplay for continuous sliding
    autoplaySpeed: 1000, // Adjust speed (in milliseconds)
    nextArrow: <SampleNextArrow customStyle={{ right: "40px", height: "0px" }} />,
    prevArrow: <SamplePrevArrow customStyle={{ left: "20px", height: "0px" }} />,
  };

  return (
    <>
      <Slider {...HeroSliderSetting}>
        {HomeBannerData.map((item, i) => (
          <div key={i} className="group overflow-hidden transition-shadow duration-300 hover:shadow-md hover:border hover:border-gray-200 hover:bg-white">
            {/* relative hover:shadow-md*/}
            <div className="p-2 pb-0 w-full h-80 overflow-hidden relative">
              <Image src={item.image} alt={item.description} loading="lazy" className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 -z-10" />
              <Image
                src={item.image}
                alt={item.description}
                loading="lazy"
                className="p-2 pb-0 w-full h-80 object-cover absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 -z-0"
              />
            </div>
            {/* <div className="p-2">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-700">{item.price}</p>
                  <button className="mt-3 px-4 py-2 w-full bg-[#057C80] text-white hover:bg-opacity-90 transition duration-300">Add to Cart</button>
                </div> */}
          </div>
        ))}
      </Slider>
    </>
  );
};
const SampleNextArrow = (props) => {
  const { className, style, onClick, customStyle } = props;
  return (
    <div className={`${className} bg-white rounded-full shadow-lg`} style={{ ...style, display: "block", height: "40px", right: "10px", ...customStyle }} onClick={onClick}>
      <svg
        className={` bg-gray-100 hover:bg-white rounded-full flex items-center justify-center`}
        width="44px"
        height="44px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M8.793 5h1.414l7 7-7 7H8.793l7-7z"></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
      </svg>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { className, style, onClick, customStyle } = props;
  return (
    <div
      className={`${className} bg-gray-700 text-white rounded-full flex items-center justify-center`}
      style={{ ...style, display: "block", height: "40px", left: "-15px", zIndex: 1, ...customStyle }}
      onClick={onClick}
    >
      <svg
        className={` bg-gray-100 hover:bg-white rounded-full flex items-center justify-center`}
        width="44px"
        height="44px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M6.793 12l7-7h1.414l-7 7 7 7h-1.414z"></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
      </svg>
    </div>
  );
};
