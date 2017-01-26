//pref pixels app.preferences.rulerUnits = Units.PIXELS;
var srcDoc = app.activeDocument;

// call the current document
var srcDoc = app.activeDocument;

// set original width and height
var imageW = srcDoc.width.value;
var imageH = srcDoc.height.value;

// get the info out of the source doc
var fileName = srcDoc.name;
var docName = fileName.substring(0,fileName.length -4);
var filePath = srcDoc.path.toString();
var fileExt = fileName.substring(fileName.length -4, fileName.length);

var nameCheck = fileName.substring(0,fileName.indexOf("_"));

if (nameCheck < 1)
{
   // No underscore so it's the original - we need to open its namesake.
   // alert(nameCheck)
   var filePairMag = filePath + "/" + docName + "_m" + fileExt;
   var filePairYel = filePath + "/" + docName + "_y" + fileExt;
   openThisFile(filePairMag)
   activeDocument.selection.selectAll()
   activeDocument.selection.copy();
   app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
   app.activeDocument = srcDoc;
   activeDocument.resizeCanvas(imageW *3, imageH, AnchorPosition.MIDDLELEFT);
   selectRect(0, imageW, imageW*2, imageH)
   activeDocument.paste()
   activeDocument.flatten();
   openThisFile(filePairYel)
   activeDocument.selection.selectAll()
   activeDocument.selection.copy();
   app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
   app.activeDocument = srcDoc;
   selectRect(0, imageW*2, imageW*3, imageH)
   activeDocument.paste()
   activeDocument.flatten();
   var newName = filePath + "/combined/" + docName + "_combined" + fileExt
   saveMe(newName)
}
    else
    {
      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }


function openThisFile(masterFileNameAndPath)
{
 var fileRef = new File(masterFileNameAndPath)
 if (fileRef.exists)
 //open that doc
 {
    app.open(fileRef);
 }
 else
 {
    alert("error opening " + masterFileNameAndPath)
 }
}


function selectRect(top, left, right, bottom)
{
    srcDoc.selection.deselect()
    // =======================================================
    var id1 = charIDToTypeID( "setd" );
    var desc1 = new ActionDescriptor();
    var id2 = charIDToTypeID( "null" );
    var ref1 = new ActionReference();
    var id3 = charIDToTypeID( "Chnl" );
    var id4 = charIDToTypeID( "fsel" );
    ref1.putProperty( id3, id4 );
    desc1.putReference( id2, ref1 );
    var id5 = charIDToTypeID( "T   " );
    var desc2 = new ActionDescriptor();
    var id6 = charIDToTypeID( "Top " );
    var id7 = charIDToTypeID( "#Pxl" );
    desc2.putUnitDouble( id6, id7, top );
    var id8 = charIDToTypeID( "Left" );
    var id9 = charIDToTypeID( "#Pxl" );
    desc2.putUnitDouble( id8, id9, left );
    var id10 = charIDToTypeID( "Btom" );
    var id11 = charIDToTypeID( "#Pxl" );
    desc2.putUnitDouble( id10, id11, bottom );
    var id12 = charIDToTypeID( "Rght" );
    var id13 = charIDToTypeID( "#Pxl" );
    desc2.putUnitDouble( id12, id13, right );
    var id16 = charIDToTypeID( "Rctn" );
    desc1.putObject( id5, id16, desc2 );
    executeAction( id1, desc1, DialogModes.NO );
}

function saveMe(fPath)
{

// save out the image
var pngFile = new File(fPath);
pngSaveOptions = new PNGSaveOptions();
pngSaveOptions.embedColorProfile = true;
pngSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
pngSaveOptions.matte = MatteType.NONE; pngSaveOptions.quality = 1;
activeDocument.saveAs(pngFile, pngSaveOptions, false, Extension.LOWERCASE);

// close that saved png
 app.activeDocument.close()
}
