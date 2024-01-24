type ShopItemResponse = {
    "id"                : number,
    "cosmetic_id"       : number,
    "start_time"        : string,
    "end_time"          : string,
    "discount_pct"      : null | number,
    "shop_type"         : string,
    "name"              : string,
    "type"              : string,
    "key"               : string,
    "description"       : string,
    "rarity_name"       : string,
    "rarity_color"      : string,
    "rarity_rank"       : number,
    "price"             : number,
    "seconds_remaining" : number,
    "active"            : true,
    "has_variants"      : false,
    "last_seen"         : string,
}

export { ShopItemResponse };
// Path: lib/sdk/type/shop.ts