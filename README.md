# slapshot.ts
Unofficial [Slapshot Rebound public API](https://oddshot.notion.site/Slapshot-Public-API-7df0c5c0e67246aa941d9c7143e458db) wrapper written in TypeScript using [axios](https://axios-http.com).

## Installation
```bash
npm install slapshot.ts
```

## Example Usage
```ts
import Slapshot from 'slapshot.ts';

const slapshot = new Slapshot({ key: 'your api key' });

async function main() : Promise<void> {
  const game = await slapshot.getGame('game id');
  console.log(game);
};

main();
```

# Interfaces
#### Interfaces may be found in `lib/sdk/interface/` aliased as `@interface/`

### API Options
```ts
interface Options {
  key   : string; // api key
  env ? : string; // api environment
}
// env is 'api' by default, may be set to 'staging'
```

# Enums
#### Enums may be found in `lib/sdk/enum/` aliased as `@enum/`

### API

```ts
// get api environments
Slapshot.environments;
```

### Game
```ts
// get game modes
Slapshot.gameModes;

// get matchmaking regions
Slapshot.regions;

// get arenas
Slapshot.arenas;

// get game end reasons
Slapshot.endReasons;
```

### Cosmetics
```ts
// get cosmetics types
Slapshot.cosmeticTypes;

// get cosmetics rarities
Slapshot.cosmeticRarities;
```

# Methods
#### Types for each response may be found in `lib/sdk/type/` aliased as `@type/`

### Matchmaking
```ts
// get current matchmaking queue | regions ex: ['na-west', 'na-east'] || []
await getMatchmakingQueue(regions ? : string[]): Promise<any>;
```

### Game
```ts
// get game by id
await getGame(gameId: string): Promise<any>;
```

### Lobby
```ts
// get lobby by id
await getLobby(lobbyId: string): Promise<any>;

// get array of matches within a lobby
await getLobbyMatches(lobbyId: string): Promise<any>;

// create a lobby
await createLobby(lobbyCreationRequest: LobbyCreationRequest): Promise<any>;

// delete a lobby
await deleteLobby(lobbyId: string): Promise<any>;
```

### Player
```ts
// get a players outfit
await getPlayerOutfit(playerId: string): Promise<any>;
```

### Shop / Cosmetics
```ts
// get shop (array of currently for sale cosmetics)
await getShop(): Promise<any>;
```

