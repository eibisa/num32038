
function obtenerColorTextoDesdeRGBA(colorStr) {
    // Esta expresi�n regular captura los 3 primeros grupos de n�meros ignorando los espacios y el Alpha
    const coincidencias = colorStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    
    if (!coincidencias) {
        return '#000000'; // Color de seguridad por si el string viene corrupto
    }

    // Convertimos las capturas a n�meros enteros
    const r = parseInt(coincidencias[1], 10);
    const g = parseInt(coincidencias[2], 10);
    const b = parseInt(coincidencias[3], 10);

    // Aplicamos la f�rmula YIQ
    const luminosidad = (r * 299 + g * 587 + b * 114) / 1000;

    // Si la puntuaci�n es alta (borde claro) -> texto negro. Si es baja (borde oscuro) -> texto blanco.
    return luminosidad >= 128 ? '#000000' : '#FFFFFF';
}

// =========================================================================
// ESTILO 1: PARA EL GRUPO DE ESTADO DE CONSERVACI�N
// =========================================================================
function estiloGrupoConservacion(feature, resolution) {
    var valueNUM = feature.get('END_N1_00') || '';
        var valueLETRA = feature.get("END_L1_00") || '';
    var estado = feature.get('ESTADOS_CONS_Estado_Conservacion');
    var numero = valueNUM + valueLETRA;
/*    if (valueNUM == null) { 
       valueNUM = ""; 
    }
    if (valueLETRA == null) { 
       valueLETRA = ""; 
    }    */
    // Asignamos un color de reborde seg�n el estado de conservaci�n
    var colorBorde = "rgba(0,0,0,1.000)"; // Por defecto negro
    if (estado === 'Bueno')   colorBorde = "rgba(44, 160, 44,1.000)";  
    if (estado === 'Regular') colorBorde = "rgba(255, 127, 0,1.000)";  
    if (estado === 'Malo')    colorBorde = "rgba(227, 26, 28,1.000)";  
    if (estado === 'Ruina')   colorBorde = "rgba(152, 78, 163,1.000)"; 

    // Calculamos el color del interior (blanco o negro) seg�n la claridad del borde
    var colorInterior = obtenerColorTextoDesdeRGBA(colorBorde); 

    return [new ol.style.Style({
        text: new ol.style.Text({
            text: String(numero),
            font: "bold 13px sans-serif",
            fill: new ol.style.Fill({ color: colorInterior }),
            stroke: new ol.style.Stroke({ color: colorBorde, width: 3 })
        })
    })];
}

// =========================================================================
// ESTILO 2: PARA EL GRUPO DE TIPO DE NUMERACI�N
// =========================================================================
function estiloGrupoTipo(feature, resolution) {
    var valueNUM = feature.get('END_N1_00') || '';
    var valueLETRA = feature.get("END_L1_00") || '';
    var valueCODVIA = feature.get('END_CV_00');
    var numero = valueNUM + valueLETRA;

    // Aquí usamos otra paleta de colores completamente distinta para el reborde

    var colorBorde = obtenerColorPorVia(valueCODVIA);
    var colorInterior = obtenerColorTextoDesdeRGBA(colorBorde);

    return [new ol.style.Style({
        text: new ol.style.Text({
            text: String(numero),
            font: "bold 13px sans-serif",
            fill: new ol.style.Fill({ color: colorInterior }),
            stroke: new ol.style.Stroke({ color: colorBorde, width: 3 })
        })
    })];
}



function obtenerColorPorVia(valueCODVIA) {
    // Diccionario de colores (más rápido y limpio que un switch gigante)
    const mapaColores = {

'10': 'rgba(200,81,123,0.494)',
'100': 'rgba(235,145,48,0.494)',
'101': 'rgba(56,230,149,0.494)',
'102': 'rgba(33,226,36,0.494)',
'103': 'rgba(50,201,183,0.494)',
'104': 'rgba(208,32,164,0.494)',
'106': 'rgba(26,193,219,0.494)',
'107': 'rgba(27,86,223,0.494)',
'109': 'rgba(62,233,202,0.494)',
'11': 'rgba(92,233,41,0.494)',
'110': 'rgba(216,196,107,0.494)',
'112': 'rgba(158,222,93,0.494)',
'113': 'rgba(70,210,65,0.494)',
'114': 'rgba(130,112,221,0.494)',
'115': 'rgba(66,167,239,0.494)',
'116': 'rgba(152,228,131,0.494)',
'117': 'rgba(105,53,237,0.494)',
'119': 'rgba(105,204,141,0.494)',
'12': 'rgba(230,57,138,0.494)',
'120': 'rgba(37,209,209,0.494)',
'121': 'rgba(205,14,37,0.494)',
'13': 'rgba(173,87,154,0.494)',
'14': 'rgba(189,212,57,0.494)',
'15': 'rgba(99,218,85,0.494)',
'16': 'rgba(201,199,105,0.494)',
'17': 'rgba(206,56,91,0.494)',
'18': 'rgba(170,204,114,0.494)',
'19': 'rgba(181,212,56,0.494)',
'2': 'rgba(218,154,44,0.494)',
'20': 'rgba(197,124,116,0.494)',
'21': 'rgba(45,52,172,0.494)',
'22': 'rgba(85,164,233,0.494)',
'23': 'rgba(113,178,206,0.494)',
'24': 'rgba(53,236,111,0.494)',
'25': 'rgba(134,224,188,0.494)',
'26': 'rgba(123,136,220,0.494)',
'27': 'rgba(190,101,66,0.494)',
'28': 'rgba(27,144,103,0.494)',
'29': 'rgba(220,76,158,0.494)',
'3': 'rgba(38,30,200,0.494)',
'30': 'rgba(46,76,211,0.494)',
'31': 'rgba(207,25,192,0.494)',
'32': 'rgba(41,161,32,0.494)',
'33': 'rgba(236,98,128,0.494)',
'34': 'rgba(134,205,89,0.494)',
'35': 'rgba(227,118,118,0.494)',
'36': 'rgba(133,209,234,0.494)',
'37': 'rgba(79,214,221,0.494)',
'38': 'rgba(21,205,55,0.494)',
'39': 'rgba(37,228,62,0.494)',
'4': 'rgba(222,108,232,0.494)',
'41': 'rgba(200,138,96,0.494)',
'42': 'rgba(229,90,162,0.494)',
'43': 'rgba(93,186,207,0.494)',
'45': 'rgba(225,186,67,0.494)',
'46': 'rgba(230,57,45,0.494)',
'47': 'rgba(120,217,45,0.494)',
'48': 'rgba(62,116,216,0.494)',
'49': 'rgba(97,203,106,0.494)',
'5': 'rgba(157,208,18,0.494)',
'50': 'rgba(38,166,130,0.494)',
'5001': 'rgba(52,167,90,0.494)',
'5002': 'rgba(99,165,61,0.494)',
'5003': 'rgba(73,206,71,0.494)',
'5004': 'rgba(158,10,74,0.494)',
'5005': 'rgba(121,188,88,0.494)',
'5006': 'rgba(235,71,153,0.494)',
'5007': 'rgba(100,96,217,0.494)',
'5008': 'rgba(171,176,77,0.494)',
'5009': 'rgba(160,88,109,0.494)',
'5010': 'rgba(191,69,130,0.494)',
'5011': 'rgba(110,63,210,0.494)',
'5012': 'rgba(198,16,140,0.494)',
'5013': 'rgba(52,25,254,0.494)',
'5014': 'rgba(44,141,85,0.494)',
'5015': 'rgba(18,91,140,0.494)',
'5016': 'rgba(166,63,142,0.494)',
'5017': 'rgba(12,83,197,0.494)',
'5050': 'rgba(82,225,151,0.494)',
'5053': 'rgba(68,213,112,0.494)',
'5054': 'rgba(163,133,222,0.494)',
'5055': 'rgba(182,109,227,0.494)',
'51': 'rgba(225,152,135,0.494)',
'52': 'rgba(179,51,193,0.494)',
'53': 'rgba(166,216,66,0.494)',
'54': 'rgba(227,44,233,0.494)',
'55': 'rgba(61,130,228,0.494)',
'56': 'rgba(121,205,156,0.494)',
'57': 'rgba(212,125,88,0.494)',
'58': 'rgba(240,175,140,0.494)',
'59': 'rgba(78,44,203,0.494)',
'6': 'rgba(90,203,33,0.494)',
'60': 'rgba(216,101,174,0.494)',
'63': 'rgba(196,34,225,0.494)',
'64': 'rgba(119,206,175,0.494)',
'65': 'rgba(203,194,68,0.494)',
'66': 'rgba(218,26,157,0.494)',
'67': 'rgba(224,36,89,0.494)',
'68': 'rgba(82,209,201,0.494)',
'69': 'rgba(190,168,79,0.494)',
'7': 'rgba(229,48,202,0.494)',
'70': 'rgba(178,83,212,0.494)',
'71': 'rgba(204,183,46,0.494)',
'72': 'rgba(110,81,214,0.494)',
'73': 'rgba(224,181,120,0.494)',
'74': 'rgba(174,91,99,0.494)',
'75': 'rgba(27,48,208,0.494)',
'76': 'rgba(46,213,146,0.494)',
'77': 'rgba(99,232,76,0.494)',
'78': 'rgba(94,148,210,0.494)',
'8': 'rgba(162,216,97,0.494)',
'80': 'rgba(206,178,111,0.494)',
'82': 'rgba(62,237,106,0.494)',
'83': 'rgba(229,75,127,0.494)',
'84': 'rgba(78,78,218,0.494)',
'86': 'rgba(144,74,229,0.494)',
'87': 'rgba(226,239,108,0.494)',
'89': 'rgba(213,64,89,0.494)',
'9': 'rgba(161,97,210,0.494)',
'90': 'rgba(205,47,110,0.494)',
'91': 'rgba(64,204,164,0.494)',
'93': 'rgba(223,151,129,0.494)',
'94': 'rgba(203,121,187,0.494)',
'95': 'rgba(207,158,114,0.494)',
'96': 'rgba(108,116,223,0.494)',
'97': 'rgba(184,129,235,0.494)',
'98': 'rgba(207,35,112,0.494)',
'99': 'rgba(228,62,222,0.494)',

'37': 'rgba(212,205,66,1.0)',
'38': 'rgba(235,117,109,1.0)',
'46': 'rgba(98,102,213,1.0)',
'48': 'rgba(205,47,118,1.0)',
'5001': 'rgba(234,89,181,1.0)',
'5002': 'rgba(205,48,202,1.0)',
'5003': 'rgba(155,226,80,1.0)',
'5004': 'rgba(117,136,206,1.0)',
'5005': 'rgba(194,218,39,1.0)',
'5006': 'rgba(147,110,229,1.0)',
'5007': 'rgba(211,150,60,1.0)',
'5008': 'rgba(162,240,122,1.0)',
'5009': 'rgba(55,202,84,1.0)',
'5010': 'rgba(71,209,221,1.0)',
'5011': 'rgba(183,234,63,1.0)',
'5012': 'rgba(44,222,174,1.0)',
'5013': 'rgba(70,169,205,1.0)',
'5014': 'rgba(184,132,240,1.0)',
'5015': 'rgba(203,105,30,1.0)',
'5016': 'rgba(216,47,64,1.0)',
'5017': 'rgba(94,202,74,1.0)',
'5018': 'rgba(210,18,172,1.0)',
'52': 'rgba(209,94,127,1.0)',
'55': 'rgba(179,33,205,1.0)',
'59': 'rgba(67,218,125,1.0)',
'65': 'rgba(118,224,121,1.0)',
'68': 'rgba(91,172,233,1.0)',
'69': 'rgba(54,205,137,1.0)',
'70': 'rgba(206,90,52,1.0)',
'71': 'rgba(37,207,190,1.0)',
'73': 'rgba(182,77,235,1.0)',
'74': 'rgba(57,31,231,1.0)',
'75': 'rgba(44,106,206,1.0)'


    };

    // Forzamos conversión a String para asegurar coincidencia exacta de la propiedad
    const clave = String(valueCODVIA);

    // Retorna el color del mapa. Si no se encuentra, aplica el default (negro)
    return mapaColores[clave] || 'rgba(255,255,255,1.000)';
}




var size = 0;
var placement = 'point';

var style_EibCcl_Numeracion_Catastro_3 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var valueCODVIA = feature.get("ENA_CV_00");
    var valueSGVIA = feature.get("EibCcl_Callejero_eibTipVia");
    var valueNOMVIA = feature.get("EibCcl_Callejero_eibNomVia");
    var nombreNUCLEO = String(valueCODVIA + " - " + valueSGVIA + " / " + valueNOMVIA)
    var valueNUM = feature.get("END_N1_00");
    var valueLETRA = feature.get("END_L1_00");
    var valueTIPO = feature.get("EN1_TIPO");
    var valueESTCONS = feature.get("ESTADOS_CONS_Estado_Conservacion");
    if (valueNUM == null) { 
       valueNUM = ""; 
    }
    if (valueLETRA == null) { 
       valueLETRA = ""; 
    }
/*    var labelFont = "bold 13px sans-serif";
    var labelFill = "#000000";
    var circleFill = "#4fc3f7";
    var bufferColor = "#aaaaaa";
    if (valueTIPO == "00_N1") {
    	circleFill = "#0d47a1";
    }
    if (valueESTCONS == "Bueno") {
    	bufferColor = "#2ca02c";
    	labelFill = "#ffffff"
    }
    if (valueESTCONS == "Regular") {
    bufferColor = "#ff7f00";
    labelFill = "#ffffff"
    }
    if (valueESTCONS == "Malo") {
    	bufferColor = "#e31a1c";
    	labelFill = "#ffffff"
    }
    if (valueESTCONS == "Ruina") {
    	bufferColor = "#984ea3";
    	labelFill = "#ffffff"
    }
*/
    
    var bufferWidth = 7;
    var textAlign = "left";
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'point';
    if ("" !== null) {
        labelText = String(valueNUM + valueLETRA);
    }
    var radioCirculo = 12;
    
   
    
/*        var style = [ 
        new ol.style.Style({
        image: new ol.style.Circle({
            radius: 10,
            displacement: [offsetX, offsetY],
            stroke: new ol.style.Stroke({
            color: circleFill,
            width: 3.5
        })
        })
    }),
    new ol.style.Style({
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor, bufferWidth)
    })];;
*/


/*
switch(String(valueCODVIA)) {

case '60': circleFill = 'rgba(255,96,17,1.0)'; break;
case '85': circleFill = 'rgba(221,237,127,1.0)'; break;
case '94': circleFill = 'rgba(136,111,225,1.0)'; break;
case '95': circleFill = 'rgba(203,199,80,1.0)'; break;
case '98': circleFill = 'rgba(109,230,48,1.0)'; break;
case '101': circleFill = 'rgba(135,211,55,1.0)'; break;
case '103': circleFill = 'rgba(236,178,79,1.0)'; break;
case '105': circleFill = 'rgba(215,62,41,1.0)'; break;
case '107': circleFill = 'rgba(224,25,171,1.0)'; break;
case '108': circleFill = 'rgba(71,153,200,1.0)'; break;
case '109': circleFill = 'rgba(182,114,207,1.0)'; break;
case '111': circleFill = 'rgba(77,123,239,1.0)'; break;
case '112': circleFill = 'rgba(205,171,35,1.0)'; break;
case '114': circleFill = 'rgba(102,213,79,1.0)'; break;
case '115': circleFill = 'rgba(18,200,18,1.0)'; break;
case '120': circleFill = 'rgba(102,202,227,1.0)'; break;
case '121': circleFill = 'rgba(18,116,228,1.0)'; break;
case '5002': circleFill = 'rgba(240,125,80,1.0)'; break;
case '5003': circleFill = 'rgba(231,121,24,1.0)'; break;
case '5004': circleFill = 'rgba(78,70,214,1.0)'; break;
case '5005': circleFill = 'rgba(237,122,225,1.0)'; break;
case '5006': circleFill = 'rgba(14,223,87,1.0)'; break;
case '5007': circleFill = 'rgba(33,220,161,1.0)'; break;
case '5008': circleFill = 'rgba(208,118,123,1.0)'; break;
case '5009': circleFill = 'rgba(129,141,233,1.0)'; break;
case '5010': circleFill = 'rgba(125,72,203,1.0)'; break;
case '5011': circleFill = 'rgba(216,81,135,1.0)'; break;
case '5016': circleFill = 'rgba(107,234,173,1.0)'; break;
case '5017': circleFill = 'rgba(134,18,222,1.0)'; break;
case '5018': circleFill = 'rgba(233,92,172,1.0)'; break;
case '5019': circleFill = 'rgba(156,215,28,1.0)'; break;
case '5020': circleFill = 'rgba(67,237,95,1.0)'; break;
case '5021': circleFill = 'rgba(212,44,227,1.0)'; break;
case '5022': circleFill = 'rgba(87,200,204,1.0)'; break;

    case '123': circleFill = 'rgba(179,48,240,1.000)'; break;
    case '24': circleFill = 'rgba(239,81,94,1.000)'; break;
    case '26': circleFill = 'rgba(168,237,31,1.000)'; break;
    case '49': circleFill = 'rgba(37,40,211,1.000)'; break;
    case '50': circleFill = 'rgba(61,204,166,1.000)'; break;
    case '5001': circleFill = 'rgba(127,200,54,1.000)'; break;
    case '5021': circleFill = 'rgba(93,234,222,1.000)'; break;
    case '51': circleFill = 'rgba(191,216,51,1.000)'; break;
    case '53': circleFill = 'rgba(38,226,145,1.000)'; break;
    case '55': circleFill = 'rgba(121,232,145,1.000)'; break;
    case '57': circleFill = 'rgba(219,29,143,1.000)'; break;
    case '58': circleFill = 'rgba(96,27,234,1.000)'; break;
    case '59': circleFill = 'rgba(110,175,229,1.000)'; break;
    case '60': circleFill = 'rgba(198,72,217,1.000)'; break;
    case '62': circleFill = 'rgba(133,119,202,1.000)'; break;
    case '64': circleFill = 'rgba(106,215,87,1.000)'; break;
    case '65': circleFill = 'rgba(232,68,197,1.000)'; break;
    case '67': circleFill = 'rgba(210,65,128,1.000)'; break;
    case '69': circleFill = 'rgba(201,109,75,1.000)'; break;
    case '7': circleFill = 'rgba(115,229,159,1.000)'; break;
    case '71': circleFill = 'rgba(202,84,71,1.000)'; break;
    case '76': circleFill = 'rgba(224,222,79,1.000)'; break;
    case '78': circleFill = 'rgba(25,152,202,1.000)'; break;
    case '79': circleFill = 'rgba(122,159,223,1.000)'; break;
    case '80': circleFill = 'rgba(236,200,58,1.000)'; break;
    case '83': circleFill = 'rgba(45,199,216,1.000)'; break;
    case '85': circleFill = 'rgba(212,23,70,1.000)'; break;
    case '86': circleFill = 'rgba(227,160,53,1.000)'; break;
    case '87': circleFill = 'rgba(231,129,228,1.000)'; break;
    case '88': circleFill = 'rgba(154,95,209,1.000)'; break;
    case '89': circleFill = 'rgba(51,234,57,1.000)'; break;
    case '90': circleFill = 'rgba(83,106,207,1.000)'; break;
    case '91': circleFill = 'rgba(88,233,20,1.000)'; break;
    default: circleFill = 'rgba(0,0,0,1.000)'; break;
}
*/


var style = [ 

/*
            // 1. EL C�RCULO
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radioCirculo,
                    displacement: [offsetX, offsetY], // Tu desplazamiento original del c�rculo
                    stroke: new ol.style.Stroke({
                        color: circleFill,
                        width: 3.5
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(0, 0, 0, 0)' // Centro totalmente transparente para ver el texto
                    })
                })
            }),
*/
            
            // 2. EL TEXTO PERFECTAMENTE CENTRADO
            new ol.style.Style({
                text: new ol.style.Text({
                    text: labelText,
                    font: labelFont,
                    fill: new ol.style.Fill({
                        color: obtenerColorTextoDesdeRGBA(circleFill)
                    }),
                    stroke: new ol.style.Stroke({
                        color: circleFill,
                        width: bufferWidth
                    }),
                    
                    // =========================================================
                    // LAS 4 PROPIEDADES CLAVE PARA EL CENTRADO ABSOLUTO
                    // =========================================================
                    textAlign: 'center',     // Fuerza el centro horizontal del texto
                    textBaseline: 'middle',  // Fuerza el centro vertical del texto
                    offsetX: offsetX,        // Sigue al c�rculo en el eje X
                    offsetY: -offsetY,       // Sigue al c�rculo en el eje Y (OpenLayers invierte el signo Y en el texto respecto a displacement)
                    // =========================================================
                    
                    placement: placement
                })
            })
        ];
    

    return style;
};
