import { get } from "lodash-es";

/**
 *
 * @param {string} namePath
 * @param {object} options
 * @param {Vue} options.vue
 * @param {object} options.context
 * @returns
 */
export function getVuelidateState(namePath, options = {}) {
  const { vue = this } = options;
  const context = options.context || vue.$v;

  const { $dirty, $error } = get(context, namePath, {});
  return $dirty && !$error ? true : $dirty && $error ? false : null;
}
