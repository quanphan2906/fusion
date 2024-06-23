import { Inter } from "next/font/google";
import { LandingView } from "../views";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <LandingView />
  );
}
