<p align="center">
  <h3 align="center">
    expo-sdk-nestjs for notifications
  </h3>

  <p align="center">
    <img src="https://avatars1.githubusercontent.com/u/43827489?s=400&u=45ac0ac47d40b6d8f277c96bdf00244c10508aef&v=4"/>
  </p>

  <p align="center">
    Injectable Expo Server SDK for Notifications client for <a href="https://nestjs.com/">Nestjs</a>.
  </p>
</p>

[![build status](https://img.shields.io/github/actions/workflow/status/luluhoc/expo-sdk-nestjs/node.js.yml?branch=main)](https://github.com/wellyshen/use-places-autocomplete/actions?query=workflow%3ACI) [![codecov](https://codecov.io/gh/rluluhoc/expo-sdk-nestjs/branch/main/graph/badge.svg)](https://codecov.io/gh/luluhoc/expo-sdk-nestjs) [![npm version](https://img.shields.io/npm/v/expo-sdk-nestjs)](https://www.npmjs.com/package/expo-sdk-nestjs) [![miniziped size](https://badgen.net/bundlephobia/minzip/expo-sdk-nestjs)](https://bundlephobia.com/result?p=expo-sdk-nestjs) [![tree shaking](https://badgen.net/bundlephobia/tree-shaking/react-colorful)](https://github.com/luluhoc/expo-sdk-nestjs) [![MIT licensed](https://img.shields.io/github/license/luluhoc/expo-sdk-nestjs)](https://raw.githubusercontent.com/luluhoc/expo-sdk-nestjs/master/LICENSE)

## Instalation


```bash
$ yarn add expo-sdk-nestjs
```

```bash
$ npm install --save expo-sdk-nestjs
```


## Getting Started

To use Expo-SDK client we need to register module for example in app.module.ts

```typescript
import { TwilioModule } from 'nestjs-twilio';

@Module({
  imports: [
    ExpoSDKModule.forRoot({
      accessToken: 'xxxx' // accessToken optional
    }),
  ],
})
export class AppModule {}
```

If you are using the `@nestjs/config package` from nest, you can use the `ConfigModule` using the `registerAsync()` function to inject your environment variables like this in your custom module:

```typescript
import { Module } from '@nestjs/common';
import { ExpoSDKModule } from 'expo-sdk-nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ExpoSDKModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          accessToken: configService.get('EXPO_PUSH_SECURITY'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class AppModule {}
```

Config Options for Module
---
| Option | Type |
| --- | ----------- |
| httpAgent | Agent |
| maxConcurrentRequests | number |
| accessToken | Expo Access Token - string |

Example usage in service.

```typescript
import { ExpoSDKService } from 'expo-sdk-nestjs';
import { ExpoPushTicket, ExpoPushMessage } from 'expo-server-sdk';

@Injectable()
export class AppService {
  public constructor(private readonly expoService: ExpoSDKService) {}

  async sendNotifications(
    chunks: ExpoPushMessage[][]
  ): Promise<ExpoPushTicket[] | undefined> {
    try {
      const tickets: ExpoPushTicket[] = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const ticketChunk =
          await this.expoService.client.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      }
      return tickets;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
```

For full Client API see EXPO DOCS reference [here](https://docs.expo.dev/push-notifications/sending-notifications)
expo-server-sdk-node repo [here](https://github.com/expo/expo-server-sdk-node)

## Testing

Example of testing can be found [here](https://github.com/luluhoc/expo-sdk-nestjs/blob/main/src/__tests__/expo.module.test.ts).

## Consider buying me a coffee if you like this project
<a href="https://www.buymeacoffee.com/lulu45" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
