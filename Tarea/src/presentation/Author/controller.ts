import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateAuthorDto, UpdateAuthorDto } from '../../domain/dtos';


export class AuthorController {
  //* DI
  constructor() { }
  public getAuthor = async( req: Request, res: Response ) => {
    const authors = await prisma.author.findMany();
    return res.json( authors );
  };




  public getAuthorById = async( req: Request, res: Response ) => {
    const id = +req.params.id;
    //    localhost:3000/movies/1
    if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );

    const author = await prisma.author.findFirst({
      where: { id }
    });
    
    ( author )
      ? res.json( author )
      : res.status( 404 ).json( { error: `Author with id ${ id } not found` } );
  };




  public createAuthor = async( req: Request, res: Response ) => {
    
    const [error, createAuthorDto] = CreateAuthorDto.create(req.body);
    if ( error ) return res.status(400).json({ error });

    const author = await prisma.author.create({
      data: createAuthorDto!
    });

    res.json( author );

  };



  public updateAuthor = async( req: Request, res: Response ) => {
    const id = +req.params.id;
    const [error, updateAuthorDto] = UpdateAuthorDto.create({...req.body, id});
    if ( error ) return res.status(400).json({ error });
    
    const author = await prisma.author.findFirst({
      where: { id }
    });
    if ( !author ) return res.status( 404 ).json( { error: `Author with id ${ id } not found` } );
    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: updateAuthorDto!.values
    });
    res.json( updatedAuthor );
  }


  public deleteAuthor = async(req:Request, res: Response) => {
    const id = +req.params.id;
    const author = await prisma.author.findFirst({
      where: { id }
    });

    if ( !author ) return res.status(404).json({ error: `Movie with id ${ id } not found` });
    const deleted = await prisma.author.delete({
      where: { id }
    });
    ( deleted ) 
      ? res.json( deleted )
      : res.status(400).json({ error: `Author with id ${ id } not found` });
  }
}