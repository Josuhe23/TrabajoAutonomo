export class UpdateAuthorDto {
  private constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly nationality?: string,
    public readonly birthdate?: Date
  ) { }

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.name) returnObj.name = this.name;
    if (this.nationality) returnObj.nationality = this.nationality;
    if (this.birthdate) returnObj.birthdate = this.birthdate;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateAuthorDto?] {
    const { id, name, nationality, birthdate } = props;

    if (!id) {
      return ['id is required for updating', undefined];
    }

    if (!name && !nationality && !birthdate) {
      return ['At least one property must be provided for updating', undefined];
    }

    return [undefined, new UpdateAuthorDto(id, name, nationality, new Date(birthdate))];
  }
}



