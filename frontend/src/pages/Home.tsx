// import ProtectedRoute from "../components/ProtectedRoute";
import { Group } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <Group style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <div>Main Content</div>
      </Group>
    </MainLayout>
  );
};

export default Home;
