import Link from "next/link";
import NavBar from "./components/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" h-screen bg-white">
      <NavBar />
      <div className="md:min-h-full h-[calc(100%-78px)] mb-auto  md:ml-auto md:w-[calc(100%-78px)]">
        {children}
      </div>
    </div>
  );
}
