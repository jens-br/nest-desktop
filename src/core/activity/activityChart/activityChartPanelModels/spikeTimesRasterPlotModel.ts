import { ActivityChartPanel } from '../activityChartPanel';
import { SpikeActivity } from '../../spikeActivity';
import { SpikeTimesPlotModel } from './spikeTimesPlotModel';

export class SpikeTimesRasterPlotModel extends SpikeTimesPlotModel {
  constructor(panel: ActivityChartPanel, model: any = {}) {
    super(panel, model);
    this.icon = 'mdi-chart-scatter-plot';
    this.id = 'spikeTimesRasterPlot';
    this.label = 'spike times';
    this.panel.layout.yaxis.height = 3;
    this.initActivities();
  }

  /**
   * Update data for raster plot.
   */
  override updateData(activity: SpikeActivity): void {
    // console.log('Update data for raster plot.');
    this.data.push({
      activityIdx: activity.idx,
      mode: 'markers',
      type: 'scattergl',
      hoverinfo: 'x',
      legendgroup: 'spikes' + activity.idx,
      name: 'Spikes of ' + activity.recorder.view.label,
      showlegend: true,
      marker: {
        size: 5,
        color: activity.recorder.view.color,
      },
      x: activity.events.times,
      y: activity.events.senders,
    });
  }

  /**
   * Update layout label for raster plot.
   */
  override updateLayoutLabel(): void {
    this.panel.layout.xaxis.title = 'Time [ms]';
    this.panel.layout.yaxis.title = 'Neuron ID';
  }
}
