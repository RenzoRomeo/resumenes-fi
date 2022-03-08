import { View } from 'react-native';
import { Center, FlatList, Button } from 'native-base';
import { useCallback, useState } from 'react';

import MyFileItem from '../components/MyFileItem';
import type { FileDB } from '../utils/types';
import { getUserFiles } from '../database';
import useUser from '../hooks/useUser';
import { useFocusEffect } from '@react-navigation/native';

const MyFiles = () => {
  const [files, setFiles] = useState<FileDB[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [user] = useUser();

  useFocusEffect(
    useCallback(() => {
      if (user)
        getUserFiles(user.uid).then((res) => {
          if (res) {
            setFiles(res.files);
            setPage(2);
            setHasNextPage(res.hasNextPage);
          }
        });
    }, [user, flag])
  );

  const handleReload = () => {
    setFlag(!flag);
  };

  const handleLoadMore = async () => {
    try {
      if (user) {
        const res = await getUserFiles(user.uid, page);
        if (res) {
          const { files: newFiles, hasNextPage } = res;
          setFiles([...files, ...newFiles]);
          setPage(page + 1);
          setHasNextPage(hasNextPage);
        }
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
          renderItem={({ item }) => (
            <MyFileItem file={item} handleReload={handleReload} />
          )}
          keyExtractor={(file) => file.name}
        />
        {hasNextPage && <Button onPress={handleLoadMore}>Load More</Button>}
      </Center>
    </View>
  );
};

export default MyFiles;
