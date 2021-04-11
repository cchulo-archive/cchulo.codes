import { FilenameFromUrlPipe } from './filename-from-url.pipe';

describe('FilenameFromUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new FilenameFromUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
