# Cool signer

Universal app for transaction signing

## Developers

### Install

Clone the repo and cd to angular directory. Then install node modules

`npm install`

### Build

To build the app run

`ng build --prod`

App will be placed to /cordova/www directory

### Run the app

#### Run in angular

To get live dev server cd to /angular and run

`ng serve -o`

Alternatively after app is build open the /cordova/www/index.html in browser. This will run the app via file:// protocol

#### Run in cordova

after angular is built run

`cordova run`