import { Input, Level, OffloadProcessor } from './types';

class ConsoleProcessor<T> implements OffloadProcessor<T> {
  async process(input: Input<T>) {
    console.log(
      `[${input.level}] ${input.message} \n ${JSON.stringify(input.metadata)}`
    );
  }
  async onCompleted(_: undefined): Promise<void> {
    return;
  }
  async onError(_: Error): Promise<void> {
    return;
  }
}

class Flush<M> {
  constructor(
    private level: Level,
    private processor: OffloadProcessor<M> = new ConsoleProcessor<M>()
  ) {}

  flush(input: Input<M>) {
    const inputLevel = input.level;
    if (inputLevel < this.level) return;
    this.processor.process(input);
  }
}

export default Flush;
