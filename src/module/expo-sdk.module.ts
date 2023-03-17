import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from '../utils';

import { ExpoSDKService } from './expo-sdk.service';

@Module({
  providers: [ExpoSDKService],
  exports: [ExpoSDKService],
})
export class ExpoSDKModule extends ConfigurableModuleClass {}
