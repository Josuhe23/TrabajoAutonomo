import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateAlbumDto, UpdateAlbumDto } from '../../domain/dtos';


export class AlbumController {
  //* DI
  constructor() { }
  public getAlbum = async( req: Request, res: Response ) => {
    const albums = await prisma.album.findMany();
    return res.json( albums );
  };




  public getAlbumById = async( req: Request, res: Response ) => {
    const id = +req.params.id;
    //    localhost:4000/movies/1
    if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );

    const album = await prisma.album.findFirst({
      where: { id }
    });
    
    ( album )
      ? res.json( album )
      : res.status( 404 ).json( { error: `Album with id ${ id } not found` } );
  };




  public createAlbum = async( req: Request, res: Response ) => {
    
    const [error, createAlbumDto] = CreateAlbumDto.create(req.body);
    if ( error ) return res.status(400).json({ error });

    const album = await prisma.album.create({
      data: createAlbumDto!
    });

    res.json( album );

  };



  public updateAlbum = async( req: Request, res: Response ) => {
    const id = +req.params.id;
    const [error, updateAlbumDto] = UpdateAlbumDto.create({...req.body, id});
    if ( error ) return res.status(400).json({ error });
    
    const album = await prisma.album.findFirst({
      where: { id }
    });
    if ( !album ) return res.status( 404 ).json( { error: `Movie with id ${ id } not found` } );
    const updatedAlbum = await prisma.album.update({
      where: { id },
      data: updateAlbumDto!.values
    });
    res.json( updatedAlbum );
  }


  public deleteAlbum = async(req:Request, res: Response) => {
    const id = +req.params.id;
    const album = await prisma.album.findFirst({
      where: { id }
    });

    if ( !album ) return res.status(404).json({ error: `Movie with id ${ id } not found` });
    const deleted = await prisma.album.delete({
      where: { id }
    });
    ( deleted ) 
      ? res.json( deleted )
      : res.status(400).json({ error: `Album with id ${ id } not found` });
  }
}