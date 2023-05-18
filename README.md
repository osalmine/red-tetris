# red-tetris
> Nous vous proposons de construire et l’envol de quelques pélicans sur vos terrains de jeu parmi une forêt de tetriminos

Multiplayer online Tetris

## To run:

Ensure you use the correct node version by running
```
nvm install && nvm use
```
or install the node version if it is not installed

Install the packages by running
```
npm install
```

### For dev

Run 
```
npm run client:build:dev
```
and
```
npm run start:dev
```

Instead of the first step you may also run `npm run watch` inside the client directory so that the code changes are visible on page reload instead of having to rebuild.

### For production

Build with
```
npm run build
```

And start the application with
```
npm start
```

Go to `http://localhost:3004/` and follow the instructions in the header to join a room.

Example: `http://localhost:3004/#42[onni]` where we are joining room 42 as player "onni"

To simulate a game against multiple people, open a second tab and join the same room with a different name

Run **tests** with
```
npm test
```

## How it works

The client and server use **Socket.io** to communicate to enable real-time multiplayer experience. It allows for multiple games (or [rooms](https://socket.io/docs/v4/rooms/) in Socket.io terms) to be played simultaneously and for multiple players to be in one room and see each other's boards in real-time.

#### Server
The server was required to be implemented in Node.js and to use object-oriented architecture. More details in the subject.

#### Client
The client is written in Typescript React. It was mandatory to use Redux for state management.

A big problem that I had to figure out in the beginning was how to combine Redux and Socket.io since I had no experience in either of them. I figured out that the Socket.io communication should be done in the [Redux middleware](https://github.com/osalmine/red-tetris/blob/master/client/src/middleware/socketMiddleWare.ts) so that the incoming events can trigger actions and that the outbound emits can be triggered by actions.

#### Tests

The subject requires to have at least **70%** coverage of statements, functions and lines and **50%** coverage of branches. I wrote both server and client tests with Jest (and added React Testing Library for client) and measured the coverage also with Jest.

## What I would do differently

Since I had no experience or idea of how Redux works and should be implemented, I made some questionable choices with it in the beginning.

One big thing I would do differently is that the store should not be accessed directly in the action. I have `getCurrentPlayerBoard` to get the board in the action instead of providing it for the action in the params. This works but is against the best practises and makes testing very difficult if not impossible. 

### Out of project scope

Some things I would do differently for a real-world application but were out of scope for this project that is only meant to teach Socket.io and Redux:
- Accessibility. The accessibility of the game is very very poor.
- Responsiveness. The UI is designed only for desktop size and breaks on smaller than ipad size.
- Webpack optimization.
