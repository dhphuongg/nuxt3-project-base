/**
 * Flattens the keys of a nested object, converting the values to their full path strings.
 *
 * @template T - The type of the input object.
 * @param {T} obj - The input object to be flattened.
 * @param {string} [parentKey] - The parent key used to build the full key path (used in recursion).
 * @returns {T} - A new object with the same structure as the input object, but with values converted to their full key path strings.
 *
 * @example
 * // Example usage:
 * const input = {
 *   user: {
 *     name: "John Doe",
 *     address: {
 *       street: "123 Main St",
 *       city: "Anytown",
 *       country: {
 *         code: "US",
 *         name: "United States"
 *       }
 *     }
 *   }
 * };
 *
 * const output = flattenKey(input);
 * console.log(output);
 * // Output:
 * // {
 * //   user: {
 * //     name: "user.name",
 * //     address: {
 * //       street: "user.address.street",
 * //       city: "user.address.city",
 * //       country: {
 * //         code: "user.address.country.code",
 * //         name: "user.address.country.name"
 * //       }
 * //     }
 * //   }
 * // }
 */
export function flattenKey<T>(obj: T, parentKey?: string): T {
  const result: any = {};

  for (const key in obj) {
    const fullKey: string = parentKey ? `${parentKey}.${key}` : key;

    if (typeof obj[key] === "object" && obj[key] !== null) {
      result[key] = flattenKey(obj[key], fullKey);
    } else {
      result[key] = fullKey;
    }
  }
  return result as T;
}
