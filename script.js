const firePixelArray = [];
const fireWidth = 40;
const fireHeight = 40; 
const fireColorsPalette = [{'r': 18, 'g': 0, 'b': 3},{'r':23, 'g': 4, 'b': 8},{'r':39, 'g': 14, 'b': 11},{'r':56, 'g': 12, 'b': 12},{'r':71, 'g': 22, 'b': 13},{'r':91, 'g': 27, 'b': 12},{'r':103, 'g': 29, 'b': 24},{'r':127, 'g': 35, 'b':21},{'r':140, 'g': 46, 'b': 25},{'r':154, 'g': 60, 'b': 29},{'r':169, 'g': 69, 'b': 32},{'r':179, 'g': 69, 'b': 29},{'r':196, 'g': 77, 'b': 37}, {'r':197, 'g': 86, 'b': 51}, {'r':195, 'g': 86, 'b': 39}, {'r':194, 'g': 92, 'b': 43},{'r':194, 'g': 92, 'b': 43},{'r':185, 'g': 102, 'b': 56},{'r':193, 'g': 106, 'b': 40},{'r':187, 'g': 117, 'b': 53},{'r':192, 'g': 127, 'b': 52},{'r':188, 'g': 137, 'b': 53},{'r':189, 'g': 135, 'b': 47},{'r':180, 'g': 145, 'b': 50},{'r':192, 'g': 152, 'b': 59},{'r':186, 'g': 163, 'b': 64},{'r':190, 'g': 160, 'b': 66},{'r':184, 'g': 172, 'b': 65},{'r':185, 'g': 180, 'b': 69},{'r':185, 'g': 180, 'b': 69},{'r':181, 'g': 182, 'b': 75},{'r':175, 'g': 190, 'b': 74},{'r':177, 'g': 190, 'b': 73},{'r':201, 'g': 215, 'b': 126},{'r':215, 'g': 226, 'b': 166},{'r':237, 'g': 240, 'b': 196},{'r':255, 'g': 255, 'b': 255}];
console.log(fireColorsPalette.length);

fireColorsPaletteHex = ['#120003', '#170408', ]
function start(){
    createFireDataStructure();
    createFireSource();
    renderFire();

    setInterval(calculeteFirePropagation, 50)
}

function createFireDataStructure(){
    const numberOfPixels = fireWidth * fireHeight;

    for(let i = 0; i <numberOfPixels; i++){
        firePixelArray[i] = 0;
    }
}

function calculeteFirePropagation(){
    for(let column = 0; column < fireWidth; column++){
        for( let row = 0; row < fireHeight; row++){
            const pixelIndex = column + (fireWidth * row)

            updateFireIntensityPerPixel(pixelIndex)
        }
    }

    renderFire();
} 

function updateFireIntensityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth;

    if(belowPixelIndex >= fireWidth * fireHeight){
        return;
    }

    const decay = Math.floor(Math.random()*3);
    const belowPixelFireIntensity = firePixelArray[belowPixelIndex];
    const newFireIntensity = belowPixelFireIntensity-decay > 0 ? belowPixelFireIntensity - decay: 0;
    
    firePixelArray[currentPixelIndex-decay] = newFireIntensity;
}

function renderFire(){
    const debug = false;
    let html = '<table cellpadding=0 cellspacing=0>';

    for(let row = 0; row <fireHeight; row++){
        html += '<tr>';

        for(let column = 0; column < fireWidth; column++){
            const pixelIndex = column + (fireWidth * row);
            const fireIntensity = firePixelArray[pixelIndex];
            
            if(debug === true){
                html += '<td>';
              
                html += `<div class="pixel-index">${pixelIndex}</div>`;
                html += fireIntensity;
                html += '</td>';
            }else{
                let color = fireColorsPalette[fireIntensity];
                let colorString = `${color.r}, ${color.g}, ${color.b}`
                
                
                html +=`<td  class="pixel" style="background-color: rgb(${colorString})">`;
                html += '</td>';
            }
            
        }

        html += '</tr>';
    } 

    html += '</table>';

    document.querySelector('#fireCanvas').innerHTML = html;
}

function createFireSource(){
    for(let column = 0; column <= fireWidth; column++){
        const overFlowPixelIndex = fireWidth * fireHeight;
        const pixelIndex = (overFlowPixelIndex - fireWidth) + column;
        
        firePixelArray[pixelIndex] = 36;
    }
}

start();