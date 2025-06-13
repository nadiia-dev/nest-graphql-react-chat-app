import AuthOverlay from "../components/AuthOverlay";
import ProfileSettings from "../components/ProfileSettings";
import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "../components/Sidebar";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <div style={{ position: "absolute" }}>
        <AuthOverlay />
        <ProfileSettings />
        <Sidebar />
        <ProtectedRoute>
          <div>Main Content</div>
        </ProtectedRoute>
      </div>
    </MainLayout>
  );
};

export default Home;
