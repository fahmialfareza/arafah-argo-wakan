import { Outlet } from "@tanstack/react-router";
import { useNProgress } from "../hooks/useNProgress";

export default function Root() {
  useNProgress();

  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
}
