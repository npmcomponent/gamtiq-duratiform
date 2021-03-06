/*global chai, describe, it, window*/

// Tests for duratiform component/module
describe("duratiform", function() {
    var nSecond = 1000,
        nMinute = 60 * nSecond,
        nHour = 60 * nMinute,
        nDay = 24 * nHour,
        lib, expect;
    
    // node
    if (typeof chai === "undefined") {
        lib = require("../duratiform");
        expect = require("./lib/chai").expect;
    }
    // browser
    else {
        lib = window.duratiform;
        expect = chai.expect;
    }
    
    
    describe(".divide", function() {
        var divide = lib.divide;

        describe("divide(nDuration)", function() {
            it("should return object with correct 'hour', 'minute' and 'second' fields", function() {
                expect( divide(9 * nHour + 28 * nMinute + 51 * nSecond) )
                    .eql({hour: 9, minute: 28, second: 51});
                expect( divide(4 * nDay + 16 * nHour + 41 * nMinute + 27 * nSecond) )
                    .eql({hour: 112, minute: 41, second: 27});
                expect( divide(2 * nDay + 37 * nMinute + 5 * nSecond) )
                    .eql({hour: 48, minute: 37, second: 5});
                expect( divide(67 * nMinute + 67 * nSecond) )
                    .eql({hour: 1, minute: 8, second: 7});
                expect( divide(8 * nMinute + 12 * nSecond) )
                    .eql({hour: 0, minute: 8, second: 12});
                expect( divide(18 * nHour + 26 * nSecond) )
                    .eql({hour: 18, minute: 0, second: 26});
                expect( divide(17 * nHour + 41 * nMinute) )
                    .eql({hour: 17, minute: 41, second: 0});
            });
        });

        describe("divide(nDuration, 1)", function() {
            it("should return object with correct 'second' field", function() {
                expect( divide(1 * nSecond, 1) )
                    .eql({second: 1});
                expect( divide(26 * nSecond, 1) )
                    .eql({second: 26});
                expect( divide(3410 * nSecond, 1) )
                    .eql({second: 3410});
            });
        });

        describe("divide(nDuration, 2)", function() {
            it("should return object with correct 'minute' and 'second' fields", function() {
                expect( divide(35 * nMinute + 78 * nSecond, 2) )
                    .eql({minute: 36, second: 18});
                expect( divide(10 * nMinute + 26 * nSecond, 2) )
                    .eql({minute: 10, second: 26});
                expect( divide(44 * nMinute, 2) )
                    .eql({minute: 44, second: 0});
                expect( divide(60 * nSecond, 2) )
                    .eql({minute: 1, second: 0});
                expect( divide(59 * nSecond, 2) )
                    .eql({minute: 0, second: 59});
            });
        });

        describe("divide(nDuration, 3)", function() {
            it("should return object with correct 'hour', 'minute' and 'second' fields", function() {
                expect( divide(29 * nHour + 16 * nMinute + 38 * nSecond, 3) )
                    .eql({hour: 29, minute: 16, second: 38});
                expect( divide(11 * nHour + 72 * nMinute, 3) )
                    .eql({hour: 12, minute: 12, second: 0});
                expect( divide(59 * nMinute + 59 * nSecond, 3) )
                    .eql({hour: 0, minute: 59, second: 59});
                expect( divide(59 * nMinute + 60 * nSecond, 3) )
                    .eql({hour: 1, minute: 0, second: 0});
                expect( divide(12 * nHour + 12 * nSecond, 3) )
                    .eql({hour: 12, minute: 0, second: 12});
            });
        });

        describe("divide(nDuration, 4)", function() {
            it("should return object with correct 'day', 'hour', 'minute' and 'second' fields", function() {
                expect( divide(27 * nDay + 17 * nHour + 47 * nMinute + 57 * nSecond, 4) )
                    .eql({day: 27, hour: 17, minute: 47, second: 57});
                expect( divide(1 * nDay, 4) )
                    .eql({day: 1, hour: 0, minute: 0, second: 0});
                expect( divide(3 * nDay + 25 * nHour + 6 * nMinute + 3 * nSecond, 4) )
                    .eql({day: 4, hour: 1, minute: 6, second: 3});
                expect( divide(7 * nDay + 65 * nMinute + 42 * nSecond, 4) )
                    .eql({day: 7, hour: 1, minute: 5, second: 42});
                expect( divide(23 * nHour + 24 * nMinute + 25 * nSecond, 4) )
                    .eql({day: 0, hour: 23, minute: 24, second: 25});
            });
        });

        describe("divide(nDuration, 1|2|3|4, true)", function() {
            it("should return object with correct 'day', 'day2', 'hour', 'hour2', 'minute', 'minute2', 'second' and 'second2' fields", function() {
                expect( divide(5 * nDay + 17 * nHour + 4 * nMinute + 28 * nSecond, 4, true) )
                    .eql({day: 5, day2: "05", hour: 17, hour2: "17", minute: 4, minute2: "04", second: 28, second2: "28"});
                expect( divide(12 * nDay + 4 * nHour + 16 * nMinute, 4, true) )
                    .eql({day: 12, day2: "12", hour: 4, hour2: "04", minute: 16, minute2: "16", second: 0, second2: "00"});
                expect( divide(358 * nHour + 29 * nMinute + 7 * nSecond, 3, true) )
                    .eql({hour: 358, hour2: "358", minute: 29, minute2: "29", second: 7, second2: "07"});
                expect( divide(1 * nHour + 2 * nSecond, 3, true) )
                    .eql({hour: 1, hour2: "01", minute: 0, minute2: "00", second: 2, second2: "02"});
                expect( divide(52 * nMinute + 38 * nSecond, 3, true) )
                    .eql({hour: 0, hour2: "00", minute: 52, minute2: "52", second: 38, second2: "38"});
                expect( divide(46 * nMinute + 9 * nSecond, 2, true) )
                    .eql({minute: 46, minute2: "46", second: 9, second2: "09"});
                expect( divide(51 * nSecond, 2, true) )
                    .eql({minute: 0, minute2: "00", second: 51, second2: "51"});
                expect( divide(0, 2, true) )
                    .eql({minute: 0, minute2: "00", second: 0, second2: "00"});
                expect( divide(7 * nSecond, 1, true) )
                    .eql({second: 7, second2: "07"});
            });
        });
    });
    
    describe(".format", function() {
        var format = lib.format;

        describe("format(nDuration)", function() {
            it("should return correct 'hh:mm:ss' string", function() {
                expect( format(19 * nHour + 12 * nMinute + 34 * nSecond) )
                    .equal("19:12:34");
                expect( format(10 * nDay + 23 * nHour + 52 * nMinute + 9 * nSecond) )
                    .equal("263:52:09");
                expect( format(2 * nDay + 3 * nMinute + 47 * nSecond) )
                    .equal("48:03:47");
                expect( format(7 * nHour + 2 * nMinute + 1 * nSecond) )
                    .equal("07:02:01");
                expect( format(57 * nMinute + 32 * nSecond) )
                    .equal("00:57:32");
                expect( format(35 * nHour + 28 * nSecond) )
                    .equal("35:00:28");
                expect( format(99 * nHour + 61 * nMinute) )
                    .equal("100:01:00");
                expect( format(0) )
                    .equal("00:00:00");
            });
        });

        describe("format(nDuration, sFormat)", function() {
            it("should return correct 'ss' string", function() {
                expect( format(10 * nSecond, "ss") )
                    .equal("10");
                expect( format(23489 * nSecond, "ss") )
                    .equal("23489");
                expect( format(72 * nSecond, "ss") )
                    .equal("72");
            });
            it("should return correct 'mm:ss' string", function() {
                expect( format(600 * nSecond, "mm:ss") )
                    .equal("10:00");
                expect( format(5 * nMinute + 37 * nSecond, "mm:ss") )
                    .equal("05:37");
                expect( format(105 * nMinute + 9 * nSecond, "mm:ss") )
                    .equal("105:09");
                expect( format(21 * nMinute + 68 * nSecond, "mm:ss") )
                    .equal("22:08");
                expect( format(52 * nSecond, "mm:ss") )
                    .equal("00:52");
                expect( format(0, "mm:ss") )
                    .equal("00:00");
            });
            it("should return correct 'mm' string", function() {
                expect( format(630 * nSecond, "mm") )
                    .equal("10");
                expect( format(7 * nMinute + 89 * nSecond, "mm") )
                    .equal("08");
                expect( format(111 * nMinute + 32 * nSecond, "mm") )
                    .equal("111");
            });
            it("should return correct 'hh:mm:ss' string", function() {
                expect( format(nHour, "hh:mm:ss") )
                    .equal("01:00:00");
                expect( format(nDay, "hh:mm:ss") )
                    .equal("24:00:00");
                expect( format(23 * nHour + 59 * nMinute + 59 * nSecond, "hh:mm:ss") )
                    .equal("23:59:59");
                expect( format(32 * nMinute + 70 * nSecond, "hh:mm:ss") )
                    .equal("00:33:10");
                expect( format(4 * nHour + 3 * nSecond, "hh:mm:ss") )
                    .equal("04:00:03");
                expect( format(15 * nHour + 6 * nMinute, "hh:mm:ss") )
                    .equal("15:06:00");
                expect( format(0, "hh:mm:ss") )
                    .equal("00:00:00");
            });
            it("should return correct 'hh:mm' string", function() {
                expect( format(53 * nHour, "hh:mm") )
                    .equal("53:00");
                expect( format(3 * nDay, "hh:mm") )
                    .equal("72:00");
                expect( format(15 * nHour + 43 * nMinute + 26 * nSecond, "hh:mm") )
                    .equal("15:43");
                expect( format(27 * nMinute + 20 * nSecond, "hh:mm") )
                    .equal("00:27");
                expect( format(51 * nSecond, "hh:mm") )
                    .equal("00:00");
            });
            it("should return correct 'hh' string", function() {
                expect( format(28 * nHour, "hh") )
                    .equal("28");
                expect( format(0.5 * nDay, "hh") )
                    .equal("12");
                expect( format(8 * nHour + 17 * nMinute + 4 * nSecond, "hh") )
                    .equal("08");
                expect( format(59 * nMinute + 59 * nSecond, "hh") )
                    .equal("00");
            });
            it("should return correct 'dd:hh:mm:ss' string", function() {
                expect( format(nMinute, "dd:hh:mm:ss") )
                    .equal("00:00:01:00");
                expect( format(nHour, "dd:hh:mm:ss") )
                    .equal("00:01:00:00");
                expect( format(nDay, "dd:hh:mm:ss") )
                    .equal("01:00:00:00");
                expect( format(23 * nHour + 59 * nMinute + 59 * nSecond, "dd:hh:mm:ss") )
                    .equal("00:23:59:59");
                expect( format(2 * nDay + 22 * nHour + 5 * nMinute + 37 * nSecond, "dd:hh:mm:ss") )
                    .equal("02:22:05:37");
                expect( format(15 * nDay + 43 * nMinute + 6 * nSecond, "dd:hh:mm:ss") )
                    .equal("15:00:43:06");
                expect( format(79 * nDay + 5 * nHour + 12 * nSecond, "dd:hh:mm:ss") )
                    .equal("79:05:00:12");
                expect( format(16 * nDay + 19 * nHour + 43 * nMinute, "dd:hh:mm:ss") )
                    .equal("16:19:43:00");
                expect( format(0, "dd:hh:mm:ss") )
                    .equal("00:00:00:00");
            });
            it("should return correct 'dd:hh:mm' string", function() {
                expect( format(25 * nMinute, "dd:hh:mm") )
                    .equal("00:00:25");
                expect( format(6 * nHour, "dd:hh:mm") )
                    .equal("00:06:00");
                expect( format(21 * nHour + 7 * nMinute + 33 * nSecond, "dd:hh:mm") )
                    .equal("00:21:07");
                expect( format(903 * nDay + 18 * nHour + 47 * nMinute + 53 * nSecond, "dd:hh:mm") )
                    .equal("903:18:47");
                expect( format(5 * nDay + 21 * nMinute + 88 * nSecond, "dd:hh:mm") )
                    .equal("05:00:22");
                expect( format(49 * nDay + 12 * nHour + 46 * nSecond, "dd:hh:mm") )
                    .equal("49:12:00");
                expect( format(14 * nHour + 40 * nMinute, "dd:hh:mm") )
                    .equal("00:14:40");
                expect( format(0, "dd:hh:mm") )
                    .equal("00:00:00");
            });
            it("should return correct 'dd:hh' string", function() {
                expect( format(46 * nMinute, "dd:hh") )
                    .equal("00:00");
                expect( format(9 * nHour, "dd:hh") )
                    .equal("00:09");
                expect( format(15 * nHour + 29 * nMinute + 42 * nSecond, "dd:hh") )
                    .equal("00:15");
                expect( format(2056 * nDay + 17 * nHour + 4 * nMinute + 26 * nSecond, "dd:hh") )
                    .equal("2056:17");
                expect( format(7 * nDay + 10 * nMinute, "dd:hh") )
                    .equal("07:00");
                expect( format(23 * nDay + 24 * nHour + 60 * nSecond, "dd:hh") )
                    .equal("24:00");
                expect( format(4 * nDay + 4 * nHour + 4 * nMinute, "dd:hh") )
                    .equal("04:04");
                expect( format(26 * nDay + 8 * nHour, "dd:hh") )
                    .equal("26:08");
                expect( format(3 * nDay + 19 * nHour, "dd:hh") )
                    .equal("03:19");
            });
            it("should return correct 'dd' string", function() {
                expect( format(125 * nMinute, "dd") )
                    .equal("00");
                expect( format(48 * nHour, "dd") )
                    .equal("02");
                expect( format(19 * nHour + 37 * nMinute + 53 * nSecond, "dd") )
                    .equal("00");
                expect( format(12345 * nDay + 15 * nHour + 203 * nMinute + 689 * nSecond, "dd") )
                    .equal("12345");
                expect( format(9 * nDay + 123 * nMinute, "dd") )
                    .equal("09");
                expect( format(22 * nDay + 7 * nHour + 25 * nSecond, "dd") )
                    .equal("22");
            });
            it("should return correct result string", function() {
                expect( format(3 * nDay + 5 * nHour + 46 * nMinute + 37 * nSecond, "\\day\\s: dd, \\hour\\s: hh, \\minute\\s: mm, \\secon\\d\\s: ss") )
                    .equal("days: 03, hours: 05, minutes: 46, seconds: 37");
                expect( format(3 * nDay + 5 * nHour + 46 * nMinute + 37 * nSecond, "[days]: dd, [hours]: hh, [minutes]: mm, [seconds]: ss") )
                    .equal("days: 03, hours: 05, minutes: 46, seconds: 37");
                expect( format(3 * nDay + 5 * nHour + 46 * nMinute + 37 * nSecond, "[days: dd], [hours: hh], [minutes: mm], [seconds: ss]") )
                    .equal("days: dd, hours: hh, minutes: mm, seconds: ss");
                expect( format(3 * nDay + 5 * nHour + 46 * nMinute + 37 * nSecond, "[days: dd, hours: hh, minutes: mm, seconds: ss") )
                    .equal("days: dd, hours: hh, minutes: mm, seconds: ss");
                expect( format(14 * nDay + 7 * nHour + 9 * nMinute + 28 * nSecond, "\\day\\s: d, \\hour\\s: h, \\minute\\s: m, \\secon\\d\\s: s") )
                    .equal("days: 14, hours: 7, minutes: 9, seconds: 28");
                expect( format(3 * nDay + 5 * nHour + 46 * nMinute + 37 * nSecond, "Day\\s: dd, Hour\\s: hh, Minute\\s: mm, Secon\\d\\s: ss") )
                    .equal("Days: 03, Hours: 05, Minutes: 46, Seconds: 37");
                expect( format(23 * nDay + 8 * nHour + 7 * nMinute + 36 * nSecond, "DAYS: d, HOURS: h, MINUTES: m, SECONDS: s") )
                    .equal("DAYS: 23, HOURS: 8, MINUTES: 7, SECONDS: 36");
                expect( format(7 * nDay + 3 * nHour + 41 * nMinute + 9 * nSecond, "-d:hh:mm:ss") )
                    .equal("-7:03:41:09");
                expect( format(13 * nHour + 8 * nMinute + 5 * nSecond, "\\[\\dur: h:m:ss\\]") )
                    .equal("[dur: 13:8:05]");
                expect( format(35 * nDay + 16 * nHour + 2 * nMinute + 8 * nSecond, "d-h-m-s") )
                    .equal("35-16-2-8");
                expect( format(8 * nDay + 15 * nHour + 4 * nMinute + 52 * nSecond, "dd\\\\hh\\\\mm\\\\ss") )
                    .equal("08\\15\\04\\52");
                expect( format(2 * nDay + 22 * nHour + 9 * nMinute + 56 * nSecond, "\\d-h-m-s") )
                    .equal("d-70-9-56");
                expect( format(nDay + 5 * nHour + 15 * nMinute, "[[days\\]]: -, [hours]: h, [seconds]: ss") )
                    .equal("[days]: -, hours: 29, seconds: 00");
                expect( format(7 * nDay + 23 * nHour + 10 * nMinute, "[[days]: d]: dd, [hours]: h, minute: s") )
                    .equal("[days: 7]: 07, hours: 23, 10inute: 0");
                expect( format(7 * nDay + 23 * nHour + 10 * nMinute, "[[days\\]: d]: dd, [hours]: h, \\minute: s") )
                    .equal("[days]: d: 07, hours: 23, minute: 0");
                expect( format(nDay, "- [hours]: h, [hours]: h, [hours]: h\\h\\") )
                    .equal("- hours: 24, hours: 24, hours: 24h");
                expect( format(365 * nDay + 23 * nHour + 59 * nMinute + 59 * nSecond, "Строка без специальных символов") )
                    .equal("Строка без специальных символов");
                expect( format(365 * nDay + 23 * nHour + 59 * nMinute + 59 * nSecond, "дни: d, часы: h, минуты: m, секунды: s") )
                    .equal("дни: 365, часы: 23, минуты: 59, секунды: 59");
            });
        });
    });
});
