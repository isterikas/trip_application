import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar.tsx";
import { lazy, Suspense } from "react";
import Footer from "./components/Footer.tsx";
import MainPage from "./pages/MainPage.tsx";
import LoadingPage from "./pages/LoadingPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import TripRegistrationPage from "./pages/TripRegistrationPage.tsx";
import RegistrationApproval from "./pages/RegistrationApproval.tsx";
import TripCreationPage from "./pages/ItemCreationPage.tsx";

const LazyAboutUsPage = lazy(() => import("./pages/AboutUsPage.tsx"));
const LazyItemsPage = lazy(() => import("./pages/ItemsPage.tsx"));
const LazyMyItemsPage = lazy(() => import("./pages/MyItemsPage.tsx"));
const LazyLoginPage = lazy(() => import("./pages/LoginPage.tsx"));
const LazySignUpPage = lazy(() => import("./pages/SignUpPage.tsx"));

function App() {
  return (
    <>
      <div className="flex flex-col justify-between h-screen w-screen overflow-auto box-border body-bg">
        <Navbar />
        <div className="flex-1 w-full flex flex-col justify-center items-center">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/about-us"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LazyAboutUsPage />
                </Suspense>
              }
            />
            <Route
              path="/items"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LazyItemsPage />
                </Suspense>
              }
            />
            <Route path="/items/:id" element={<TripRegistrationPage />} />
            <Route
              path="/my-items"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LazyMyItemsPage />
                </Suspense>
              }
            />
            <Route
              path="/registration"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <TripCreationPage />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LazySignUpPage />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LazyLoginPage />
                </Suspense>
              }
            />
            <Route
              path="/registration-approval"
              element={<RegistrationApproval />}
            />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
