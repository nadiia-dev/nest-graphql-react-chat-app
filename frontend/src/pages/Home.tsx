import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "../components/Sidebar";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <ProtectedRoute>
        <Sidebar />
        <div>Home page</div>
      </ProtectedRoute>
    </MainLayout>
  );
};

export default Home;
