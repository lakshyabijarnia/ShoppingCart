import { Platform, Dimensions, DeviceEventEmitter } from 'react-native';

/**
 * Debugging utilities for the shopping cart app
 * Include common debugging functions that can be used throughout the app
 */

/**
 * Log level enum for controlling verbosity
 */
export enum LogLevel {
  VERBOSE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  NONE = 5,
}

// Set this to control the current logging level
let currentLogLevel = __DEV__ ? LogLevel.DEBUG : LogLevel.ERROR;

/**
 * Set the global log level
 * @param level The log level to set
 */
export const setLogLevel = (level: LogLevel): void => {
  currentLogLevel = level;
};

/**
 * Enhanced console logging with level control
 */
export const logger = {
  verbose: (message: string, ...args: any[]): void => {
    if (currentLogLevel <= LogLevel.VERBOSE) {
      console.log(`[VERBOSE] ${message}`, ...args);
    }
  },
  debug: (message: string, ...args: any[]): void => {
    if (currentLogLevel <= LogLevel.DEBUG) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  },
  info: (message: string, ...args: any[]): void => {
    if (currentLogLevel <= LogLevel.INFO) {
      console.log(`[INFO] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: any[]): void => {
    if (currentLogLevel <= LogLevel.WARN) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: any[]): void => {
    if (currentLogLevel <= LogLevel.ERROR) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  },
};

/**
 * Get device information for debugging
 */
export const getDeviceInfo = () => {
  const { width, height } = Dimensions.get('window');
  return {
    platform: Platform.OS,
    version: Platform.Version,
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
    dimensions: { width, height },
    isPad: Platform.OS === 'ios' && Platform.isPad,
  };
};

/**
 * Debug navigation events
 * @param navigationRef the navigation ref to monitor
 */
export const monitorNavigationEvents = (navigationRef: any) => {
  if (!__DEV__) return;

  // Return if the navigationRef doesn't have the current function
  if (!navigationRef?.current) return;

  navigationRef.current.addListener('state', (e: any) => {
    logger.debug('Navigation state changed', e.data);
  });

  logger.info('Navigation monitoring enabled');
};

/**
 * Emit a debug event that can be listened to by dev tools
 */
export const emitDebugEvent = (eventName: string, data?: any) => {
  if (__DEV__) {
    DeviceEventEmitter.emit(`DEBUG_${eventName}`, data);
  }
};

/**
 * Listen to debug events
 */
export const listenToDebugEvents = (eventName: string, callback: (data: any) => void) => {
  if (__DEV__) {
    return DeviceEventEmitter.addListener(`DEBUG_${eventName}`, callback);
  }
  return {
    remove: () => {},
  };
};

/**
 * Debug Redux state changes
 * @param storeName Name of the store/slice for identification
 * @param prevState Previous state
 * @param nextState Next state
 */
export const debugReduxStateChange = (
  storeName: string,
  prevState: any,
  nextState: any
) => {
  if (!__DEV__ || currentLogLevel > LogLevel.DEBUG) return;

  const changes: Record<string, { from: any; to: any }> = {};
  let hasChanges = false;

  // Compare values and collect changes
  Object.keys(nextState).forEach((key) => {
    if (prevState[key] !== nextState[key]) {
      hasChanges = true;
      changes[key] = {
        from: prevState[key],
        to: nextState[key],
      };
    }
  });

  if (hasChanges) {
    logger.debug(`[Redux/${storeName}] State changed:`, changes);
  }
};

/**
 * Utility to help debug touch/gesture issues
 */
export const debugTouch = {
  logPress: (componentName: string, x: number, y: number, data?: any) => {
    logger.debug(`Touch press on ${componentName} at (${x}, ${y})`, data);
  },
  logPressIn: (componentName: string) => {
    logger.debug(`Touch press IN on ${componentName}`);
  },
  logPressOut: (componentName: string) => {
    logger.debug(`Touch press OUT on ${componentName}`);
  },
};

export default {
  logger,
  getDeviceInfo,
  monitorNavigationEvents,
  debugReduxStateChange,
  debugTouch,
  emitDebugEvent,
  listenToDebugEvents,
  setLogLevel,
  LogLevel,
};