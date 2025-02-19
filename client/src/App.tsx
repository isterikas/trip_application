import { lazy, useState, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import { Routes, Route } from "react-router";
import './App.css'
import MainPage from './components/MainPage.tsx';
import Error from '../src/components/Error.tsx'
import Loading from '../src/components/Loading.tsx'


const LazyAboutUs = lazy(()=> import("./components/AboutUs.tsx"))

function App() {

  return (
    <>
    <ErrorBoundary fallback={<Error/>}>
<Routes>

<Route path="/" element={<MainPage />} />
<Route path="/about"   element={
                <Suspense fallback={<Loading />}>
                  <LazyAboutUs />
                </Suspense>
              } />

</Routes>
</ErrorBoundary>
    </>
  )
}

export default App
