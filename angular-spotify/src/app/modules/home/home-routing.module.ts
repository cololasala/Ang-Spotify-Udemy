import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteComponent } from '@modules/favorites/page/favorite.component';
import { HistoryComponent } from '@modules/history/page/history.component';
import { TrackComponent } from '@modules/tracks/page/track.component';

const routes: Routes = [
  {
    path: 'tracks',
    component: TrackComponent,
    loadChildren: () => import("@modules/tracks/tracks.module").then(m => m.TracksModule)
  },
  {
    path: 'favorites',
    component: FavoriteComponent,
    loadChildren: () => import("@modules/favorites/favorites.module").then(m => m.FavoritesModule)
  },
  {
    path: 'history',
    component: HistoryComponent,
    loadChildren: () => import("@modules/history/history.module").then(m => m.HistoryModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
