"use client";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./components/theme";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar";
import { usePathname } from 'next/navigation';
// const inter = Inter({ subsets: ["latin"] });
const inter = Montserrat({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
    // Define the routes where Navbar should not be displayed
    const hideNavbarRoutes = ['/admin', '/store'];

    // Check if the current route matches any in hideNavbarRoutes
    const shouldHideNavbar = hideNavbarRoutes.some((route) => pathname.startsWith(route));
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" /> */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" />
      </head>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GoogleOAuthProvider clientId="766021033888-5hu0johh235fqogi9m9ic612bof87nn3.apps.googleusercontent.com">
            <Provider store={store}>
            {!shouldHideNavbar && <Navbar />}
              {/* <main className="container mx-auto p-4">{children}</main> */}
              {children}
            </Provider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
