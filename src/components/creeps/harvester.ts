import myCreep from "./creepInterface";


class Harvester extends myCreep {
    
    static bodyDesign: BodyPartConstant[] = [WORK,CARRY,MOVE,MOVE];
    static role: string = "harvester";
    
    constructor(){
        super(Harvester.bodyDesign,Harvester.role);
    }

    harvestSource!: Source;
    creepAction(){
        if(!this.harvestSource){
            this.harvestSource = this.creep.room.find(FIND_SOURCES)[0];
        }

        if(this.creep.carry.energy != this.creep.carryCapacity){
            if(this.creep.harvest(this.harvestSource) == ERR_NOT_IN_RANGE){
                this.moveTo(this.harvestSource);
            }
        }
        else{
            let energytoTransfer = 0;
            if(this.spawn.energyCapacity-this.spawn.energy < this.creep.carryCapacity){
                energytoTransfer = this.creep.carryCapacity;
            }
            else {
                 energytoTransfer = this.spawn.energyCapacity-this.spawn.energy;
            }
            if(this.creep.transfer(this.spawn,RESOURCE_ENERGY,energytoTransfer) == ERR_NOT_IN_RANGE){
                this.moveTo(this.spawn);
            }
        }


    }

     
} 
