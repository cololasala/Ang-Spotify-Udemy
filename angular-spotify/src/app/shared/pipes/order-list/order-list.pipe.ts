import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@core/models/track.model';

@Pipe({
  name: 'orderList',
})
export class OrderListPipe implements PipeTransform {
  transform(
    value: TrackModel[],
    args: { property: string | null; order: string }
  ): TrackModel[] {
    try {
      const { property, order } = args;
      if (property === null) {
        return value;
      } else {
        const orderList = value?.sort((a, b) => {
          if (
            a[property as keyof TrackModel] > b[property as keyof TrackModel]
          ) {
            return 1;
          }
          if (
            a[property as keyof TrackModel] < b[property as keyof TrackModel]
          ) {
            return -1;
          }
          return 0;
        });
        return order === 'ASC' ? orderList : orderList.reverse(); // siempre hago la lista 'ASC' pero si sort es 'DESC' hago un reverse de la lista
      }
    } catch (e) {
      console.log(e);
      return value;
    }
  }
}
