import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: '에코체크',
  webDir: 'out',
  server: { androidScheme: 'https' },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000, // 2초 동안 노출
      backgroundColor: "#F1F5F9", // 앱 배경색과 맞춤
      showSpinner: false, // 로딩 동그라미 숨김
    },
  },
};

export default config;