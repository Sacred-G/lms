declare module 'react-player' {
  import * as React from 'react';

  export interface ReactPlayerProps {
    url?: string | string[] | null;
    playing?: boolean;
    loop?: boolean;
    controls?: boolean;
    light?: boolean | string;
    volume?: number;
    muted?: boolean;
    playbackRate?: number;
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
    progressInterval?: number;
    playsinline?: boolean;
    pip?: boolean;
    stopOnUnmount?: boolean;
    fallback?: React.ReactNode;
    wrapper?: React.ComponentType<any>;
    config?: {
      file?: {
        attributes?: Record<string, any>;
        tracks?: Array<{
          kind: string;
          src: string;
          srcLang: string;
          label: string;
          default?: boolean;
        }>;
        forceVideo?: boolean;
        forceAudio?: boolean;
        forceHLS?: boolean;
        forceDASH?: boolean;
        hlsOptions?: Record<string, any>;
        hlsVersion?: string;
        dashVersion?: string;
      };
      youtube?: {
        playerVars?: Record<string, any>;
        embedOptions?: Record<string, any>;
        onUnstarted?: () => void;
      };
      facebook?: {
        appId?: string;
        version?: string;
        playerId?: string;
        attributes?: Record<string, any>;
      };
      dailymotion?: {
        params?: Record<string, any>;
      };
      vimeo?: {
        playerOptions?: Record<string, any>;
      };
      wistia?: {
        options?: Record<string, any>;
      };
      mixcloud?: {
        options?: Record<string, any>;
      };
      soundcloud?: {
        options?: Record<string, any>;
      };
      twitch?: {
        options?: Record<string, any>;
      };
    };
    onReady?: (player: ReactPlayer) => void;
    onStart?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
    onBuffer?: () => void;
    onBufferEnd?: () => void;
    onEnded?: () => void;
    onError?: (error: any, data?: any, hlsInstance?: any, hlsGlobal?: any) => void;
    onDuration?: (duration: number) => void;
    onSeek?: (seconds: number) => void;
    onProgress?: (state: {
      played: number;
      playedSeconds: number;
      loaded: number;
      loadedSeconds: number;
    }) => void;
    onClickPreview?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onEnablePIP?: () => void;
    onDisablePIP?: () => void;
  }

  declare class ReactPlayer extends React.Component<ReactPlayerProps> {
    static canPlay(url: string): boolean;
    static canEnablePIP(url: string): boolean;
    static addCustomPlayer(player: ReactPlayer): void;
    static removeCustomPlayers(): void;
    seekTo(amount: number, type?: 'seconds' | 'fraction'): void;
    getCurrentTime(): number;
    getDuration(): number;
    getInternalPlayer(key?: string): any;
    showPreview(): void;
  }

  export default ReactPlayer;
}
