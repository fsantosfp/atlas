exports.split_date = (param)=>{
    let start = '';
    let end = '';

    if(typeof(param.period) == "object"){
        if(param.period.startDate == undefined){
            start = param.period.startDateTime.split("T")[0];
            end = param.period.endDateTime.split("T")[0];
        }else{
            start = param.period.startDate.split("T")[0];
            end = param.period.endDate.split("T")[0];
        }
    }else{
        start = param.period.split("T")[0];
        end = start;
    }

    return {"startDate" : start, "endDate" : end};
}