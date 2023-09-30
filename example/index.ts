import * as dotenv from 'dotenv';
dotenv.config();

import Slapshot from "../lib";

const options: Options = {
    key: process.env.SLAPSHOT_API_KEY as string,
    env: 'staging',
}

const slapshot = new Slapshot(options);

async function main() : Promise<void> {
    const matchmaking = await slapshot.getMatchmakingQueue([]);
    console.log(matchmaking);
}

main();