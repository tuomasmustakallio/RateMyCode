# RateMyCode

Hello this is a web application for posting code snippets for others to rate and vote on it.

You can try the app yourself by copying this repository in a folder of your choosing with the command:

`git clone https://github.com/tuomasmustakallio/RateMyCode.git`

After that you should install the needed dependencies for the client and server side with commands:

`npm run preinstall`
`npm run install`

When the depencies have loaded you can selected either to run the server on production or development mode and the client side with the following commands:

`npm run dev:server | npm run server`
`npm run client`

These commands will start the server side in port 5000 and the client side on port 3000.

Note that the server side uses mongodb for storing user data and code snippets so you have to have it installed and runnning.
For more detailed information please read the `documentation.docx`-file
