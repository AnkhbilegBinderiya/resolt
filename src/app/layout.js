import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";
import Head from 'next/head';
import Navbar from "../components/Navbar/navbar";
import { AuthProvider } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import "./globals.css";

const mont = Montserrat({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: "ResoltX",
  description: 'Embark on an exhilarating journey into the world of sports betting with our cutting-edge platform that redefines the way you engage with the game. Introducing a revolutionary Sport Bet Prediction Website, where we bring you beyond conventional match predictions and immerse you in a detailed exploration of game dynamics, quarter by quarter and half by half. What sets us apart is our commitment to harnessing the power of machine learning to provide you with unparalleled statistical insights, transforming the way you approach sports betting.',
  image: 'http://localhost:3000/api/og'
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" className={mont.className}>
        <AuthProvider>
          <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:image" content={metadata.image} />
            <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'ResoltX'} />
            <meta property="og:type" content="website" />
          </head>
          <body>
              <Navbar />
              <div className='flex overflow-hidden min-h-screen bg-background dark:bg-dark'>
                  <div className='w-full'>
                      {children}
                      <ToastContainer/>
                  </div>
              </div>
          </body>
        </AuthProvider>
      </html>
  );
}
