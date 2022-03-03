import { View } from 'react-native';
import { Button, Center, Text, Input } from 'native-base';
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
      <Center w="100%" p={10}>
        <Input
          type="text"
          value={subject}
          onChangeText={(text) => setSubject(text)}
        />
        <Text
          p={5}
          borderWidth="1px"
          mb={5}
          borderRadius={5}
          bg="blue.300"
          fontSize={20}
          fontWeight="bold"
        >
          {result && result.type !== 'cancel'
            ? `File Selected: ${result!.name}`
            : 'Select a File'}
        </Text>
        <Button onPress={handleLoadFile} w="100%">
          Load PDF
        </Button>
        {result && result.type !== 'cancel' && (
          <Button w="100%" mt={5} onPress={handleSendFile}>
            Upload File
          </Button>
        )}
      </Center>
    </View>
  );
};

export default Upload;
