import Navbar from "../components/Navbar";
import Footer from "../pages/dashboard/Footer";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
