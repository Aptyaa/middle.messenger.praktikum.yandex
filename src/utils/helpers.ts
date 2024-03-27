import Handlebars from 'handlebars';
import UserController from '../controllers/UserController.ts';
import router from './Router.ts';

export type Indexed<T = any> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (let p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any,
  );

  return merge(object as Indexed, result);
}

export function isPlainObject(value: unknown): value is Indexed {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: Indexed, rhs: Indexed) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export function transTime(time: string): string {
  return time.split('T')[1].split(':').slice(0, 2).join(':');
}

export function debounce(fn: (...args: any) => void, delay: number) {
  let timeoutId: any;
  return function (this: any, ...args: any) {
    let content = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(content, args);
    }, delay);
  };
}

export const debounceInput = debounce((value: string) => {
  UserController.searchUser(value);
}, 1000);

export function setAvatar(avatar: string) {
  if (!avatar) return null;
  return `https://ya-praktikum.tech/api/v2/resources${avatar}`;
}

Handlebars.registerHelper('eq', (a, b) => {
  return a === b;
});

export const errorHandling = (response: XMLHttpRequest) => {
  if (response.status === 500) {
    router.go('/500');
  } else if (response.status !== 200) {
    throw response.response.reason;
  }
};
