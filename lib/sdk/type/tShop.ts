import ShopType from "@enum/shop/eShopType";

type ShopItem = {
    "id"                : number,
    "cosmetic_id"       : number,
    "start_time"        : string,
    "end_time"          : string,
    "discount_pct"      : null | number,
    "shop_type"         : ShopType,
    "name"              : string,
    "type"              : string,
    "key"               : string,
    "description"       : string,
    "rarity_name"       : string,
    "rarity_color"      : string,
    "rarity_rank"       : number,
    "price"             : number,
    "seconds_remaining" : number,
    "active"            : boolean,
    "has_variants"      : boolean,
    "last_seen"         : string,
}

export { ShopItem };
// Path: lib/sdk/type/shop.ts