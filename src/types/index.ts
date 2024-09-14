export const LEVELS = {
  DEBUG: {
    level: 0,
  },
  WARN: {
    level: 1,
  },
  ERROR: {
    level: 2,
  },
} as const;

export type Level = keyof typeof LEVELS;

export type Input<M = unknown> = {
  level: Level;
  message: string;
  metadata?: M;
  timestamp: number;
};

export abstract class OffloadProcessor<T = unknown, E = Error, S = undefined> {
  abstract process(payload: Input<T>): Promise<void>;
  abstract onCompleted(success: S): Promise<void>;
  abstract onError(error: E): Promise<void>;
}
