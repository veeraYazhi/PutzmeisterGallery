// Mock console.error to prevent test failures
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0] === 'Warning: %s rendered more hooks than during the previous render.') {
    return;
  }
  originalConsoleError(...args);
};

// Mock React
jest.mock('react', () => {
  const React = require.requireActual('react');
  return {
    ...React,
    useLayoutEffect: React.useEffect,
    memo: jest.fn().mockImplementation((component) => component),
    forwardRef: jest.fn().mockImplementation((component) => component),
    useImperativeHandle: jest.fn(),
    useReducer: jest.fn(),
    useRef: jest.fn(() => ({ current: null })),
    useCallback: jest.fn().mockImplementation((fn) => fn),
    useMemo: jest.fn().mockImplementation((fn) => fn()),
    useEffect: jest.fn(),
    useDebugValue: jest.fn(),
    useId: jest.fn(),
    useSyncExternalStore: jest.fn(),
    useDeferredValue: jest.fn(),
    useTransition: jest.fn(),
    useInsertionEffect: jest.fn()
  };
});

// Mock React Native
jest.mock('react-native', () => {
  const ReactNative = require.requireActual('react-native');
  return {
    ...ReactNative,
    Platform: {
      ...ReactNative.Platform,
      OS: 'ios',
      Version: 14.0,
      isTesting: true
    },
    Dimensions: {
      ...ReactNative.Dimensions,
      get: jest.fn().mockReturnValue({
        width: 375,
        height: 812
      })
    },
    StyleSheet: {
      ...ReactNative.StyleSheet,
      create: styles => styles
    },
    NativeModules: {
      ...ReactNative.NativeModules,
      RCTDeviceEventEmitter: {
        addListener: jest.fn(),
        removeListener: jest.fn()
      }
    },
    NativeEventEmitter: jest.fn().mockImplementation(() => ({
      addListener: jest.fn(),
      removeListener: jest.fn()
    })),
    RefreshControl: require.requireActual('react-native/Libraries/Components/RefreshControl/RefreshControl'),
    ScrollView: require.requireActual('react-native/Libraries/Components/ScrollView/ScrollView'),
    VirtualizedList: require.requireActual('@react-native/virtualized-lists/Lists/VirtualizedList'),
    FlatList: require.requireActual('react-native/Libraries/Lists/FlatList')
  };
});

// Mock React Native components and APIs
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedModule');
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedNode');

// Mock react-navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      reset: jest.fn(),
      replace: jest.fn(),
      setParams: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
  };
});

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(),
  create: jest.fn().mockImplementation(() => ({
    get: jest.fn()
  }))
}));
