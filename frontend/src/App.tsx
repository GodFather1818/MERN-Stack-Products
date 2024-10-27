// import React from 'react;
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import ProductUpdate from "./pages/ProductUpdate";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-w-full min-h-screen">
        <Navbar />
        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/:id" element={<ProductUpdate />} />
          </Routes>
        
        <Toaster />
        {/*  //richColors={true} toastOptions={{}}/> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
