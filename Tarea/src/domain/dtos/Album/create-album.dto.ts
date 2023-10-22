export class CreateAlbumDto {
  private constructor(
    public readonly authorId: number,
    public readonly name: string,
    public readonly label: string,
    public readonly numSongs: number
  ) { }

  static create(props: { [key: string]: any }): [string?, CreateAlbumDto?] {
    const { authorId, name, label, numSongs } = props;

    if (authorId == null) {
      return ['authorId property is required', undefined];
    }

    if (!name || !label || numSongs == null) {
      return ['name, label, and numSongs properties are required', undefined];
    }

    return [undefined, new CreateAlbumDto(authorId, name, label, numSongs)];
  }
}
