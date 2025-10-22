export class RuleError {
  constructor(
    public rule: string,
    ...requirements: string[]
  ) {
    const req = requirements.flatMap((v) => (v.length > 0 ? [v] : []));

    this.name = `[RuleError::${rule}]`;
    this.message = `${this.name}: ${'\n' + req.join(';\n')}`;
    this.requirements = requirements;
  }

  public name: string;
  public message: string;
  public requirements: string[];
}
