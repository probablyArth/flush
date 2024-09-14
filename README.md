# Flush

The Flush processor is a TypeScript package designed to handle log message processing at different log levels, with the ability to offload the processing to different output systems. By default, it logs messages to the console, but it can be easily extended to other output systems such as file storage, cloud logging, or custom destinations..

# Features

- Log Level Filtering: Only log messages above a defined level are processed.
- Customizable Processors: Ability to use custom processors for different logging needs (e.g., cloud, files, etc.).
- Timestamp Handling: Automatically appends a timestamp to each log message if not provided.
- Extensible Design: Easily extend the OffloadProcessor to implement custom logging behavior.

# Installation

To install the package, run the following:

```bash
npm install @probablyarth/flush
```

# Usage

### Basic Setup

Here’s how you can use the package for basic logging with console output:

```typescript
import { Flush } from '@probablyarth/flush';

// Create a new instance of Flush and set the log level
const flush = new Flush<{ user: string }>('debug');

// Log a message with metadata
flush.flush({
  level: 'debug',
  message: 'This is an info log',
  metadata: { user: 'John Doe' },
});
```

### Custom Processor

You can easily create your own processor by extending the OffloadProcessor class and overriding its methods. For example, here’s how to log messages to a custom storage:

```typescript
import { OffloadProcessor } from '@probablyarth/flush';

class CustomProcessor<M> implements OffloadProcessor<M> {
  async process(input: Input<M>) {
    // Replace this with custom logic (e.g., saving to a file or cloud service)
    console.log(`Custom Processor: [${input.level}] ${input.message}`);
  }

  async onCompleted(_: undefined): Promise<void> {
    // Custom completion logic
    return;
  }

  async onError(error: Error): Promise<void> {
    // Custom error handling logic
    console.error('Error in processing: ', error);
  }
}

// Use the custom processor
const customFlush = new Flush<{ issue: string }>(
  'debug',
  new CustomProcessor()
);
customFlush.flush({
  level: 'warn',
  message: 'This is a warning with custom processor',
  metadata: { issue: 'High Memory Usage' },
});
```

# Log Levels

The package uses a predefined set of log levels, each with a corresponding priority. You can set the log level on the Flush class to filter out messages that do not meet the priority threshold.

```typescript
LEVELS = {
  DEBUG: { level: 0 },
  WARN: { level: 1 },
  ERROR: { level: 2 },
};
```

When you flush a message, only those at or above the defined log level will be processed.

# API

### `ConsoleProcessor<M>`

A simple processor that logs messages to the console.

- process(input: Input<M>): Logs the message and metadata.
- onCompleted(\_: undefined): Placeholder method that does nothing.
- onError(error: Error): Handles error during processing.

### `Flush<M>`

The core class that controls the flushing of log messages based on log levels.

Constructor

```typescript
new Flush(level: Level, processor: OffloadProcessor<M> = new ConsoleProcessor<M>())
```

- level: The minimum log level required to process a log.
- processor: An optional custom processor to handle log output. Defaults to ConsoleProcessor.
  `flush(input: PartialMember<Input<M>, 'timestamp'>)`

Processes a log entry if it meets the log level threshold. Automatically appends a timestamp if one isn’t provided.

- `input`: Log entry object, requires `level`, `message`, and `metadata`. The `timestamp` is optional.

# Contributing

Contributions are welcome! If you find any issues or have feature suggestions, feel free to open an issue or a pull request on GitHub.

# License

This project is licensed under the MIT License.

---

Happy Logging!
