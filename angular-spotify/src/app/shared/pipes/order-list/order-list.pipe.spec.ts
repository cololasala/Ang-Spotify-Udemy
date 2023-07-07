import { OrderListPipe } from './order-list.pipe';
import * as dataRaw from '../../../data/track.json';
import { TrackModel } from '@core/models/track.model';

describe('OrderListPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderListPipe();
    expect(pipe).toBeTruthy();
  });

  it('probando entradas y salidas de valores', () => {
    // arrange
    const pipe = new OrderListPipe();
    const { data } = (dataRaw as any).default;
    const args = {
      property: null,
      order: '',
    };

    //act
    const result: TrackModel[] = pipe.transform(data, args);

    // assert
    expect(result).toBe(data);
  });

  it('probando ordenamiento ASC', () => {
    // arrange
    const pipe = new OrderListPipe();
    const { data } = (dataRaw as any).default;
    const args = {
      property: 'name',
      order: 'ASC',
    };
    const firstTrack = data.find((d) => d._id === 7);
    const lastTrack = data.find((d) => d._id === 6);

    // act
    const result: TrackModel[] = pipe.transform(data, args);
    const firstResult = result[0];
    const lastResult = result[result.length - 1];
    // assert
    expect(firstResult).toEqual(firstTrack);
    expect(lastResult).toEqual(lastTrack);
  });


  it('probando ordenamiento DESC', () => {
    // arrange
    const pipe = new OrderListPipe();
    const { data } = (dataRaw as any).default;
    const args = {
      property: 'name',
      order: 'DESC',
    };
    const firstTrack = data.find((d) => d._id === 6);
    const lastTrack = data.find((d) => d._id === 7);

    // act
    const result: TrackModel[] = pipe.transform(data, args);
    const firstResult = result[0];
    const lastResult = result[result.length - 1];
    // assert
    expect(firstResult).toEqual(firstTrack);
    expect(lastResult).toEqual(lastTrack);
  });
});
