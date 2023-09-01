import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Protected from "./components/routes/Protected";
import Public from "./components/routes/Public";
import Doner from "./pages/deshboard/Doner";
import Hospital from "./pages/deshboard/Hospital";
import Organization from "./pages/deshboard/Organization";
import Consumer from "./pages/deshboard/Consumer";
import Donation from "./pages/Donation";
import Analystic from "./pages/deshboard/Analystic";
import DonerList from "./pages/Admin/DonerList";
import HospitalList from "./pages/Admin/HospitalList";
import OrgList from "./pages/Admin/OrgList";
import AdminHome from "./pages/Admin/AdminHome";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Public><Login /></Public>} />
        <Route path="/register" element={<Public><Register /></Public>} />
        <Route path="/" element={<Protected ><Home /></Protected>} />
        <Route path="/donar" element={<Protected ><Doner /></Protected>} />
        <Route path="/hospital" element={<Protected ><Hospital /></Protected>} />
        <Route path="/organization" element={<Protected ><Organization /></Protected>} />
        <Route path="/consumer" element={<Protected ><Consumer /></Protected>} />
        <Route path="/donation" element={<Protected ><Donation /></Protected>} />
        <Route path="/analytics" element={<Protected ><Analystic /></Protected>} />
        <Route path="/doner-list" element={<Protected ><DonerList /></Protected>} />
        <Route path="/hospital-list" element={<Protected ><HospitalList /></Protected>} />
        <Route path="/org-list" element={<Protected ><OrgList /></Protected>} />
        <Route path="/admin" element={<Protected ><AdminHome /></Protected>} />
      </Routes>
    </>
  );
}

export default App;
