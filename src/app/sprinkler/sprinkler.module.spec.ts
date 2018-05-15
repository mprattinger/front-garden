import { SprinklerModule } from './sprinkler.module';

describe('SprinklerModule', () => {
  let sprinklerModule: SprinklerModule;

  beforeEach(() => {
    sprinklerModule = new SprinklerModule();
  });

  it('should create an instance', () => {
    expect(sprinklerModule).toBeTruthy();
  });
});
