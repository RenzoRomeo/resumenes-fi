import { View } from 'react-native';
import { Center, FlatList } from 'native-base';
import { useEffect, useState } from 'react';

import { getAllFiles, updateUser } from '../database';
import FileItem from '../components/FileItem';
import type { FileDB } from '../types';
import useUser from '../hooks/useUser';

const Home = () => {
  const [files, setFiles] = useState<FileDB[]>();
  const [user] = useUser();

  useEffect(() => {
    getAllFiles().then((res) => {
      setFiles(res);
    });
  }, []);

  useEffect(() => {
    if (user) updateUser(user.uid, { lastSeen: new Date().toISOString() });
  }, [user]);

  return (
    <View>
      <Center w="100%" p={10}>
        <FlatList
          w="full"
          data={files}
          renderItem={({ item }) => <FileItem file={item} />}
          keyExtractor={(file) => file.name}
        />
      </Center>
    </View>
  );
};

export default Home;
