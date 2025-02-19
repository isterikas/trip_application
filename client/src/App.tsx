// import { lazy, useState, Suspense } from 'react'
// import { ErrorBoundary } from 'react-error-boundary';
// import { Routes, Route } from "react-router";
// import './App.css'
// import MainPage from './components/MainPage.tsx';
// import Error from '../src/components/Error.tsx'
// import Loading from '../src/components/Loading.tsx'

// const LazyAboutUs = lazy(()=> import("./components/AboutUs.tsx"))

// function App() {

//   return (
//     <>
//     <ErrorBoundary fallback={<Error/>}>
// <Routes>

// <Route path="/" element={<MainPage />} />
// <Route path="/about"   element={
//                 <Suspense fallback={<Loading />}>
//                   <LazyAboutUs />
//                 </Suspense>
//               } />

// </Routes>
// </ErrorBoundary>
//     </>
//   )
// }

import { Route, Routes } from "react-router";
import NotFound from "./components/NotFound.tsx";
import Navbar from "./components/Navbar.tsx";
import RegistrationForm from "./components/RegistrationForm.tsx";
import { useEffect, useState } from "react";
import { getAllData } from "./lib/get.ts";
import Footer from "./components/Footer.tsx";
import Items from "./components/Items.tsx";

function App() {
  const [update, setUpdate] = useState(0);
  const [information, setInformation] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const data = await getAllData();
      setInformation(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Items
                information={information}
                update={update}
                setUpdate={setUpdate}
                error={error}
              />
            }
          />
          <Route
            path="/registration"
            element={
              <RegistrationForm
                setUpdate={setUpdate}
                information={information}
                error={error}
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
