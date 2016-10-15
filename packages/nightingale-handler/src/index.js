export default (handle: Function) => (
  function (minLevel: number) {
    this.minLevel = minLevel;
    this.handle = handle;
  }
);
