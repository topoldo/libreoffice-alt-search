

//constants
const cMriz = '#', cLoad = 'load', cBackground = 'background', cInput = 'input', cMouseup = 'mouseup', cTouchend = 'touchend', cString = 'string', cRem = 'rem'

//CSS
const CSSpadding = 'PADDING', IDlabPadding = 'labPADDING'

//items for LocalStorage
const LSaltSearchPADDING = 'AltSearchPADDING'



TypoInit()
window.addEventListener(cLoad, onLoad)

//CSS
function cssSet(sName, sHodn, element = document.documentElement) { //set CSS --variable
	element.style.setProperty(`--${sName}`, sHodn)
}

//LOCALSTORAGE
function LSread(item, s0 = null) { //read property from LocalStorage; use s0 if the property isn't in LS
	try {
		let s = localStorage.getItem(item)
		if (s == null) { //no item in LS
			s = s0 //use default value
			LSsave(item, s) //save default value to LS
		}
		return +s //return as number
	} catch (e) { return +s0 }
}

function LSsave(sItem, s) { //save to LocalStorage
	try {
		localStorage.setItem(sItem, s)
	} catch (e) { }
}

//ONLOAD
function onLoad() {
	//oninput to progressbar
	const oProgress = x(CSSpadding), oLabel = x(IDlabPadding)
	oProgress.value = oLabel.textContent = LSread(LSaltSearchPADDING, 6)
	TypoProgressZmena(oProgress)
	oProgress.addEventListener(cInput, (event) => { TypoProgressZmena(event.target, true) })
	oProgress.addEventListener(cMouseup, (event) => { TypoProgressZmena(event.target, true) })
	oProgress.addEventListener(cTouchend, (event) => { TypoProgressZmena(event.target, true) })
}


//TYPOGRAPHY
function TypoInit() { //run still in <head>
	const s = LSread(LSaltSearchPADDING, 6) //read from LocalStorage
	cssSet(CSSpadding, s + cRem)
}

function TypoMinus(but) { //<button> -
	const inp = but.nextElementSibling, a = inp.valueAsNumber
	if (a > Number(inp.min)) {
		inp.value = a - Number(inp.step)
		TypoProgressZmena(inp, true)
	}
}

function TypoPlus(but) { //<button> +
	const inp = but.previousElementSibling, a = inp.valueAsNumber
	if (a < Number(inp.max)) {
		inp.value = a + Number(inp.step)
		TypoProgressZmena(inp, true)
	}
}

function TypoProgressZmena(oProgress, bCss = false) { //set color of progress bar
	const sId = oProgress.id,
		koef = +oProgress.max - +oProgress.min,
		iValue = +oProgress.value,
		a = ((iValue - +oProgress.min) / koef) * 100,
		oLabel = x(IDlabPadding)
	y(oProgress, cBackground, `linear-gradient(to right, var(--bProgressRange) ${a}%, var(--bProgressSv) ${a}%)`)
	if (bCss) {
		LSsave(LSaltSearchPADDING, iValue) //save to LocalStorage
		cssSet(sId, iValue + cRem)
		oLabel.textContent = iValue
	}
}

//OPERATIONS WITH ELEMENTS
function x(obj, element = document) { //return object with ID from element
	return typeof obj == cString ? element.querySelector(cMriz + obj) : obj
}

function y(sId, sProperty, value) { //set property to object
	x(sId).style[sProperty] = value
}