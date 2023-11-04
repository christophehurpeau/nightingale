interface HermesInternalInterface {
  hasPromise?: () => boolean;
  enablePromiseRejectionTracker?: (options: any) => void;
}

declare global {
  var HermesInternal: HermesInternalInterface;
}

export {};
