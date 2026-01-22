import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Petslist from "./pages/Petslist";
import PetDetail from "./pages/PetDetail";
import PetForm from "./pages/PetForm";
import TutorForm from "./pages/TutorForm";

import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/pets"
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
  );
}

export default App;
