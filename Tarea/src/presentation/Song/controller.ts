import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateSongDto, UpdateSongDto } from '../../domain/dtos';


export class SongController {

  //* DI
  constructor() { }


  public getSong = async( req: Request, res: Response ) => {
    const songs = await prisma.song.findMany();
    return res.json( songs );
  };

  public getSongById = async( req: Request, res: Response ) => {
    const id = +req.params.id;
    if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );

    const song = await prisma.song.findFirst({
      where: { id }
    });
    
    ( song )
      ? res.json( song )
      : res.status( 404 ).json( { error: `Song with id ${ id } not found` } );
  };

  public createSong = async( req: Request, res: Response ) => {
    
    const [error, createSongDto] = CreateSongDto.create(req.body);
    if ( error ) return res.status(400).json({ error });

    const song = await prisma.song.create({
      data: createSongDto!
    });

    res.json( song );

  };

  public updateSong = async( req: Request, res: Response ) => {
    const id = +req.params.id;
    const [error, updateSongDto] = UpdateSongDto.create({...req.body, id});
    if ( error ) return res.status(400).json({ error });
    
    const song = await prisma.song.findFirst({
      where: { id }
    });

    if ( !song ) return res.status( 404 ).json( { error: `Song with id ${ id } not found` } );

    const updatedSong = await prisma.song.update({
      where: { id },
      data: updateSongDto!.values
    });
  
    res.json( updatedSong );

  }


  public deleteSong = async(req:Request, res: Response) => {
    const id = +req.params.id;

    const song = await prisma.song.findFirst({
      where: { id }
    });

    if ( !song ) return res.status(404).json({ error: `Song with id ${ id } not found` });

    const deleted = await prisma.song.delete({
      where: { id }
    });

    ( deleted ) 
      ? res.json( deleted )
      : res.status(400).json({ error: `Song with id ${ id } not found` });
    

  }
  


}