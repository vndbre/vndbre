import { extendTailwindMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';

const tailwindMerge = extendTailwindMerge({
  classGroups: {
    'font-size': [
      {
        text: [
          'xs',
          'sm',
          'base',
          'lg',
          'xl',
          'title-20',
          'title-24',
          'body-20',
          'caption-16',
          'caption-18',
          'caption-20',
        ],
      },
    ],
  },
});

/**
 * A utility function to merge Tailwind classes with clsx.
 * @param inputs A list of class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return tailwindMerge(clsx(inputs));
}
