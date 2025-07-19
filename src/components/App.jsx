// import { useState, useEffect } from 'react'
import "../styles/App.css";
import Game from "./Game";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <div className="app">
      <div className="header">
        <Header></Header>
      </div>

      <div className="content">
        <Game></Game>
      </div>

      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
