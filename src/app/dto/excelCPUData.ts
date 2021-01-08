export class ExcelCPUData{
    Id: number;
    Name: String;
    Timestamp: number;
    CpuUsage:number;

    constructor(Id, Name, Timestamp, CpuUsage){
        this.Id = Id;
        this.Name = Name;
        this.Timestamp = Timestamp;
        this.CpuUsage = CpuUsage;
    }

}