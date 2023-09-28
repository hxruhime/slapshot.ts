import axios               from "axios";

import Environments        from "@/sdk/enum/environments";
import Regions             from "@enum/regions";

import MatchmakingResponse from "@type/matchmaking";

class Instance {

    key: string;
    env: string;

    axios: any;

    constructor(options: any) {
        this.key = options.key;
        this.env = options.env || Environments.api;

        if (!options.key) {
            throw new Error('Missing API key');
        }

        // optional env option must be 'staging' or 'api'
        if (this.env !== Environments.staging && this.env !== Environments.api) {
            throw new Error('Invalid environment');
        }

        this.axios = axios.create({
            baseURL: `${this.env}/api/public`,
            headers: {
                'Authorization': `Bearer ${this.key}`,
                'Content-Type': 'application/json',
            }
        });
    }

    async getMatchmakingQueue(regions: any): Promise<MatchmakingResponse> {
        let query = '/matchmaking';

        // validate optional "regions" parameter
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


}

