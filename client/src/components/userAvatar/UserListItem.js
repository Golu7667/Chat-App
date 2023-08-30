import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";


const UserListItem = ({user, handleFunction }) => {
  


  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="white"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
      boxShadow="0 4px 6px gray"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
