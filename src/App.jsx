import Login from "./Pages/Login"
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Admin from "./Pages/Admin"
import Vender from "./Components/Vender"
import Update from "./Components/Update"
import User from "./Components/User"
import SiteEng from "./Pages/SiteEng"
import OrderStatus from "./Components/OrderStatus"
import ProcureEng from "./Pages/ProcureEng"
import Requests from "./Components/Requests"
import PlaceOrder from "./Pages/PlaceOrder"
import Footer from "./Components/Footer"
import Header from "./Components/Header"

function App() {

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/adminDashboard" element={<Admin />} />
          <Route path="/add-vendors" element={<Vender />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/create-user" element={<User />} />
          <Route path="/siteEngDashboard" element={<SiteEng />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route path="/procureEngDashboard" element={<ProcureEng />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/place-order" element={<PlaceOrder/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
