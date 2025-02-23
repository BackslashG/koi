
# Koi

Koi is an application which allows you to make your [Cider](https://cider.sh/) status public. 

## Requirements

- [Node.js](https://nodejs.org/)
- The Koi Cloudflare Worker
## Installation

```sh
git clone https://github.com/BackslashG/koi.git
cd koi
npm i
```

## Configuration

Koi is configured via `config.json`. The configuration file includes:

- **requireToken**: Enables the use of a Cider authentication token.
- **token**: The token to be used if above option is enabled.
- **KoiBase**: The base URL of the remote backend where status updates are sent.
- **KoiToken**: The authorization token for the backend service.

An example config.json:

```json
{
    "requireToken": true,
    "token": "thisisnotarealtoken",
    "KoiBase": "https://koi.backslashg.xyz/",
    "KoiToken": "asdfasdfasdfasdfasdfasdf"
}
```
## Running

Start the application with:

```sh
node index.js
```

## Project Structure

```
.
├── config.json
├── endpoints.js           // API methods for checking Cider status
├── index.js               // Main application entry point
├── package.json
└── systray.js             // System tray configuration and actions
```

