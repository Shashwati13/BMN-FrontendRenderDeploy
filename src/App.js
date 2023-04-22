import "./App.css";
import Kommunicate from "./components/Chat/Chat";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./components/screens/LandingPage/LandingPage";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen/RegisterScreen";
import AboutUs from "./components/screens/About/About";
import { BrowserRouter, Route } from "react-router-dom";
import ContactUs from "./components/screens/Contact/Contact";
import Owner from "./components/screens/OwnerView/Owner";
import DashBoard from "./components/screens/DashboardScreen/Dashboard";
import LodgeComplaints from "./components/screens/LodgeComplaintsScreen/LodgeComplaints";
import PropertyDetail from "./components/screens/PropertyDetail/PropertyDetail";
import BookingModel from "./components/screens/PropertyDetail/BookingModel";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import Bookings from "./components/screens/PropertyDetail/Bookings";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminUsers from "./components/Admin/Users";
import AdminProperties from "./components/Admin/Properties";
import AdminBookings from "./components/Admin/Bookings";
import AdminPayments from "./components/Admin/Payments";

const PUBLIC_KEY = "pk_test_51MwcKeIwzH30Dc7oSSs7dEGPX5InYVbA0O9PshrYpKmYCJ9jegkDkweSvhhJLs1HjDAXpGIXnvf3xRrN1zTRlTws00vYqM72Tk"
const stripeTestPromise = loadStripe(PUBLIC_KEY)



const App = () => (
  <BrowserRouter>

    <Header
      currentPage={
        window.location.pathname == "/"
          ? "/"
          : window.location.pathname.slice(1)
      }
    />
    <main>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={() => <LoginScreen />} />
      <Route exact path="/register" component={() => <RegisterScreen />} />
      <Route exact path="/Owner" component={() => <Owner />} />
      <Route exact path="/DashBoard" component={() => <DashBoard />} />
      <Route exact path="/property/:id" component={() => <PropertyDetail />} />
      
      <Route exact path="/bookings" component={() => <Bookings />} />
      <Route exact path="/admin/login" component={() => <AdminLogin />} />
      <Route exact path="/admin/users" component={() => <AdminUsers />} />
      <Route exact path="/admin/payments" component={() => <AdminPayments />} />
      <Route exact path="/admin/bookings" component={() => <AdminBookings />} />
      <Route
        exact
        path="/admin/properties"
        component={() => <AdminProperties />}
      />
      <Elements stripe={stripeTestPromise}>
      <Route
        exact
        path="/property/:id/book"
        component={() => <BookingModel />}
      />
      </Elements>
      <Route
        exact
        path="/LodgeComplaints"
        component={() => <LodgeComplaints />}
      />
    </main>
    <AboutUs
      AboutUsvar={
        window.location.pathname == "/"
          ? "/"
          : window.location.pathname.slice(1)
      }
    />
    <ContactUs
      ContactUsvar={
        window.location.pathname == "/"
          ? "/"
          : window.location.pathname.slice(1)
      }
    />
    <Kommunicate/>
    <Footer />
  </BrowserRouter>
);

export default App;
