type LobbyRequest = {
    "region"           : string,
    "name"             : string,
    "password"         : string,
    "creator_name"     : string,

    "is_periods"     ? : boolean,
    "current_period" ? : number,

    "match_length"   ? : number,
    "mercy_rule"     ? : number,
    "arena"          ? : string,


    "initial_stats"  ? : null,
    "initial_score"  ? : {
        "away" : number,
        "home" : number,
    }
}

type LobbyCreationResponse = {
    "success"    : boolean
    "lobby_id"   : string,
}

type LobbyResponse = {
    "uuid"         : string,
    "region"       : string,
    "name"         : string,
    "has_password" : boolean,

    "owner"        : number,
    "owner_name"   : string,

    "player_count" : number,
    "max_players"  : number,
    "in_game"      : boolean,

    "players": {
        "away"       : any[],
        "home"       : any[],
        "spectators" : any[],
    },

    "mercy_rule"      : number,
    "arena"           :  string,

    "periods_enabled" : boolean,
    "current_period"  : number,

    "score": {
        "away" : number,
        "home" : number,
    },

    "starting"  : boolean,
    "can_start" : boolean,
}

type LobbyMatchResponse = {
    "id"         : string,
    "region"     : string,
    "match_type" : string,
    "gamemode"   : string,
    "created"    : string,

    "game_stats": {
        "type"  : string,
        "arena" : string,

        "score": {
            "away" : number,
            "home" : number,
        },

        "winner": string,

        "players": [
            {
                "team": string,

                "stats": {
                    "wins"                : number,
                    "goals"               : number,
                    "score"               : number,
                    "shots"               : number,
                    "shutouts"            : number,
                    "faceoffs_won"        : number,
                    "games_played"        : number,
                    "contributed_goals"   : number,
                    "possession_time_sec" : number,
                },

                "username"     : string,
                "game_user_id" : string,
            }
        ],

        "current_period"    : string,
        "periods_enabled"   : string,

        "custom_mercy_rule" : string,
    }
}

export {
    LobbyRequest,
    LobbyCreationResponse,

    LobbyResponse,
    LobbyMatchResponse,
}
// Path: lib\sdk\type\lobby.ts
