import axios from "axios";

import Regions from "@enum/regions";

import MatchmakingResponse from "@type/matchmaking";

import GameResponse from "@type/game";

import {
    LobbyCreationResponse,
    LobbyMatchResponse,
    LobbyRequest,
    LobbyResponse,
} from "@type/lobby";

type WrapperResponse = {
    "success" ? : boolean,
    "data"    ? : string,
}

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
            throw new Error('[slapshot.ts] | Invalid environment, may be "staging" or "api"');
        }

        this.axios = axios.create({
            baseURL: `https://${this.env}.slapshot.gg/api/public`,
            headers: {
                'Authorization': `Bearer ${this.key}`,
                'Content-Type': 'application/json',
            }
        });
    }

    async request(method: string, url: string, data?: any): Promise<any> {
        try {
            const response = await this.axios.request({
                method,
                url,
                data,
            });

            return response.data;
        } catch (error: any) {

            switch (error.response.status) {
                case 403:
                    return { data: '[slapshot.ts] | Unauthorized access, check your options / request parameters?' };
                case 404:
                    return { data: '[slapshot.ts] | Not found, check your options / request parameters?' };
            }

        }
    }

    /////////////////////////
    // Matchmaking
    /////////////////////////
    async getMatchmakingQueue(regions: any): Promise<MatchmakingResponse> {
        let query = '/matchmaking';

        // validate optional "regions" query parameter
        if (regions) {

            if (!Array.isArray(regions)) {
                throw new Error('[slapshot.ts] | Regions must be an array, pass [] for no filter');
            }

            for (let region of regions) {
                if (!Regions[region]) {
                    throw new Error('[slapshot.ts] | Invalid region provided, see @enum/regions.ts for valid regions');
                }
            }

            query += `?regions=${regions.join(',')}`;
        }

        return await this.request('GET', query);
    }


    /////////////////////////
    // Lobby
    /////////////////////////
    async getLobby(lobbyId: string): Promise<LobbyResponse> {
        return await this.request('GET', `/lobbies/${lobbyId}`);
    }

    async getLobbyMatches(lobbyId: string): Promise<LobbyMatchResponse[]> {
        return await this.request('GET', `/lobbies/${lobbyId}/matches`);
    }

    async createLobby(lobbyRequest: LobbyRequest): Promise<LobbyCreationResponse | WrapperResponse> {
        const response = await this.request('POST', '/lobbies', lobbyRequest);

        if (response === undefined) {
            return { success: false, data: '[slapshot.ts] | Lobby creation failed, did you input valid parameters?' };
        }

        return response;
    }

    async deleteLobby(lobbyId: string): Promise<WrapperResponse> {
        const response = await this.request('DELETE', `/lobbies/${lobbyId}`)
        return { success: response === 'OK', data: response };
    }

    /////////////////////////
    // Game
    /////////////////////////
    async getGame(gameId: string): Promise<GameResponse | WrapperResponse> {
        const response = await this.request('GET', `/games/${gameId}`);

        if (response === '') {
            return { success: false, data: '[slapshot.ts] | Game not found, did you input valid parameters?' };
        }

        return response;
    }

}

export default Slapshot;
// Path: lib\index.ts
