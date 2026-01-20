import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type PrivateRouteProps = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem("accessToken");

  console.log("[PrivateRoute] token:", token);

  if (!token) {
    console.warn("[PrivateRoute] Sem token → redirecionando para /login");
    return <Navigate to="/login" replace />;
  }

  console.log("[PrivateRoute] Token OK → renderizando children");
  return <>{children}</>;
}
