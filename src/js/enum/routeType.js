//  Store all possible routes in an enum to prevent magic route strings throughout application.
define({
    //  Home is empty on purpose.
    Home: '',
    GettingStarted: 'getting-started',
    Faq: 'frequently-asked-questions',
    About: 'about',
    Donate: 'donate',
    Share: 'share',
    //  Match all other routes and assume 404
    NotFound: '*notFound'
});