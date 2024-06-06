# 📊 Metrics Dashboard

This repository contains an experimental project exploring the integration of Next.js and Tremor for data visualization.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies used](#technologies-used)
- [Installation](#installation)
- [Project structure](#project-structure)
- [Running tests](#running-tests)
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

## Contributing

Contributions to this project are welcome! If you have any ideas, bug fixes, or enhancements, please feel free to open an issue or submit a pull request. Make sure to follow the existing code style and provide clear documentation for your changes. Just take into account that this is an experimental project and a work in progress.
