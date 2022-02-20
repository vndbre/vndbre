export interface TagDto {
  readonly id: number;
  readonly name: string;
  readonly aliases: readonly string[];
  readonly cat: string;
  readonly meta: boolean;
  readonly parents: readonly number[];
  readonly searchable: boolean;
  readonly vns: number;
  readonly applicable: boolean;
}
