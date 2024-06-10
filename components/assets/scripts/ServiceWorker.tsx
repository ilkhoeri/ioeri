import React from 'react';

export function ServiceWorker() {
  return (
    <>
      <script
        data-service-worker
        dangerouslySetInnerHTML={{
          __html: `
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function (registration) {
      registration.addEventListener('updatefound', function () {
        const installingWorker = registration.installing;
        installingWorker.addEventListener('statechange', function () {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              registration.showNotification('New content is available', {
                body: 'Click to see the latest updates.',
                icon: '/icons/notification/reload-icon.svg',
              });
              self.addEventListener('notificationclick', function (event) {
                event.notification.close();
                window.location.reload();
              });
            }
          }
        });
      });
    })
    .catch(function (error) {
      console.error('Service worker registration failed:', error);
    });

  let refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}
          `,
        }}
      />
    </>
  );
}

/**
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      return registration.pushManager.getSubscription().then(async (subscription) => {
        if (subscription) {
          return subscription;
        }
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;

          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  registration.showNotification('New content is available', {
                    body: 'Open to see the latest updates.',
                    icon: '/icons/notification/reload-icon.svg',
                  });
                  self.addEventListener('notificationclick', (event: any) => {
                    event.notification.close();
                    event.waitUntil(window.open('/'));
                    window.location.reload();
                  });
                }
              }
            });
          }
        });
      });
    })
    .then((subscription) => {
      // subscription part
      notifications.show({
        message: `Subscribed successfully.`,
        icon: '✓',
      });
      console.info('Push notification subscribed.');
      console.log(subscription);
    })
    .catch((error) => {
      console.error('Service worker registration failed:', error);
    });

  let refreshing: boolean | undefined;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing === undefined) {
      refreshing = false;
    }

    if (!refreshing) {
      window.location.reload();
      refreshing = true;
    }
  });
}

*/
