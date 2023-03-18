import { IExpoSdkClient } from './expo-sdk.interace';
import { OPTIONS_TYPE } from './expo-sdk.module-definition';

import { Expo } from 'expo-server-sdk';

export function createExpoClient({
  httpAgent,
  maxConcurrentRequests,
  accessToken,
}: typeof OPTIONS_TYPE): IExpoSdkClient {
  const client = new Expo({
    httpAgent,
    maxConcurrentRequests,
    accessToken,
  });

  return client;
}
