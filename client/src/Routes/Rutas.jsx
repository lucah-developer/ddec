import { Navigate, Route, Routes } from "react-router-dom";
import SiteFrame from "../components/SiteFrame";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";

export default function Rutas() {
  return (
    <Routes>
      <Route element={<SiteFrame />}>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/proyectos/:id" element={<ProjectDetail />} />
        <Route path="/afip" element={<Navigate to="/proyectos?c=afip" replace />} />
        <Route path="/irrigación" element={<Navigate to="/proyectos?c=irri" replace />} />
        <Route path="/irrigacion" element={<Navigate to="/proyectos?c=irri" replace />} />
        <Route path="/ipv" element={<Navigate to="/proyectos?c=ipv" replace />} />
        <Route path="/muni" element={<Navigate to="/proyectos?c=muni" replace />} />
        <Route path="/pampaenergía" element={<Navigate to="/proyectos?c=pampa" replace />} />
        <Route path="/pampaenergia" element={<Navigate to="/proyectos?c=pampa" replace />} />
        <Route path="/proyectospriv" element={<Navigate to="/proyectos?c=priv" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
