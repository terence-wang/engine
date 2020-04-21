<div align="center">

<img width="200" src="https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/platform/images/logo/playcanvas-logo-medium.png"/>

# PlayCanvas WebGL Game Engine

PlayCanvas is an open-source game engine. It uses HTML5 and WebGL to run games and other interactive 3D content in any mobile or desktop browser.

[![CircleCI](https://circleci.com/gh/circleci/circleci-docs.svg?style=svg)](https://circleci.com/gh/circleci/circleci-docs)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/playcanvas/engine)
![npm](https://img.shields.io/npm/v/playcanvas)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/playcanvas/engine)

![GitHub issues](https://img.shields.io/github/issues/playcanvas/engine)
![node-current](https://img.shields.io/node/v/playcanvas)
![Twitter Follow](https://img.shields.io/twitter/follow/playcanvas?style=social)


## Project Showcase
Many games and apps have been published using the PlayCanvas engine. Here is a small selection:

[![Seemore](https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/14705/319531/O4J4VU-image-25.jpg)](https://playcanv.as/p/MflWvdTW/) [![After The Flood](https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/14928/440410/98554E-image-25.jpg)](https://playcanv.as/p/44MRmJRU/) [![Casino](https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/14928/349824/U88HJQ-image-25.jpg)](https://playcanv.as/p/LpmXGUe6/)  
[![Swooop](https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/4763/TKYXB8-image-25.jpg)](https://playcanv.as/p/JtL2iqIH/) [![Master Archer](https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/415995/10A5A9-image-25.jpg)](https://apps.facebook.com/1315812941823883/) [![Flappy Bird](https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/8/375389/23PRTL-image-25.jpg)](https://playcanv.as/p/2OlkUaxF/)  
[![Car](https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/347824/7ULQ3Y-image-25.jpg)](https://playcanv.as/p/RqJJ9oU9/) [![Star-Lord](https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/12/333626/BGQN9H-image-25.jpg)](https://playcanv.as/p/SA7hVBLt/) [![Global Illumination](http://s3-eu-west-1.amazonaws.com/images.playcanvas.com/projects/4373/625081/6AB32D-image-25.jpg)](https://playcanv.as/p/ZV4PW6wr/ )  


###  You can see more games on the [PlayCanvas website](https://playcanvas.com/explore).

</div>

# 👨‍💻 Users

PlayCanvas is used by leading companies in video games, advertising and visualization such as:  
**Animech, ARM, Disney, Facebook, IGT, King, Miniclip, Leapfrog, Mozilla, Nickelodeon, Nordeus, PikPok, PlaySide Studios, Polaris, Samsung, Spry Fox, Zeptolab, Zynga**

<img src="https://assets.website-files.com/58e247041eb2474a46dcf179/5d0b23a651a0cee160d4a59c_small-logo-withtext.svg" height="50"/>

<img src="https://www.arm.com/-/media/global/logos/Arm-logo-black-pms432.svg?h=92&w=300&hash=BE156D441AF03AF80DCA836D4FF8B2B7A58A9023&hash=BE156D441AF03AF80DCA836D4FF8B2B7A58A9023&la=en&revision=dfb81f02-b74e-45f6-8523-6d2037b838f1" height="50"/>
<img src="https://i.pinimg.com/originals/54/dc/48/54dc48e0667516d7cd33d400ef9d8e20.png" height="50"/>
<img src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512" height="50"/>
<img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Zynga_logo.jpg/250px-Zynga_logo.jpg" height="50"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Miniclip.svg/1280px-Miniclip.svg.png" height="50"/>
<img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/LeapFrog_Enterprises.svg/1200px-LeapFrog_Enterprises.svg.png" height="50"/>
<img src="https://3u26hb1g25wn1xwo8g186fnd-wpengine.netdna-ssl.com/files/2019/06/mozilla-logo-bw-rgb-1024x293.png" height="50"/>
<img src="https://www.freepnglogos.com/uploads/nickelodeon-schweiz-logo-png-14.png" height="50"/>
<img src="https://nordeus.com/wp-content/uploads/2017/09/nordeus-positive-logo-2-rgb.png" height="50"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/PikPok_logo.svg/1200px-PikPok_logo.svg.png" height="50"/>
<img src="https://motorcycle-logos.com/wp-content/uploads/2017/05/Polaris-Logo-768x531.png" height="50"/>
<img src="https://openconnectivity.org/wp-content/uploads/2015/09/samsung-logo-4.png" height="50"/>
<img src="https://upload.wikimedia.org/wikipedia/en/5/51/Logo_of_Spry_Fox_Video_Game_Company.png" height="50"/>
<img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/18/ZeptoLab.svg/1200px-ZeptoLab.svg.png" height="50"/>

# 🚀 Getting Started

### Here's a super-simple Hello World example - a spinning cube!

<img src="https://i.imgur.com/U0TCvdr.gif"/>

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>PlayCanvas Hello Cube</title>
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no' />
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
    <script src='https://code.playcanvas.com/playcanvas-stable.min.js'></script>
</head>
<body>
    <canvas id='application'></canvas>
    <script>
        // create a PlayCanvas application
        var canvas = document.getElementById('application');
        var app = new pc.Application(canvas, { });
        app.start();

        // fill the available space at full resolution
        app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
        app.setCanvasResolution(pc.RESOLUTION_AUTO);

        // ensure canvas is resized when window changes size
        window.addEventListener('resize', function() {
            app.resizeCanvas();
        });

        // create box entity
        var cube = new pc.Entity('cube');
        cube.addComponent('model', {
            type: 'box'
        });

        // create camera entity
        var camera = new pc.Entity('camera');
        camera.addComponent('camera', {
            clearColor: new pc.Color(0.1, 0.1, 0.1)
        });

        // create directional light entity
        var light = new pc.Entity('light');
        light.addComponent('light');

        // add to hierarchy
        app.root.addChild(cube);
        app.root.addChild(camera);
        app.root.addChild(light);

        // set up initial positions and orientations
        camera.setPosition(0, 0, 3);
        light.setEulerAngles(45, 0, 0);

        // register a global update event
        app.on('update', function (deltaTime) {
            cube.rotate(10 * deltaTime, 20 * deltaTime, 30 * deltaTime);
        });
    </script>
</body>
</html>
```

## Want to play with the code yourself? Edit it on [CodePen](https://codepen.io/playcanvas/pen/NPbxMj).

# 💫 Features

PlayCanvas is a fully featured game engine.

### 👾 Graphics

* WebGL 2.0 based renderer (with fallback to WebGL 1.0)
* Physically based rendering (PBR)
* Directional, point and spot lights
* Shadow mapping (PCF and VSM implementations)
* Runtime lightmap baking
* Static, skinned and morphed meshes
* GPU Particle engine with editor
* PostFX library: bloom, edge detect, FXAA, vignette, etc
* Seamless default material support from Maya, 3DS Max, Blender, etc.
* Full model export pipeline from Maya, 3DS Max, Blender, etc via [Assets User Manual](https://developer.playcanvas.com/en/user-manual/assets/)

### 🎯 Collision & Physics
* Full integration with 3D rigid-body physics engine [ammo.js](https://github.com/kripken/ammo.js)

### 🔊 Audio
* 3D Positional audio via Web Audio API

### 📦 Resource Loading
* Simple and powerful resource loading
* Streaming of individual assets
* Asset Variants - loads compressed textures (DXT, PVR, ETC1, ETC2) based on platform support

### 🧑‍🍳 Entity / Component System
* Built-in components: model, sound, animation, camera, collision, light, rigidbody, script, particlesystem

### 📟 Scripting system
* Write game behaviors by attaching JavaScript to game entities
* Live code hot-swap enables rapid iteration

### 🎮 Input
* Mouse, Keyboard, Touch, Gamepad, VR

# How to build

Ensure you have [Node.js](https://nodejs.org) installed. Then, install all of the required Node.js dependencies:

    npm install

To execute a build of the engine to build/playcanvas-latest.js, do:

    npm run build

Pre-built versions of the engine are also available.

Latest development release:

* https://code.playcanvas.com/playcanvas-latest.js
* https://code.playcanvas.com/playcanvas-latest.min.js

Latest stable release:

* https://code.playcanvas.com/playcanvas-stable.js
* https://code.playcanvas.com/playcanvas-stable.min.js

Specific engine versions:

* https://code.playcanvas.com/playcanvas-0.181.11.js
* https://code.playcanvas.com/playcanvas-0.181.11.min.js

### How to get models?

To convert any models created using a 3D modelling package see [this page](https://developer.playcanvas.com/en/engine/) in the developer documentation.

# 🧪 How to run tests

PlayCanvas makes use of Karma for running unit tests, and provides three test ways of executing them depending on what phase of development you're in:

    # Runs the tests once over the unbuilt source files - useful if you just want a quick 'all-clear'
    npm run test

    # Watches all source and test files for changes, and automatically re-runs the tests when they change.
    # Open http://localhost:9876/debug.html in your browser to debug the tests in real time.
    #
    # You can also edit the `tests/**/test_*.js` glob in tests/karma.conf.js to run a subset of the tests,
    # during development.
    npm run test:watch

    # Runs the tests once over playcanvas.js - mainly used by CI, but sometimes useful if you want to
    # test the engine after building it. Make sure to do `npm run build` first to make sure you have
    # an up-to-date build.
    npm run test:release

# 📚 Documentation

Full documentation available on the [PlayCanvas Developer](https://developer.playcanvas.com) site including [API reference](https://developer.playcanvas.com/en/api/). To build a local copy of the API reference manual to the docs folder, do:

    npm run docs

# 💡 Tutorials & Examples

See all the [tutorials](https://developer.playcanvas.com/tutorials/) here.

# <img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" height="24"/> TypeScript Bindings

You can develop TypeScript applications against the PlayCanvas engine. To generate a TypeScript definitions file for the entire API, do:

    npm run tsd

This will output to build/output/playcanvas.d.ts

# 💁 Getting Help

[**Forums**](https://forum.playcanvas.com) - Use the forum to ask/answer questions about PlayCanvas.

# 🤲 Contributing

Want to help us make the best 3D engine on the web? Great!
Check out [CONTRIBUTING.md](https://github.com/playcanvas/engine/blob/master/.github/CONTRIBUTING.md) that will get you started.
And look for ["good first PR"](https://github.com/playcanvas/engine/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+PR%22)  label in Issues.

### Github Issues

Please use [Github Issues](https://github.com/playcanvas/engine/issues) to report bugs or request features.

### Reporting bugs

Please follow these steps to report a bug

1. **Search for related issues** - search the existing issues so that you don't create duplicates

2. **Create a testcase** - Please create the smallest isolated testcase that you can that reproduces your bug

3. **Share as much information as possible** - everything little helps, OS, browser version, all that stuff.

# <img src="https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/platform/images/logo/playcanvas-logo-medium.png" height="24"/> PlayCanvas Platform


The PlayCanvas Engine is an open source engine which you can use to create games and 3D visualisation in the browser. In addition to the engine we also make the [PlayCanvas development platform](https://playcanvas.com/) which features an Visual Editor, asset management, code editing, hosting and publishing services.

# 🖋️ License

The PlayCanvas Engine is released under the [MIT](https://opensource.org/licenses/MIT) license. See LICENSE file.
