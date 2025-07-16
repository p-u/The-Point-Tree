
function exponentialFormat(num, precision, mantissa = true) {
    let e = num.log10().floor()
    let m = num.div(Decimal.pow(10, e))
    if (m.toStringWithDecimalPlaces(precision) == 10) {
        m = decimalOne
        e = e.add(1)
    }
    e = (e.gte(1e12) ? format(e, 7) : (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0)))
    if (mantissa)
        return m.toStringWithDecimalPlaces(precision) + "e" + e
    else return "e" + e
}

function standardFormat(num, precision = 3) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.0001) return (0).toFixed(precision)
    if (num.lt(1e3)) return num.toStringWithDecimalPlaces(precision)

    const STANDARD_SUFFIXES = [
        "", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No",
    ];

    let e = num.log10().floor().toNumber();
    let tier = Math.floor(e / 3);

    if (tier < STANDARD_SUFFIXES.length) {
        let m = num.div(Decimal.pow(10, tier * 3)).toStringWithDecimalPlaces(precision);
        return `${m}${STANDARD_SUFFIXES[tier]}`
    }

    const ONES = ["", "U", "D", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No"]
    const TENS = ["", "De", "Vg", "Tg", "Qa", "Qt", "Sxg", "Spg", "Ocg", "Ng"]
    const HUNDREDS = ["", "Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]

    function generateSuffix(tier) {
        tier -= 1
        if (tier < 1000) {
            let one = tier % 10
            let ten = Math.floor(tier / 10) % 10
            let hundred = Math.floor(tier / 100) % 10

            let suffix = ONES[one] + TENS[ten] + HUNDREDS[hundred]
            return suffix
        } else {
            let one = tier % 10;
            let ten = Math.floor(tier / 10) % 10;
            let hundred = Math.floor(tier / 100) % 10;
            let thousand = Math.floor(tier / 1000) % 10;
            let tthousand = Math.floor(tier / 10000) % 10;
            let hthousand = Math.floor(tier / 1e5) % 10;
            let million = Math.floor(tier / 1e6) % 10;
            let tmillion = Math.floor(tier / 1e7) % 10;
            let hmillion = Math.floor(tier / 1e8) % 10;
            let billion = Math.floor(tier / 1e9) % 10;
            let tbillion = Math.floor(tier / 1e10) % 10;
            let hbillion = Math.floor(tier / 1e11) % 10;
            let trillion = Math.floor(tier / 1e12) % 10;
            let ttrillion = Math.floor(tier / 1e13) % 10;
            let htrillion = Math.floor(tier / 1e14) % 10;
            let quintillion = Math.floor(tier / 1e15) % 10;
            let tquintillion = Math.floor(tier / 1e16) % 10;
            let hquintillion = Math.floor(tier / 1e17) % 10;
            let sextillion = Math.floor(tier / 1e18) % 10;
            let tsextillion = Math.floor(tier / 1e19) % 10;
            let hsextillion = Math.floor(tier / 1e20) % 10;
            let septillion = Math.floor(tier / 1e21) % 10;
            let tseptillion = Math.floor(tier / 1e22) % 10;
            let hseptillion = Math.floor(tier / 1e23) % 10;
            let octillion = Math.floor(tier / 1e24) % 10;
            let toctillion = Math.floor(tier / 1e25) % 10;
            let hoctillion = Math.floor(tier / 1e26) % 10;
            if (tier < 1e6) {
                let suffix = ONES[thousand] + TENS[tthousand] + HUNDREDS[hthousand] + "Mi" + ONES[one] + TENS[ten] + HUNDREDS[hundred];
                return suffix;
            } else if (tier < 1e9) {
                let suffix = ONES[million] + TENS[tmillion] + HUNDREDS[hmillion] + "Mc" + ONES[thousand] + TENS[tthousand] + HUNDREDS[hthousand] + "Mi" + ONES[one] + TENS[ten] + HUNDREDS[hundred];
                return suffix;
            } else if (tier < 1e12) {
                let suffix = ONES[billion] + TENS[tbillion] + HUNDREDS[hbillion] + "Na" + ONES[million] + TENS[tmillion] + HUNDREDS[hmillion] + "Mc" + ONES[thousand] + TENS[tthousand] + HUNDREDS[hthousand] + "Mi" + ONES[one] + TENS[ten] + HUNDREDS[hundred];
                return suffix;
            } else if (tier < 1e15) {
                let suffix = ONES[trillion] + TENS[ttrillion] + HUNDREDS[htrillion] + "Pc" + ONES[billion] + TENS[tbillion] + HUNDREDS[hbillion] + "Na" + ONES[million] + TENS[tmillion] + HUNDREDS[hmillion] + "Mc" + ONES[thousand] + TENS[tthousand] + HUNDREDS[hthousand] + "Mi" + "...";
                return suffix;
            } else if (tier < 1e18) {
                let suffix = ONES[quintillion] + TENS[tquintillion] + HUNDREDS[hquintillion] + "Fm" + ONES[trillion] + TENS[ttrillion] + HUNDREDS[htrillion] + "Pc" + ONES[billion] + TENS[tbillion] + HUNDREDS[hbillion] + "Na" + ONES[million] + TENS[tmillion] + HUNDREDS[hmillion] + "Mc" + "...";
                return suffix;
            } else if (tier < 1e21) {
                let suffix = ONES[sextillion] + TENS[tsextillion] + HUNDREDS[hsextillion] + "At" + ONES[quintillion] + TENS[tquintillion] + HUNDREDS[hquintillion] + "Fm" + ONES[trillion] + TENS[ttrillion] + HUNDREDS[htrillion] + "Pc" + ONES[billion] + TENS[tbillion] + HUNDREDS[hbillion] + "Na" + "...";
                return suffix;
            } else if (tier < 1e24) {
                let suffix = ONES[septillion] + TENS[tseptillion] + HUNDREDS[hseptillion] + "Zp" + ONES[sextillion] + TENS[tsextillion] + HUNDREDS[hsextillion] + "At" + ONES[quintillion] + TENS[tquintillion] + HUNDREDS[hquintillion] + "Fm" + ONES[trillion] + TENS[ttrillion] + HUNDREDS[htrillion] + "Pc" + "...";
                return suffix;
            } else if (tier < 1e27) {
                let suffix = ONES[octillion] + TENS[toctillion] + HUNDREDS[hoctillion] + "Yc" + ONES[septillion] + TENS[tseptillion] + HUNDREDS[hseptillion] + "Zp" + ONES[sextillion] + TENS[tsextillion] + HUNDREDS[hsextillion] + "At" + ONES[quintillion] + TENS[tquintillion] + HUNDREDS[hquintillion] + "Fm" + "...";
                return suffix;
            }
        }
    }

    if (tier < 1e27) {
        let m = num.div(Decimal.pow(10, tier * 3)).toStringWithDecimalPlaces(precision);
        return `${m}${generateSuffix(tier)}`
    } else {
        return format(num, precision)
    }
}


function commaFormat(num, precision) {
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

function notationChooser(decimal, precision=3) {
    if (options.notation === 'infinity') { 
        return infinityFormat(decimal) 
    } else if (options.notation === 'default'){
        return format(decimal, precision)
    } else {
        return standardFormat(decimal, precision)
    }
}

function notationChooserMinigame(decimal) {
    if (options.notation === 'infinity') { 
        return infinityFormat(decimal) 
    } else if (options.notation === 'default'){
        return format(decimal, precision=6)
    } else {
        return standardFormat(decimal, precision=6)
    }
}

function infinityFormat(decimal) {
    const pow1024 = new Decimal(2).pow(1024);
    if (decimal.lt(pow1024)) {
        return formatWhole(decimal);
    }
    if (decimal.lt(pow1024.pow(1e12))) {
        return formatWhole(decimal.div(pow1024.pow(decimal.log(pow1024).floor()))) + "*" + format(decimal.log(pow1024).floor()) + "∞"
    }
    if (decimal.lt(pow1024.tetrate(4))) {
        return format(decimal.log(pow1024).floor()) + "∞" // added beacuse what's the point of showing 1* at the start
    }
    return "∞^(" + decimal.slog(pow1024) + ")" // very specific
}


function format(decimal, precision = 3, small) {
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
    else if (decimal.gte("1e1000000")) return exponentialFormat(decimal, 0, false)
    else if (decimal.gte("1e10000")) return exponentialFormat(decimal, 0)
    else if (decimal.gte(1e9)) return exponentialFormat(decimal, precision)
    else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
    else if (decimal.gte(1)) {
        if ((decimal.sub(Math.floor(decimal))).eq(0)) {
            return commaFormat(decimal, 0)
        } else {
            return commaFormat(decimal, 3)
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
    if (decimal.gte(1e9)) return format(decimal, 2)
    if (decimal.lte(0.99) && !decimal.eq(0)) return format(decimal, 2)
    return format(decimal, 0)
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