import { Linking, View } from 'react-native';
import { Text, Stack, Spinner, Pressable } from 'native-base';
import { useEffect, useState } from 'react';

import type { File, User } from '../types';
import { getUser } from '../database';

interface Props {
  file: File;
}

const FileItem: React.FC<Props> = ({ file }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(file.uid).then((res) => setUser(res));
  }, []);

  const handlePress = () => {
    Linking.openURL(file.url);
  };

  return (
    <View>
      <Pressable onPress={handlePress}>
        <Stack borderWidth={1} borderRadius={5} p={5} my={2}>
          <Text fontSize={20} fontWeight="bold">
            {file.name}
          </Text>
          {user ? <Text>{`${user.name} ${user.lastName}`}</Text> : <Spinner />}
        </Stack>
      </Pressable>
    </View>
  );
};

export default FileItem;
