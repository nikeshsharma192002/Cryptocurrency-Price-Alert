# Crypto Price Alert System

This is a React-based web application that allows users to monitor cryptocurrency prices and receive browser notifications when the prices reach or exceed specified target levels. The app fetches real-time cryptocurrency data from the CoinGecko API.

## Features

- **Real-Time Price Monitoring**: Fetches live cryptocurrency prices from the CoinGecko API.
- **Price Alerts**: Set upper and lower price targets for specific cryptocurrencies.
- **Browser Notifications**: Get desktop notifications when a cryptocurrency's price reaches or exceeds your target levels.
- **Responsive Design**: The application is responsive and works well on both desktop and mobile devices.
- **Cryptocurrency Icons**: Displays the cryptocurrency's logo next to its name for easy identification.

## Demo

![Crypto Price Alert Screenshot](./screenshot.png)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/nikeshsharma192002/Cryptocurrency-Price-Alert.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd Cryptocurrency-Price-Alert
    ```
3. **Install the dependencies**:
    ```bash
    npm install
    ```
4. **Run the application with Parcel**:
    ```bash
    npx parcel index.html
    ```
5. Open your browser and visit `http://localhost:3000`.

## Usage

1. **Select a Cryptocurrency**: Choose a cryptocurrency from the dropdown list.
2. **Set Price Alerts**: Enter the upper and lower target prices in USD.
3. **Receive Notifications**: The app will monitor the selected cryptocurrency's price and send a browser notification when the price meets or exceeds the target levels.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Axios**: For making HTTP requests to the CoinGecko API.
- **CoinGecko API**: Provides real-time cryptocurrency data.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [CoinGecko API](https://www.coingecko.com/en/api) for providing real-time cryptocurrency data.
- [React](https://reactjs.org/) for the frontend framework.

## Contact

If you have any questions or feedback, feel free to reach out via [nk.sharma192002@gmail.com](mailto:nk.sharma192002@gmail.com).
