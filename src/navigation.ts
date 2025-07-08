import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
import type {Pathnames} from 'next-intl/navigation';

export const locales = ['en', 'fr', 'ha', 'zh'] as const;
export const localePrefix = 'always'; // Default

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same path, use the
  // default:
  '/': '/',
  '/gallery': '/gallery',
  '/videos': '/videos',
  '/services': '/services',
  '/listing-generator': '/listing-generator',
} satisfies Pathnames<typeof locales>;

export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});
