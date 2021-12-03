export interface TagDto {
  readonly id: number;
  readonly name: string;
  readonly aliases: string[];
  readonly cat: string;
  readonly meta: boolean;
  readonly parents: number[];
  readonly searchable: boolean;
  readonly vns: number;
  readonly applicable: boolean;
}
