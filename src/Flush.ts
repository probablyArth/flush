import { Input, Level, LEVELS, OffloadProcessor } from './types';
import { PartialMember } from './types/utils';

class ConsoleProcessor<M> {
  async process(input: Input<M>) {
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

  flush(input: PartialMember<Input<M>, 'timestamp'>) {
    const inputLevel = input.level;
    if (LEVELS[inputLevel].level < LEVELS[this.level].level) return;
    this.processor.process({
      ...input,
      timestamp: input.timestamp ? input.timestamp : Date.now(),
    });
  }
}

export default Flush;
