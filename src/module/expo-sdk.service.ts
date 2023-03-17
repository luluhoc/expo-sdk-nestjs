import { Inject, Injectable } from '@nestjs/common';

import {
  IExpoSdkClient,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  createExpoClient,
} from '../utils';

@Injectable()
export class ExpoSDKService {
  private readonly expoSDK: IExpoSdkClient;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: typeof OPTIONS_TYPE,
  ) {
    this.expoSDK = createExpoClient(this.options);
  }

  public get client(): IExpoSdkClient {
    return this.expoSDK;
  }
}
