export class RuleError extends Error {
  constructor(
    public readonly rule: string,
    ...requirements: string[]
  ) {
    const req = requirements.flatMap((v) => (v.length > 0 ? [v] : []));
    super('\n' + req.join(';\n'));
    this.name = `[RuleError::${rule}]`;
  }
}
