# Sofia Client
[![Build Status](https://dev.azure.com/ewoodrich/sofia/_apis/build/status/sofia-netsurv.sofia-client?branchName=master)](https://dev.azure.com/ewoodrich/sofia/_build/latest?definitionId=3&branchName=master)

**Sofia Client is still in WIP mode not yet ready for release**

Copyright (c) 2019 Ebraheem AlAthari and Eliot Woodrich

Sofia is an Electron-based client for viewing and configuring IP network cameras based on the "Sofia" protocol used by the "NetSurveillance" ActiveX plugin. Sofia supports altering the quality, profiles and other camera features as well as network and other configuration options. 

Sofia Client uses the [python-netsurv library](https://github.com/sofia-netsurv/python-netsurv) to communicate with compatible IP cameras.

## Build
Clone and install the sofia-client repo:

    git clone https://github.com/sofia-netsurv/sofia-client

To install the dependencies:

    yarn
    
ffmpeg is required for viewing the stream, to install on Debian based distros

    sudo apt install ffmpeg
    
python netsurv is required for altering the config of the camera, to install it on any distributions

    pip install netsurv
    
To run the program

    yarn start
    
Sofia Client is based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate), and more information about its dependencies and install procedure can be found on the README.

## License
This program is licensed under the "MIT License".  Please
see the file `LICENSE` in the source distribution of this
software for license terms.
