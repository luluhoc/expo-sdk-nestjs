import { Test } from '@nestjs/testing';

import { ExpoSDKModule, ExpoSDKService } from '../module';

import { OPTIONS_TYPE } from '../utils';

describe('ExpoSDK', () => {
  const { EXPO_PUSH_SECURITY } = process.env;

  if (!EXPO_PUSH_SECURITY)
    throw new Error('No Twilio phone number defined in `.env`!');

  const config: typeof OPTIONS_TYPE = {
    options: {
      accessToken: EXPO_PUSH_SECURITY,
    },
  };

  describe('forRoot', () => {
    let expoService: ExpoSDKService;

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [ExpoSDKModule.forRoot(config)],
      }).compile();

      expoService = module.get(ExpoSDKService);
    });

    it('should provide expo client', () => {
      expect(expoService).toBeDefined();
    });

    it('it should chunk', () => {
      const response = expoService.client.chunkPushNotifications([
        {
          to: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
          sound: 'default',
          body: 'This is a test notification',
        },
      ]);
      console.log(response);
      expect(response).toBeInstanceOf(Array);
    });
  });

  describe('forRootAsync with useFactory', () => {
    let expoService: ExpoSDKService;

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [
          ExpoSDKModule.forRootAsync({
            useFactory: () => config,
          }),
        ],
      }).compile();

      expoService = module.get(ExpoSDKService);
    });

    it('should provide expo client', () => {
      expect(expoService).toBeDefined();
    });

    it('should chunk in async', async () => {
      const response = expoService.client.chunkPushNotifications([
        {
          to: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
          sound: 'default',
          body: 'This is a test notification',
        },
      ]);
      console.log(response);
      expect(response).toBeInstanceOf(Array);
    });
  });
});
