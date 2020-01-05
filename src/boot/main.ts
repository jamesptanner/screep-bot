import { GameManager } from "../components/GameManager";
declare var module: any;

GameManager.setup()

module.exports.loop = function() {
    GameManager.loop();
};