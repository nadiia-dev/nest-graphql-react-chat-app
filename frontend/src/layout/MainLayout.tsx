import { Flex } from "@mantine/core";

const MainLayout = ({ children }: { children: React.ReactElement }) => {
  return <Flex style={{ height: "100vh" }}>{children}</Flex>;
};

export default MainLayout;
