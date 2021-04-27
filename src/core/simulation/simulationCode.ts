import { Code } from '../code';
import { Simulation } from './simulation';

export class SimulationCode extends Code {
  private _simulation: Simulation; // parent

  constructor(simulation: Simulation) {
    super();
    this._simulation = simulation;
  }

  setKernelStatus(): string {
    let script = 'nest.SetKernelStatus({';
    script +=
      this._() +
      `"local_num_threads": ${this._simulation.kernel.localNumThreads},`;
    script +=
      this._() +
      `"resolution": ${this.format(this._simulation.kernel.resolution)},`;
    script += this._() + `"rng_seed": ${this._simulation.kernel.rngSeed}`;

    script += this.end() + '})';
    return script + '\n';
  }

  simulate(): string {
    return `nest.Simulate(${this.format(this._simulation.time)})\n`;
  }
}
