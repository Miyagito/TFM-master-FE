import "./App.css";
import MyRoutes from "./routes/MyRoutes";
import HomePage from "./pages/Home Page/HomePage";

function App() {
  return (
    <MyRoutes>
      <HomePage className="App">hello world</HomePage>
    </MyRoutes>
  );
}

export default App;
