'use client';
import React, { ReactNode, useEffect } from 'react';

export function DetailsControl({ children }: { children?: ReactNode }) {
  useEffect(() => {
    function toggleDetails(element: HTMLElement | null) {
      if (element) {
        const detailsContent = element.querySelector('[data-type="detailsContent"]');
        if (detailsContent) {
          const isHidden = detailsContent.classList.contains('hidden');

          if (isHidden) {
            detailsContent.classList.remove('hidden');
          } else {
            detailsContent.classList.add('hidden');
          }

          element.classList.toggle('is-open', !isHidden);
        }

        element.querySelectorAll<HTMLElement>('[data-type="details"]').forEach((childDetails) => {
          toggleDetails(childDetails);
        });
      }
    }

    const buttons = document.querySelectorAll('[data-type="details"] > button[type="button"]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        toggleDetails(button.parentElement);
      });
    });
  }, []);

  return <>{children}</>;
}
