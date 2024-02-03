type TMatchmaking = {
    "entities": [
        {
            "players": [
                {
                    "uuid"     : number,
                    "username" : string,
                }
            ],
            "regions": [
                {
                    "key"  : string,
                    "name" : string,
                }
            ],
            "mmr"        : number,
            "mmr_offset" : number,
        }
    ],
    "playlists": {
        "in_queue" : number,
        "in_match" : number,
    }
}

export default TMatchmaking;
// Path: lib\sdk\type\matchmaking.ts
