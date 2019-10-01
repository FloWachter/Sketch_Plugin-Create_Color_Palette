import sketch from 'sketch'

export default function() {
  const doc = sketch.getSelectedDocument()
  const selectedLayers = doc.selectedLayers
  const selectedCount = selectedLayers.length
  const page = doc.selectedPage;
  
  // Check if something is selected
  if (selectedCount === 0) {
    sketch.UI.message('No layers are selected.')
  } else {
    sketch.UI.message( selectedCount + ' layers selected.')

    // find the background color of the selected items
    let colorData = [];
    selectedLayers.forEach(layer => {
      var data = layer.style.fills;
      var color = data.map(c => c.color)
      if(color != undefined) {
       colorData.push(color);
     }
   })

    // Input Form for Picking the overlay color
    var overlayColor = "";
    sketch.UI.getInputFromUser(
      "Choose a overlay color to match the colors to eachother! \n (format: #xxxxxx)",
      {
        initialValue: '#FFEA26',
      },
      (err, value) => {
        if (err) {
          sketch.UI.message( 'Process Canceled!')
          return
        }
        overlayColor = value 
      }) 

    // Function which checks if it is hex value
    function isHex(val){
      var re = /[0-9A-Fa-f]{6}/g;
      if(re.test(val)) {
        return true
      } else {
        sketch.UI.message( 'Process Canceled, no Hex Value!')
        return false
      }
      re.lastIndex = 0;
    }

    // Check if the input is a hex value
    if (isHex(overlayColor) == true ){
      
      // Create a new artboard where the pallet will be placed
      let Artboard = sketch.Artboard
      let myArtboard = new Artboard({
        parent: page,
        flowStartPoint: true,
        frame: { x: 0, y: 0, width: 90 * colorData.length, height: 90 },
        name: "Color Palette",
      })

      // Create rectagles with the selected colors
      let ShapePath = sketch.ShapePath
      for(var i = 0; i < colorData.length; i++){
        // clean up the hex value from the background color of the selected items
        var colorUse = colorData[i][0].slice(0, 7)
        // create rects in the new artboard with the selected colors
        let mySquare = new ShapePath({
          parent: myArtboard,
          frame: { x: 90 * i, y: 0, width: 90, height: 90 },
          style: { fills: [colorUse],  borders: []},
          name: "Selected_base_color"
        }) 
      }
      // create a white layer on top of the colors
      let rectWhite_top = new ShapePath({
        parent: myArtboard,
        frame: { x: 0, y: 0, width: 90 * colorData.length, height: 30 },
        style: { fills: ['#ffffff'], opacity: 0.2, borders: []},
        name: "White_opayity_rect_top"

      }) 
      // create a black layer on top of the colors
      let rectblack_bottom = new ShapePath({
        parent: myArtboard,
        frame: { x: 0, y: 60, width: 90 * colorData.length, height: 30 },
        style: { fills: ['#000000'], opacity: 0.2, borders: []},
        name: "Black_opayity_rect_bottom"

      })

      // create two layer of overlayer blending colors in the middle and at the end of each color
      for(var i = 0; i < colorData.length; i++){
        for(var z = 1; z < 3; z++){
          let rectblack_bottom = new ShapePath({
            parent: myArtboard,
            frame: { x: (90 * i) + (30 * z), y: 0, width: 30, height: 90 },
            style: { fills: [overlayColor], opacity: 0.4 * z, borders: [], blendingMode: 'Overlay'},
            name: "Overlay_blending_color"
          }) 
        }} 
    }
  }
}


