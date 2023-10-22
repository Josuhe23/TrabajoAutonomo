import { Router } from 'express';
import { AuthorController } from './controller';

export class AuthorRoutes {
  static get routes(): Router {
    const router = Router();
    const authorController = new AuthorController();
    router.get('/', authorController.getAuthor);
    router.get('/:id', authorController.getAuthorById );
    router.post('/', authorController.createAuthor );
    router.put('/:id', authorController.updateAuthor );
    router.delete('/:id', authorController.deleteAuthor );
    return router;
  }
}

