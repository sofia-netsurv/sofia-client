# Sofia Client 
[![Build Status](https://img.shields.io/azure-devops/build/ewoodrich/e5356f4d-e3de-4404-a508-1dade5f0cb6a/2.svg)](https://ewoodrich.visualstudio.com/python-netsurv/_build?definitionId=2)

Copyright (c) 2019 Ebraheem AlAthari and Eliot Woodrich

Sofia is an Electron-based client for viewing and configuring IP network cameras based on the "Sofia" protocol used by the "NetSurveillance" ActiveX plugin. Sofia supports altering the quality, profiles and other camera features as well as network and other configuration options. 

Sofia Client uses the [python-netsurv library](https://github.com/ekwoodrich/python-netsurv) to communicate with compatible IP cameras.

## Build
Clone and install the sofia-client repo:

    git clone https://github.com/ekwoodrich/sofia-client.git

To install the dependencies:

    yarn
    
To run the program

    yarn start
    
Sofia Client is based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate), and more information about its dependencies and install procedure can be found on the README.

## License
This program is licensed under the "MIT License".  Please
see the file `LICENSE` in the source distribution of this
software for license terms.
