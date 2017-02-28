import t from "flow-runtime";
export default (function index(handle) {
  let _handleType = t.function();

  t.param("handle", _handleType).assert(handle);
  return function (minLevel) {
    let _minLevelType = t.number();

    t.param("minLevel", _minLevelType).assert(minLevel);

    this.minLevel = minLevel;
    this.handle = handle;
  };
});
//# sourceMappingURL=index.js.map