import { View } from 'react-native';
import { Button, Center, FlatList } from 'native-base';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { getAllFiles } from '../database';
import FileItem from '../components/FileItem';
import type { FileDB } from '../types';

const Home = () => {
  const [files, setFiles] = useState<FileDB[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>();

  useFocusEffect(
    useCallback(() => {
      getAllFiles(page).then((res) => {
        if (res) {
          setFiles(res?.files);
          setHasNextPage(res?.hasNextPage);
          setPage(2);
        }
      });
    }, [])
  );

  const handleLoadMore = async () => {
    try {
      const res = await getAllFiles(page);
      if (res) {
        const { files: newFiles, hasNextPage } = res;
        setFiles([...files, ...newFiles]);
        setPage(page + 1);
        setHasNextPage(hasNextPage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Center w="100%" p={10}>
        <FlatList
          w="full"
          data={files}
          renderItem={({ item }) => <FileItem file={item} />}
          keyExtractor={(file) => file.name}
        />
        {hasNextPage && <Button onPress={handleLoadMore}>Load More</Button>}
      </Center>
    </View>
  );
};

export default Home;
