const apiPath = '/api/v1';

export default {
  api: {
    loginPath: () => [apiPath, 'login'].join('/'),
    usersPath: () => [apiPath, 'data'].join('/'),
    signUpPath: () => [apiPath, 'signup'].join('/'),
  },
  pages: {
    rootPath: () => '/',
    loginPath: () => '/login',
    signUpPath: () => '/signup',
  },
};
