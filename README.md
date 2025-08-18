# Currency Converter

A simple React + Redux currency converter that fetches exchange rates and converts amounts between different currencies.

## Features

- Convert between multiple currencies
- Live exchange rates fetching
- Form validation for input amounts
- Loading and error handling
- Responsive design

## Tech Stack

- React + TypeScript
- Redux Toolkit
- Tailwind CSS
- Jest / Vitest + React Testing Library

## Comments

- I decided to fetch each currency rate from their own endpoint - even though you can calculate the prices from each - hope this was the correct way of approaching this
- Went with tailwind just for the ease of use
- Used Redux Toolkit
- For error messaging - I decided to show the error message when the form is submitted and the error is present, rather than just if the user has incorrect form
