# WA-FX-BOT

A WhatsApp currency conversion bot built with TypeScript and Express. Send a message like `100 USD to NGN` and get a live exchange rate back instantly.

## How It Works

1. User sends a message to the bot's WhatsApp number
2. The WhatsApp Business API forwards the message to the server via webhook
3. The server parses the message, fetches a live exchange rate, and replies

## Example

```
User:  100 USD to NGN
Bot:   100 USD = ₦158,432.50 (rate: 1584.325)

User:  500 pounds to euros
Bot:   500 GBP = €589.25 (rate: 1.1785)
```

## Tech Stack

- TypeScript
- Node.js + Express
- WhatsApp Business API (Meta)
- ExchangeRate-API
- ngrok (local development tunneling)

## Getting Started

### Prerequisites

- Node.js 18+
- A Meta Developer account with a WhatsApp Business app
- An ExchangeRate-API key (free tier at exchangerate-api.com)
- ngrok (for local development)

### Installation

```bash
git clone https://github.com/yourusername/wa-fx-bot.git
cd wa-fx-bot
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
PHONE_NUMBER_ID=your_meta_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_whatsapp_business_account_id
ACCESS_TOKEN=your_meta_system_user_access_token
WHATSAPP_VERIFY_TOKEN=your_chosen_verify_token
EXCHANGE_RATE_API_KEY=your_exchangerate_api_key
MY_PHONE_NUMBER=your_whatsapp_number_with_country_code
```

### Running Locally

Start the server:

```bash
npm run dev
```

Expose it publicly with ngrok:

```bash
ngrok http 3000
```

Copy the ngrok forwarding URL and set it as your webhook callback URL in the Meta developer dashboard:

```
https://your-ngrok-url.ngrok-free.app/server/server
```

## Supported Message Formats

The bot understands both currency codes and natural language:

| Input                  | Parsed As      |
| ---------------------- | -------------- |
| `100 usd to ngn`       | 100 USD to NGN |
| `100 dollars to naira` | 100 USD to NGN |
| `500 pounds to euros`  | 500 GBP to EUR |
| `250 gbp to usd`       | 250 GBP to USD |

## Webhook Flow

## Limitations

- Currently in development mode, only allowlisted numbers can receive messages
- ngrok URL changes on every restart, requiring a webhook URL update in the Meta dashboard
- Free ExchangeRate-API tier allows 1,500 requests per month

## Roadmap

- Deploy to Railway or Render for a permanent URL
- Complete Meta app review to go live for all users
- Add support for more currencies and aliases
- Add rate caching to reduce API calls

## Author

Ifesinachi Paschal Obiora
[Kogniti](https://kogniti.co.uk)
