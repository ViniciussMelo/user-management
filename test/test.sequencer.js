import Sequencer from '@jest/test-sequencer';

class CustomSequencer extends Sequencer.default {
  sort(tests) {
    const copyTests = Array.from(tests);
    return copyTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1));
  }
}

export default CustomSequencer;