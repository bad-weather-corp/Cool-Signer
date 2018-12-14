# Cool signer

Universal app for transaction signing

## Developers

As a prerequisity make sure you have ngilar CLI and cordova installed. Run following as admin

```
npm install -g @angular/cli cordova
```

### Install

Clone the repo and cd to angular directory. Then install node modules

`npm install`

Now cd to the /cordova directory and run

`cordova prepare`

### Build

#### Build angular app

To build the app run

`ng build --prod`

App will be placed to /cordova/www directory

#### Build cordova app

Install Java8JDK, Android Studio and in android Studio install Android SDK for version 27. Make sure you have JAVA_HOME and ANDROID_HOME defined. Gradle and android command need to be on the path. Reccomended

```
export JAVA_HOME=/home/fiddis/tono/jdk1.8.0_191
export ANDROID_HOME=/home/fiddis/tono/android/sdk
export PATH=$PATH:/home/fiddis/tono/android/android-studio/gradle/gradle-4.6/bin:/home/fiddis/tono/android/sdk/tools
```

### Run the app

#### Run in angular

To get live dev server cd to /angular and run

`ng serve -o`

Alternatively after app is build open the /cordova/www/index.html in browser. This will run the app via file:// protocol

#### Run in cordova

after angular is built run

`cordova run`