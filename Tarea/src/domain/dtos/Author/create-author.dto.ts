export class CreateAuthorDto {
  private constructor(
    public readonly name: string,
    public readonly nationality: string,
    public readonly birthdate: Date,
  ) { }

  static create(props: { [key: string]: any }): [string?, CreateAuthorDto?] {
    const { name, nationality, birthdate } = props;

    if (!name || !nationality || !birthdate) {
      return ['name, nationality, and birthdate properties are required', undefined];
    }

    return [undefined, new CreateAuthorDto(name, nationality, new Date(birthdate))];
  }
}




