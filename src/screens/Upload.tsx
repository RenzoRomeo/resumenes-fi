import { View } from 'react-native';
import { Button, Stack, Text, Input } from 'native-base';
import { useState } from 'react';
import { DocumentResult, getDocumentAsync } from 'expo-document-picker';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, savePDF } from '../firebase';

const Upload = () => {
  const [result, setResult] = useState<DocumentResult>();
  const [subject, setSubject] = useState<string>('');
  const user = useAuthState(auth)[0];

  const handleLoadFile = () => {
    getDocumentAsync({ type: 'application/pdf' }).then((res) => setResult(res));
  };

  const handleSendFile = () => {
    if (user && result && result.type !== 'cancel' && result.file) {
      const metadata = {
        customMetadata: { uid: user.uid, subject },
      };
      savePDF(result.file, metadata, user.uid).then((snapshot) => {
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
