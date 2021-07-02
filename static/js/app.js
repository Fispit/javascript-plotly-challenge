var dropdown_menu=d3.select("#selDataset");
var sample_metadata=d3.select("#sample-metadata");
var bubble=d3.select("#bubble");
var bar=d3.select("#bar");
var gauge=d3.select("#gauge");
var names="";
var metadata="";
var samples="";

d3.json("./data/samples.json").then((data)=>{

    //saving names to aa variable for dropdown, data type change to int just in case
    names=data.names.map((value)=>parseInt(value));
    //populating dropdown menu
    names.forEach((name)=>{dropdown_menu.append("option").text(name)});
    var startname=dropdown_menu.property('value');

    metadata=data.metadata;
    var dispmeta=metadata.find((metadata)=>metadata.id==startname);
    updatemetadata(dispmeta);
    
    samples=data.samples;
    var startsample=samples.find((samples)=>samples.id==startname);
    //sample values are already on descending order, no need to sort
    console.log("Testing with slices")
    console.log(startsample.sample_values.slice(0,10))
    var tracebar={
        type:'bar',
        y:startsample.sample_values.slice(0,10),
        x:startsample.otu_ids.slice(0,10),
        text:startsample.otu_labels.slice(0,10)
    };

    var layoutbar={
        title:"Top 10 Bacteria Found in this Bellybutton"
    };

    Plotly.newPlot('bar', [tracebar], layoutbar);
    var tracegague={};
    var tracebubble={};




    



    
});



function updatemetadata(data){
    sample_metadata.text("");
    console.log(data);
    //Tried to us Each and forEach but it wouldn't work, found the following solution:
    //https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
    for (const [key,value] of Object.entries(data)){
        sample_metadata.append("p").text(`${key}: ${value}`).style("font-weight","bold")
    }


}



function optionChanged(){
    var changename=dropdown_menu.property('value');

    var dispmeta=metadata.find((metadata)=>metadata.id==changename);
    updatemetadata(dispmeta)
}


//"id" "ethnicity" "gender" "age" "location" "bbtype" "wfreq"