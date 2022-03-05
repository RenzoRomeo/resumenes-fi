import { Linking, View } from 'react-native';
import { Text, Stack, Spinner, Pressable, Badge } from 'native-base';
import { useEffect, useState } from 'react';

import type { FileDB, UserDB } from '../types';
import { getUser } from '../database';

interface Props {
  file: FileDB;
}

const FileItem: React.FC<Props> = ({ file }) => {
  const [user, setUser] = useState<UserDB>();

  useEffect(() => {
    getUser(file.uid).then((res) => setUser(res));
  }, []);

  const handlePress = () => {
    Linking.openURL(file.url);
  };

  return (
    <View>
      {!user ? (
        <Spinner />
      ) : (
        <Pressable onPress={handlePress}>
          <Stack borderWidth={1} borderRadius={5} p={5} my={2}>
            <Text fontSize={20} fontWeight="bold">
              {file.name}
            </Text>
            <Badge colorScheme="green" boxSize="fit-content">
              {file.subject}
            </Badge>
            <Text mt={3}>{`${user.name} ${user.lastName}`}</Text>
          </Stack>
        </Pressable>
      )}
    </View>
  );
};

export default FileItem;
