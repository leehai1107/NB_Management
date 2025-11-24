# NB Management

A React web application for managing data from Google Sheets.

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

The app will run on [http://localhost:3000](http://localhost:3000)

## Features

- Fetch data from Google Sheets
- Display data in a responsive table
- Search/filter through records
- Modern, gradient-styled UI

## Next Steps

To connect to your Google Sheets:
1. Set up Google Sheets API credentials
2. Configure the API endpoint in `App.js`
3. Update the data fetching logic

## Project Structure

```
src/
├── App.js              # Main application component
├── App.css             # Main styles
├── index.js            # Entry point
├── index.css           # Global styles
└── components/
    ├── DataTable.js    # Table component for displaying data
    ├── SearchBar.js    # Search functionality
    └── LoadingSpinner.js # Loading indicator
```
