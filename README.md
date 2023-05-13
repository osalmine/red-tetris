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

Example: `http://localhost:3004/#42[onni]`
