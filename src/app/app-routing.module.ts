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
    path: 'videos/:id', 
    loadChildren: './video-detail/video-detail.module#VideoDetailPageModule' 
  },
  { 
    path: 'videos/edit/:id', 
    loadChildren: './edit/edit.module#EditPageModule' 
  },
  { 
    path: 'videos', loadChildren: './videos/videos.module#VideosPageModule' 
  },
  { 
    path: 'video-detail', loadChildren: './video-detail/video-detail.module#VideoDetailPageModule' 
  },
  { 
    path: 'new', loadChildren: './new/new.module#NewPageModule' 
  },
  { 
    path: 'edit', loadChildren: './edit/edit.module#EditPageModule' 
  },
  { 
    path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' 
  },
  { 
    path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
