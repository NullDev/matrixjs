/////////////////////////////////////
//                                 //
// ############################### //
// #-----------------------------# //
// #-     +++ MATRIX.js +++     -# //
// #-----------------------------# //
// #-   Copyright (c) NullDev   -# //
// #- github.com/NLDev/matrixjs -# //
// #-     Licensed under MIT    -# //
// #-----------------------------# //
// ############################### //
//                                 //
/////////////////////////////////////

var letters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユ42ヨラリルレロワヰヱヲンㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄒㄓㄔㄕㄗㄘㄙㄚㄛㄜㄝㄞㄠㄡㄢㄣㄤㄥㄦㄨㄩㄪㄫㄬ",
    chrSetPow = letters.length,
    fontSize, textX, textY,
    currentTime,
    context,
    timer,
    mapW, mapH,
    maxPause, maxDropRdmArg, maxDropsINColumn, refreshDelay,
    matrixMap = [],
    completedFromLeft,
    minWidth, minHeight,
    windowWidth, windowHeight,
    canvas,
    charText = ["",
                "",
                "",
                "",
                ""
    ],
    mDropsCount   = "mDropsCount",   mActive     = "mActive",     mType       = "mType",       mPauseValue      = "mPauseValue",
    mCurrentPause = "mCurrentPause", mGreen      = "mGreen",      mWhite      = "mWhite",      mSymbol          = "mSymbol",
    mText         = "mText",         mTextActive = "mTextActive", mColumnUsed = "mColumnUsed", mColumnUsedCount = "mColumnUsedCount", mFade = "mFade";
function get_random_int(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function get_random_spawn_x() {
    var randPosX = get_random_int(0, mapW);
    if (maxDropsINColumn != 1 && matrixMap[randPosX][mActive]) {
        if (get_random_int(0, 2) == 1) {
            for (var i = completedFromLeft; i <= mapW; ++i) {
                if (!matrixMap[i][mActive]) {
                    randPosX = i;
                    completedFromLeft = i;
                    break;
                }
            }
        }
    }
    return randPosX;
}
function get_random_char() {
    var idx = get_random_int(0, chrSetPow - 1);
    return letters.slice(idx, idx + 1);
}
function config_second_phase() {
    maxDropRdmArg    = 5;
    maxDropsINColumn = 1;
    refreshDelay     = 33;
}
function spawn_new_drop() {
    var randPosX = get_random_spawn_x();
    for (var i = 0; i != 10 && matrixMap[randPosX][mDropsCount] >= maxDropsINColumn; ++i) randPosX = get_random_int(0, mapW);
    if (matrixMap[randPosX][mDropsCount] < maxDropsINColumn) {
        matrixMap[randPosX][0][mType]         = 1;
        matrixMap[randPosX][0][mPauseValue]   = get_random_int(0, maxPause);
        matrixMap[randPosX][0][mCurrentPause] = matrixMap[randPosX][0][mPauseValue];
        matrixMap[randPosX][0][mWhite]        = 250;
        matrixMap[randPosX][0][mGreen]        = 0;
        matrixMap[randPosX][0][mSymbol]       = get_random_char();
        matrixMap[randPosX][0][mFade]         = get_random_int(5, 10);
        matrixMap[randPosX][mDropsCount]++;
        matrixMap[randPosX][mActive]          = true;
        if (!matrixMap[randPosX][mColumnUsed]) {
            matrixMap[randPosX][mColumnUsed]  = true;
            matrixMap[mColumnUsedCount]++;
            if (matrixMap[mColumnUsedCount]   >= mapW + 1) config_second_phase();
        }
    }
}
function matrix(inputText){
    inputText = inputText.toLowerCase();
    var newline = false; 
    var line0   = "", line1   = "", line2   = "", line3   = "", line4   = "", line5   = ""; 
    var space   = "     "; 
    var a       = new Array(6); 
    var b       = new Array(6); 
    var c       = new Array(6); 
    var d       = new Array(6); 
    var e       = new Array(6); 
    var f       = new Array(6); 
    var g       = new Array(6); 
    var h       = new Array(6); 
    var I       = new Array(6); 
    var j       = new Array(6); 
    var k       = new Array(6); 
    var l       = new Array(6); 
    var m       = new Array(6); 
    var n       = new Array(6); 
    var o       = new Array(6); 
    var p       = new Array(6); 
    var q       = new Array(6); 
    var r       = new Array(6); 
    var s       = new Array(6); 
    var t       = new Array(6); 
    var u       = new Array(6); 
    var v       = new Array(6); 
    var w       = new Array(6);
    var x       = new Array(6); 
    var y       = new Array(6); 
    var z       = new Array(6); 
    var zero    = new Array(6); 
    var one     = new Array(6); 
    var two     = new Array(6); 
    var three   = new Array(6); 
    var four    = new Array(6); 
    var five    = new Array(6); 
    var six     = new Array(6); 
    var seven   = new Array(6); 
    var eight   = new Array(6); 
    var nine    = new Array(6);
    a[0]     = "     ___  ";      a[1]     = "    /   | ";      a[2]     = "   / /| | ";      a[3]     = "  / / | | ";      a[4]     = " / /  | | ";      a[5]     = "/_/   |_| ";
    b[0]     = " _____  ";        b[1]     = "|  _  \\ ";       b[2]     = "| |_| | ";        b[3]     = "|  _  { ";        b[4]     = "| |_| | ";        b[5]     = "|_____/ ";
    c[0]     = " _____  ";        c[1]     = "/  ___| ";        c[2]     = "| |     ";        c[3]     = "| |     ";        c[4]     = "| |___  ";        c[5]     = "\\_____| ";
    d[0]     = " _____  ";        d[1]     = "|  _  \\ ";       d[2]     = "| | | | ";        d[3]     = "| | | | ";        d[4]     = "| |_| | ";        d[5]     = "|_____/ ";
    e[0]     = " _____  ";        e[1]     = "| ____| ";        e[2]     = "| |__   ";        e[3]     = "|  __|  ";        e[4]     = "| |___  ";        e[5]     = "|_____| ";
    f[0]     = " _____  ";        f[1]     = "|  ___| ";        f[2]     = "| |__   ";        f[3]     = "|  __|  ";        f[4]     = "| |     ";        f[5]     = "|_|     ";
    g[0]     = " _____  ";        g[1]     = "/  ___| ";        g[2]     = "| |     ";        g[3]     = "| |  _  ";        g[4]     = "| |_| | ";        g[5]     = "\\_____/ ";
    h[0]     = " _   _  ";        h[1]     = "| | | | ";        h[2]     = "| |_| | ";        h[3]     = "|  _  | ";        h[4]     = "| | | | ";        h[5]     = "|_| |_| ";
    I[0]     = " _  ";            I[1]     = "| | ";            I[2]     = "| | ";            I[3]     = "| | ";            I[4]     = "| | ";            I[5]     = "|_| ";
    j[0]     = "     _  ";        j[1]     = "    | | ";        j[2]     = "    | | ";        j[3]     = " _  | | ";        j[4]     = "| |_| | ";        j[5]     = "\\_____/ ";
    k[0]     = " _   _   ";       k[1]     = "| | / /  ";       k[2]     = "| |/ /   ";       k[3]     = "| |\\ \\   ";     k[4]     = "| | \\ \\  ";     k[5]     = "|_|  \\_\\ ";
    l[0]     = " _      ";        l[1]     = "| |     ";        l[2]     = "| |     ";        l[3]     = "| |     ";        l[4]     = "| |___  ";        l[5]     = "|_____| ";
    m[0]     = "     ___  ___  "; m[1]     = "    /   |/   | "; m[2]     = "   / /|   /| | "; m[3]     = "  / / |__/ | | "; m[4]     = " / /       | | "; m[5]     = "/_/        |_| ";
    n[0]     = " __   _  ";       n[1]     = "|  \\ | | ";      n[2]     = "|   \\| | ";      n[3]     = "| |\\   | ";      n[4]     = "| | \\  | ";      n[5]     = "|_|  \\_| ";
    o[0]     = " _____  ";        o[1]     = "/  _  \\ ";       o[2]     = "| | | | ";        o[3]     = "| | | | ";        o[4]     = "| |_| | ";        o[5]     = "\\_____/ ";
    p[0]     = " _____  ";        p[1]     = "|  _  \\ ";       p[2]     = "| |_| | ";        p[3]     = "|  ___/ ";        p[4]     = "| |     ";        p[5]     = "|_|     ";
    q[0]     = " _____    ";      q[1]     = "/  _  \\   ";     q[2]     = "| | | |   ";      q[3]     = "| | | |   ";      q[4]     = "| |_| |_  ";      q[5]     = "\\_______| ";
    r[0]     = " _____   ";       r[1]     = "|  _  \\  ";      r[2]     = "| |_| |  ";       r[3]     = "|  _  /  ";       r[4]     = "| | \\ \\  ";     r[5]     = "|_|  \\_\\ ";
    s[0]     = " _____  ";        s[1]     = "/  ___/ ";        s[2]     = "| |___  ";        s[3]     = "\\___  \\ ";      s[4]     = " ___| | ";        s[5]     = "/_____/ ";
    t[0]     = " _____  ";        t[1]     = "|_   _| ";        t[2]     = "  | |   ";        t[3]     = "  | |   ";        t[4]     = "  | |   ";        t[5]     = "  |_|   ";
    u[0]     = " _   _  ";        u[1]     = "| | | | ";        u[2]     = "| | | | ";        u[3]     = "| | | | ";        u[4]     = "| |_| | ";        u[5]     = "\\_____/ ";
    v[0]     = " _     _  ";      v[1]     = "| |   / / ";      v[2]     = "| |  / /  ";      v[3]     = "| | / /   ";      v[4]     = "| |/ /    ";      v[5]     = "|___/     ";
    w[0]     = " _          __ "; w[1]     = "| |        / / "; w[2]     = "| |  __   / /  "; w[3]     = "| | /  | / /   "; w[4]     = "| |/   |/ /    "; w[5]     = "|___/|___/     ";
    x[0]     = "__    __ ";       x[1]     = "\\ \\  / / ";     x[2]     = " \\ \\/ /  ";     x[3]     = "  }  {   ";       x[4]     = " / /\\ \\  ";     x[5]     = "/_/  \\_\\ ";
    y[0]     = "__    __ ";       y[1]     = "\\ \\  / / ";     y[2]     = " \\ \\/ /  ";     y[3]     = "  \\  /   ";      y[4]     = "  / /    ";       y[5]     = " /_/     ";
    z[0]     = " ______ ";        z[1]     = "|___  / ";        z[2]     = "   / /  ";        z[3]     = "  / /   ";        z[4]     = " / /__  ";        z[5]     = "/_____| ";
    zero[0]  = " _____  ";        zero[1]  = "/  _  \\ ";       zero[2]  = "| | | | ";        zero[3]  = "| |/| | ";        zero[4]  = "| |_| | ";        zero[5]  = "\\_____/ ";
    one[0]   = " ___  ";          one[1]   = "|_  | ";          one[2]   = "  | | ";          one[3]   = "  | | ";          one[4]   = "  | | ";          one[5]   = "  |_| ";
    two[0]   = " _____  ";        two[1]   = "/___  \\ ";       two[2]   = " ___| | ";        two[3]   = "/  ___/ ";        two[4]   = "| |___  ";        two[5]   = "|_____| ";
    three[0] = " _____  ";        three[1] = "|___  | ";        three[2] = "   _| | ";        three[3] = "  |_  { ";        three[4] = " ___| | ";        three[5] = "|_____/ ";
    four[0]  = " _   _  ";        four[1]  = "| | | | ";        four[2]  = "| |_| | ";        four[3]  = "\\___  | ";       four[4]  = "    | | ";        four[5]  = "    |_| ";
    five[0]  = " _____  ";        five[1]  = "|  ___| ";        five[2]  = "| |___  ";        five[3]  = "\\___  \\ ";      five[4]  = " ___| | ";        five[5]  = "\\_____| ";
    six[0]   = " _____  ";        six[1]   = "/  ___| ";        six[2]   = "| |___  ";        six[3]   = "|  _  \\ ";       six[4]   = "| |_| | ";        six[5]   = "\\_____/ ";
    seven[0] = " _____  ";        seven[1] = "|___  | ";        seven[2] = "    / / ";        seven[3] = "   / /  ";        seven[4] = "  / /   ";        seven[5] = " /_/    ";
    eight[0] = " _____  ";        eight[1] = "/  _  \\ ";       eight[2] = "| |_| | ";        eight[3] = "}  _  { ";        eight[4] = "| |_| | ";        eight[5] = "\\_____/ ";
    nine[0]  = " _____  ";        nine[1]  = "/  _  \\ ";       nine[2]  = "| |_| | ";        nine[3]  = "\\___  | ";       nine[4]  = " ___| | ";        nine[5]  = "|_____/ ";
    for(var i=0; i < inputText.length; i++) {
        if(inputText.charAt(i) == " ") { line0 += space;    line1 += space;    line2 += space;    line3 += space;    line4 += space;    line5 += space    }
        if(inputText.charAt(i) == "a") { line0 += a[0];     line1 += a[1];     line2 += a[2];     line3 += a[3];     line4 += a[4];     line5 += a[5]     }
        if(inputText.charAt(i) == "b") { line0 += b[0];     line1 += b[1];     line2 += b[2];     line3 += b[3];     line4 += b[4];     line5 += b[5]     }
        if(inputText.charAt(i) == "c") { line0 += c[0];     line1 += c[1];     line2 += c[2];     line3 += c[3];     line4 += c[4];     line5 += c[5]     }
        if(inputText.charAt(i) == "d") { line0 += d[0];     line1 += d[1];     line2 += d[2];     line3 += d[3];     line4 += d[4];     line5 += d[5]     }
        if(inputText.charAt(i) == "e") { line0 += e[0];     line1 += e[1];     line2 += e[2];     line3 += e[3];     line4 += e[4];     line5 += e[5]     }
        if(inputText.charAt(i) == "f") { line0 += f[0];     line1 += f[1];     line2 += f[2];     line3 += f[3];     line4 += f[4];     line5 += f[5]     }
        if(inputText.charAt(i) == "g") { line0 += g[0];     line1 += g[1];     line2 += g[2];     line3 += g[3];     line4 += g[4];     line5 += g[5]     }
        if(inputText.charAt(i) == "h") { line0 += h[0];     line1 += h[1];     line2 += h[2];     line3 += h[3];     line4 += h[4];     line5 += h[5]     }
        if(inputText.charAt(i) == "i") { line0 += I[0];     line1 += I[1];     line2 += I[2];     line3 += I[3];     line4 += I[4];     line5 += I[5]     }
        if(inputText.charAt(i) == "j") { line0 += j[0];     line1 += j[1];     line2 += j[2];     line3 += j[3];     line4 += j[4];     line5 += j[5]     }
        if(inputText.charAt(i) == "k") { line0 += k[0];     line1 += k[1];     line2 += k[2];     line3 += k[3];     line4 += k[4];     line5 += k[5]     }
        if(inputText.charAt(i) == "l") { line0 += l[0];     line1 += l[1];     line2 += l[2];     line3 += l[3];     line4 += l[4];     line5 += l[5]     }
        if(inputText.charAt(i) == "m") { line0 += m[0];     line1 += m[1];     line2 += m[2];     line3 += m[3];     line4 += m[4];     line5 += m[5]     }
        if(inputText.charAt(i) == "n") { line0 += n[0];     line1 += n[1];     line2 += n[2];     line3 += n[3];     line4 += n[4];     line5 += n[5]     }
        if(inputText.charAt(i) == "o") { line0 += o[0];     line1 += o[1];     line2 += o[2];     line3 += o[3];     line4 += o[4];     line5 += o[5]     }
        if(inputText.charAt(i) == "p") { line0 += p[0];     line1 += p[1];     line2 += p[2];     line3 += p[3];     line4 += p[4];     line5 += p[5]     }
        if(inputText.charAt(i) == "q") { line0 += q[0];     line1 += q[1];     line2 += q[2];     line3 += q[3];     line4 += q[4];     line5 += q[5]     }
        if(inputText.charAt(i) == "r") { line0 += r[0];     line1 += r[1];     line2 += r[2];     line3 += r[3];     line4 += r[4];     line5 += r[5]     }
        if(inputText.charAt(i) == "s") { line0 += s[0];     line1 += s[1];     line2 += s[2];     line3 += s[3];     line4 += s[4];     line5 += s[5]     }
        if(inputText.charAt(i) == "t") { line0 += t[0];     line1 += t[1];     line2 += t[2];     line3 += t[3];     line4 += t[4];     line5 += t[5]     }
        if(inputText.charAt(i) == "u") { line0 += u[0];     line1 += u[1];     line2 += u[2];     line3 += u[3];     line4 += u[4];     line5 += u[5]     }
        if(inputText.charAt(i) == "v") { line0 += v[0];     line1 += v[1];     line2 += v[2];     line3 += v[3];     line4 += v[4];     line5 += v[5]     }
        if(inputText.charAt(i) == "w") { line0 += w[0];     line1 += w[1];     line2 += w[2];     line3 += w[3];     line4 += w[4];     line5 += w[5]     }
        if(inputText.charAt(i) == "x") { line0 += x[0];     line1 += x[1];     line2 += x[2];     line3 += x[3];     line4 += x[4];     line5 += x[5]     }
        if(inputText.charAt(i) == "y") { line0 += y[0];     line1 += y[1];     line2 += y[2];     line3 += y[3];     line4 += y[4];     line5 += y[5]     }
        if(inputText.charAt(i) == "z") { line0 += z[0];     line1 += z[1];     line2 += z[2];     line3 += z[3];     line4 += z[4];     line5 += z[5]     }
        if(inputText.charAt(i) == "0") { line0 += zero[0];  line1 += zero[1];  line2 += zero[2];  line3 += zero[3];  line4 += zero[4];  line5 += zero[5]  }
        if(inputText.charAt(i) == "1") { line0 += one[0];   line1 += one[1];   line2 += one[2];   line3 += one[3];   line4 += one[4];   line5 += one[5]   }
        if(inputText.charAt(i) == "2") { line0 += two[0];   line1 += two[1];   line2 += two[2];   line3 += two[3];   line4 += two[4];   line5 += two[5]   }
        if(inputText.charAt(i) == "3") { line0 += three[0]; line1 += three[1]; line2 += three[2]; line3 += three[3]; line4 += three[4]; line5 += three[5] }
        if(inputText.charAt(i) == "4") { line0 += four[0];  line1 += four[1];  line2 += four[2];  line3 += four[3];  line4 += four[4];  line5 += four[5]  }
        if(inputText.charAt(i) == "5") { line0 += five[0];  line1 += five[1];  line2 += five[2];  line3 += five[3];  line4 += five[4];  line5 += five[5]  }
        if(inputText.charAt(i) == "6") { line0 += six[0];   line1 += six[1];   line2 += six[2];   line3 += six[3];   line4 += six[4];   line5 += six[5]   }
        if(inputText.charAt(i) == "7") { line0 += seven[0]; line1 += seven[1]; line2 += seven[2]; line3 += seven[3]; line4 += seven[4]; line5 += seven[5] }
        if(inputText.charAt(i) == "8") { line0 += eight[0]; line1 += eight[1]; line2 += eight[2]; line3 += eight[3]; line4 += eight[4]; line5 += eight[5] }
        if(inputText.charAt(i) == "9") { line0 += nine[0];  line1 += nine[1];  line2 += nine[2];  line3 += nine[3];  line4 += nine[4];  line5 += nine[5]  }
        if(inputText.substring(i,(i+2)) == "\\n") {newline = true; break}
    }
    charText = [line0,
                line1,
                line2,
                line3,
                line4,
                line5
    ];
    init();
}
function update() {
    for (var i = 0; i <= mapW; ++i) {
        if (matrixMap[i][mActive]) {
            var flag = false;
            for (var j = 0; j <= mapH; ++j) {
                if (matrixMap[i][j][mType] != 0) {
                    flag = true;
                    if (matrixMap[i][j][mCurrentPause] > 0) {
                        matrixMap[i][j][mCurrentPause]--;
                        continue;
                    }
                    matrixMap[i][j][mCurrentPause] = matrixMap[i][j][mPauseValue];
                    switch (matrixMap[i][j][mType]) {
                        case 1:
                            if (j < mapH && !(matrixMap[i][j][mTextActive] && (matrixMap[i][j][mText] != " " && matrixMap[i][j][mText].length > 0))) {
                                for (var key in matrixMap[i][j]) if (key != "mText" && key != "mTextActive") matrixMap[i][j + 1][key] = matrixMap[i][j][key];
                            } 
                            else matrixMap[i][mDropsCount]--;
                            matrixMap[i][j][mSymbol]         = get_random_char();
                            matrixMap[i][j][mType]           = 2;
                            matrixMap[i][j][mCurrentPause]   = matrixMap[i][j][mPauseValue];
                            matrixMap[i][j][mWhite]          = 200;
                            matrixMap[i][j][mGreen]          = 0;
                            matrixMap[i][j][mTextActive]     = true;
                            if (j < mapH) j++;
                            break;
                        //ENDCASE1
                        case 2:
                            if (get_random_int(1, 100)       == 42)
                                matrixMap[i][j][mSymbol]     =  get_random_char();
                            if (matrixMap[i][j][mWhite]      >  150) {
                                matrixMap[i][j][mWhite]      -= 50;
                                if (matrixMap[i][j][mWhite]  <= 150) {
                                    matrixMap[i][j][mWhite]  =  0;
                                    matrixMap[i][j][mGreen]  =  250;
                                }
                            } 
                            else if (matrixMap[i][j][mGreen] >  0) {
                                matrixMap[i][j][mGreen]      -= matrixMap[i][j][mFade];
                                if (matrixMap[i][j][mGreen]  <= 0) {
                                    matrixMap[i][j][mGreen]  =  0;
                                    matrixMap[i][j][mType]   =  0;
                                }
                            }
                            break;
                        //ENDCASE2
                    }
                }
            }
            if (!flag) matrixMap[i][mActive] = false;
        }
    }
    if (get_random_int(1, maxDropRdmArg) == 1) spawn_new_drop();
}
function draw() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvasW, canvasH);
    context.font = "bold " + fontSize + "px monaco, consolas, courier, monospace";
    var i, j;
    for (i = 0; i <= mapW; ++i) {
        if (matrixMap[i][mActive]) {
            for (j = 0; j <= mapH; ++j) {
                if (matrixMap[i][j][mType] != 0) {
                    context.fillStyle = "rgb(" + matrixMap[i][j][mWhite]        +  ", " +
                    Math.max(matrixMap[i][j][mGreen], matrixMap[i][j][mWhite])  +  ", " + matrixMap[i][j][mWhite] + ")";
                    if (!matrixMap[i][j][mTextActive] || matrixMap[i][j][mText] == " "  || matrixMap[i][j][mText].length == 0) context.fillText(matrixMap[i][j][mSymbol], i * fontSize, j * fontSize);
                }
            }
        }
    }
    for (i = textX; i != charText[0].length  + textX; ++i) {
        for (j = textY; j != charText.length + textY; ++j) {
            if (matrixMap[i][j][mTextActive] && matrixMap[i][j][mText] != " " && matrixMap[i][j][mText].length > 0) {
                context.fillStyle = "rgb(249, 0, 0)";
                context.fillText(matrixMap[i][j][mText], i * fontSize, j * fontSize);
            }
        }
    }
}
function launch() {
    clearInterval(timer);
    var start = currentTime.getMilliseconds();
    update();
    draw();
    timer = setInterval(launch, refreshDelay - (currentTime.getMilliseconds() - start));
}
function init() {
    clearInterval(timer);
    currentTime                   = new Date();
    fontSize                      = 14 + Math.max(parseInt((document.body.offsetWidth - 1200) / 100), 0);
    minWidth                      = charText[0].length * fontSize;
    minHeight                     = charText.length    * fontSize;
    windowWidth                   = Math.max(document.body.offsetWidth, minWidth);
    windowHeight                  = Math.max(document.body.offsetHeight - 5, minHeight);
    document.body.style.minWidth  = minWidth;
    document.body.style.minHeight = minHeight;
    canvas                        = document.getElementById("mainCanvas");
    canvas.width                  = parseInt(windowWidth  / fontSize) * fontSize;
    canvas.height                 = parseInt(windowHeight / fontSize) * fontSize;
    canvasW                       = canvas.width;
    canvasH                       = canvas.height;
    context                       = canvas.getContext("2d");
    mapW                          = parseInt(canvasW / fontSize);
    mapH                          = parseInt(canvasH / fontSize);
    maxPause                      = 1;
    maxDropRdmArg                 = 1;
    maxDropsINColumn              = 2;
    refreshDelay                  = 25;
    completedFromLeft             = 0;
    timer                         = setInterval(launch, refreshDelay);
    canvas.style.margin           = 0;
    canvas.style.marginLeft       = parseInt((windowWidth  - canvasW) / 2) + "px";
    canvas.style.marginTop        = parseInt((windowHeight - canvasH) / 2) + "px";
    if (canvas.style.marginLeft % 2 != 0) canvas.style.marginLeft--;
    canvas.style.marginLeft       += "px";
    textX                         = parseInt((mapW - charText[0].length) / 2);
    textY                         = parseInt((mapH - charText.length)    / 2);
    matrixMap[mColumnUsedCount]   = 0;
    for (var i = 0; i <= mapW; ++i) {
        matrixMap[i]              = [];
        matrixMap[i][mDropsCount] = 0;
        matrixMap[i][mColumnUsed] = false;
        matrixMap[i][mActive]     = false;
        for (var j = 0; j <= mapH; ++j) {
            matrixMap[i][j]                = [];
            matrixMap[i][j][mType]         = 0;
            matrixMap[i][j][mPauseValue]   = 0;
            matrixMap[i][j][mCurrentPause] = 0;
            matrixMap[i][j][mGreen]        = 0;
            matrixMap[i][j][mWhite]        = 0;
            matrixMap[i][j][mSymbol]       = '';
            matrixMap[i][j][mFade]         = 0;
            matrixMap[i][j][mText]         = '';
            matrixMap[i][j][mTextActive]   = false;
        }
    }
    for (var i = 0, x = textX; i != charText[0].length; ++i, ++x) for (var j = 0, y = textY; j != charText.length; ++j, ++y) matrixMap[x][y][mText] = charText[j][i];
}
