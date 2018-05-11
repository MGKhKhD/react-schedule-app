import React from "react";

function isReactElement(element) {
  let result = false;
  if (React.isValidElement(element)) {
    result = true;
  } else if (Array.isArray(element)) {
    const len = element.length;
    for (let idx = 0; idx < len; idx++) {
      if (React.isValidElement(element[idx])) {
        result = true;
        break;
      }
    }
  }
  return result;
}

function shallowCompareAllProps(prevProps, nextProps) {
  let result = false;
  if (prevProps === nextProps) {
    result = true;
  } else if (typeof prevProps === "object" && typeof nextProps === "object") {
    const allProps = new Set(Object.keys(nextProps), Object.keys(prevProps));
    for (let v of allProps) {
      if (prevProps[v] !== nextProps[v] || !isReactElement(v)) {
        result = true;
        break;
      }
    }
  }
  return result;
}

function shallowEqualState(nextState, prevState) {
  return nextState === prevState;
}

function shallowCompare(thisProps, nextProps, thisState, nextState) {
  return (
    !shallowEqualState(nextState, thisState) ||
    !shallowCompareAllProps(thisProps, nextProps)
  );
}

export function shallowCompareStateAndPropsForUpdate(nextProps, nextState) {
  return shallowCompare(this.props, nextProps, this.state, nextState);
}

export function pickKeys(obj, keys) {
  if (!Array.isArray(keys)) {
    throw new Error("keys must be array of keys");
  }

  let result = {};
  keys.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}
