import { ClipboardList, MapPin } from "lucide-react";

export const SECTIONS = [
  {
    id: "echo",
    type: "exam",
    images: ["/images/echo-1.jpeg", "/images/echo-2.jpeg"],
  },
  {
    id: "ecg",
    type: "exam",
    images: ["/images/ecg-1.jpeg", "/images/ecg-2.jpeg"],
  },
  {
    id: "holter",
    type: "exam",
    images: ["/images/holter-1.jpeg", "/images/holter-2.jpeg"],
  },
  {
    id: "bring",
    type: "extra",
    icon: ClipboardList,
  },
  {
    id: "reach",
    type: "extra",
    icon: MapPin,
  },
];

export const getSection = (id) => SECTIONS.find((s) => s.id === id);
