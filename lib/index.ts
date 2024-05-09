import axios            from "axios";

import IOptions         from "@interface/iOptions";

import Environment      from "@enum/api/eEnvironment";

import EEndReason       from "@enum/game/eEndReason";
import EGameMode        from "@enum/game/eGameMode";
import ERegion          from "@enum/game/eRegion";
import EArena           from "@enum/game/eArena";

import ECosmeticRarity  from "@enum/cosmetic/eCosmeticRarity";
import ECosmeticType    from "@enum/cosmetic/eCosmeticType";

import { LobbyCreationRequest } from "@type/tLobby";

class Slapshot {
    key   : string;
    env   : string;

    axios : any;

    constructor(options: IOptions) {
        this.key = options.key;
        this.env = options.env || 'api';

        if (!options.key) {
            throw new Error('Missing API key');
        }

        // check if this.env is a valid Environment
        if (!this.env || !(this.env in Environment)) {
            throw new Error('[slapshot.ts] | Invalid environment provided, see @enum/api/eEnvironment.ts for valid environments.');
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
    // Getters - API
    /////////////////////////

    get environments(): string[] { return Object.keys(Environment); }

    /////////////////////////
    // Getters - Game
    /////////////////////////

    get regions(): string[] { return Object.keys(ERegion).filter((item) => { return isNaN(parseInt(item)); }); }

    get arenas(): string[] { return Object.keys(EArena).filter((item) => { return isNaN(parseInt(item)); }); }

    get gameModes(): string[] { return Object.keys(EGameMode).filter((item) => { return isNaN(parseInt(item)); }); }

    get endReasons(): string[] { return Object.keys(EEndReason).filter((item) => { return isNaN(parseInt(item)); }); }

    /////////////////////////
    // Getters - Cosmetics
    /////////////////////////

    get cosmeticRarities(): any { return ECosmeticRarity; }

    get cosmeticTypes(): any { return ECosmeticType; }

    /////////////////////////
    // Matchmaking
    /////////////////////////
    async getMatchmakingQueue(regions? : []): Promise<any> {
        let query = '/matchmaking';

        // validate optional "regions" query parameter
        if (regions) {

            for (let region of regions) {
                if (!ERegion[region]) {
                    throw new Error('[slapshot.ts] | Invalid region provided, see @enum/game/eRegion.ts for valid regions');
                }
            }

            query += `?regions=${regions.join(',')}`;
        }

        return await this.request('GET', query);
    }


    /////////////////////////
    // Lobby
    /////////////////////////
    async getLobby(lobbyId: string): Promise<any> {
        return await this.request('GET', `/lobbies/${lobbyId}`);
    }

    async getLobbyMatches(lobbyId: string): Promise<any> {
        return await this.request('GET', `/lobbies/${lobbyId}/matches`);
    }

    async createLobby(lobbyCreationRequest: LobbyCreationRequest): Promise<any> {
        const response = await this.request('POST', '/lobbies', lobbyCreationRequest);

        if (response === undefined) {
            return { success: false, data: '[slapshot.ts] | Lobby creation failed, did you input valid parameters?' };
        }

        return response;
    }

    async deleteLobby(lobbyId: string): Promise<any> {
        const response = await this.request('DELETE', `/lobbies/${lobbyId}`)
        return { success: response === 'OK', data: response };
    }

    /////////////////////////
    // Game
    /////////////////////////
    async getGame(gameId: string): Promise<any> {
        const response = await this.request('GET', `/games/${gameId}`);

        if (response === '') {
            return { success: false, data: '[slapshot.ts] | Game not found, did you input valid parameters?' };
        }

        return response;
    }

    /////////////////////////
    // Player
    /////////////////////////
    async getPlayerOutfit(playerId: string): Promise<any> {
        const response = await this.request('GET', `/players/${playerId}/outfit`);

        if (response === '') {
            return { success: false, data: '[slapshot.ts] | Player not found, did you input valid parameters?' };
        }

        return response;
    }

    async steamIDtoSlapshotID(steamID: string): Promise<any> {
        const response = await this.request('GET', `/players/steam/${steamID}`);

        if (response === '') {
            return { success: false, data: '[slapshot.ts] | Player not found, did you input valid parameters?' };
        }

        return response;
    }

    /////////////////////////
    // Shop
    /////////////////////////
    async getShop(): Promise<any> {
        return await this.request('GET', '/shop');
    }

}

export default Slapshot;
// Path: lib/index.ts
