type GameResponse = {

    "id":         string,
    "region":     string,
    "match_type": string,
    "gamemode":   string,
    "created":    string,

    "game_stats" : {

        "type"  : string,
        "arena" : string,

        "score" : {
            "away" : number,
            "home" : number,
        },

        "winner": string,

        "players": [
         {
               "team"  : string
              "stats" : {
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
              "username"     : string
              "game_user_id" : string
         }
     ],

        "current_period"    : string,
        "periods_enabled"   : string,
        "custom_mercy_rule" : string,

    }

}

export default GameResponse;
// Path: lib\sdk\type\game.ts
