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
  const game = await slapshot.getGame('game id') as GameResponse;
  console.log(game);
};

main();
```

## Instance Options
```ts
interface Options {
  key   : string; // api key
  env ? : string; // api environment
}
// env is 'api' by default, may be set to 'staging'
```

# Methods
#### Types may be found in `lib/sdk/type/` aliased as `@type/`

### Matchmaking
```ts
// get current matchmaking queue | regions ex: ['na-west', 'na-east'] || []
await getMatchmakingQueue(regions: string[]): Promise<MatchmakingResponse>;
```

### Game
```ts
// get game by id
await getGame(gameId: string): Promise<GameResponse | WrapperResponse>;
```

### Lobby
```ts
// get lobby by id
await getLobby(lobbyId: string): Promise<LobbyResponse>;

// get array of matches within a lobby
await getLobbyMatches(lobbyId: string): Promise<LobbyMatchResponse[]>;

// create a lobby
await createLobby(lobbyRequest: LobbyRequest): Promise<LobbyCreationResponse | WrapperResponse>;

// delete a lobby
await deleteLobby(lobbyId: string): Promise<WrapperResponse>;
```


