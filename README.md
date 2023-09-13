INSTALLATION INSTRUCTIONS
1. install patch package - npm install -g patch-package
2. ensure that patches folder is in the main dir
3. install npm packages - npm i
4. install patch - npx patch-package
5. start expo - npx expo start


Take Note:
- Any additional npm installs will require a full removal and reinstallation of node_modules and package-lock.json
- Any issues with npm packages will also require a full removal and reinstallation of node_modules and package-lock.json
    - rm -rf node_modules
    - remove package-lock.json manually
    - remove any unwanted packages from package.json
    - npm i new package / npm i
    - npx patch-package

- Patch package is to handle the issue with react-native-snap-carousel - ViewPropTypes depreciated warnings
    - https://github.com/meliorence/react-native-snap-carousel/issues/992

- Env var needs to start with EXPO_PUBLIC_ for it to work on expo env

- Local development for expo requires the use of Port Mapping / local ip address 
    - https://stackoverflow.com/questions/33704130/react-native-android-fetch-failing-on-connection-to-local-api



 
