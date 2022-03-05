import { View } from 'react-native';
import { Button, Stack, Text, Input } from 'native-base';
import { useState } from 'react';
import { DocumentResult, getDocumentAsync } from 'expo-document-picker';
import { savePDF } from '../firebase';
import useUser from '../hooks/useUser';

const Upload = () => {
  const [result, setResult] = useState<DocumentResult>();
  const [subject, setSubject] = useState<string>('');
  const user = useUser();

  const handleLoadFile = () => {
    getDocumentAsync({ type: 'application/pdf' }).then((res) => setResult(res));
  };

  const handleSendFile = () => {
    if (user && result && result.type !== 'cancel' && result.file) {
      savePDF(result.file, user.uid, subject).then(() => {
        console.log(`Uploaded '${result.name}'`);
      });
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
