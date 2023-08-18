import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height="45px"  borderRadius="5px"/>
      <Skeleton height="45px"  borderRadius="5px"/>
      <Skeleton height="45px"  borderRadius="5px"/>
      <Skeleton height="45px"  borderRadius="5px"/>
      <Skeleton height="45px"  borderRadius="5px"/>
      <Skeleton height="45px"  borderRadius="5px"/>
      <Skeleton height="45px"  borderRadius="5px"/>
      <Skeleton height="45px"  borderRadius="5px"/>
      <Skeleton height="45px"  borderRadius="5px"/>
      <Skeleton height="45px"  borderRadius="5px"/>
      <Skeleton height="45px"  borderRadius="5px"/>
      <Skeleton height="45px"  borderRadius="5px"/>
    </Stack>
  );
};

export default ChatLoading;