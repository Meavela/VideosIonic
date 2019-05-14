import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { 
    path: 'videos', 
    loadChildren: './pages/videos/videos.module#VideosPageModule' 
  },
  { 
    path: 'video-detail', 
    loadChildren: './pages/video-detail/video-detail.module#VideoDetailPageModule' 
  },
  { 
    path: 'videos/:id', 
    loadChildren: './pages/video-detail/video-detail.module#VideoDetailPageModule' 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
