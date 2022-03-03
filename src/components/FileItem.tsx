import { Linking, View } from 'react-native';
import { Text, Stack, Spinner, Pressable } from 'native-base';
import { StorageReference } from 'firebase/storage';
import { useEffect, useState } from 'react';

import { getFile, getFileMetadata, getUser } from '../firebase';
import { Timestamp } from 'firebase/firestore';

interface Props {
  item: StorageReference;
}

type Metadata = { uid: string; subject: string };

type User = {
  name: string;
  lastName: string;
  files: string[];
  lastSeen: Timestamp;
  email: string;
};

const FileItem: React.FC<Props> = ({ item }) => {
  const [metadata, setMetadata] = useState<Metadata>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (metadata)
      getUser(metadata.uid).then((res) => setUser(res.data() as User));
  }, [metadata]);

  useEffect(() => {
    getFileMetadata(item).then((res) =>
      setMetadata(res.customMetadata as { uid: string; subject: string })
    );
  }, []);

  const handlePress = () => {
    getFile(item).then((url) => Linking.openURL(url));
  };

  return (
    <View>
      <Pressable onPress={handlePress}>
        <Stack borderWidth={1} borderRadius={5} p={5} my={2}>
          <Text fontSize={20} fontWeight="bold">
            {item.name}
          </Text>
          {user ? <Text>{`${user.name} ${user.lastName}`}</Text> : <Spinner />}
        </Stack>
      </Pressable>
    </View>
  );
};

export default FileItem;
