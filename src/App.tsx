import React from "react";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/theme-provider";
import { Route, Routes } from "react-router-dom";
import CityPage from "./pages/CityPage";
import WeatherDashboard from "./pages/WeatherDashboard";
import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route path="/" element={<WeatherDashboard />} />
            <Route path="/city/:cityName" element={<CityPage />} />
          </Routes>
        </Layout>
        <Toaster richColors />
      </ThemeProvider>
    </>
  );
};

export default App;
