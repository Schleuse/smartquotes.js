import replacements from './replacements';

interface StringOptions {
  retainLength?: boolean;
}

export default function(str: string, options?: StringOptions): string {
  options = options || {};
  replacements.forEach( replace => {
    const retailLength = options?.retainLength || false;
    const replacement = typeof replace[1] === 'function' ? replace[1](retailLength) : replace[1];
    str = str.replace(replace[0], replacement);
  });
  return str;
};
