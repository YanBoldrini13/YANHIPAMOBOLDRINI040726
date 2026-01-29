import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";

// Lazy Imports
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Petslist = lazy(() => import("./pages/Petslist"));
const PetForm = lazy(() => import("./pages/PetForm"));
const PetsEdit = lazy(() => import("./pages/PetsEdit"));

const TutorForm = lazy(() => import("./pages/TutorForm"));
const TutorEdit = lazy(() => import("./pages/TutorEdit"));
const TutoresList = lazy(() => import("./pages/TutoresList"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/pets"
          element={
            <PrivateRoute>
              <Layout>
                <Petslist />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/pets/novo"
          element={
            <PrivateRoute>
              <Layout>
                <PetForm />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/pets/editar/:id"
          element={
            <PrivateRoute>
              <Layout>
                <PetsEdit />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/tutores"
          element={
            <PrivateRoute>
              <Layout>
                <TutoresList />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/tutor/novo"
          element={
            <PrivateRoute>
              <Layout>
                <TutorForm />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/tutor/editar/:id"
          element={
            <PrivateRoute>
              <Layout>
                <TutorEdit />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}



export default App;

