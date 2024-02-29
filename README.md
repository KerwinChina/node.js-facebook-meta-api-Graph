
# 🌐 node.js-facebook-meta-api-Graph

This Node.js application demonstrates the integration with Facebook's Graph API, 
allowing for the retrieval of user data in a respectful and rate-limited manner. 
It showcases best practices in handling API rate limits and environmental variables for secure access token storage.

## 🚀 Features

- Fetch user data from Facebook Graph API
- Rate limiting handling with exponential backoff
- Secure token management with `.env` files

## 🛠️ Installation

1. Clone the repository:
```
git clone https://github.com/KerwinChina/node.js-facebook-meta-api-Graph.git
```

2. Navigate to the project directory:
```
cd node.js-facebook-meta-api-Graph
```

3. Install dependencies:
```
npm install
```

4. Create a `.env` file in the root directory and add your Facebook Access Token:
```
FACEBOOK_ACCESS_TOKEN=YourAccessTokenHere
```

5. Run the application:
```
npm install -g typescript
npm install --save-dev @types/node
npx ts-node index.ts

```

## 🔧 Configuration

- **FACEBOOK_ACCESS_TOKEN**: Your Facebook Graph API access token. Obtain one through Facebook Developer Console.

## 📚 Documentation

For more information on Facebook Graph API, visit [Facebook Graph API Documentation](https://developers.facebook.com/docs/graph-api).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.






