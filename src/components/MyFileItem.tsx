import { View, Linking } from 'react-native';
import { Text, Pressable, Stack, Badge, IconButton, Icon } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { FileDB } from '../types';
import { deleteFile } from '../database';
import { deletePDF } from '../firebase';

interface Props {
  file: FileDB;
  handleReload: () => void;
}

const MyFileItem: React.FC<Props> = ({ file, handleReload }) => {
  const handlePress = async () => {
    try {
      await Linking.openURL(file.url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      handleReload();
      await deleteFile(file.uid, file._id);
      await deletePDF(file.path);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Pressable onPress={handlePress}>
        <Stack
          borderWidth={1}
          borderRadius={5}
          p={5}
          my={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack>
            <Text fontSize={20} fontWeight="bold">
              {file.name}
            </Text>
            <Badge colorScheme="green" boxSize="fit-content">
              {file.subject}
            </Badge>
          </Stack>
          <IconButton
            bg="red.400"
            onPress={handleDelete}
            icon={<Icon as={<Feather name="trash-2" color="black" />} />}
          />
        </Stack>
      </Pressable>
    </View>
  );
};

export default MyFileItem;
