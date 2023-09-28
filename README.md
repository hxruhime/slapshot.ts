# slapshot.ts
Unofficial [Slapshot Rebound public API](https://oddshot.notion.site/Slapshot-Public-API-7df0c5c0e67246aa941d9c7143e458db) wrapper written in TypeScript using [axios](https://axios-http.com).

## Example Usage
```ts
import Slapshot from 'slapshot.ts';

const slapshot = new Slapshot({ key: 'your api key' });

const main = async () => {
  const game = await slapshot.getGame('game id');
  console.log(game);
};

main();
```

## Instance Options
```ts
interface Options {
  key  : string; // api key
  env? : string; // api environment
}
// env is 'api' by default, may be set to 'staging'
```

# Methods

### Matchmaking
```ts
// get current matchmaking queue | regions ex: ['na-west', 'na-east']
await getMatchmakingQueue(regions: string[]): Promise<MatchmakingResponse>;
```

### Game
```ts
// get game by id
await getGame(id: string): Promise<GameResponse>;
```

### Lobby
```ts
// get lobby by id
await getLobby(id: string): Promise<LobbyResponse>;

// get array of matches within a lobby
await getLobbyMatches(lobbyId: string): Promise<LobbyMatchResponse[]>;

// create a lobby
await createLobby(lobbyRequest: LobbyRequest): Promise<LobbyRequestResponse>;

// delete a lobby
await deleteLobby(lobbyId: string): Promise<void>;
```


