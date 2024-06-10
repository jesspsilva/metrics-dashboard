# 📊 Metrics Dashboard

This repository contains an experimental project exploring the integration of Next.js and Tremor for data visualization.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies used](#technologies-used)
- [Installation](#installation)
- [Project structure](#project-structure)
- [Running tests](#running-tests)
- [Screenshots](#screenshots)
- [Screen recordings](#screen-recordings)
- [Contributing](#contributing)

## Overview

This project is a web application built with Next.js that displays various statistics and charts. Users can filter the displayed data by category through a select input, and interact with the charts to further filter the data.

## Features

1. **Category Selection**: A select input allows users to filter content by category.
2. **Data Display**: Three cards display key statistics.
3. **Interactive Charts**: Charts are updated based on the selected category and allow further filtering when elements like bars or circles are clicked.


## Technologies Used

- Next.js
- React
- TypeScript
- Tremor (for charts)
- Styled Components (for styling)
- Tailwind (for charts styling)
- Jest (for unit testing)
- Testing Library (for UI testing)
- Cypress (for E2E testing)

## Installation

### Prerequisites

- Node.js (>= 20.x)

### Steps

To run this project locally, follow these steps:

1. Clone this repository to your local machine.

```bash
$ git clone https://github.com/jesspsilva/metrics-dashboard.git
```

2. Navigate to the project directory in the terminal.

```bash
cd metrics-dashboard
```

3. Install the dependencies by running the following command:

```bash
npm install
```

4. Once the installation is complete, start the development server with the following command:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the project in action.

## Project Structure

- `src/`: Contains the source code of the application.
  - `app/`: Main application folder.
    - `components/`: Contains reusable React components.
    - `utils/`: Contains utility functions.
      - `__mocks__/`: Contains mock data for testing.

## Running Tests

### Unit tests

This project uses Jest and Testing Library for unit and integration tests.

1. **Run all tests**:

```bash
npm run test
```

2. **Run tests in watch mode**:

```bash
npm run test:watch
```

### E2E Tests (Cypress)

1. **Run Cypress in interactive mode**:

   ```bash
   npm run cypress:open
   ```

2. **Run Cypress tests in headless mode**:
   ```bash
   npx cypress run
   ```

## Screenshots
### Desktop
<p float="left">
  <img src="https://github.com/jesspsilva/metrics-dashboard/assets/24191107/d220e4c5-fa49-4fa2-b718-8c436837b3f3" width="49%" />
  <img src="https://github.com/jesspsilva/metrics-dashboard/assets/24191107/e381d531-4840-40b4-bae5-de35723a4495" width="49%" />
</p>

<p float="left">
  <img src="https://github.com/jesspsilva/metrics-dashboard/assets/24191107/5a009f47-212e-4084-addc-232187b1f986" width="49%" />
  <img src="https://github.com/jesspsilva/metrics-dashboard/assets/24191107/b717700d-6542-4aa2-a46c-b9914cb49ff6" width="49%" />
</p>

### Mobile
<p float="left">
  <img width="49%" alt="mobile_1" src="https://github.com/jesspsilva/metrics-dashboard/assets/24191107/4aadfab8-160d-4338-9aa3-7f49db7934bc">
  <img width="49%" alt="mobile_2" src="https://github.com/jesspsilva/metrics-dashboard/assets/24191107/1c06f4c1-ded6-42e9-ab34-ef2b68e8e582">
</p>
<p float="left">
  <img width="49%" alt="mobile_3" src="https://github.com/jesspsilva/metrics-dashboard/assets/24191107/7df4e549-7a02-4c0f-8d5f-2c6040cd22a4">
  <img width="49%" alt="mobile_4" src="https://github.com/jesspsilva/metrics-dashboard/assets/24191107/4d553256-45ca-431f-907a-ba895e840737">
</p>

## Screen recordings

### Desktop
![project_desktop](https://github.com/jesspsilva/metrics-dashboard/assets/24191107/ebaf5946-a09e-4531-b12c-8c2a4398ae03)

### Mobile
![project_mobile](https://github.com/jesspsilva/metrics-dashboard/assets/24191107/ab1722fc-984e-4ee4-bef0-d294902a7be2)

## Contributing

Contributions to this project are welcome! If you have any ideas, bug fixes, or enhancements, please feel free to open an issue or submit a pull request. Make sure to follow the existing code style and provide clear documentation for your changes. Just take into account that this is an experimental project and a work in progress.





