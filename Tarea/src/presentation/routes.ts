import { Router } from 'express';

import { SongRoutes,  } from './Song/routes';

import {  AuthorRoutes  } from './Author/routes';

import {  AlbumRoutes  } from './Album/routes';



export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/api/song', SongRoutes.routes );

    router.use('/api/author', AuthorRoutes.routes );

    router.use('/api/album', AlbumRoutes.routes );

    
    return router;
  }


}

