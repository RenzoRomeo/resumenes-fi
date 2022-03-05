import { View, Linking } from 'react-native';
import { Text, Pressable, Stack, Badge } from 'native-base';

import { FileDB } from '../types';
import { useEffect } from 'react';

interface Props {
  file: FileDB;
}

const MyFileItem: React.FC<Props> = ({ file }) => {
  const handlePress = () => {
    Linking.openURL(file.url);
  };

  return (
    <View>
      <Pressable onPress={handlePress}>
        <Stack borderWidth={1} borderRadius={5} p={5} my={2} direction="row">
          <Stack>
            <Text fontSize={20} fontWeight="bold">
              {file.name}
            </Text>
            <Badge colorScheme="green" boxSize="fit-content">
              {file.subject}
            </Badge>
          </Stack>
          <Text>DELETE</Text>
        </Stack>
      </Pressable>
    </View>
  );
};

export default MyFileItem;
