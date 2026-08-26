import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // მხარდაჭერილი ენები
  locales: ['ka', 'en'],

  // ნაგულისხმევი ენა
  defaultLocale: 'ka'
});

export const config = {
  // გაატაროს ყველა გზა, გარდა სტატიკური ფაილებისა და API-ებისა
  matcher: ['/', '/(ka|en)/:path*']
};