import { Config } from '../common/config';

export class ColorSchemes extends Config {
  constructor() {
    super('ColorSchemes');
  }

  /**
   * Get a list of color schemes from config.
   */
  list(): string[] {
    return Object.keys(this.config);
  }
}
