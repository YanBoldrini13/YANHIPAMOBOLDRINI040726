import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Petslist from "./pages/Petslist";
import PetDetail from "./pages/PetDetail";
import PetForm from "./pages/PetForm";
import TutorForm from "./pages/TutorForm";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "../../context/authContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Petslist />
              </PrivateRoute>
            }
          />

          <Route
            path="/pets/:id"
            element={
              <PrivateRoute>
                <PetDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/pets/novo"
            element={
              <PrivateRoute>
                <PetForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/tutor/novo"
            element={
              <PrivateRoute>
                <TutorForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
