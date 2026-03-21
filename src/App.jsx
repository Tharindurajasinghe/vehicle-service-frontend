console.log("API URL:", import.meta.env.VITE_API_URL);
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ServicesPage from "./pages/ServicesPage";
import TrackingPage from "./pages/TrackingPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={styles.appWrapper}>
          <Navbar />
          <main style={styles.main}>
            <Routes>
              <Route path="/" element={<BookingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/track" element={<TrackingPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/services"
                element={
                  <PrivateRoute>
                    <ServicesPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#161622",
              color: "#e2e8f0",
              border: "1px solid #2d2d3d",
              fontFamily: "'Georgia', serif",
              fontSize: "13px",
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

const styles = {
  appWrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    flex: 1,
  },
};

export default App;