import { View } from 'react-native';
import { Text } from 'native-base';
import { StorageReference } from 'firebase/storage';

interface Props {
  item: StorageReference;
  handler: (ref: StorageReference) => void;
}

const FileItem: React.FC<Props> = ({ item, handler }) => {
  return (
    <View>
      <Text
        onPress={() => handler(item)}
        p={5}
        borderWidth={1}
        borderRadius={5}
        my={2}
      >
        {item.name}
      </Text>
    </View>
  );
};

export default FileItem;
