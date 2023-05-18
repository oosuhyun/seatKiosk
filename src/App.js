import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container, Navbar} from "react-bootstrap";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import StartPage from "./pages/StartPage";
import logo from './assets/logo/LogoImg.png';

function App() {
  return (
      <BrowserRouter>
          <div>
              <Navbar bg="dark">
                  <Container>
                      <Navbar.Brand href="/">
                          <img
                              src={logo}
                              width="350"
                              height="60"
                              className="d-inline-block align-top"
                              alt="React Bootstrap logo"
                          />
                      </Navbar.Brand>
                  </Container>
              </Navbar>
              <Routes>
                  <Route path = "/main" element={<MainPage />} />
                  <Route path = "/register" element={<RegisterPage />} />
                  <Route path = "/" element={<StartPage />} />
              </Routes>
          </div>
        {/*<div>*/}
        {/*  <Navbar bg="dark" variant="dark">*/}
        {/*    <Container>*/}
        {/*      <Navbar.Brand href="/">Reservation</Navbar.Brand>*/}
        {/*    </Container>*/}
        {/*  </Navbar>*/}
        {/*  <Routes>*/}
        {/*    <Route path = "/main" element={<MainPage />} />*/}
        {/*    <Route path = "/register" element={<RegisterPage />} />*/}
        {/*    <Route path = "/" element={<StartPage />} />*/}
        {/*  </Routes>*/}
        {/*</div>*/}
      </BrowserRouter>
  );
}

export default App;
