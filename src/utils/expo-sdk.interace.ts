import Expo, { ExpoClientOptions } from 'expo-server-sdk';

export type IExpoSdkClient = Expo;

export interface ExtraConfiguration {
  isGlobal?: boolean;
}
export interface ExpoSDKModuleOptions
  extends ExtraConfiguration,
    ExpoClientOptions {}
