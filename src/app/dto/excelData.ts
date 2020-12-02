export class ExcelData{
    Id: number;
    Endpoint: String;
    ApiTime: number;
    ApplicationTime: number;
    DatabaseTime: number;
    NumberOfRequests: number;

    constructor(id, endpoint, apiTime, applicationTime, databaseTime, numberOfRequests){
        this.Id = id;
        this.Endpoint = endpoint;
        this.ApiTime = apiTime;
        this.ApplicationTime = applicationTime;
        this.DatabaseTime = databaseTime;
        this.NumberOfRequests = numberOfRequests;
    }

}