import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

// components
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// containers
import Home from "@/containers/Home"
import About from "@/containers/About"
import List from "@/containers/List"
import Detail from "@/containers/Detail"

function App() {
    return ( 
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/list/:category" element={<List />} />
          <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        <Footer />
      </div>
    )
}

export default App