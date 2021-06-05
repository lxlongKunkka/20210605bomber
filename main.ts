namespace SpriteKind {
    export const Bomb = SpriteKind.create()
    export const BombExplosion = SpriteKind.create()
}
function 生成怪物 () {
    temp = 0
    for (let 值 of tiles.getTilesByType(assets.tile`transparency16`)) {
        if (Math.percentChance((怪物总量 - temp) / (怪物总量 * 3) * 100)) {
            mySprite = sprites.create(img`
                . . . . c c c c c c . . . . . . 
                . . . c 6 7 7 7 7 6 c . . . . . 
                . . c 7 7 7 7 7 7 7 7 c . . . . 
                . c 6 7 7 7 7 7 7 7 7 6 c . . . 
                . c 7 c 6 6 6 6 c 7 7 7 c . . . 
                . f 7 6 f 6 6 f 6 7 7 7 f . . . 
                . f 7 7 7 7 7 7 7 7 7 7 f . . . 
                . . f 7 7 7 7 6 c 7 7 6 f c . . 
                . . . f c c c c 7 7 6 f 7 7 c . 
                . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
                . c 7 7 2 7 7 c f c 6 7 7 6 c c 
                c 1 1 1 1 7 6 f c c 6 6 6 c . . 
                f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
                f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
                . f 6 1 1 1 1 1 1 6 6 6 f . . . 
                . . c c c c c c c c c f . . . . 
                `, SpriteKind.Enemy)
            tiles.placeOnTile(mySprite, 值)
            temp += 1
            mySprite.setFlag(SpriteFlag.BounceOnWall, true)
            mySprite.vx = randint(20, 40)
            mySprite.vy = randint(20, 40)
        }
    }
}
function 初始化地图信息 () {
    list = []
    炸弹冷却OK = true
    for (let 值 of tiles.getTilesByType(assets.tile`myTile`)) {
        tiles.setWallAt(值, true)
    }
    生成可炸墙()
    生成怪物()
    tiles.placeOnRandomTile(Hero, assets.tile`myTile0`)
    for (let 值 of tiles.getTilesByType(assets.tile`myTile0`)) {
        tiles.setTileAt(值, assets.tile`transparency16`)
    }
}
// 爆炸方向
// 1, 上
// 2, 右
// 3, 下
// 4, 左
function 爆炸的火焰 (列: number, 行: number, 爆炸方向: number, 火焰长度: number) {
    if (爆炸方向 == 1) {
        mySprite = sprites.create(爆炸上, SpriteKind.BombExplosion)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(列, 行 - 1))
    } else if (爆炸方向 == 2) {
        mySprite = sprites.create(爆炸右, SpriteKind.BombExplosion)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(列 + 1, 行))
    } else if (爆炸方向 == 3) {
        mySprite = sprites.create(爆炸下, SpriteKind.BombExplosion)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(列, 行 + 1))
    } else {
        mySprite = sprites.create(爆炸左, SpriteKind.BombExplosion)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(列 - 1, 行))
    }
    mySprite.lifespan = 1000
    mySprite.setFlag(SpriteFlag.GhostThroughWalls, true)
}
sprites.onDestroyed(SpriteKind.Bomb, function (sprite) {
    mySprite = sprites.create(爆炸中, SpriteKind.BombExplosion)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(sprite.x / 16, sprite.y / 16))
    tiles.setTileAt(tiles.getTileLocation(sprite.x / 16, sprite.y / 16), assets.tile`transparency16`)
    list.shift()
    tiles.setWallAt(tiles.getTileLocation(sprite.x / 16, sprite.y / 16), false)
    mySprite.lifespan = 1000
    爆炸的火焰(sprite.x / 16, sprite.y / 16, 1, 1)
    爆炸的火焰(sprite.x / 16, sprite.y / 16, 2, 1)
    爆炸的火焰(sprite.x / 16, sprite.y / 16, 3, 1)
    爆炸的火焰(sprite.x / 16, sprite.y / 16, 4, 1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (炸弹冷却OK) {
        info.startCountdown(1)
        炸弹冷却OK = false
        mySprite = sprites.create(img`
            . . . . . . . e c 7 . . . . . . 
            . . . . e e e c 7 7 e e . . . . 
            . . c e e e e c 7 e f f e e . . 
            . c e e e e e c 6 e e f f f e . 
            . c e e e f e c c f 4 5 4 f e . 
            c e e e f f f f f f 4 5 5 f f e 
            c e e f f f f f f f f 4 4 f f e 
            c e e f f f f f f f f f f f f e 
            c e e f f f f f f f f f f f f e 
            c e e f f f f f f f f f f f f e 
            c e e f f f f f f f f f f 4 f e 
            . e e e f f f f f f f f f 4 e . 
            . 2 e e f f f f f f f f 4 2 e . 
            . . 2 e e f f f f f 4 4 2 e . . 
            . . . 2 2 e e 4 4 4 2 e e . . . 
            . . . . . 2 2 e e e e . . . . . 
            `, SpriteKind.Bomb)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(Hero.x / 16, Hero.y / 16))
        list.push(tiles.getTileLocation(Hero.x / 16, Hero.y / 16))
        mySprite.lifespan = 2000
    }
})
scene.onOverlapTile(SpriteKind.BombExplosion, assets.tile`myTile1`, function (sprite, location) {
    music.baDing.play()
    tiles.setTileAt(location, assets.tile`transparency16`)
    tiles.setWallAt(location, false)
})
info.onCountdownEnd(function () {
    炸弹冷却OK = true
})
function 创建英雄 () {
    Hero = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(Hero)
    scene.cameraFollowSprite(Hero)
    Hero.z = 10
}
function 初始化变量 () {
    scene.setBackgroundColor(7)
    当前关卡 = 1
    关卡总量 = 6
    砖块总量 = 60
    怪物总量 = 20
    爆炸左 = img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 
        . . 2 2 3 3 3 3 3 3 3 3 3 3 3 3 
        . 2 2 3 3 3 3 3 3 3 3 3 3 3 3 3 
        . 2 3 3 1 1 1 1 1 1 1 1 1 1 1 1 
        . 2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 
        . 2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 
        . 2 3 3 1 1 1 1 1 1 1 1 1 1 1 1 
        . 2 2 3 3 3 3 3 3 3 3 3 3 3 3 3 
        . . 2 2 3 3 3 3 3 3 3 3 3 3 3 3 
        . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `
    爆炸上 = img`
        . . . . . . . . . . . . . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . 2 2 3 3 3 3 2 2 . . . . 
        . . . 2 2 3 3 1 1 3 3 2 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        `
    爆炸右 = img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        2 2 2 2 2 2 2 2 2 2 2 2 2 . . . 
        3 3 3 3 3 3 3 3 3 3 3 3 2 2 . . 
        3 3 3 3 3 3 3 3 3 3 3 3 3 2 2 . 
        1 1 1 1 1 1 1 1 1 1 1 1 3 3 2 . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 3 2 . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 3 2 . 
        1 1 1 1 1 1 1 1 1 1 1 1 3 3 2 . 
        3 3 3 3 3 3 3 3 3 3 3 3 3 2 2 . 
        3 3 3 3 3 3 3 3 3 3 3 3 2 2 . . 
        2 2 2 2 2 2 2 2 2 2 2 2 2 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `
    爆炸下 = img`
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . . 2 2 3 3 1 1 3 3 2 2 . . . 
        . . . . 2 2 3 3 3 3 2 2 . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . . . . . . . . . . . . . 
        `
    爆炸中 = img`
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . 2 2 3 3 1 1 1 1 3 3 2 2 . . 
        . 2 2 3 3 3 1 1 1 1 3 3 3 2 2 . 
        2 2 3 3 3 3 1 1 1 1 3 3 3 3 2 2 
        3 3 3 3 3 1 1 1 1 1 1 3 3 3 3 3 
        3 3 3 3 1 1 1 1 1 1 1 1 3 3 3 3 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        3 3 3 3 1 1 1 1 1 1 1 1 3 3 3 3 
        3 3 3 3 3 1 1 1 1 1 1 3 3 3 3 3 
        2 2 3 3 3 3 1 1 1 1 3 3 3 3 2 2 
        . 2 2 3 3 3 1 1 1 1 3 3 3 2 2 . 
        . . 2 2 3 3 1 1 1 1 3 3 2 2 . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        `
}
function 生成可炸墙 () {
    temp = 0
    for (let 值 of tiles.getTilesByType(assets.tile`transparency16`)) {
        if (Math.percentChance((砖块总量 - temp) / (砖块总量 * 3) * 100)) {
            tiles.setTileAt(值, assets.tile`myTile1`)
            tiles.setWallAt(值, true)
            temp += 1
        }
    }
}
function 更新地图 () {
    tiles.setTilemap(tilemap`级别1`)
    初始化地图信息()
}
scene.onOverlapTile(SpriteKind.BombExplosion, assets.tile`myTile`, function (sprite, location) {
    music.baDing.play()
    sprite.destroy()
})
let 砖块总量 = 0
let 关卡总量 = 0
let 当前关卡 = 0
let 爆炸中: Image = null
let 爆炸左: Image = null
let 爆炸下: Image = null
let 爆炸右: Image = null
let 爆炸上: Image = null
let Hero: Sprite = null
let 炸弹冷却OK = false
let list: tiles.Location[] = []
let mySprite: Sprite = null
let 怪物总量 = 0
let temp = 0
初始化变量()
创建英雄()
更新地图()
game.onUpdate(function () {
    for (let 值 of list) {
        if (!(值 == tiles.getTileLocation(Hero.x / 16, Hero.y / 16))) {
            tiles.setWallAt(值, true)
        }
    }
})
