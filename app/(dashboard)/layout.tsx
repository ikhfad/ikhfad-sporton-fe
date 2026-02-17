import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Sidebar from "./components/layouts/sidebar";
import AuthGuard from "./components/layouts/auth-guard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SportOn Admin",
  description: "Admin Dashboard for SportOn Website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${poppins.variable} antialiased`}>
        <AuthGuard>
          <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 lg:ml-72 p-4 md:p-6 md:pt-20 lg:p-8 xl:p-14 bg-[#F7F9FA] min-h-screen pt-20 lg:pt-14">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
            <ToastContainer
              position="bottom-right"
              style={{ zIndex: 99999 }}
            ></ToastContainer>
          </div>
        </AuthGuard>
      </body>
    </html>
  );
}
