export interface StatusBarConfig {
  color: string;
  style?: 'dark' | 'light';
  animated?: boolean;
}
export type StatusBar = StatusBarConfig | string