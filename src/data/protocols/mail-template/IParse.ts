export interface IParse {
  parse(data: IParse.Params): Promise<IParse.Result>;
}

export interface ITemplateVariables {
  [key: string]: string | number;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IParse {
  export type Params = {
    file: string;
    variables: ITemplateVariables;
  };
  export type Result = string;
}
