import Slapshot from "@/index";

const options: Options = {
    key: 'YOUR_API_KEY',
    env: 'api',
}

const slapshot: Slapshot = new Slapshot(options);

const main = async () => {
    const game = await slapshot.getGame('game id');
    console.log(game);
};

main();