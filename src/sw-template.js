importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');


  workbox.loadModule('workbox-background-sync');

  workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );

  const { registerRoute } = workbox.routing;
  const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
  const { BackgroundSyncPlugin } = workbox.backgroundSync;

  
  const cacheNetworFirst = [
    '/api/auth/renew',
    '/api/events'
  ]

  registerRoute(
    ({ request, url }) => {//si el callback es true realiza la accion posterior

      //console.log({request, url })
      if ( cacheNetworFirst.includes(url.pathname) ) return true

      return false;
    },   
    new NetworkFirst()
  )

 // registerRoute(
 //  new RegExp('http://localhost:4000/api/auth/renew'), 
 //  new NetworkFirst()
 //)
//
 //registerRoute(
 //  new RegExp('http://localhost:4000/api/events'), 
 //  new NetworkFirst()
 //)

const cacheFirstNetwork = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
]
    
  registerRoute(
    ({ request, url }) => {
      if ( cacheFirstNetwork.includes(url.href) ) return true

      return false;
    },
    new CacheFirst()
  )

 // registerRoute(// Este es una ruta o funcion en la cual se realiza cuando es llamada por el Service worker
 //   new RegExp('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'),
 //   new CacheFirst()
 // )
//
 // registerRoute(
 //   new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'),
 //   new CacheFirst()
 // )


  //Posteos offline

  const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
  });
  

  registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    'POST'
  )

  registerRoute(
    new RegExp('http://localhost:4000/api/events/'),
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    'PUT'
  )
 
  registerRoute(
    new RegExp('http://localhost:4000/api/events/'),
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    'DELETE'
  )
  


