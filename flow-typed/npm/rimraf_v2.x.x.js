// flow-typed signature: 0eb8a81288416e6790fe4ede6297aaf3
// flow-typed version: c6154227d1/rimraf_v2.x.x/flow_>=v0.25.0 <=v0.103.x

declare module 'rimraf' {
  declare type Options = {
	  maxBusyTries?: number,
	  emfileWait?: number,
	  glob?: boolean,
	  disableGlob?: boolean
  };
  
  declare type Callback = (err: ?Error, path: ?string) => void;

  declare module.exports: {
    (f: string, opts?: Options | Callback, callback?: Callback): void;
    sync(path: string, opts?: Options): void;
  };
}
