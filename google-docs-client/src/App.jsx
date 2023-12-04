import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
// import Editor from "./pages/Editor";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Drive from "./pages/Drive";
// import NewEditor from "./pages/NewEditor";
// import Editor from "./pages/Editor";
import NewEditor from "./pages/NewEditor";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documents/:id" element={<NewEditor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/drive" element={<Drive />} />
      </Routes>
    </>
  );
}

// Home component

export default App;
