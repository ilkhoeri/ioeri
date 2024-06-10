"use client";

import React from "react";
import Link from "next/link";

import { ArrowsSquareIcon } from "@/modules";

export function SectionAnalytics() {
  return (
    <section>
      <div className="p-8">
        <h4 className="text-4xl font-medium text-muted-foreground text-center mt-6"> Full-Funnel Social Analytics </h4>
        <p className="text-center mt-1 text-lg font-light text-muted-foreground">
          The time is now for it to be okay to be great. For being a bright color. For standing out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-8">
          <div className="bg-indigo-100 rounded-full w-16 h-16 flex justify-center items-center text-indigo-500 shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="uppercase mt-6 text-indigo-500 font-medium mb-3"> Social conversations </h2>
          <p className="font-light text-sm text-gray-500 mb-3">
            We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder
            for us to give others a hand.
          </p>
          <a
            className="text-indigo-500 hover:text-indigo-600 transition-transform hover:translate-x-2 [&>svg]:hover:scale-[1.15]"
            href="/"
          >
            More about
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div className="p-8">
          <div className="bg-green-100 rounded-full w-16 h-16 flex justify-center items-center text-green-500 shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="uppercase mt-6 text-green-500 font-medium mb-3"> Social conversations </h2>
          <p className="font-light text-sm text-gray-500 mb-3">
            We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder
            for us to give others a hand.
          </p>
          <a
            className="text-green-500 hover:text-green-600 transition-transform hover:translate-x-2 [&>svg]:hover:scale-[1.15]"
            href="/"
          >
            More about
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div className="p-8">
          <div className="bg-red-100 rounded-full w-16 h-16 flex justify-center items-center text-red-500 shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="uppercase mt-6 text-red-500 font-medium mb-3"> Social conversations </h2>
          <p className="font-light text-sm text-gray-500 mb-3">
            We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder
            for us to give others a hand.
          </p>
          <a
            className="text-red-500 hover:text-red-600 transition-transform hover:translate-x-2 [&>svg]:hover:scale-[1.15]"
            href="/"
          >
            More about
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export function SectionAlert() {
  return (
    <section className="relative">
      <div className="mb-12 space-y-2 text-center">
        <h3 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">Alert and Attention</h3>
        <p className="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
          Quam hic dolore cumque voluptate rerum beatae et quae, tempore sunt, debitis dolorum officia aliquid
          explicabo? Excepturi, voluptate?
        </p>
      </div>

      <div className="w-full p-4 md:p-8 max-auto grid md:grid-cols-2 gap-4 border border-neutral-200 dark:border-neutral-800 rounded-xl">
        <div className="relative overflow-hidden p-4 text-blue-900 bg-blue-500/10 border border-blue-500 rounded-md">
          <div className="flex justify-between flex-wrap">
            <div className="w-0 flex-1 flex">
              <div className="mr-3 pt-1">
                <svg width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M14.1667 17h-3.3334c-.5 0-.8333-.3146-.8333-.7865 0-.472.3333-.7865.8333-.7865H11.5c.0833 0 .1667-.0787.1667-.1573v-3.5394c0-.0786-.0834-.1573-.1667-.1573h-.6667c-.5 0-.8333-.3146-.8333-.7865S10.3333 10 10.8333 10h.8334c.9166 0 1.6666.7079 1.6666 1.573v3.7753c0 .0787.0834.1573.1667.1573h.6667c.5 0 .8333.3146.8333.7865 0 .472-.3333.7079-.8333.7079zM12.3 6c.6933 0 1.3.6067 1.3 1.3s-.52 1.3-1.3 1.3S11 7.9933 11 7.3 11.6067 6 12.3 6zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2"></path>
                </svg>
              </div>
              <div>
                <h5 className="text-md leading-6 font-medium"> Your message - make it short & clear. </h5>
                <p className="text-sm"> Description - make it as clear as possible. </p>
                <div className="flex mt-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-auto text-sm"
                  >
                    Primary
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ml-2 bg-blue-200 font-medium hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 w-auto text-sm"
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                aria-label="button"
                className="rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M17.6555 6.3331a.9.9 0 0 1 .001 1.2728l-4.1032 4.1085a.4.4 0 0 0 0 .5653l4.1031 4.1088a.9002.9002 0 0 1 .0797 1.1807l-.0806.092a.9.9 0 0 1-1.2728-.0009l-4.1006-4.1068a.4.4 0 0 0-.5662 0l-4.099 4.1068a.9.9 0 1 1-1.2738-1.2718l4.1027-4.1089a.4.4 0 0 0 0-.5652L6.343 7.6059a.9002.9002 0 0 1-.0796-1.1807l.0806-.092a.9.9 0 0 1 1.2728.0009l4.099 4.1055a.4.4 0 0 0 .5662 0l4.1006-4.1055a.9.9 0 0 1 1.2728-.001z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden p-4 text-green-900 bg-green-500/10 border border-green-500 rounded-md">
          <div className="flex justify-between flex-wrap">
            <div className="w-0 flex-1 flex">
              <div className="mr-3 pt-1">
                <svg width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M8.445 12.6675A.9.9 0 0 0 7.1424 13.91l2.5726 2.7448c.3679.3856.9884.3689 1.335-.036l5.591-7.0366a.9.9 0 0 0-1.3674-1.1705l-4.6548 5.9132a.4.4 0 0 1-.607.0252l-1.567-1.6826zM1.9995 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z"></path>
                </svg>
              </div>
              <div>
                <h5 className="text-md leading-6 font-medium"> Your message - make it short & clear. </h5>
                <p className="text-sm"> Description - make it as clear as possible. </p>
                <div className="flex mt-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-700 font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-auto text-sm"
                  >
                    Primary
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ml-2 bg-green-200 font-medium hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 w-auto text-sm"
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                aria-label="button"
                className="rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M17.6555 6.3331a.9.9 0 0 1 .001 1.2728l-4.1032 4.1085a.4.4 0 0 0 0 .5653l4.1031 4.1088a.9002.9002 0 0 1 .0797 1.1807l-.0806.092a.9.9 0 0 1-1.2728-.0009l-4.1006-4.1068a.4.4 0 0 0-.5662 0l-4.099 4.1068a.9.9 0 1 1-1.2738-1.2718l4.1027-4.1089a.4.4 0 0 0 0-.5652L6.343 7.6059a.9002.9002 0 0 1-.0796-1.1807l.0806-.092a.9.9 0 0 1 1.2728.0009l4.099 4.1055a.4.4 0 0 0 .5662 0l4.1006-4.1055a.9.9 0 0 1 1.2728-.001z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden p-4 text-yellow-900 bg-yellow-500/10 border border-yellow-500 rounded-md">
          <div className="flex justify-between flex-wrap">
            <div className="w-0 flex-1 flex">
              <div className="mr-3 pt-1">
                <svg width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M13.6086 3.247l8.1916 15.8c.0999.2.1998.5.1998.8 0 1-.7992 1.8-1.7982 1.8H3.7188c-.2997 0-.4995-.1-.7992-.2-.7992-.5-1.1988-1.5-.6993-2.4 5.3067-10.1184 8.0706-15.385 8.2915-15.8.3314-.6222.8681-.8886 1.4817-.897.6135-.008 1.273.2807 1.6151.897zM12 18.95c.718 0 1.3-.582 1.3-1.3 0-.718-.582-1.3-1.3-1.3-.718 0-1.3.582-1.3 1.3 0 .718.582 1.3 1.3 1.3zm-.8895-10.203v5.4c0 .5.4.9.9.9s.9-.4.9-.9v-5.3c0-.5-.4-.9-.9-.9s-.9.4-.9.8z"></path>
                </svg>
              </div>
              <div>
                <h5 className="text-md leading-6 font-medium"> Your message - make it short & clear. </h5>
                <p className="text-sm"> Description - make it as clear as possible. </p>
                <div className="flex mt-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-500 font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 w-auto text-sm"
                  >
                    Primary
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ml-2 bg-yellow-200 font-medium hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 w-auto text-sm"
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                aria-label="button"
                className="rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M17.6555 6.3331a.9.9 0 0 1 .001 1.2728l-4.1032 4.1085a.4.4 0 0 0 0 .5653l4.1031 4.1088a.9002.9002 0 0 1 .0797 1.1807l-.0806.092a.9.9 0 0 1-1.2728-.0009l-4.1006-4.1068a.4.4 0 0 0-.5662 0l-4.099 4.1068a.9.9 0 1 1-1.2738-1.2718l4.1027-4.1089a.4.4 0 0 0 0-.5652L6.343 7.6059a.9002.9002 0 0 1-.0796-1.1807l.0806-.092a.9.9 0 0 1 1.2728.0009l4.099 4.1055a.4.4 0 0 0 .5662 0l4.1006-4.1055a.9.9 0 0 1 1.2728-.001z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden p-4 text-red-900 bg-red-500/10 border border-red-500 rounded-md">
          <div className="flex justify-between flex-wrap">
            <div className="w-0 flex-1 flex">
              <div className="mr-3 pt-1">
                <svg width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M13.6086 3.247l8.1916 15.8c.0999.2.1998.5.1998.8 0 1-.7992 1.8-1.7982 1.8H3.7188c-.2997 0-.4995-.1-.7992-.2-.7992-.5-1.1988-1.5-.6993-2.4 5.3067-10.1184 8.0706-15.385 8.2915-15.8.3314-.6222.8681-.8886 1.4817-.897.6135-.008 1.273.2807 1.6151.897zM12 18.95c.718 0 1.3-.582 1.3-1.3 0-.718-.582-1.3-1.3-1.3-.718 0-1.3.582-1.3 1.3 0 .718.582 1.3 1.3 1.3zm-.8895-10.203v5.4c0 .5.4.9.9.9s.9-.4.9-.9v-5.3c0-.5-.4-.9-.9-.9s-.9.4-.9.8z"></path>
                </svg>
              </div>
              <div>
                <h5 className="text-md leading-6 font-medium"> Your message - make it short & clear. </h5>
                <p className="text-sm"> Description - make it as clear as possible. </p>
                <div className="flex mt-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-auto text-sm"
                  >
                    Primary
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ml-2 bg-red-200 font-medium hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 w-auto text-sm"
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                aria-label="button"
                className="rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M17.6555 6.3331a.9.9 0 0 1 .001 1.2728l-4.1032 4.1085a.4.4 0 0 0 0 .5653l4.1031 4.1088a.9002.9002 0 0 1 .0797 1.1807l-.0806.092a.9.9 0 0 1-1.2728-.0009l-4.1006-4.1068a.4.4 0 0 0-.5662 0l-4.099 4.1068a.9.9 0 1 1-1.2738-1.2718l4.1027-4.1089a.4.4 0 0 0 0-.5652L6.343 7.6059a.9002.9002 0 0 1-.0796-1.1807l.0806-.092a.9.9 0 0 1 1.2728.0009l4.099 4.1055a.4.4 0 0 0 .5662 0l4.1006-4.1055a.9.9 0 0 1 1.2728-.001z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageHome() {
  return (
    <section className="w-full min-w-full space-y-40 mb-20">
      <div id="features">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="md:w-2/3 lg:w-1/2">
            <svg width="64" height="64" className="text-color size-10" onContextMenu={(e) => e.preventDefault()}>
              <use href="/images/icons.svg#stars" />
            </svg>

            <h2 className="mt-4 mb-2 text-h6 font-bold text-color">
              A community of web and mobile applications developers based on React.js
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm 2xl:text-base">
              Crafting and share relevant functionals, styles, and hooks recommendations for react.js applications.
            </p>
          </div>
          <div className="mt-16 bg-background grid overflow-hidden rounded-xl border text-muted-foreground sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
            <FeaturesList features={features} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesList({
  features,
}: {
  features: { title?: string; slug?: string; image?: string; notes?: string }[] | null;
}) {
  if (!features?.length) {
    return null;
  }
  return features.map((i, index) => (
    <div key={index} className="group relative transition cursor-default">
      <div className="relative space-y-4 py-8 px-6">
        <svg width="64" height="64" className="text-color size-10" onContextMenu={(e) => e.preventDefault()}>
          <use href={i.image} />
        </svg>

        <div className="space-y-1">
          {i?.title && <h5 className="text-h6 font-semibold text-color transition">{i.title}</h5>}
          {i?.notes && <p className="text-muted-foreground text-xs md:text-sm 2xl:text-base">{i.notes}</p>}
        </div>
        {i?.slug && (
          <Link href={i.slug} className="flex items-center justify-start gap-4 rounded-sm group-hover:text-color">
            <span className="text-sm">Read</span>
            <ArrowsSquareIcon
              withSquare={false}
              direction="right"
              className="size-6 -translate-x-4 text-2xl transition duration-300 group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
            />
          </Link>
        )}
      </div>
    </div>
  ));
}

const features = [
  {
    title: "Snappy",
    slug: "#",
    image: "/images/icons.svg#clock-alt-2",
    notes: "The effectiveness of time in building and adjusting the needs during development.",
  },
  {
    title: "Scalable",
    slug: "#",
    image: "/images/icons.svg#draw-compass",
    notes: "Consider the effectiveness of code structure to maintain component flexibility.",
  },
  {
    title: "Enchant",
    slug: "#",
    image: "/images/icons.svg#forest",
    notes: "The structure of rich components is modeled effectively for rapid comprehension.",
  },
  {
    title: "Valuable",
    slug: "#",
    image: "/images/icons.svg#pantone-2",
    notes: "Easy to modify according to the needs of the structure of the component force.",
  },
];
