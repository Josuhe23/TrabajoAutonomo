export class CreateSongDto {
  private constructor(
    public readonly authorId: number,
    public readonly albumId: number,
    public readonly name: string,
    public readonly duration: string,
    public readonly releaseDate: Date
  ) { }

  static create(props: { [key: string]: any }): [string?, CreateSongDto?] {
    const { authorId, albumId, name, duration, releaseDate } = props;

    if (!authorId || !albumId || !name || !duration || !releaseDate) {
      return ['All properties are required', undefined];
    }

    return [
      undefined,
      new CreateSongDto(authorId, albumId, name, duration, releaseDate)
    ];
  }
}
