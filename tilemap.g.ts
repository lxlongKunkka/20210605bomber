// 自动生成的代码。请勿编辑。
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "级别1":
            case "级别1":return tiles.createTilemap(hex`13000f00010101010101010101010101010101010101010102020000000000000000000000000000000101020100010001000100010001000100010001010000000000000000000000000000000000010100010001000100010001000100010001000101000000000000000000000000000000000001010001000100010001000100010001000100010100000000000000000000000000000000000101000100010001000100010001000100010001010000000000000000000000000000000000010100010001000100010001000100010001000101000000000000000000000000000000000001010001000100010001000100010001000100010100000000000000000000000000000000000101010101010101010101010101010101010101`, img`
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile4], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "myTile":
            case "tile1":return tile1;
            case "myTile0":
            case "tile2":return tile2;
            case "myTile1":
            case "tile3":return tile3;
            case "myTile2":
            case "tile4":return tile4;
        }
        return null;
    })

}
// 自动生成的代码。请勿编辑。
