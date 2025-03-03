# News App

A React Native mobile application that fetches and displays news articles from a public news API with a clean and user-friendly interface.

## Features

- Browse news by categories (Top Headlines, Business, Technology, etc.)
- Search for specific news articles or topics
- Save favorite articles for offline reading
- View detailed article content
- Share articles with others
- Pagination for loading more articles

## demo Video

## Prerequisites

- Node.js (v14.0.0 or newer)
- npm or Yarn
- Expo CLI
- Android Studio or Xcode (for running on emulators)

## Installation

1. Clone the repository:
```
git clone https://github.com/JadhaAM/news-app.git
cd news-app
```

2. Install dependencies:
```
npm install
# or
yarn install
```

3. Create an account on [NewsAPI](https://newsapi.org/) and get your API key

4. Add your API key to `src/api/config.js`:
```javascript
export const API_KEY = 'your_api_key_here';
```

5. Start the application:
```
npm start
# or
yarn start
```

6. Follow the instructions from the Expo CLI to run the app on your device or emulator

## Project Structure

```
news-app/
├── src/
│   ├── api/
│   │   ├── config.js
│   │   └── newsApi.js
│   ├── components/
│   │   ├── ArticleCard.js
│   │   ├── CategoryCard.js
│   │   ├── ErrorView.js
│   │   └── LoadingIndicator.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── newsSlice.js
│   │       └── bookmarksSlice.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── CategoryScreen.js
│   │   ├── ArticleScreen.js
│   │   ├── BookmarksScreen.js
│   │   └── SearchScreen.js
│   |
│   └── App.js
├── .gitignore
├── app.json
├── package.json
└── README.md
```

## Architecture

This application follows a feature-based architecture with the following key components:

- **Redux Toolkit** for state management
- **React Navigation** for screen navigation
- **NewsAPI** for fetching news data
- **Component-based UI** for reusable interface elements

## State Management

The app uses Redux Toolkit for state management with the following slices:

- **newsSlice**: Manages news articles, loading states, and pagination
- **bookmarksSlice**: Handles saved/bookmarked articles

## API Integration

The app integrates with the NewsAPI to fetch news articles based on categories, search queries, and pagination parameters. The API integration is contained within the `src/api` directory.

## UI Components

The app includes several reusable components:

- **ArticleCard**: Displays a news article in a card format
- **CategoryCard**: Shows a news category with an image background
- **LoadingIndicator**: Displays a loading spinner
- **ErrorView**: Shows error messages with retry options

## Additional Features

- **Bookmark functionality**: Save articles for offline reading
- **Search functionality**: Find articles by keywords
- **Pull-to-refresh**: Update article lists
- **Infinite scrolling**: Load more articles as you scroll
- **Share functionality**: Share articles via platform-specific share dialogs

## License

[Include your license information here]

## Acknowledgments

- [NewsAPI](https://newsapi.org/) for providing the news data
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Navigation](https://reactnavigation.org/)