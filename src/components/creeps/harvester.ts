import myCreep from "./creepInterface";


class Harvester extends myCreep {
    
    bodyDesign: BodyPartConstant[] = [WORK,CARRY,MOVE,MOVE];
    role: string = "harvester";
    
constructor(){
    super([WORK,CARRY,MOVE,MOVE],"harvester");
}

    run(): void {
        throw new Error("Method not implemented.");
    }

     
} 
