import { BrowserRouter, Routes, Route } from "react-router-dom";
import  { Login }  from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { Home } from "./pages/Home.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
