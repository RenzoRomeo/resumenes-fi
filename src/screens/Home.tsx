import { View } from 'react-native';
import { Center, FlatList, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { StorageReference } from 'firebase/storage';

import { getAllFiles, getFile } from '../firebase';
import FileItem from '../components/FileItem';

const Home = () => {
  const [files, setFiles] = useState<StorageReference[]>();

  useEffect(() => {
    getAllFiles().then((res) => {
      setFiles(res.items);
    });
  }, []);

  const handleDownloadFile = (ref: StorageReference) => {
    getFile(ref).then((res) => console.log(res));
  };

  return (
    <View>
      <Center w="100%" p={10}>
        <FlatList
          data={files}
          renderItem={(file) => (
            <FileItem handler={handleDownloadFile} item={file.item} />
          )}
          keyExtractor={(file) => file.name}
        />
      </Center>
    </View>
  );
};

export default Home;
