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

import Top from "./assets/images/Top.avif";
import TShirts from "./assets/images/TShirts.avif";
import Keyboard from "./assets/images/Keyboard.avif";
import Hoodie from "./assets/images/Hoodie.avif";
import Headphone from "./assets/images/Headphone.avif";
import Dress from "./assets/images/Dress.avif";
import Cosmetic1 from "./assets/images/Cosmetic-1.avif";
import Cosmetic2 from "./assets/images/Cosmetic-2.avif";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./redux/e-commerce/addToCart";

const Home = () => {
  const dispatch = useDispatch();
  const { cartItemCount } = useSelector((state) => state.AddToCart);
  const router = useRouter();
  const [role, setRole] = useState("store");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      router.push("/store");
    }
  }, []);

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
      price: "$49.99",
      image: "1712753465611_2458663.jpg", // Replace with actual image path
    },
    {
      id: 2,
      title: "Product 2",
      description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      price: "$29.99",
      image: "1712753465611_2458663.jpg", // Replace with actual image path
    },
    {
      id: 3,
      title: "Product 3",
      description: "Nulla facilisi. Sed id orci quis metus lacinia consectetur.",
      price: "$79.99",
      image: "1712753465611_2458663.jpg", // Replace with actual image path
    },
    {
      id: 4,
      title: "Product 4",
      description: "Fusce vehicula, dui sit amet mattis vehicula, leo ex ultricies nisl, nec varius arcu urna id ligula.",
      price: "$99.99",
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

  console.log("cartItemCount", cartItemCount);
  const handleAddTocart = (product) => dispatch(addToCart(product));

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* Logo */}
              {/* Mobile button goes here */}
              <div className="lg:hidden flex items-center">
                <button onClick={toggleSidebar} className="mobile-menu-button">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <div>
                <a href="/" className="flex items-center py-5 px-2 text-gray-700">
                  <svg className="h-6 w-6 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4V16M8 8h8M6 12h12" />
                  </svg>
                  <span className="font-bold">Logo</span>
                </a>
              </div>
            </div>

            {/* Primary Navbar items */}
            <div className="hidden lg:flex items-center space-x-1">
              <a href="/" className="py-5 px-3 text-gray-700">
                Menu Item 1
              </a>
              <a href="/" className="py-5 px-3 text-gray-700">
                Menu Item 2
              </a>
              <a href="/" className="py-5 px-3 text-gray-700">
                Menu Item 3
              </a>
              <a href="/" className="py-5 px-3 text-gray-700">
                Menu Item 4
              </a>
            </div>

            {/* Secondary Navbar items */}
            <div className="flex items-center space-x-1">
              {/* hidden md:flex */}
              <button onClick={toggleModal} className="py-5 px-3">
                <svg className="h-6 w-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h4M6 18l1.4-1.4A9 9 0 0112 3m0 0a9 9 0 014.6 13.6L18 18M9 9h.01M15 9h.01M12 15h.01" />
                </svg>
              </button>
              <a href="/" className="py-5 px-3 relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartItemCount}</span>
                )}
              </a>
              <button onClick={toggleLoginModal} className="py-2 px-3 bg-[#057C80] text-white rounded hover:bg-opacity-90 transition duration-300">
                Log In
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isSidebarOpen ? "block" : "hidden"} lg:hidden`}>
          <div className="bg-white w-screen h-screen fixed inset-0 z-50 flex flex-col  items-center">
            {/* justify-center */}
            <div className="flex justify-end  w-full p-4">
              {/* <span className="font-bold mx-auto">Menu</span> */}
              <button onClick={toggleSidebar}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex justify-between  w-full p-4">
              <span className="font-bold mx-auto">Menu</span>
              {/* <button onClick={toggleSidebar}>
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button> */}
            </div>
            <div className="flex flex-col items-center">
              <a href="/" className="py-2 text-gray-700">
                Menu Item 1
              </a>
              <a href="/" className="py-2 text-gray-700">
                Menu Item 2
              </a>
              <a href="/" className="py-2 text-gray-700">
                Menu Item 3
              </a>
              <a href="/" className="py-2 text-gray-700">
                Menu Item 4
              </a>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-start justify-center z-50">
            <div className="bg-white w-full max-w-md mt-20 p-4 rounded">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl">Search</h2>
                <button onClick={toggleModal}>
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <input type="text" className="w-full border border-gray-300 p-2 rounded" placeholder="Search..." />
            </div>
          </div>
        )}
        {/* Login Modal */}
        {isLoginModalOpen && (
          <div className="px-4 fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            {/* max-w-6xl mx-auto */}
            <div className="bg-white w-full max-w-md p-6 rounded shadow-lg transform transition-all duration-300 ease-in-out">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Login</h2>
                {/* <button onClick={toggleLoginModal}>
                  <svg
                    className="w-6 h-6 hover:text-red-500 transition duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button> */}
                <GoogleSignIn />
              </div>
              <div className="flex flex-col items-center space-y-4">
                <button className="bg-[#057C80] text-white px-6 py-3 rounded shadow-md hover:bg-opacity-90 transition duration-300">Sign in with Google</button>
                <span className="text-center text-sm">
                  Admin?{" "}
                  <a
                    href="/login"
                    className="relative text-[#057C80] after:content-['']  after:absolute after:left-0 after:bottom-0 after:w-full after:h-[0.5px] after:bg-[#057C80] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                  >
                    Login here
                  </a>
                </span>
              </div>
            </div>
          </div>
        )}
      </nav>

      <HeroProducts settings={settings} />

      {/*<main className="flex min-h-screen flex-col items-center justify-center px-8 bg-primary">
        <form onSubmit={onSubmit}>
          <h1 className="text-4xl pb-4 font-bold">Login</h1>
          <select name="role" id="" className="w-full p-3 my-3 rounded border-none" onChange={(e) => setRole(e.target.value)} value={role} required>
            {/* defaultValue={"store"} *}
            <option value="admin">Admin</option>
            <option value="store">Seller</option>
          </select>
          <input
            type="text"
            className="w-full p-3 rounded border-none"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          ></input>
          <input
            type="text"
            className="w-full p-3 my-3 rounded border-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          ></input>
          <div className="pt-3 text-red-500 font-semibold">{err}</div>
          <button type="submit" className="w-full p-3 mt-4 rounded border-slate-500 bg-white">
            Submit
          </button>
        </form>
      </main> */}

      {/* Example Item Card */}
      {/* <div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src="1712753465611_2458663.jpg" alt="Item Image" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">Item Name</div>
    <p className="text-gray-700 text-base">Item Description</p>
    <p className="text-gray-700 text-base">$99.99</p>
  </div>
  <div className="px-6 py-4">
    <button className="bg-[#057C80] text-white py-2 px-4 rounded hover:bg-opacity-90 transition duration-300">Add to Cart</button>
  </div>
</div> */}
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
            {items.map((item) => (
              <div key={item.id} className="group overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:bg-white">
                {/* relative */}
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
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
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
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M6.793 12l7-7h1.414l-7 7 7 7h-1.414z"></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
      </svg>
    </div>
  );
};
