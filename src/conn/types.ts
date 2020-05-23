export type Logger = (msg: string, params: any) => void; // tslint:disable-line: no-any
export type Seconds = number;

export interface IOptionalArgs {
  logSlowQueries?: {
    ifRunsLoggerThan: Seconds;
    logger?: Logger;
  };
}
