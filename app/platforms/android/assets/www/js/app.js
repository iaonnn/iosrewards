var app = angular.module('app', ['onsen'])

app.config(function($sceDelegateProvider) {
   $sceDelegateProvider.resourceUrlWhitelist([
     // Allow same origin resource loads.
     'self'
   ]);
});