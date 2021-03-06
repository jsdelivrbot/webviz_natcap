var parcoords;
function parcoords_plot(){

  // quantitative color scale
  var blue_to_brown = d3.scale.linear()
    .domain([-8,4])                 
    .range(["green", "royalblue"])
    .interpolate(d3.interpolateLab);

  var color = function(d) { 
    return blue_to_brown(d['awy_score']);     //make the color scale modular
  };

  parcoords = d3.parcoords()("#parcoords_canvas")
      .color(color)
      .alpha(0.4);

  //Create Parallel Coordinates chart
  parcoords
      .data(full_data)
      .hideAxis(columnNames.filter(x => col_score.indexOf(x) < 0 ))    //indexOf returns -1 if NOT in list 
      .composite("darker")
      .render()
      .shadows()
      .reorderable()
      .brushMode("1D-axes");  // enable brushing
  

  var sltBrushMode = d3.select('#sltBrushMode')

  sltBrushMode.selectAll('option')
    .data(parcoords.brushModes())
    .enter()
      .append('option')
      .text(function(d) { return d; });


  sltBrushMode.property('value', '1D-axes');

  d3.select('#sltPredicate').on('change', function() {
    parcoords.brushPredicate(this.value);
  });


  // LINK things TO PARCOORDS UPON BRUSHING

    parcoords.on("brush", function() {

    //Update scatterplots for each brushed dimension
    var be1 = parcoords.brushExtents().awy_score;
    var be2 = parcoords.brushExtents().sde_score;
    var be3 = parcoords.brushExtents().sdl_score;

    // Fix the extrema because interval is [min;max[
    if (be1) be1[1]+= 0.0000000001;
    if (be2) be2[1]+= 0.0000000001;
    if (be3) be3[1]+= 0.0000000001;

    filtered_data = dimensions['awy_score'].filter(be1).top(Infinity);
    filtered_data = dimensions['sde_score'].filter(be2).top(Infinity);
    filtered_data = dimensions['sdl_score'].filter(be3).top(Infinity);
                 //There has to be a more proper way to do this with a joli for loop!

    scatterplots(filtered_data,nbTicks);
    parcoords.data(filtered_data).render();

    //Update map
    update_map_stats(filtered_data);
    choose_map('filtered');
        //Update table
    table(filtered_data);


    });


  }