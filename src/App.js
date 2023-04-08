import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './components/screens/LandingPage/LandingPage';
import LoginScreen from './components/screens/LoginScreen/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen/RegisterScreen';
import AboutUs from "./components/screens/About/About"
import { BrowserRouter, Route } from "react-router-dom";
import ContactUs from "./components/screens/Contact/Contact";
import Owner from './components/screens/OwnerView/Owner';
import DashBoard from './components/screens/DashboardScreen/Dashboard'
import Aside from './components/Aside/AsideDashboard';
import LodgeComplaints from './components/screens/LodgeComplaintsScreen/LodgeComplaints';

const App = () => (
  <BrowserRouter>
  
    <Header currentPage={(window.location.pathname == '/') ? "/" : window.location.pathname.slice(1)} />
    <Aside onpage={(window.location.pathname == '/') ? "/" : window.location.pathname.slice(1)} />
    <main>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={() => <LoginScreen />} />
      <Route exact path="/register" component={() => <RegisterScreen />} />
      <Route exact path="/Owner" component={() => <Owner />} />
      <Route exact path="/DashBoard" component={() => <DashBoard />} />
      <Route exact path ="/LodgeComplaints" component={()=> <LodgeComplaints /> }/>



    </main>
    <AboutUs AboutUsvar={(window.location.pathname == '/') ? "/" : window.location.pathname.slice(1)} />
    <ContactUs ContactUsvar={(window.location.pathname == '/') ? "/" : window.location.pathname.slice(1)} />
    <Footer />
  </BrowserRouter>
);

export default App;
