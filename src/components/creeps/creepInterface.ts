
import { Guid } from "guid-typescript";
import { Config } from "../../config/Config";

interface BasicCreepInterface {
    creep: Creep;
    buildCreep(spawn:StructureSpawn): void;

    renewCreep():void;
    needsRenewal():boolean;
    setRenewStation(spawn: StructureSpawn):void;

    setCreep(creep: Creep):void;

    moveTo(target:RoomPosition):void;
    
    run():void;

    creepAction(): void;

}

export default abstract class MyCreep implements BasicCreepInterface{
    public creep!: Creep;
    spawn!: StructureSpawn;

    setCreep(creep: Creep): void {
        this.creep = creep;
    }
    renewCreep(): void {
        if(!this.creep.pos.isNearTo(this.spawn.pos)){
            this.moveTo(this.spawn.pos);
        }
        else{
            this.spawn.renewCreep(this.creep);
        }
    }
    needsRenewal(): boolean {
         if(this.creep.ticksToLive ) return this.creep.ticksToLive < Config.CREEP_REFRESH_NEEDED; 
         return false;
    }
    setRenewStation(spawn: StructureSpawn): void {
        this.spawn = spawn;
    }
    moveTo(target: RoomPosition | RoomObject): void {
        this.creep.moveTo(target);
    }

    constructor (parts: BodyPartConstant[], role:string ){
        this.bodyDesign = parts;
        this.role = role;
    }

    bodyDesign: BodyPartConstant[];
    role: string;
    buildCreep(spawn:StructureSpawn){
        spawn.spawnCreep(this.bodyDesign, this.role + Guid.create().toString(), );
        this.setRenewStation(spawn);
        
    }

    run(){
        if(this.needsRenewal()){
            this.renewCreep();
        }
        else {
            this.creepAction();
        }
    };
    abstract creepAction(): void;
}