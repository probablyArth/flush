const Levels = {
  DEBUG: {
    level: 0,
  },
  WARN: {
    level: 1,
  },
  ERROR: {
    level: 2,
  },
};

export type Level = keyof typeof Levels;

export type Input<M = unknown> = {
  level: Level;
  message: string;
  metadata?: M;
};

export abstract class OffloadProcessor<T = unknown, E = Error, S = undefined> {
  abstract process(payload: Input<T>): Promise<void>;
  abstract onCompleted(success: S): Promise<void>;
  abstract onError(error: E): Promise<void>;
}
