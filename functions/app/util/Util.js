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

exports.getYear = (date)=>{
    let year = date.split("-")[0];
    return year;
}

exports.getCurrentYear = ()=>{
    let date = new Date();
    var year = date.getFullYear();
    return year;
}

exports.split_year = (param) =>{
    let start = '';
    if(typeof(param.year) == "object"){
        if(param.year.startDate == undefined){
            start = param.year.startDateTime.split("T")[0];
        }else{
            start = param.year.startDate.split("T")[0];
        }
    }else{
        start = param.year.split("T")[0];
    }
    return start.split("-")[0];
}

exports.merge = (date , year)=>{
    const d = date.replace(/^[0-9]{4}/,year);
    return d;
}