import createNextIntlPlugin from 'next-intl/plugin';

// მიუთითე ახალი გზა request.ts-მდე:
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);