import * as dotenv               from 'dotenv';
dotenv.config();

import Slapshot                  from "../lib";

import { LobbyCreationResponse } from "@type/lobby";

const options: Options = {
    key: process.env.SLAPSHOT_API_KEY as string,
    env: 'staging',
}

const slapshot = new Slapshot(options);

async function main() : Promise<void> {

    /////////////////////////
    // Matchmaking
    /////////////////////////

    // get matchmaking queue
    const matchmaking = await slapshot.getMatchmakingQueue([]);
    console.log(matchmaking);


    /////////////////////////
    // Lobby
    /////////////////////////

    // create lobby
    const lobby = await slapshot.createLobby({
        creator_name: "lobby", name: "lobby", password: "lobby", region: 'na-west',
    }) as LobbyCreationResponse;
    console.log(lobby);


    // get lobby by id
    const lobby2 = await slapshot.getLobby(lobby.lobby_id);
    console.log(lobby2);

    // delete lobby
    const lobbyDelete = await slapshot.deleteLobby(lobby.lobby_id);
    console.log(lobbyDelete);

    // get lobby again, appears the same but the data is deleted after an hour
    const lobby3 = await slapshot.getLobby(lobby.lobby_id);
    console.log(lobby3);


    /////////////////////////
    // Game
    /////////////////////////

    // get game by id
    const game = await slapshot.getGame('5f9b3b3e-0e1a-4b1a-8b0a-0b9b5b0b0b0b');
    console.log(game);

}

main();