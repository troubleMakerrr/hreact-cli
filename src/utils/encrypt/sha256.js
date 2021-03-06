function hex_sha256(a) {
    return rstr2hex(rstr_sha256(str2rstr_utf8(a))) }

function b64_sha256(a) {
    return rstr2b64(rstr_sha256(str2rstr_utf8(a))) }

function any_sha256(a, b) {
    return rstr2any(rstr_sha256(str2rstr_utf8(a)), b) }

function hex_hmac_sha256(a, b) {
    return rstr2hex(rstr_hmac_sha256(str2rstr_utf8(a), str2rstr_utf8(b))) }

function b64_hmac_sha256(a, b) {
    return rstr2b64(rstr_hmac_sha256(str2rstr_utf8(a), str2rstr_utf8(b))) }

function any_hmac_sha256(a, b, c) {
    return rstr2any(rstr_hmac_sha256(str2rstr_utf8(a), str2rstr_utf8(b)), c) }

function sha256_vm_test() {
    return "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad" == hex_sha256("abc").toLowerCase() }

function rstr_sha256(a) {
    return binb2rstr(binb_sha256(rstr2binb(a), 8 * a.length)) }

function rstr_hmac_sha256(a, b) {
    var d, e, f, g, c = rstr2binb(a);
    for (c.length > 16 && (c = binb_sha256(c, 8 * a.length)), d = Array(16), e = Array(16), f = 0; 16 > f; f++) d[f] = 909522486 ^ c[f], e[f] = 1549556828 ^ c[f];
    return g = binb_sha256(d.concat(rstr2binb(b)), 512 + 8 * b.length), binb2rstr(binb_sha256(e.concat(g), 768)) }

function rstr2hex(a) {
    var c, d, e, f;
    try {} catch (b) { hexcase = 0 }
    for (c = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", d = "", f = 0; f < a.length; f++) e = a.charCodeAt(f), d += c.charAt(15 & e >>> 4) + c.charAt(15 & e);
    return d }

function rstr2b64(a) {
    var c, d, e, f, g, h;
    try {} catch (b) { b64pad = "" }
    for (c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", d = "", e = a.length, f = 0; e > f; f += 3)
        for (g = a.charCodeAt(f) << 16 | (e > f + 1 ? a.charCodeAt(f + 1) << 8 : 0) | (e > f + 2 ? a.charCodeAt(f + 2) : 0), h = 0; 4 > h; h++) d += 8 * f + 6 * h > 8 * a.length ? b64pad : c.charAt(63 & g >>> 6 * (3 - h));
    return d }

function rstr2any(a, b) {
    var e, f, g, h, j, k, c = b.length,
        d = Array(),
        i = Array(Math.ceil(a.length / 2));
    for (e = 0; e < i.length; e++) i[e] = a.charCodeAt(2 * e) << 8 | a.charCodeAt(2 * e + 1);
    for (; i.length > 0;) {
        for (h = Array(), g = 0, e = 0; e < i.length; e++) g = (g << 16) + i[e], f = Math.floor(g / c), g -= f * c, (h.length > 0 || f > 0) && (h[h.length] = f);
        d[d.length] = g, i = h }
    for (j = "", e = d.length - 1; e >= 0; e--) j += b.charAt(d[e]);
    for (k = Math.ceil(8 * a.length / (Math.log(b.length) / Math.log(2))), e = j.length; k > e; e++) j = b[0] + j;
    return j }

function str2rstr_utf8(a) {
    for (var d, e, b = "", c = -1; ++c < a.length;) d = a.charCodeAt(c), e = c + 1 < a.length ? a.charCodeAt(c + 1) : 0, d >= 55296 && 56319 >= d && e >= 56320 && 57343 >= e && (d = 65536 + ((1023 & d) << 10) + (1023 & e), c++), 127 >= d ? b += String.fromCharCode(d) : 2047 >= d ? b += String.fromCharCode(192 | 31 & d >>> 6, 128 | 63 & d) : 65535 >= d ? b += String.fromCharCode(224 | 15 & d >>> 12, 128 | 63 & d >>> 6, 128 | 63 & d) : 2097151 >= d && (b += String.fromCharCode(240 | 7 & d >>> 18, 128 | 63 & d >>> 12, 128 | 63 & d >>> 6, 128 | 63 & d));
    return b }

function str2rstr_utf16le(a) {
    var c, b = "";
    for (c = 0; c < a.length; c++) b += String.fromCharCode(255 & a.charCodeAt(c), 255 & a.charCodeAt(c) >>> 8);
    return b }

function str2rstr_utf16be(a) {
    var c, b = "";
    for (c = 0; c < a.length; c++) b += String.fromCharCode(255 & a.charCodeAt(c) >>> 8, 255 & a.charCodeAt(c));
    return b }

function rstr2binb(a) {
    var c, b = Array(a.length >> 2);
    for (c = 0; c < b.length; c++) b[c] = 0;
    for (c = 0; c < 8 * a.length; c += 8) b[c >> 5] |= (255 & a.charCodeAt(c / 8)) << 24 - c % 32;
    return b }

function binb2rstr(a) {
    var c, b = "";
    for (c = 0; c < 32 * a.length; c += 8) b += String.fromCharCode(255 & a[c >> 5] >>> 24 - c % 32);
    return b }

function sha256_S(a, b) {
    return a >>> b | a << 32 - b }

function sha256_R(a, b) {
    return a >>> b }

function sha256_Ch(a, b, c) {
    return a & b ^ ~a & c }

function sha256_Maj(a, b, c) {
    return a & b ^ a & c ^ b & c }

function sha256_Sigma0256(a) {
    return sha256_S(a, 2) ^ sha256_S(a, 13) ^ sha256_S(a, 22) }

function sha256_Sigma1256(a) {
    return sha256_S(a, 6) ^ sha256_S(a, 11) ^ sha256_S(a, 25) }

function sha256_Gamma0256(a) {
    return sha256_S(a, 7) ^ sha256_S(a, 18) ^ sha256_R(a, 3) }

function sha256_Gamma1256(a) {
    return sha256_S(a, 17) ^ sha256_S(a, 19) ^ sha256_R(a, 10) }

function sha256_Sigma0512(a) {
    return sha256_S(a, 28) ^ sha256_S(a, 34) ^ sha256_S(a, 39) }

function sha256_Sigma1512(a) {
    return sha256_S(a, 14) ^ sha256_S(a, 18) ^ sha256_S(a, 41) }

function sha256_Gamma0512(a) {
    return sha256_S(a, 1) ^ sha256_S(a, 8) ^ sha256_R(a, 7) }

function sha256_Gamma1512(a) {
    return sha256_S(a, 19) ^ sha256_S(a, 61) ^ sha256_R(a, 6) }

function binb_sha256(a, b) {
    var e, f, g, h, i, j, k, l, m, n, o, p, c = new Array(1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225),
        d = new Array(64);
    for (a[b >> 5] |= 128 << 24 - b % 32, a[(b + 64 >> 9 << 4) + 15] = b, m = 0; m < a.length; m += 16) {
        for (e = c[0], f = c[1], g = c[2], h = c[3], i = c[4], j = c[5], k = c[6], l = c[7], n = 0; 64 > n; n++) d[n] = 16 > n ? a[n + m] : safe_add(safe_add(safe_add(sha256_Gamma1256(d[n - 2]), d[n - 7]), sha256_Gamma0256(d[n - 15])), d[n - 16]), o = safe_add(safe_add(safe_add(safe_add(l, sha256_Sigma1256(i)), sha256_Ch(i, j, k)), sha256_K[n]), d[n]), p = safe_add(sha256_Sigma0256(e), sha256_Maj(e, f, g)), l = k, k = j, j = i, i = safe_add(h, o), h = g, g = f, f = e, e = safe_add(o, p);
        c[0] = safe_add(e, c[0]), c[1] = safe_add(f, c[1]), c[2] = safe_add(g, c[2]), c[3] = safe_add(h, c[3]), c[4] = safe_add(i, c[4]), c[5] = safe_add(j, c[5]), c[6] = safe_add(k, c[6]), c[7] = safe_add(l, c[7]) }
    return c }

function safe_add(a, b) {
    var c = (65535 & a) + (65535 & b),
        d = (a >> 16) + (b >> 16) + (c >> 16);
    return d << 16 | 65535 & c }
var hexcase = 0,
    b64pad = "",
    sha256_K = new Array(1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998);

module.exports = {
    hex_sha256 : hex_sha256
};
