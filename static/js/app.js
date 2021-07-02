var dropdown_menu=d3.select("#selDataset");
var sample_metadata=d3.select("#sample-metadata");
var bubble=d3.select("#bubble");
var bar=d3.select("#bar");
var gauge=d3.select("#gauge");




d3.json("./data/samples.json").then((data)=>{

    //saving names to aa variable for dropdown, data type change to int just in case
    var names=data.names.map((value)=>parseInt(value));
    //populating dropdown menu
    names.forEach((name)=>{dropdown_menu.append("option").text(name)});
    var startname=dropdown_menu.property('value');






    var metadata=data.metadata;
    var dispmeta=metadata.find((metadata)=>metadata.id==startname);
    updatemetadata(dispmeta);
    
    var samples=data.samples;




    
});



function updatemetadata(data){
    sample_metadata.text("");
    console.log(data);
    data.each((k,v)=>{
        sample_metadata.append("row").value(`${k}: ${v}`)
    })


}

function optionChanged(){


}


//"id" "ethnicity" "gender" "age" "location" "bbtype" "wfreq"