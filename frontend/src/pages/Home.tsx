import { useNavigate } from "react-router-dom";
import "../components/Form.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome to Movie App</h1>
        <p>Discover, review, and save your favorite movies!</p>
        <button className="home-login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;