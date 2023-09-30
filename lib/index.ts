import axios               from "axios";

import Regions             from "@enum/regions";

import MatchmakingResponse from "@type/matchmaking";

import GameResponse        from "@type/game";

import {
    LobbyCreationResponse,
    LobbyDeleteResponse,
    LobbyMatchResponse,
    LobbyResponse,
    LobbyRequest,

}                          from "@type/lobby";

class Slapshot {
    key   : string;
    env   : string;

    axios : any;

    constructor(options: Options) {
        this.key = options.key;
        this.env = options.env || 'api';

        if (!options.key) {
            throw new Error('Missing API key');
        }

        // optional env option must be 'staging' or 'api'
        if (this.env !== 'staging' && this.env !== 'api') {
            throw new Error('Invalid environment');
        }

        this.axios = axios.create({
            baseURL: `https://${this.env}.slapshot.gg/api/public`,
            headers: {
                'Authorization': `Bearer ${this.key}`,
                'Content-Type': 'application/json',
            }
        });
    }

    /////////////////////////
    // Matchmaking
    /////////////////////////
    async getMatchmakingQueue(regions: any): Promise<MatchmakingResponse> {
        let query = '/matchmaking';

        // validate optional "regions" query parameter
        if (regions) {

            if (!Array.isArray(regions)) {
                throw new Error('Regions must be an array');
            }

            for (let region of regions) {
                if (!Regions[region]) {
                    throw new Error('Invalid region');
                }
            }

            query += `?regions=${regions.join(',')}`;
        }

        const response = await this.axios.get(query);
        return response.data;
    }


    /////////////////////////
    // Lobby
    /////////////////////////
    async getLobby(lobbyId: string): Promise<LobbyResponse> {
        const response = await this.axios.get(`/lobbies/${lobbyId}`);
        return response.data;
    }

    async getLobbyMatches(lobbyId: string): Promise<LobbyMatchResponse[]> {
        const response = await this.axios.get(`/lobbies/${lobbyId}/matches`);
        return response.data;
    }

    async createLobby(lobbyRequest: LobbyRequest): Promise<LobbyCreationResponse> {
        const response = await this.axios.post('/lobbies', lobbyRequest);
        return response.data;
    }

    async deleteLobby(lobbyId: string): Promise<LobbyDeleteResponse> {
        let response;

        try {
            response = await this.axios.delete(`/lobbies/${lobbyId}`);
        } catch (error: any) {
            return { success: error.response.status === 200 };
        }

        return { success: true };
    }

    /////////////////////////
    // Game
    /////////////////////////
    async getGame(gameId: string): Promise<GameResponse> {
        const response = await this.axios.get(`/games/${gameId}`);
        return response.data;
    }

}

export default Slapshot;
// Path: lib\index.ts
