const canvas = document.getElementById('canvas'); // access to canvas (finds)

const ctx = canvas.getContext('2d'); // access to drawing on canvas.

const colorPicker = document.getElementById('colorPicker'); // access to color selection.

const gallery = document.getElementById('gallery'); // access to the gallery.

const cellsize = 20; // the size of one canvas cell.

let currentTool = 'square'; // by default, a square is selected.




function resizeCanvas() // A function that specifies the size of the cells.
{
    const square = canvas.getBoundingClientRect(); // getting the Canvas Dimensions on the Page (in Pixels), We need to write rect even if we need a square.

    canvas.width = Math.floor(square.width / cellsize) * cellsize; // set the WIDTH (vertical) of the canvas: round to whole cells

    canvas.height = Math.floor(square.height / cellsize) * cellsize; // set the HEIGHT (horisontal) in the canvas: round up to whole cells.
}




function drawGrid() // A function that draws cells.
{ 
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clean the entire canvas (all drawings), We need to write rect even if we need a square.
    
    ctx.strokeStyle = '#252525'; // set the gray color for the grid

    ctx.lineWidth = 0.5; // lines width

    for (let x = 0; x <= canvas.width; x += cellsize) // draw vertical lines (x)
    {
        ctx.beginPath(); // starting to draw a line

        ctx.moveTo(x, 0); // start at (x, 0)

        ctx.lineTo(x, canvas.height); // lead to the point (x, canvas.height)

        ctx.stroke(); // draw a line
    }



    for (let y = 0; y <= canvas.height; y += cellsize) // draw horisontal lines (y)
    {
        ctx.beginPath(); // starting to draw a line

        ctx.moveTo(0, y); // start at (0, y)

        ctx.lineTo(canvas.width, y); // lead to the point (canvas.width, y)

        ctx.stroke(); // draw a line
    }
}

function drawShape(x, y, tool, color) // A function that allows you to select shapes/objects.
{ 
    ctx.fillStyle = color;
    const size = cellsize; // Set the size of the cells (1k1 so that the shapes stick.)
    const cx = x + cellsize / 2; // Look for the center of the cell horizontally.
    const cy = y + cellsize / 2; // Look for the center of the cell vertically
    switch (tool) // Find the selected shape/object
    { 
        case 'square':
            ctx.fillRect(x + 1, y + 1, size, size); // If a square is selected, make an absolutely square shape.
            break;

        case 'circle':
            ctx.beginPath(); // a command that says to the canvas: "Start drawing a new shape, don't link it to the previous one"
            ctx.arc(cx, cy, size / 2, 0, Math.PI * 2); //If a circle is selected, create a circle outline.
            ctx.fill(); // And fill it out.
            break;

        case 'triangle':
            ctx.beginPath(); 

            // If a triangle (outline) is selected, then create a triangle shape
            ctx.moveTo(cx, y + 2);
            ctx.lineTo(x + 2, y + size - 2);
            ctx.lineTo(x + size - 2, y + size - 2);

            ctx.closePath(); // Stop beginPath
            ctx.fill(); // Filling it out
            break;
        case 'octahedron':
            ctx.beginPath();

            // If an octahedron is selected, create an octahedron outline
            ctx.moveTo(cx, y + 2);
            ctx.lineTo(x + size - 2, cy);
            ctx.lineTo(cx, y + size -2);
            ctx.lineTo(x + 2, cy);

            ctx.closePath(); // Stop beginPath
            ctx.fill(); // Filling it out
            break;
    }
}

resizeCanvas(); // running the Canvas Size Counting Function

drawGrid(); // running the process of drawing canvas cells

window.addEventListener('resize', function() // when the window is resized, the browser recalculates and resizes the canvas.
{
    resizeCanvas();
    drawGrid();
})