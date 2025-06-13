import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chatwindow from "./Chatwindow";
import { Flex, Text } from "@mantine/core";

const Join = () => {
  const { id } = useParams<{ id: string }>();

  const [content, setContent] = useState<string | React.ReactNode>("");

  useEffect(() => {
    if (!id) {
      setContent("Please choose a room");
    } else {
      setContent(<Chatwindow />);
    }
  }, [setContent, id]);

  return (
    <Flex h="100vh" align="center" justify="center">
      <Text ml={!id ? "xl" : "none"} size={!id ? "xl" : ""}>
        {content}
      </Text>
    </Flex>
  );
};

export default Join;
