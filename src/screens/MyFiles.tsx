import { View } from 'react-native';
import { Center, FlatList } from 'native-base';
import { useEffect, useState } from 'react';

import MyFileItem from '../components/MyFileItem';
import type { FileDB } from '../types';
import { getUserFiles } from '../database';
import useUser from '../hooks/useUser';

const MyFiles = () => {
  const [files, setFiles] = useState<FileDB[]>();
  const user = useUser();

  useEffect(() => {
    if (user) getUserFiles(user.uid).then((res) => setFiles(res));
  }, [user]);

  return (
    <View>
      <Center w="100%" p={10}>
        <FlatList
          w="full"
          data={files}
          renderItem={({ item }) => <MyFileItem file={item} />}
          keyExtractor={(file) => file.name}
        />
      </Center>
    </View>
  );
};

export default MyFiles;
