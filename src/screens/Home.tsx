import { View } from 'react-native';
import { Center, FlatList, Text } from 'native-base';
import { useEffect, useState } from 'react';

import { getAllFiles } from '../firebase';
import { StorageReference } from 'firebase/storage';

const Home = () => {
  const [files, setFiles] = useState<StorageReference[]>();
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    getAllFiles().then((res) => {
      setNames(res.items.map((item) => item.name));
      setFiles(res.items);
    });
  }, []);

  useEffect(() => {
    console.log(files?.map((file) => file.toString()));
  }, [files]);

  return (
    <View>
      <Center w="100%" p={10}>
        <FlatList
          data={names}
          renderItem={(name) => <Text>{name.item}</Text>}
          keyExtractor={(name) => name}
        />
      </Center>
    </View>
  );
};

export default Home;
