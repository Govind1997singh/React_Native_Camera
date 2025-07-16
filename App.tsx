 
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator, Platform, PermissionsAndroid, ToastAndroid, ImageBackground } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

export default function QRScanner({ navigation }) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [isScanning, setIsScanning] = useState(false);
 
  useEffect(() => {
    requestCameraPermission();
  }, []);
   const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: async (codes: any[]) => {
      // connectToCharger()
      if (isScanning) return; // prevent multiple scans
       const scannedData = codes.map((code) => code?.value || code?.data).filter(Boolean);
       if (scannedData[0]) {
        setIsScanning(true); // stop scanning
        // sendBootNotification()
        // connectToCharger()
        // await connectToCharger(scannedData[0]);
      }
    },
  });
  const ws = useRef(null);
 
 
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to scan QR codes.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };
 
 
 
 
  if (!device || !hasPermission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading Camera...</Text>
      </View>
    );
  }
 
  // if (isScanning) {
  //   return (
  //     <ImageBackground
  //     source={imageIndex.connection}
 
  //     resizeMode='contain'
  //     style={styles.loadingContainer}>
 
       
  //     </ImageBackground>
  //   );
  // }
 
 
 
 
 
  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFillObject}
        device={device}
        isActive={!isScanning}
        codeScanner={codeScanner}
      />
      <Text style={styles.overlayText}>Point the camera at a QR Code</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#16975f'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
  overlayText: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 8,
  },
});