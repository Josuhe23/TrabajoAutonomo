export class UpdateAlbumDto {
  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly label?: string,
    public readonly numSongs?: number
  ){}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.name) returnObj.name = this.name;
    if (this.label) returnObj.label = this.label;
    if (this.numSongs !== undefined) returnObj.numSongs = this.numSongs;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateAlbumDto?] {
    const { id, name, label, numSongs } = props;
    if (!id || isNaN(Number(id))) {
      return ['id must be a valid number', undefined];
    }

    if (!name && !label && numSongs === undefined) {
      return ['At least one property must be provided for update', undefined];
    }

    return [undefined, new UpdateAlbumDto(id, name, label, numSongs)];
  }
}
