import { Flex } from "@mantine/core";
import AuthOverlay from "../components/AuthOverlay";
import ProfileSettings from "../components/ProfileSettings";
import ProtectedRoute from "../components/ProtectedRoute";
import Sidebar from "../components/Sidebar";
import MainLayout from "../layout/MainLayout";
import RoomList from "../components/RoomList";
import AddChatroom from "../components/AddChatroom";
import Join from "../components/Join";

const Home = () => {
  return (
    <MainLayout>
      <div style={{ position: "absolute" }}>
        <AuthOverlay />
        <ProfileSettings />
        <Sidebar />
        <ProtectedRoute>
          <AddChatroom />
          <Flex direction={{ base: "column", md: "row" }}>
            <RoomList />
            <Join />
          </Flex>
        </ProtectedRoute>
      </div>
    </MainLayout>
  );
};

export default Home;
