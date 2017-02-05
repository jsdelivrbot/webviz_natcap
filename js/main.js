var DATA = 'data/maragua_very_min_test.csv'

var full_data;
var dimensions = {};
var cf;
var brushed_data = full_data;
var parcoords;
var columns;

  function main(){


    //load csv data file & creates plots
    d3.csv(DATA, function(row) { 
      // This function to parse String data in Floats
      var columnNames = Object.keys(row);
      var finalRow = {};
      columnNames.forEach(function(columnName){
        finalRow[columnName] = parseFloat(row[columnName]);
      });
      return finalRow;

    }, function(data) {
      // Now make the plots
      full_data = data;
      parcoords_plot();
      sliders_plot();
      crossfiltering();
      map();
      scatterplots(full_data);
    });



    //Help buttons
    d3.select('#btnHelp_parcoords').on('click', function() 
    	{alert("Parallel Coordinates Plot : Each axis corresponds to an objective, each line represents a solution. The axis can be flipped upon double clicking on their name. The axis can be re-ordered by dragging them. ");
    });
      
    d3.select('#btnHelp_sliders_ow').on('click', function() 
      	{alert("Sliders: These sliders allow to modify the weight of each objective");
    });

    d3.select('#btnHelp_sliders_pu').on('click', function() 
        {alert("Sliders: These sliders allow to modify the values of the parameters subject to uncertainty. \
                seasonality refers to the seasonality constant, which affects the AWY model (...)\
                SDR K value affects the SDR model (...)\
                Spatial input ?????\
                Budget (...)");
    });

    d3.select("#btnHelp_scatterplots").on('click',function()
      {alert("Trade-offs curves: explanations")});
        
    d3.select("#ViewData").on('click',function()
      {
        table(full_data);
      });
        
  };


  
  /* Useful ?

  function renderAll_brushed(){
    parcoords.data(brushed_data);
    parcoords.render();
  }

  UPON BRUSH ON parcoords (FOR EACH 3 DIM):

dimensions["awy_score"].filter(D.brushExtents().awy_score);
brushed_data = dimensions.awy_score.filter(D.brushExtents().awy_score).top(Infinity); 
renderAll_brushed();
*/