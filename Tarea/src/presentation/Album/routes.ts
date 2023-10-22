import { Router } from 'express';
import { AlbumController } from './controller';

export class AlbumRoutes {
  static get routes(): Router {
    const router = Router();
    const albumController = new AlbumController();
    router.get('/', albumController.getAlbum);
    router.get('/:id', albumController.getAlbumById );
    router.post('/', albumController.createAlbum);
    router.put('/:id', albumController.updateAlbum );
    router.delete('/:id', albumController.deleteAlbum );
    return router;
  }
}

