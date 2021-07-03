var dropdown_menu=d3.select("#selDataset");
var sample_metadata=d3.select("#sample-metadata");
var bubble=d3.select("#bubble");
var bar=d3.select("#bar");
var gauge=d3.select("#gauge");
var names="";
var metadata="";
var samples="";
var layoutbubble="";
var tracebubble="";
var tracebar="";
var layoutbar="";
var tracegague="";
var layoutgague="";

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
    settrace(startsample)
    Plotly.newPlot('bubble', [tracebubble], layoutbubble);
    Plotly.newPlot('bar', [tracebar], layoutbar);



    
});


function optionChanged(){
    var changename=dropdown_menu.property('value');

    var dispmeta=metadata.find((metadata)=>metadata.id==changename);
    updatemetadata(dispmeta)

    var changesample=samples.find((samples)=>samples.id==changename);
    settrace(changesample)
    Plotly.newPlot('bubble', [tracebubble], layoutbubble);
    Plotly.newPlot('bar', [tracebar], layoutbar);

}


function settrace(data){
    tracebar={
        type:'bar',
        y:data.sample_values.slice(0,10),
        x:data.otu_ids.slice(0,10).map((value)=>`OTU ${value}`),
        text:data.otu_labels.slice(0,10)
    };

    layoutbar={
        title:`Top 10 Bacteria Found in Subject #${data.id}`
    };


    tracegague={};
    tracebubble={
        mode:"markers",
        x:data.otu_ids,
        y:data.sample_values,
        text:data.otu_labels,
        marker:{
            size:data.sample_values,
            color:data.otu_ids
        }
    };
    layoutbubble={
        title:`Sample quantity in Subject ${data.id}`,
        xaxis:{title:"OTU ID Number"},
        yaxis:{title:"Sample Value"}
    };


}


function updatemetadata(data){
    sample_metadata.text("");
    console.log(data);
    //Tried to us Each and forEach but it wouldn't work, found the following solution:
    //https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
    for (const [key,value] of Object.entries(data)){
        sample_metadata.append("p").text(`${key}: ${value}`).style("font-weight","bold")
    }


}
