export class UpdateSongDto {
  constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly duration?: string,
    public readonly releaseDate?: Date
  ){}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.name) returnObj.name = this.name;
    if (this.duration) returnObj.duration = this.duration;
    if (this.releaseDate) returnObj.releaseDate = this.releaseDate;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateSongDto?] {
    const { id, name, duration, releaseDate } = props;

    if (!id || isNaN(Number(id))) {
      return ['id must be a valid number', undefined];
    }

    if (!name && !duration && !releaseDate) {
      return ['At least one property must be provided', undefined];
    }

    return [undefined, new UpdateSongDto(id, name, duration, releaseDate)];
  }
}
