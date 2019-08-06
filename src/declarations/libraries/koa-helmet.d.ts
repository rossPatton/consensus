// ---
// why is this here?
// featurePolicy is a new header, and types are not supported for it yet,
// so I augmented the types here
// ---

import { Middleware } from 'koa';
import koaHelmet from 'koa-helmet';

declare module 'koa-helmet' {
  export interface KoaHelmetFeaturePolicyValues {
    accelerometer?: string[],
    ambientLightSensor?: string[],
    autoplay?: string[],
    camera?: string[],
    documentDomain?: string[],
    documentWrite?: string[],
    encryptedMedia?: string[],
    fontDisplayLateSwap?: string[],
    fullscreen?: string[],
    geolocation?: string[],
    gyroscope?: string[],
    layoutAnimations?: string[],
    legacyImageFormats?: string[],
    loadingFrameDefaultEager?: string[],
    magnetometer?: string[],
    microphone?: string[],
    midi?: string[],
    oversizedImages?: string[],
    payment?: string[],
    pictureInPicture?: string[],
    serial?: string[],
    speaker?: string[],
    syncScript?: string[],
    syncXhr?: string[],
    unoptimizedImages?: string[],
    unoptimizedLosslessImages?: string[],
    unoptimizedLossyImages?: string[],
    unsizedMedia?: string[],
    usb?: string[],
    verticalScroll?: string[],
    vibrate?: string[],
    vr?: string[],
    wakeLock?: string[],
    xr?: string[],
  }

  export interface KoaHelmetFeaturePolicyConfiguration {
    features: KoaHelmetFeaturePolicyValues;
  }

  export interface KoaHelmetContentSecurityPolicyDirectives {
    manifestSrc?: Array<string>,
    upgradeInsecureRequests?: boolean,
  }

  export interface KoaHelmet {
    featurePolicy(options?: KoaHelmetFeaturePolicyConfiguration): Middleware;
  }

}
