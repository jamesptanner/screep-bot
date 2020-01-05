import {RoomManager} from "./room/RoomManager"
import { CreeperManager } from "./creeps/CreeperManager";
import { WorldManager } from "./world/WorldManager";


export namespace GameManager{
    export function setup(){
        RoomManager.setupManager();
        CreeperManager.setupManager();
        WorldManager.setupManager();
    }

    export function loop(){
        RoomManager.loop();
        CreeperManager.loop();
        WorldManager.loop();
    }
}

