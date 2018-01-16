var tl = TweenLite;

// load XML
var xhr;
if (window.XMLHttpRequest) xhr = new XMLHttpRequest(); 		// all browsers except IE
else xhr = new ActiveXObject("Microsoft.XMLHTTP"); 		// for IE
xhr.open('GET', 'https://secure.img-cdn.mediaplex.com/0/18916/lt-generator.xml');
xhr.onreadystatechange = function () {
	if (xhr.readyState===4 && xhr.status===200) {
        // update HTML content in ad with XML
		header2.innerHTML = String(xhr.responseXML.getElementsByTagName('apr')[1].firstChild.nodeValue).substr(0,5);
	}
}
xhr.send();

// intro animations
tl.to(banner, 0.5, { opacity:1, ease:Power0.easeNone });
// ---------------------
tl.to(header1, 1, { left:0, opacity:1, ease:Power4.easeOut, delay:0.1 });
tl.to(header2, 1, { left:0, opacity:1, ease:Power4.easeOut, delay:0.3 });
tl.to(header3, 1, { left:0, opacity:1, ease:Power4.easeOut, delay:0.5 });
tl.to(title1, 1, { opacity:1, ease:Power4.easeOut, delay:0.5 });
tl.to(labelcash, 1, { opacity:1, ease:Power4.easeOut, delay:0.5 });
tl.to(slider1, 1, { opacity:1, ease:Power0.easeNone, delay:0.5 });
tl.to(pivot1, 1, { opacity:1, ease:Power0.easeNone, delay:0.5 });
// cta
tl.to(cta, 0.5, { right:14, opacity:1, ease:Back.easeOut, delay:2.5 });
tl.to(shine, 0.9, { left:320, ease:Power0.easeNone, delay:3.5, onComplete:resetShine });

// repeated animation 1
// out
tl.to(header1, 0.8, { left:-250, opacity:0, ease:Power4.easeIn, delay:6 });
tl.to(header2, 0.8, { left:250, opacity:0, ease:Power4.easeIn, delay:6 });
tl.to(header3, 0.8, { left:-250, opacity:0, ease:Power4.easeIn, delay:6 });
// set
tl.set(header1, { left:250, delay:6.9 });
tl.set(header2, { left:-250, delay:6.9 });
tl.set(header3, { left:250, delay:6.9 });
// in
tl.to(header1, 1, { left:0, opacity:1, ease:Power4.easeOut, delay:7 });
tl.to(header2, 1, { left:0, opacity:1, ease:Power4.easeOut, delay:7.2 });
tl.to(header3, 1, { left:0, opacity:1, ease:Power4.easeOut, delay:7.4 });
tl.to(shine, 0.9, { left:320, ease:Power0.easeNone, delay:8, onComplete:resetShine });

// repeated animation 2
// out
tl.to(header1, 0.8, { left:-250, opacity:0, ease:Power4.easeIn, delay:12 });
tl.to(header2, 0.8, { left:250, opacity:0, ease:Power4.easeIn, delay:12 });
tl.to(header3, 0.8, { left:-250, opacity:0, ease:Power4.easeIn, delay:12 });
// set
tl.set(header1, { left:250, delay:12.9 });
tl.set(header2, { left:-250, delay:12.9 });
tl.set(header3, { left:250, delay:12.9 });
// in
tl.to(header1, 1, { left:0, opacity:1, ease:Power4.easeOut, delay:13 });
tl.to(header2, 1, { left:0, opacity:1, ease:Power4.easeOut, delay:13.2 });
tl.to(header3, 1, { left:0, opacity:1, ease:Power4.easeOut, delay:13.4 });
tl.to(shine, 0.9, { left:320, ease:Power0.easeNone, delay:14, onComplete:resetShine });


function resetShine() {
    shine.style.left = '-220px';
}

// get slider values
function spliceStr(str, index, count, add) {
  return str.slice(0, index) + (add || "") + str.slice(index + count);
}

function getCash() {
	var cash = labelcash.innerHTML;
	return spliceStr(cash.replace(/[,]+/g, ''), 0, 1);
}

// main hit clickTAG functions
hitClick = function(e) {
    window.open(clickTAG + "&estproperty-value=" + getCash() + "&purchase-price=" + getCash(), "_blank");
}

hitOver = function(e) {
    cta.style.backgroundPosition = "0 -35px";
}
hitOut = function(e) {
    cta.style.backgroundPosition = "0 0px";
}

hit.addEventListener('mouseover', hitOver);
hit.addEventListener('mouseout', hitOut);
hit.addEventListener('click', hitClick);

// slider behavior

var activePivot, activeValue, activeArrow, activeSetValue;
var dragging = false;
var drag_x;

function setSlider1Value(value) {
    if (value <= 0.005) {
        value = 0.005;
    }
    if (value > 0.223 && value < 0.226) {
        value = 0.225;
    }
	var pvalue = Math.round(value * 1000);
	if (pvalue > 0)
		pvalue += '000';
	else
		pvalue += '';
	var formatted = '';
	var i = pvalue.length;
	var c = 0;
	while (i--) {
		formatted += pvalue[i];
		c++;
		if (i > 0 && c === 3) {
			formatted += ',';
			c = 0;
		}
	}
	var pstr = '$' + formatted.split('').reverse().join('');
	labelcash.innerHTML = pstr;
}

function setSliderPos(x, pivot, value_element, arrow, setvalue) {
	pivot.style.left = (x + 3) + 'px';
	var value = x / 214;
	value_element.style.width = (x - 1) + 'px';
	setvalue(value);
}

function sliderMDown(e, pivot, value, arrow, setValueFunc) {
	if (e.preventDefault)
		e.preventDefault();
	if (!pivot.hasAttribute('data-enabled'))
		return;
	dragging = true;
	activePivot = pivot;
	activeValue = value;
	activeArrow = arrow;
	activeSetValue = setValueFunc;
	drag_x = e.clientX - parseInt(pivot.style.left);
}

function sliderMMove(e) {
	if (e.preventDefault)
		e.preventDefault();
	if (dragging) {
		var new_x = e.clientX - drag_x;
		if (new_x < 3) {
			new_x = 3;
		}
		else if (new_x > 216) {
			new_x = 216;
		}
		setSliderPos(new_x - 2, activePivot, activeValue, activeArrow, activeSetValue);
	}
}

function sliderMUp(e) {
	if (e.preventDefault)
		e.preventDefault();
	if (dragging) {
		dragging = false;
	}
}

pivot1.addEventListener('mousedown', function(e) { 
	if (sliderAnim1) {
		sliderAnim1.kill();
		sliderAnim1 = null;
		pivot1.setAttribute('data-enabled', true);
	}
	sliderMDown(e, pivot1, svalue1, arrow1, setSlider1Value);
});
pivot1Over = function(e) {
    pivot1.style.backgroundPosition = "0 -37px";
}
pivot1Out = function(e) {
    pivot1.style.backgroundPosition = "0 0px";
}
pivot1.addEventListener('mouseover', pivot1Over, false);
pivot1.addEventListener('mouseout', pivot1Out, false);
window.addEventListener('mousemove', function(e) { sliderMMove(e); });
window.addEventListener('mouseup', function(e) { sliderMUp(e); });

// init

setSliderPos(0, pivot1, svalue1, arrow1, setSlider1Value);

// anim
var pos = [0, 0];
var sliderAnim1;
sliderAnim1 = tl.to(pos, 2.2, {
	0: 48,
	ease: Back.easeOut,
	onUpdate: function() {
		var value = pos[0];
		setSliderPos(value, pivot1, svalue1, arrow1, setSlider1Value);
	},
	delay: 0.6,
	onComplete: function() {
        pivot1.setAttribute('data-enabled', true);
	}
});