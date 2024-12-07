"use client"
import PricingPlans from "@/app/_data/pricing";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function Upgrade() {
  const {user} = useUser()
  return (
    <div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
        {PricingPlans.map((plan, index) => (
          <div class="rounded-2xl border border-indigo-600 p-6 shadow-sm ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12">
            <div class="text-center">
              <h2 class="text-lg font-medium text-gray-900">
                {plan.name}
                <span class="sr-only">Plan</span>
              </h2>

              <p class="mt-2 sm:mt-4">
                <strong class="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {plan.price}
                </strong>

                <span class="text-sm font-medium text-gray-700">
                  /{plan.duration}
                </span>
              </p>
            </div>

            <ul class="mt-6 space-y-2">
              {plan?.features?.map((item, index)=> 
              <li class="flex items-center gap-1" key={index}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5 text-indigo-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>

                <span class="text-gray-700"> {item} </span>
              </li>)}
            </ul>

            <Link
              href={plan.paymentLink+"?prefilled_email="+user?.primaryEmailAddress?.emailAddress}
              target={"_blank"}
              class="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500"
            >
              Get Started
            </Link>
          </div>
        ))}
        {/* <div class="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
          <div class="text-center">
            <h2 class="text-lg font-medium text-gray-900">
              Starter
              <span class="sr-only">Plan</span>
            </h2>

            <p class="mt-2 sm:mt-4">
              <strong class="text-3xl font-bold text-gray-900 sm:text-4xl">
                {" "}
                20${" "}
              </strong>

              <span class="text-sm font-medium text-gray-700">/month</span>
            </p>
          </div>

          <ul class="mt-6 space-y-2">
            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span class="text-gray-700"> 10 users included </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span class="text-gray-700"> 2GB of storage </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span class="text-gray-700"> Email support </span>
            </li>

            <li class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-indigo-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span class="text-gray-700"> Help center access </span>
            </li>
          </ul>

          <a
            href="#"
            class="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          >
            Get Started
          </a>
        </div> */}
      </div>
    </div>
  );
}
