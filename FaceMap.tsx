import { scanFaces as mlkitScanFaces } from '@react-native-ml-kit/face-detection';

export const scanFaces = async (frame) => {
  return await mlkitScanFaces(frame); // Runs on JS thread
};