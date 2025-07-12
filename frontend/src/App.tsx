import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
// import Home from "./pages/Home"; // You can comment this out if not needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />         {/* Default route is now Login */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;