import { Router } from 'express';
import { SongController } from './controller';


export class SongRoutes {


  static get routes(): Router {

    const router = Router();

    const songController = new SongController();

    router.get('/', songController.getSong );
    router.get('/:id', songController.getSongById );
    router.post('/', songController.createSong );
    router.put('/:id', songController.updateSong );
    router.delete('/:id', songController.deleteSong );


    return router;
  }


}

