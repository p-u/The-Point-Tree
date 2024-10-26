
function exponentialFormat(num, precision, mantissa = true) {
    if (precision > 100) precision = 100
	if (precision < 0) precision = 0
    let e = num.log10().floor()
    let m = num.div(Decimal.pow(10, e))
    if (m.toStringWithDecimalPlaces(precision) == 10) {
        m = decimalOne
        e = e.add(1)
    }
    let elimit = new Decimal(1e12)
    let amtdp = options.dp
    e = (e.gte(elimit) ? format(e, amtdp) : (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0)))
    if (mantissa)
        return m.toStringWithDecimalPlaces(precision) + "e" + e
    else return "e" + e
}

function commaFormat(num, precision) {
    if (precision > 100) precision = 100
	if (precision < 0) precision = 0
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.001) return (0).toFixed(precision)
    let init = num.toStringWithDecimalPlaces(precision)
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    if (portions.length == 1) return portions[0]
    return portions[0] + "." + portions[1]
}

function minigameFormat(num, precision) {
    if (precision > 100) precision = 100
	if (precision < 0) precision = 0
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.0001) return (0).toFixed(precision)
    if (num.mag < 0.1 && precision !==0) precision = Math.max(precision, 4)
    if (num.mag > 0.0001) precision = (options.dp + 4)
    return num.toStringWithDecimalPlaces(precision)
}

function regularFormat(num, precision) {
    if (precision > 100) precision = 100
	if (precision < 0) precision = 0
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.0001) return (0).toFixed(precision)
    if (num.mag < 0.1 && precision !==0) precision = Math.max(precision, 4)
    return num.toStringWithDecimalPlaces(precision)
}

function fixValue(x, y = 0) {
    return x || new Decimal(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return decimalZero
    return x.reduce((a, b) => Decimal.add(a, b))
}

function notationChooser(decimal) {
    if (options.notation === 'infinity') { 
        return infinityFormat(decimal) 
    } else {
        return format(decimal)
    }  
}

function notationChooserMinigame(decimal) {
    if (options.notation === 'infinity') { 
        return infinityFormat(decimal) 
    } else {
        return minigameFormat(decimal)
    }  
}

function infinityFormat(decimal) {
    const pow1024 = new Decimal(2).pow(1024);
    if (decimal.lt(pow1024)) {
        return formatWhole(decimal);
    }
    if (decimal.lt(pow1024.pow(1e13))) {
        return formatWhole(decimal.div(pow1024.pow(decimal.log(pow1024).floor()))) + "*" + format(decimal.log(pow1024).floor()) + "∞"
    }
    if (decimal.lt(pow1024.tetrate(4))) {
        return format(decimal.log(pow1024).floor()) + "∞" // added beacuse what's the point of showing 1* at the start
    }
    return "∞^(" + decimal.slog(pow1024) + ")" // very specific
}


function format(decimal, precision = options.dp, small) {
    if (precision > 100) precision = 100
	if (precision < 0) precision = 0
    small = small || modInfo.allowSmall
    decimal = new Decimal(decimal)
    if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
        player.hasNaN = true;
        return "NaN"
    }
    if (decimal.sign < 0) return "-" + format(decimal.neg(), precision, small)
    if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
    if (decimal.gte("eeee1000")) {
        var slog = decimal.slog()
        if (slog.gte(1e6)) return "F" + format(slog.floor())
        else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "F" + commaFormat(slog.floor(), 0)
    }
    else if (options.formatE === '3' && decimal.gte("1e1000")) return exponentialFormat(decimal, 0, false)
    else if (options.formatE === '15' && decimal.gte("1ee15")) return exponentialFormat(decimal, 0, false) 
    else if (options.formatE === '9' && decimal.gte("1ee9")) return exponentialFormat(decimal, 0, false) 
    else if (options.formatE === '6' && decimal.gte("1ee6")) return exponentialFormat(decimal, 0, false) 
    else if (decimal.gte("1ee12")) return exponentialFormat(decimal, 0, false)
    else if (decimal.gte("1e10000")) return exponentialFormat(decimal, 0)
    else if (decimal.gte(1e12)) return exponentialFormat(decimal, precision)
    else if (decimal.gte(1)) {
        if ((decimal.sub(Math.floor(decimal))).eq(0)) {
            return commaFormat(decimal, 0)
        } else {
            return commaFormat(decimal, 4)
        }
    }
    else if (decimal.gte(0.0001) || !small) return regularFormat(decimal, precision)
    else if (decimal.eq(0)) return (0).toFixed(precision)

    decimal = invertOOM(decimal)
    let val = ""
    if (decimal.lt("1e1000")){
        val = exponentialFormat(decimal, precision)
        return val.replace(/([^(?:e|F)]*)$/, '-$1')
    }
    else   
        return format(decimal, precision) + "⁻¹"

}

function formatWhole(decimal) {
    decimal = new Decimal(decimal)
    if (decimal.gte(1e12)) return format(decimal)
    if (decimal.lte(0.99) && !decimal.eq(0)) return format(decimal)
    return format(decimal)
}

function formatTime(s) {
    if (s < 60) return (Math.floor(s)) + "s " + ((s % 1) * 1000).toPrecision(3) + "ms"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return formatWhole(Math.floor(s / 31536000)) + "yrs " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}

function toPlaces(x, precision, maxAccepted) {
    if (precision > 100) precision = 100
	if (precision < 0) precision = 0
    x = new Decimal(x)
    let result = x.toStringWithDecimalPlaces(precision)
    if (new Decimal(result).gte(maxAccepted)) {
        result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
    }
    return result
}

// Will also display very small numbers
function formatSmall(x, precision=2) { 
    return format(x, precision, true)    
}

function invertOOM(x){
    let e = x.log10().ceil()
    let m = x.div(Decimal.pow(10, e))
    e = e.neg()
    x = new Decimal(10).pow(e).times(m)

    return x
}