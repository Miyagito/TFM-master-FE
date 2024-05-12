import "./App.css";
import MyRoutes from "./routes/MyRoutes";
import HomePage from "./pages/Home/HomePage";

function App() {
  return (
    <MyRoutes>
      <HomePage />
    </MyRoutes>
  );
}

export default App;
