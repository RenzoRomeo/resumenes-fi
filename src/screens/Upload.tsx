import { View } from 'react-native';
import { Button, Stack, Text, Input } from 'native-base';
import { useState } from 'react';
import { DocumentResult, getDocumentAsync } from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';

import { savePDF } from '../firebase';
import useUser from '../hooks/useUser';

const Upload = () => {
  const [result, setResult] = useState<DocumentResult>();
  const [subject, setSubject] = useState<string>('');
  const [user] = useUser();
  const navigation: { navigate: (arg0: string) => void } = useNavigation();

  const handleLoadFile = async () => {
    try {
      const res = await getDocumentAsync({ type: 'application/pdf' });
      setResult(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendFile = async () => {
    if (user && result && result.type !== 'cancel' && result.file) {
      try {
        await savePDF(result.file, user.uid, subject);
        navigation.navigate('My Files');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View>
      <Stack w="100%" p={10} alignItems="center" space={5}>
        <Text fontSize={40} fontWeight="bold">
          {result && result.type !== 'cancel'
            ? `File Selected: ${result!.name}`
            : 'Select a File'}
        </Text>
        <Input
          type="text"
          placeholder="Subject"
          value={subject}
          onChangeText={(text) => setSubject(text)}
          w="full"
        />
        <Button onPress={handleLoadFile} w="100%">
          Load PDF
        </Button>
        {result && result.type !== 'cancel' && (
          <Button w="100%" mt={5} onPress={handleSendFile}>
            Upload File
          </Button>
        )}
      </Stack>
    </View>
  );
};

export default Upload;
