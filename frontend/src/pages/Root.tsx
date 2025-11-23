import { Outlet } from "@tanstack/react-router";
import { useNProgress } from "../hooks/useNProgress";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function Root() {
  useNProgress();
  useDocumentMeta({
    title: "PT Arafah Agro Wakan - Premium Indonesian Commodities",
    description:
      "Your trusted partner for high-quality Briquettes, Spices, Coffee, and Agricultural products from Indonesia.",
    keywords:
      "Indonesian commodities, briquettes, spices, coffee, export, import",
  });

  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
}
