import React from "react";
import axios from "axios"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./layouts/Header";
import Navbar from "./layouts/Navbar";
import PageNotFound from "./pages/PageNotFound"
import Cats from "./pages/Cats"
import Cat from "./pages/Cat"

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/cats" />} />
            <Route path="/cats/*" element={<Cats />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
