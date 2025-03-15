---
lang: en
page_id: camera-app
permalink: /posts/camera-app
title: React Camera App
date: 2023-08-02
categories: [Linux, React, JavaScript]
tags: [React, JavaScript, Linux, Netlify]
author: Angel
description: Creating a camera app for Linux! First photo :) 👇
image: /assets/img/camapp.png
---



# How I Built an Online Camera App on Linux

## Background
After building my own computer and installing Linux, I faced a challenge: finding a reliable application to test my camera and microphone input. Most available options lacked the simplicity and flexibility I needed. So, I decided to create my own camera app.


🚀 **[Live Demo Deployed on Netlify](https://videolinux.netlify.app/)**

Code found here: [https://github.com/AngelLozan/cameraapp](https://github.com/AngelLozan/cameraapp)

---

## Development & Setup
This project is a React-based application that leverages `getUserMedia()` to access the camera. It includes video recording functionality and can be modified to support photos.

### Running the Project

Ensure you have [Node.js](https://nodejs.org/) installed. Then, clone the repository and navigate to the project directory:

```sh
git clone https://github.com/AngelLozan/cameraApp.git
cd cameraApp
npm install
```

### Available Scripts

#### `npm start`
Runs the app in development mode. Open [https://localhost:3000](https://localhost:3000) in your browser.

**Important:** To use the camera on `localhost`, enable insecure local connections by adjusting browser flags:
- Open Chrome/Brave settings: `chrome://flags/#allow-insecure-localhost`
- Enable the flag and restart the browser.

#### `npm test`
Runs tests in interactive watch mode. See the [Create React App documentation](https://facebook.github.io/create-react-app/docs/running-tests) for more details.

#### `npm run build`
Builds the app for production, minifies files, and optimizes performance. The final build is located in the `build` folder and is ready for deployment.

#### `npm run eject`
Removes Create React App’s default configurations, allowing full customization. **Warning:** This action is irreversible.

---

## Configuration & Camera Setup on Linux

### Check Supported Video Resolutions
To determine supported video resolutions, run the following command:
```sh
lsusb -s 001:002 -v | egrep "Width|Height"
```
This will list available camera resolutions.

### Enable HTTPS for `getUserMedia()`
Modern browsers require HTTPS to access the camera. To enable local HTTPS:
- **Use a self-signed certificate:** Follow [this guide](https://web.dev/how-to-use-local-https/) to generate a certificate using `mkcert`.
- **Enable flags in Brave/Chrome:** Follow [this guide](https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate).

### Modifying for Photo Capture
The app is currently configured for video recording, but the code for capturing photos exists. To enable photo mode:
1. Render two buttons (one for video and one for photos).
2. Modify the `deletePhoto` method to handle images separately.

---

## Conclusion
This project was born out of necessity when I couldn't find a reliable camera testing app on Linux. It’s lightweight, flexible, and can be expanded with additional features like photo capture, filters, or real-time streaming. If you're looking for a simple way to test your camera and microphone on Linux, feel free to fork and modify the project!

