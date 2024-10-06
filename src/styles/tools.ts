import { isFunction, isObject } from 'lodash';

export function buildGlobalClassnamesAndCssObject(
  styles,
  parentNames: string[] = [],
): [Record<string, any>, any[]] {
  const classNameObject: Record<string, any> = {};
  const cssObjectEvals: any[] = [];

  Object.entries(styles).forEach(([key, value]) => {
    if (isFunction(value)) {
      classNameObject[key] = [...parentNames, key].join('-');
      cssObjectEvals.push({
        name: `.${classNameObject[key]}`,
        fn: value,
      });
    } else if (isObject(value)) {
      const [childClassNameObject, childCssObjects] =
        buildGlobalClassnamesAndCssObject(value, [...parentNames, key]);
      classNameObject[key] = childClassNameObject;
      cssObjectEvals.push(...childCssObjects);
    }
  });

  return [classNameObject, cssObjectEvals];
}

export function parseCssObjectEvals(cssObjectEvals: any[], theme) {
  const { colors } = theme.other;
  const result = {};

  cssObjectEvals.forEach((cssObjectEval: any) => {
    const { name, fn } = cssObjectEval;
    if (result[name]) {
      throw new Error(`${name} global className was duplicate definition`);
    }
    result[name] = fn(colors, theme);
  });
  return result;
}
