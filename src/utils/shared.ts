/* eslint-disable @typescript-eslint/no-use-before-define */
export const isUndefined = (obj: Any): obj is undefined => typeof obj === "undefined";

export const isObject = (fn: Any): fn is object => !isNil(fn) && typeof fn === "object";

export const isPlainObject = (fn: Any): fn is object => {
  if (!isObject(fn)) {
    return false;
  }
  const proto = Object.getPrototypeOf(fn);
  if (proto === null) {
    return true;
  }
  const ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return (
    typeof ctor === "function" &&
    ctor instanceof ctor &&
    Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object)
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: Any): val is Function => typeof val === "function";

export const isString = (val: Any): val is string => typeof val === "string";

export const isNumber = (val: Any): val is number => typeof val === "number";

export const isConstructor = (val: Any): boolean => val === "constructor";

export const isNil = (val: Any): val is null | undefined => isUndefined(val) || val === null;

export const isEmpty = (array: Any): boolean => !(array && array.length > 0);

export const isSymbol = (val: Any): val is symbol => typeof val === "symbol";
