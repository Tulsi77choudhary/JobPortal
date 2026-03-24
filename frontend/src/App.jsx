import { BrowserRouter, Routes, Route } from "react-router-dom";
import  ConstomerRoutes  from "./Routes/constomerRoutes"; 
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/*" element={<ConstomerRoutes />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
