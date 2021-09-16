/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {useState} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';

import {PermissionsAndroid} from 'react-native';
import Recording from 'react-native-recording';

// await PermissionsAndroid.requestMultiple([
//   PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
// ]);

const App = () => {
  const [lastData, setLastData] = useState(null);
  const [isRecording, setIsRecording] = useState(true);

  useEffect(() => {
    if (isRecording) {
      Recording.init({
        bufferSize: 4096,
        sampleRate: 44100,
        bitsPerChannel: 16,
        channelsPerFrame: 1,
      });

      const listener = Recording.addRecordingEventListener(data => {
        console.log(data);
        setLastData(data);
      });

      Recording.start();

      return () => {
        Recording.stop();
        listener.remove();
        setLastData(null);
      };
    }
  }, [isRecording]);

  return (
    <SafeAreaView>
      <View>
        <Button onPress={() => setIsRecording(!isRecording)} />
        <Text>{JSON.stringify(lastData)}</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;