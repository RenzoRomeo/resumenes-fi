import { View } from 'react-native';
import { Center, FlatList } from 'native-base';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { getAllFiles } from '../database';
import FileItem from '../components/FileItem';
import type { FileDB } from '../types';

const Home = () => {
  const [files, setFiles] = useState<FileDB[]>();

  useFocusEffect(
    useCallback(() => {
      getAllFiles().then((res) => setFiles(res));
    }, [])
  );

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
