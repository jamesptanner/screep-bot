
import { Guid } from "guid-typescript";

interface BasicCreepInterface {
    creep: Creep;
    buildCreep(spawn:StructureSpawn): void;

    renewCreep():void;
    needsRenewal():boolean;
    setRenewStation(spawn: StructureSpawn):void;

    setCreep(creep: Creep):void;

    moveTo(target:RoomPosition):void;
    
    run():void;
}

export default abstract class MyCreep implements BasicCreepInterface{
    public creep: Creep;

    setCreep(creep: Creep): void {
        this.creep = creep;
    }
    renewCreep(): void {
        throw new Error("Method not implemented.");
    }
    needsRenewal(): boolean {
        throw new Error("Method not implemented.");
    }
    setRenewStation(spawn: any): void {
        throw new Error("Method not implemented.");
    }
    moveTo(target: RoomPosition): void {
        throw new Error("Method not implemented.");
    }

    constructor (parts: BodyPartConstant[], role:string ){
        this.bodyDesign = parts;
        this.role = role;
    }

    bodyDesign: BodyPartConstant[];
    role: string;
    buildCreep(spawn:StructureSpawn){
        spawn.spawnCreep(this.bodyDesign, this.role + Guid.create().toString() );
    
    }

    abstract run(): void;
}