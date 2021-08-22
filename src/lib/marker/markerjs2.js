'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/**
 * Utility class to simplify SVG operations.
 */
var SvgHelper = /** @class */ (function () {
    function SvgHelper() {
    }
    /**
     * Creates SVG "defs".
     */
    SvgHelper.createDefs = function () {
        var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        return defs;
    };
    /**
     * Sets attributes on an arbitrary SVG element
     * @param el - target SVG element.
     * @param attributes - set of name-value attribute pairs.
     */
    SvgHelper.setAttributes = function (el, attributes) {
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var _a = attributes_1[_i], attr = _a[0], value = _a[1];
            el.setAttribute(attr, value);
        }
    };
    /**
     * Creates an SVG rectangle with the specified width and height.
     * @param width
     * @param height
     * @param attributes - additional attributes.
     */
    SvgHelper.createRect = function (width, height, attributes) {
        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', width.toString());
        rect.setAttribute('height', height.toString());
        if (attributes) {
            SvgHelper.setAttributes(rect, attributes);
        }
        return rect;
    };
    /**
     * Creates an SVG line with specified end-point coordinates.
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param attributes - additional attributes.
     */
    SvgHelper.createLine = function (x1, y1, x2, y2, attributes) {
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1.toString());
        line.setAttribute('y1', y1.toString());
        line.setAttribute('x2', x2.toString());
        line.setAttribute('y2', y2.toString());
        if (attributes) {
            SvgHelper.setAttributes(line, attributes);
        }
        return line;
    };
    /**
     * Creates an SVG polygon with specified points.
     * @param points - points as string.
     * @param attributes - additional attributes.
     */
    SvgHelper.createPolygon = function (points, attributes) {
        var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', points);
        if (attributes) {
            SvgHelper.setAttributes(polygon, attributes);
        }
        return polygon;
    };
    /**
     * Creates an SVG circle with the specified radius.
     * @param radius
     * @param attributes - additional attributes.
     */
    SvgHelper.createCircle = function (radius, attributes) {
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', (radius / 2).toString());
        circle.setAttribute('cy', (radius / 2).toString());
        circle.setAttribute('r', radius.toString());
        if (attributes) {
            SvgHelper.setAttributes(circle, attributes);
        }
        return circle;
    };
    /**
     * Creates an SVG ellipse with the specified horizontal and vertical radii.
     * @param rx
     * @param ry
     * @param attributes - additional attributes.
     */
    SvgHelper.createEllipse = function (rx, ry, attributes) {
        var ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipse.setAttribute('cx', (rx / 2).toString());
        ellipse.setAttribute('cy', (ry / 2).toString());
        ellipse.setAttribute('rx', (rx / 2).toString());
        ellipse.setAttribute('ry', (ry / 2).toString());
        if (attributes) {
            SvgHelper.setAttributes(ellipse, attributes);
        }
        return ellipse;
    };
    /**
     * Creates an SVG group.
     * @param attributes - additional attributes.
     */
    SvgHelper.createGroup = function (attributes) {
        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        if (attributes) {
            SvgHelper.setAttributes(g, attributes);
        }
        return g;
    };
    /**
     * Creates an SVG transform.
     */
    SvgHelper.createTransform = function () {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        return svg.createSVGTransform();
    };
    /**
     * Creates an SVG marker.
     * @param id
     * @param orient
     * @param markerWidth
     * @param markerHeight
     * @param refX
     * @param refY
     * @param markerElement
     */
    SvgHelper.createMarker = function (id, orient, markerWidth, markerHeight, refX, refY, markerElement) {
        var marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        SvgHelper.setAttributes(marker, [
            ['id', id],
            ['orient', orient],
            ['markerWidth', markerWidth.toString()],
            ['markerHeight', markerHeight.toString()],
            ['refX', refX.toString()],
            ['refY', refY.toString()],
        ]);
        marker.appendChild(markerElement);
        return marker;
    };
    /**
     * Creaes an SVG text element.
     * @param attributes - additional attributes.
     */
    SvgHelper.createText = function (attributes) {
        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '0');
        text.setAttribute('y', '0');
        if (attributes) {
            SvgHelper.setAttributes(text, attributes);
        }
        return text;
    };
    /**
     * Creates an SVG TSpan.
     * @param text - inner text.
     * @param attributes - additional attributes.
     */
    SvgHelper.createTSpan = function (text, attributes) {
        var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.textContent = text;
        if (attributes) {
            SvgHelper.setAttributes(tspan, attributes);
        }
        return tspan;
    };
    /**
     * Creates an SVG image element.
     * @param attributes - additional attributes.
     */
    SvgHelper.createImage = function (attributes) {
        var image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        if (attributes) {
            SvgHelper.setAttributes(image, attributes);
        }
        return image;
    };
    /**
     * Creates an SVG point with the specified coordinates.
     * @param x
     * @param y
     */
    SvgHelper.createPoint = function (x, y) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var svgPoint = svg.createSVGPoint();
        svgPoint.x = x;
        svgPoint.y = y;
        return svgPoint;
    };
    /**
     * Creates an SVG path with the specified shape (d).
     * @param d - path shape
     * @param attributes - additional attributes.
     */
    SvgHelper.createPath = function (d, attributes) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        if (attributes) {
            SvgHelper.setAttributes(path, attributes);
        }
        return path;
    };
    return SvgHelper;
}());

/**
 * Manages commercial marker.js 2 licenses.
 */
var Activator = /** @class */ (function () {
    function Activator() {
    }
    /**
     * Add a license key
     * @param key license key sent to you after purchase.
     */
    Activator.addKey = function (key) {
        Activator.key = key;
    };
    Object.defineProperty(Activator, "isLicensed", {
        /**
         * Returns true if the copy of marker.js is commercially licensed.
         */
        get: function () {
            // NOTE:
            // before removing or modifying this please consider supporting marker.js
            // by visiting https://markerjs.com/ for details
            // thank you!
            if (Activator.key) {
                var keyRegex = new RegExp(/^MJS2-[A-Z][0-9]{3}-[A-Z][0-9]{3}-[0-9]{4}$/, 'i');
                return keyRegex.test(Activator.key);
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    return Activator;
}());

/**
 * Renders the original image and markup to a flat raster image.
 */
var Renderer = /** @class */ (function () {
    function Renderer() {
        /**
         * Whether the image should be rendered at the original (natural) target image size.
         */
        this.naturalSize = false;
        /**
         * Rendered image type (`image/png`, `image/jpeg`, etc.).
         */
        this.imageType = 'image/png';
        /**
         * When set to true, only the marker layer without the original image will be rendered.
         */
        this.markersOnly = false;
    }
    /**
     * Initiates rendering of the result image and returns a promise which when resolved
     * contains a data URL for the rendered image.
     *
     * @param target - target (underlying original) image
     * @param markerImage - marker layer
     */
    Renderer.prototype.rasterize = function (target, markerImage) {
        var _this = this;
        return new Promise(function (resolve) {
            /*
            var canvas = document.createElement("canvas");
            var markerImageCopy = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            markerImageCopy.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            markerImageCopy.setAttribute('width', markerImage.width.baseVal.valueAsString);
            markerImageCopy.setAttribute('height', markerImage.height.baseVal.valueAsString);
            markerImageCopy.setAttribute('viewBox', '0 0 ' +
                markerImage.viewBox.baseVal.width.toString() +
                ' ' +
                markerImage.viewBox.baseVal.height.toString());
            markerImageCopy.innerHTML = markerImage.innerHTML;
            if (_this.naturalSize === true) {
                // scale to full image size
                markerImageCopy.width.baseVal.value = target.naturalWidth;
                markerImageCopy.height.baseVal.value = target.naturalHeight;
            }
            else if (_this.width !== undefined && _this.height !== undefined) {
                // scale to specific dimensions
                markerImageCopy.width.baseVal.value = _this.width;
                markerImageCopy.height.baseVal.value = _this.height;
            }
            canvas.width = markerImageCopy.width.baseVal.value;
            canvas.height = markerImageCopy.height.baseVal.value;
            var data = markerImageCopy.outerHTML;
            var ctx = canvas.getContext("2d");
            if (ctx && _this.markersOnly !== true) {
                ctx.drawImage(target, 0, 0, canvas.width, canvas.height);
            }
            var DOMURL = window.URL; // || window.webkitURL || window;
            var img = new Image(canvas.width, canvas.height);
            img.setAttribute("crossOrigin", "anonymous");
            var blob = new Blob([data], { type: "image/svg+xml" });
            var url = DOMURL.createObjectURL(blob);
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
                DOMURL.revokeObjectURL(url);
                var result = canvas.toDataURL(_this.imageType, _this.imageQuality);
                resolve(result);
            };
            img.src = url;
            */
            resolve(null);
        });
    };
    return Renderer;
}());

var Logo = "<svg viewBox=\"0 0 112 96\" xmlns=\"http://www.w3.org/2000/svg\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"1.414\"><path fill=\"#e5f20d\" fill-opacity=\".647\" d=\"M0 40.386h111.96V95.62H0z\"/><path d=\"M93.61 61.452c0 .987-.328 1.831-.987 2.53-.657.7-1.52 1.048-2.591 1.048-1.481 0-2.222-.74-2.222-2.22 0-16.617-.533-29.347-1.604-38.192-1.068-8.842-2.92-13.265-5.552-13.265-4.443 0-10.94 15.509-19.497 46.52v.124c0 .987-.328 1.831-.987 2.53-.657.7-1.52 1.048-2.592 1.048-1.48 0-2.22-.74-2.22-2.22 0-3.29.165-8.392.493-15.302.33-7.732.494-13.82.494-18.262 0-6.17-.186-10.55-.556-13.142-.37-2.591-1.172-3.887-2.406-3.887-2.796 0-6.333 5.12-10.612 15.363C38.494 34.367 34.01 46.44 29.32 60.34l-1.11 3.209a5.714 5.714 0 01-1.42 2.097c-.617.578-1.295.864-2.036.864-.987 0-1.644-.081-1.974-.247-.328-.162-.533-.656-.617-1.48-.41-4.03-.74-9.418-.987-16.165-.163-1.728-.329-4.566-.494-8.515-.822-13.901-1.562-23.3-2.221-28.196-.657-4.893-.987-7.628-.987-8.205 0-.657.33-1.44.987-2.345.659-.903 1.276-1.357 1.85-1.357 1.319 0 2.387.947 3.21 2.838.411.906.863 4.526 1.357 10.859.493 6.335.905 14.19 1.233 23.568l.617 18.88c4.527-13.983 9.216-26.673 14.068-38.068C45.65 6.686 50.093.988 54.123.988c2.715 0 4.566 1.974 5.553 5.923.987 3.949 1.481 9.667 1.481 17.152 0 3.949-.081 9.625-.247 17.029l-.123 5.676c3.373-11.762 6.725-21.634 10.057-29.615 3.331-7.979 6.685-11.97 10.056-11.97 8.475 0 12.71 18.757 12.71 56.269z\" fill-rule=\"nonzero\"/></svg>";

/**
 * Simple utility CSS-in-JS implementation.
 */
var Style = /** @class */ (function () {
    function Style() {
    }
    Object.defineProperty(Style, "defaultSettings", {
        /**
         * Returns default UI styles.
         */
        get: function () {
            return {
                canvasBackgroundColor: '#ffffff',
                toolbarBackgroundColor: '#111111',
                toolbarBackgroundHoverColor: '#333333',
                toolbarColor: '#eeeeee',
                toolbarHeight: 40,
                toolboxBackgroundColor: '#2a2a2a',
                toolboxColor: '#eeeeee',
                toolboxAccentColor: '#3080c3',
                undoButtonVisible: true,
                redoButtonVisible: false,
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style, "fadeInAnimationClassName", {
        /**
         * Returns global fade-in animation class name.
         */
        get: function () {
            return Style.CLASS_PREFIX + "fade_in";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Style, "fadeOutAnimationClassName", {
        /**
         * Returns global fade-out animation class name.
         */
        get: function () {
            return Style.CLASS_PREFIX + "fade_out";
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds a CSS class declaration.
     * @param styleClass - class to add.
     */
    Style.addClass = function (styleClass) {
        if (Style.styleSheet === undefined) {
            Style.addStyleSheet();
        }
        Style.classes.push(styleClass);
        Style.styleSheet.sheet.addRule('.' + styleClass.name, styleClass.style);
        return styleClass;
    };
    /**
     * Add arbitrary CSS rule
     * @param styleRule - CSS rule to add.
     */
    Style.addRule = function (styleRule) {
        if (Style.styleSheet === undefined) {
            Style.addStyleSheet();
        }
        Style.rules.push(styleRule);
        // Style.styleSheet.sheet.addRule(styleRule.selector, styleRule.style); // crashes in Edge
        Style.styleSheet.sheet.insertRule(styleRule.selector + " {" + styleRule.style + "}", Style.styleSheet.sheet.rules.length);
    };
    Style.addStyleSheet = function () {
        var _a;
        Style.styleSheet = document.createElement('style');
        ((_a = Style.styleSheetRoot) !== null && _a !== void 0 ? _a : document.head).appendChild(Style.styleSheet);
        // add global rules
        Style.addRule(new StyleRule("." + Style.CLASS_PREFIX + " h3", 'font-family: sans-serif'));
        Style.addRule(new StyleRule("@keyframes " + Style.CLASS_PREFIX + "_fade_in_animation_frames", "\n        from {\n          opacity: 0;\n        }\n        to {\n          opacity: 1;\n        }\n    "));
        Style.addRule(new StyleRule("@keyframes " + Style.CLASS_PREFIX + "_fade_out_animation_frames", "\n        from {\n          opacity: 1;\n        }\n        to {\n          opacity: 0;\n        }\n    "));
        Style.addClass(new StyleClass('fade_in', "\n      animation-duration: 0.3s;\n      animation-name: " + Style.CLASS_PREFIX + "_fade_in_animation_frames;\n    "));
        Style.addClass(new StyleClass('fade_out', "\n      animation-duration: 0.3s;\n      animation-name: " + Style.CLASS_PREFIX + "_fade_out_animation_frames;\n    "));
    };
    Style.removeStyleSheet = function () {
        var _a;
        if (Style.styleSheet) {
            ((_a = Style.styleSheetRoot) !== null && _a !== void 0 ? _a : document.head).removeChild(Style.styleSheet);
            Style.styleSheet = undefined;
        }
    };
    /**
     * Prefix used for all internally created CSS classes.
     */
    Style.CLASS_PREFIX = '__markerjs2_';
    Style.classes = [];
    Style.rules = [];
    /**
     * Holds current UI styles.
     */
    Style.settings = Style.defaultSettings;
    return Style;
}());
/**
 * Represents an arbitrary CSS rule.
 */
var StyleRule = /** @class */ (function () {
    /**
     * Creates an arbitrary CSS rule using the selector and style rules.
     * @param selector - CSS selector
     * @param style - styles to apply
     */
    function StyleRule(selector, style) {
        this.selector = selector;
        this.style = style;
    }
    return StyleRule;
}());
/**
 * Represents a CSS class.
 */
var StyleClass = /** @class */ (function () {
    /**
     * Creates a CSS class declaration based on supplied (local) name and style rules.
     * @param name - local CSS class name (will be prefixed with the marker.js prefix).
     * @param style - style declarations.
     */
    function StyleClass(name, style) {
        this._localName = name;
        this.style = style;
    }
    Object.defineProperty(StyleClass.prototype, "name", {
        /**
         * Returns fully qualified CSS class name.
         */
        get: function () {
            return "" + Style.CLASS_PREFIX + this._localName;
        },
        enumerable: false,
        configurable: true
    });
    return StyleClass;
}());

var CursorIcon = "<svg viewBox=\"0 0 24 24\"><path d=\"M10.07 14.27a.997.997 0 011.33.48l2.3 4.99 1.8-.85-2.31-4.98c-.24-.5-.02-1.1.48-1.33l.28-.08 2.3-.45L8 5.12V15.9l1.82-1.47.25-.16m3.57 7.7a.99.99 0 01-1.33-.47l-2.18-4.74-2.51 2.02c-.17.14-.38.22-.62.22a1 1 0 01-1-1V3a1 1 0 011-1c.24 0 .47.09.64.23l.01-.01 11.49 9.64a1.001 1.001 0 01-.44 1.75l-3.16.62 2.2 4.73c.26.5.02 1.09-.48 1.32l-3.62 1.69z\"/></svg>";

var DeleteIcon = "<svg viewBox=\"0 0 24 24\"><path d=\"M9 3v1H4v2h1v13a2 2 0 002 2h10a2 2 0 002-2V6h1V4h-5V3H9M7 6h10v13H7V6m2 2v9h2V8H9m4 0v9h2V8h-2z\"/></svg>";

var CheckIcon = "<svg viewBox=\"0 0 24 24\"><path d=\"M9 20.42l-6.21-6.21 2.83-2.83L9 14.77l9.88-9.89 2.83 2.83L9 20.42z\"/></svg>";

var CloseIcon = "<svg viewBox=\"0 0 24 24\"><path d=\"M20 6.91L17.09 4 12 9.09 6.91 4 4 6.91 9.09 12 4 17.09 6.91 20 12 14.91 17.09 20 20 17.09 14.91 12 20 6.91z\"/></svg>";

var OverflowIcon = "<svg viewBox=\"0 0 24 24\"><path d=\"M12 16a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2m0-6a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2m0-6a2 2 0 012 2 2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2z\"/></svg>";

var UndoIcon = "<svg viewBox=\"0 0 24 24\"><path d=\"M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z\"/></svg>";

var RedoIcon = "<svg viewBox=\"0 0 24 24\"><path d=\"M18.4 10.6C16.55 9 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 017.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z\"/></svg>";

var NotesIcon = "<svg viewBox=\"0 0 24 24\"><path d=\"M18.13 12l1.26-1.26c.44-.44 1-.68 1.61-.74V9l-6-6H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h6v-1.87l.13-.13H5V5h7v7h6.13M14 4.5l5.5 5.5H14V4.5m5.13 9.33l2.04 2.04L15.04 22H13v-2.04l6.13-6.13m3.72.36l-.98.98-2.04-2.04.98-.98c.19-.2.52-.2.72 0l1.32 1.32c.2.2.2.53 0 .72z\"/></svg>";

/**
 * Toolbar represents the main toolbar of the marker.js 2 interface.
 */
var Toolbar = /** @class */ (function () {
    /**
     * Creates the main marker.js toolbar.
     * @param markerjsContainer - container for the toolbar in the marker.js UI.
     * @param displayMode - marker.js display mode (`inline` or `popup`).
     * @param markerItems - available marker types.
     * @param uiStyleSettings - settings for styling the tooblar ui.
     */
    function Toolbar(markerjsContainer, displayMode, markerItems, uiStyleSettings) {
        this.buttons = [];
        this.markerButtons = [];
        this.buttonClickListeners = [];
        this.markerjsContainer = markerjsContainer;
        this.displayMode = displayMode;
        this.markerItems = markerItems;
        this.uiStyleSettings = uiStyleSettings;
        this.addStyles();
        this.adjustLayout = this.adjustLayout.bind(this);
        this.overflowButtonClicked = this.overflowButtonClicked.bind(this);
        this.setCurrentMarker = this.setCurrentMarker.bind(this);
    }
    /**
     * Creates and displays the toolbar UI.
     */
    Toolbar.prototype.show = function (visiblity) {
        var _this = this;
        this.uiContainer = document.createElement('div');
        this.uiContainer.style.visibility = visiblity;
        this.uiContainer.className = this.toolbarStyleClass.name + " " + Style.fadeInAnimationClassName + " " + (this.uiStyleSettings.toolbarStyleColorsClassName
            ? this.uiStyleSettings.toolbarStyleColorsClassName
            : this.toolbarStyleColorsClass.name);
        var actionButtonBlock = document.createElement('div');
        actionButtonBlock.className = this.toolbarBlockStyleClass.name;
        actionButtonBlock.style.whiteSpace = 'nowrap';
        this.uiContainer.appendChild(actionButtonBlock);
        this.addActionButton(actionButtonBlock, CursorIcon, 'select');
        this.addActionButton(actionButtonBlock, DeleteIcon, 'delete');
        if (this.uiStyleSettings.undoButtonVisible) {
            this.addActionButton(actionButtonBlock, UndoIcon, 'undo');
        }
        if (this.uiStyleSettings.redoButtonVisible) {
            this.addActionButton(actionButtonBlock, RedoIcon, 'redo');
        }
        if (this.uiStyleSettings.notesButtonVisible) {
            this.addActionButton(actionButtonBlock, NotesIcon, 'notes');
        }
        this.markerButtonBlock = document.createElement('div');
        this.markerButtonBlock.className = this.toolbarBlockStyleClass.name;
        this.markerButtonBlock.style.flexGrow = '2';
        this.markerButtonBlock.style.textAlign = 'center';
        this.uiContainer.appendChild(this.markerButtonBlock);
        this.markerButtonOverflowBlock = document.createElement('div');
        this.markerButtonOverflowBlock.className = this.toolbarOverflowBlockStyleClass.name + " " + (this.uiStyleSettings.toolbarOverflowBlockStyleColorsClassName
            ? this.uiStyleSettings.toolbarOverflowBlockStyleColorsClassName
            : this.toolbarOverflowBlockStyleColorsClass.name);
        this.markerButtonOverflowBlock.style.display = 'none';
        this.uiContainer.appendChild(this.markerButtonOverflowBlock);
        if (this.markerItems) {
            this.markerItems.forEach(function (mi) {
                var buttonContainer = document.createElement('div');
                buttonContainer.className = "" + _this.toolbarButtonStyleClass.name;
                //  ${
                //   this.uiStyleSettings.toolbarButtonStyleColorsClassName ?
                //   this.uiStyleSettings.toolbarButtonStyleColorsClassName : this.toolbarButtonStyleColorsClass.name}`;
                buttonContainer.innerHTML = mi.icon;
                buttonContainer.addEventListener('click', function () {
                    _this.markerToolbarButtonClicked(buttonContainer, mi);
                });
                //this.markerButtonBlock.appendChild(buttonContainer);
                _this.buttons.push(buttonContainer);
                _this.markerButtons.push(buttonContainer);
            });
            this.overflowButton = document.createElement('div');
            this.overflowButton.className = this.toolbarButtonStyleClass.name + " " + (this.uiStyleSettings.toolbarButtonStyleColorsClassName
                ? this.uiStyleSettings.toolbarButtonStyleColorsClassName
                : this.toolbarButtonStyleColorsClass.name);
            this.overflowButton.innerHTML = OverflowIcon;
            this.overflowButton.addEventListener('click', this.overflowButtonClicked);
            this.markerButtonBlock.appendChild(this.overflowButton);
        }
        var resultButtonBlock = document.createElement('div');
        resultButtonBlock.className = this.toolbarBlockStyleClass.name;
        resultButtonBlock.style.whiteSpace = 'nowrap';
        this.uiContainer.appendChild(resultButtonBlock);
        this.addActionButton(resultButtonBlock, CheckIcon, 'render');
        this.addActionButton(resultButtonBlock, CloseIcon, 'close');
        this.markerjsContainer.appendChild(this.uiContainer);
        this.setSelectMode();
        this.setCurrentMarker();
        this.adjustLayout();
        // setTimeout(this.adjustLayout, 10);
    };
    /**
     * Add a listener to the toolbar button click event.
     * @param listener
     */
    Toolbar.prototype.addButtonClickListener = function (listener) {
        this.buttonClickListeners.push(listener);
    };
    /**
     * Remove a listener for the toolbar button click event.
     * @param listener
     */
    Toolbar.prototype.removeButtonClickListener = function (listener) {
        if (this.buttonClickListeners.indexOf(listener) > -1) {
            this.buttonClickListeners.splice(this.buttonClickListeners.indexOf(listener), 1);
        }
    };
    /**
     * Switch toolbar to the `select` mode.
     */
    Toolbar.prototype.setSelectMode = function () {
        this.resetButtonStyles();
        this.setActiveButton(this.buttons[0]);
    };
    /**
     * Adjusts toolbar layout.
     */
    Toolbar.prototype.adjustLayout = function () {
        if (this.markerButtons && this.markerButtons.length > 0) {
            var numberToFit = Math.floor(this.markerButtonBlock.clientWidth /
                this.uiStyleSettings.toolbarHeight) - 1;
            this.markerButtonBlock.innerHTML = '';
            this.markerButtonOverflowBlock.innerHTML = '';
            for (var buttonIndex = 0; buttonIndex < this.markerButtons.length; buttonIndex++) {
                if (buttonIndex < numberToFit ||
                    (buttonIndex === numberToFit &&
                        this.markerButtons.length - 1 === numberToFit)) {
                    this.markerButtonBlock.appendChild(this.markerButtons[buttonIndex]);
                }
                else {
                    if (buttonIndex === numberToFit) {
                        this.markerButtonBlock.appendChild(this.overflowButton);
                    }
                    this.markerButtonOverflowBlock.appendChild(this.markerButtons[buttonIndex]);
                }
            }
        }
    };
    Toolbar.prototype.overflowButtonClicked = function () {
        if (this.markerButtonOverflowBlock.style.display !== 'none') {
            this.markerButtonOverflowBlock.className = this.markerButtonOverflowBlock.className.replace(Style.fadeInAnimationClassName, '');
            this.markerButtonOverflowBlock.style.display = 'none';
        }
        else {
            this.markerButtonOverflowBlock.className += " " + Style.fadeInAnimationClassName;
            this.markerButtonOverflowBlock.style.top = this.uiContainer.offsetTop + this.overflowButton.offsetHeight + "px";
            this.markerButtonOverflowBlock.style.right = this.uiContainer.offsetWidth -
                this.overflowButton.offsetLeft -
                this.overflowButton.offsetWidth +
                this.uiContainer.offsetLeft * 2 + "px";
            this.markerButtonOverflowBlock.style.display = 'inline-block';
        }
    };
    Toolbar.prototype.resetButtonStyles = function () {
        var _this = this;
        this.buttons.forEach(function (button) {
            button.className = button.className
                .replace(_this.uiStyleSettings.toolbarButtonStyleColorsClassName
                ? _this.uiStyleSettings.toolbarButtonStyleColorsClassName
                : _this.toolbarButtonStyleColorsClass.name, '')
                .trim();
            button.className = button.className
                .replace(_this.uiStyleSettings.toolbarActiveButtonStyleColorsClassName
                ? _this.uiStyleSettings.toolbarActiveButtonStyleColorsClassName
                : _this.toolbarActiveButtonStyleColorsClass.name, '')
                .trim();
            button.className += " " + (_this.uiStyleSettings.toolbarButtonStyleColorsClassName
                ? _this.uiStyleSettings.toolbarButtonStyleColorsClassName
                : _this.toolbarButtonStyleColorsClass.name);
        });
    };
    Toolbar.prototype.addActionButton = function (container, icon, value) {
        var _this = this;
        var actionButton = document.createElement('div');
        actionButton.className = "" + this.toolbarButtonStyleClass.name;
        //  ${
        //   this.uiStyleSettings.toolbarButtonStyleColorsClassName ?
        //   this.uiStyleSettings.toolbarButtonStyleColorsClassName : this.toolbarButtonStyleColorsClass.name}`;
        actionButton.innerHTML = icon;
        actionButton.setAttribute('data-action', value);
        actionButton.addEventListener('click', function () {
            _this.actionToolbarButtonClicked(actionButton, value);
        });
        switch (value) {
            case 'select':
                actionButton.style.fill = this.uiStyleSettings.selectButtonColor;
                break;
            case 'delete':
                actionButton.style.fill = this.uiStyleSettings.deleteButtonColor;
                break;
            case 'undo':
                actionButton.style.fill = this.uiStyleSettings.selectButtonColor;
                break;
            case 'redo':
                actionButton.style.fill = this.uiStyleSettings.selectButtonColor;
                break;
            case 'render':
                actionButton.style.fill = this.uiStyleSettings.okButtonColor;
                break;
            case 'close':
                actionButton.style.fill = this.uiStyleSettings.closeButtonColor;
                break;
        }
        container.appendChild(actionButton);
        this.buttons.push(actionButton);
    };
    Toolbar.prototype.addStyles = function () {
        this.toolbarStyleClass = Style.addClass(new StyleClass('toolbar', "\n      width: 100%;\n      flex-shrink: 0;\n      display: flex;\n      flex-direction: row;\n      justify-content: space-between;      \n      height: " + this.uiStyleSettings.toolbarHeight + "px;\n      box-sizing: content-box;\n      " + (this.displayMode === 'inline'
            ? "border-top-left-radius: " + Math.round(this.uiStyleSettings.toolbarHeight / 10) + "px;"
            : '') + "\n      " + (this.displayMode === 'inline'
            ? "border-top-right-radius: " + Math.round(this.uiStyleSettings.toolbarHeight / 10) + "px;"
            : '') + "\n      overflow: hidden;\n    "));
        this.toolbarStyleColorsClass = Style.addClass(new StyleClass('toolbar_colors', "\n      background-color: " + this.uiStyleSettings.toolbarBackgroundColor + ";\n      box-shadow: 0px 3px rgba(33, 33, 33, 0.1);\n    "));
        this.toolbarBlockStyleClass = Style.addClass(new StyleClass('toolbar-block', "\n        display: inline-block;\n        box-sizing: content-box;\n    "));
        this.toolbarOverflowBlockStyleClass = Style.addClass(new StyleClass('toolbar-overflow-block', "\n        position: absolute;\n        top: " + this.uiStyleSettings.toolbarHeight + "px;\n        max-width: " + this.uiStyleSettings.toolbarHeight * 2 + "px;\n        z-index: 10;\n        box-sizing: content-box;\n      "));
        this.toolbarOverflowBlockStyleColorsClass = Style.addClass(new StyleClass('toolbar-overflow-block_colors', "\n        background-color: " + this.uiStyleSettings.toolbarBackgroundColor + ";\n      "));
        var buttonPadding = this.uiStyleSettings.toolbarHeight / 4;
        this.toolbarButtonStyleClass = Style.addClass(new StyleClass('toolbar_button', "\n      display: inline-block;\n      width: " + (this.uiStyleSettings.toolbarHeight - buttonPadding * 2) + "px;\n      height: " + (this.uiStyleSettings.toolbarHeight - buttonPadding * 2) + "px;\n      padding: " + buttonPadding + "px;\n      box-sizing: content-box;\n    "));
        this.toolbarButtonStyleColorsClass = Style.addClass(new StyleClass('toolbar_button_colors', "\n      fill: " + this.uiStyleSettings.toolbarColor + ";\n    "));
        this.toolbarActiveButtonStyleColorsClass = Style.addClass(new StyleClass('toolbar_active_button', "\n      fill: " + this.uiStyleSettings.toolbarColor + ";\n      background-color: " + this.uiStyleSettings.toolbarBackgroundHoverColor + "\n    "));
        Style.addRule(new StyleRule("." + this.toolbarButtonStyleClass.name + " svg", "\n      height: " + this.uiStyleSettings.toolbarHeight / 2 + "px;\n    "));
        Style.addRule(new StyleRule("." + this.toolbarButtonStyleColorsClass.name + ":hover", "\n        background-color: " + this.uiStyleSettings.toolbarBackgroundHoverColor + "\n    "));
    };
    Toolbar.prototype.markerToolbarButtonClicked = function (button, markerType) {
        this.setActiveButton(button);
        if (this.buttonClickListeners && this.buttonClickListeners.length > 0) {
            this.buttonClickListeners.forEach(function (listener) {
                return listener('marker', markerType);
            });
        }
        this.markerButtonOverflowBlock.style.display = 'none';
    };
    Toolbar.prototype.actionToolbarButtonClicked = function (button, action) {
        if (this.buttonClickListeners && this.buttonClickListeners.length > 0) {
            this.buttonClickListeners.forEach(function (listener) {
                return listener('action', action);
            });
        }
        this.markerButtonOverflowBlock.style.display = 'none';
        this.setActiveButton(this.buttons[0]);
    };
    Toolbar.prototype.setActiveButton = function (button) {
        this.resetButtonStyles();
        button.className = button.className
            .replace(this.uiStyleSettings.toolbarButtonStyleColorsClassName
            ? this.uiStyleSettings.toolbarButtonStyleColorsClassName
            : this.toolbarButtonStyleColorsClass.name, '')
            .trim();
        button.className += " " + (this.uiStyleSettings.toolbarActiveButtonStyleColorsClassName
            ? this.uiStyleSettings.toolbarActiveButtonStyleColorsClassName
            : this.toolbarActiveButtonStyleColorsClass.name);
    };
    /**
     * Sets current marker and enables/disables action buttons accordingly.
     * @param marker
     */
    Toolbar.prototype.setCurrentMarker = function (marker) {
        var _this = this;
        this.currentMarker = marker;
        var activeMarkerButtons = this.buttons.filter(function (btn) {
            return /delete|notes/.test(btn.getAttribute('data-action'));
        });
        activeMarkerButtons.forEach(function (btn) {
            if (_this.currentMarker === undefined) {
                btn.style.fillOpacity = '0.4';
                btn.style.pointerEvents = 'none';
            }
            else {
                btn.style.fillOpacity = '1';
                btn.style.pointerEvents = 'all';
            }
        });
    };
    return Toolbar;
}());

/**
 * Represents the contextual toolbox for the selected marker type.
 */
var Toolbox = /** @class */ (function () {
    /**
     * Creates the toolbox object
     * @param markerjsContainer - container for the toolbox in marker.js UI.
     * @param displayMode - marker.js display mode (`inline` or `popup`).
     * @param uiStyleSettings - settings for styling the toolbox elements.
     */
    function Toolbox(markerjsContainer, displayMode, uiStyleSettings) {
        this.panels = [];
        this.panelButtons = [];
        this.markerjsContainer = markerjsContainer;
        this.displayMode = displayMode;
        this.uiStyleSettings = uiStyleSettings;
        this.panelButtonClick = this.panelButtonClick.bind(this);
        this.addStyles();
    }
    Toolbox.prototype.addStyles = function () {
        this.toolboxStyleClass = Style.addClass(new StyleClass('toolbox', "\n      width: 100%;\n      flex-shrink: 0;\n      display: flex;\n      flex-direction: column;\n      font-family: sans-serif;\n      " + (this.displayMode === 'popup' ? 'height:' + this.uiStyleSettings.toolbarHeight * 2.5 + 'px;' : '') + "\n      box-sizing: content-box;\n      " + (this.displayMode === 'popup' ? "background-color: " + this.uiStyleSettings.canvasBackgroundColor + ";" : '') + "\n      " + (this.displayMode === 'inline' ? "border-bottom-left-radius: " + Math.round(this.uiStyleSettings.toolbarHeight / 10) + "px;" : '') + "\n      " + (this.displayMode === 'inline' ? "border-bottom-right-radius: " + Math.round(this.uiStyleSettings.toolbarHeight / 10) + "px;" : '') + "\n      overflow: hidden;\n    "));
        this.toolboxStyleColorsClass = Style.addClass(new StyleClass('toolbox_colors', "\n      color: " + this.uiStyleSettings.toolboxColor + ";\n    "));
        var buttonPadding = this.uiStyleSettings.toolbarHeight / 4;
        this.toolboxButtonRowStyleClass = Style.addClass(new StyleClass('toolbox-button-row', "\n      display: flex;\n      cursor: default;\n      box-sizing: content-box;\n    "));
        this.toolboxButtonRowStyleColorsClass = Style.addClass(new StyleClass('toolbox-button-row_colors', "\n      background-color: " + this.uiStyleSettings.toolbarBackgroundColor + ";\n    "));
        this.toolboxPanelRowStyleClass = Style.addClass(new StyleClass('toolbox-panel-row', "\n      display: flex;\n      " + (this.displayMode === 'inline' ? 'position: absolute;' : '') + "\n      " + (this.displayMode === 'inline' ? 'bottom: ' + this.uiStyleSettings.toolbarHeight + 'px;' : '') + "\n      cursor: default;\n      height: " + this.uiStyleSettings.toolbarHeight * 1.5 + "px;\n      " + (this.displayMode === 'inline' ? 'width: 100%;' : '') + "\n      box-sizing: content-box;\n    "));
        this.toolboxPanelRowStyleColorsClass = Style.addClass(new StyleClass('toolbox-panel-row_colors', "\n      background-color: " + this.uiStyleSettings.toolbarBackgroundHoverColor + ";\n    "));
        this.toolboxButtonStyleClass = Style.addClass(new StyleClass('toolbox_button', "\n      display: inline-block;\n      width: " + (this.uiStyleSettings.toolbarHeight - buttonPadding * 2) + "px;\n      height: " + (this.uiStyleSettings.toolbarHeight - buttonPadding * 2) + "px;\n      padding: " + buttonPadding + "px;\n      box-sizing: content-box;\n    "));
        this.toolboxButtonStyleColorsClass = Style.addClass(new StyleClass('toolbox-button_colors', "\n      fill: " + this.uiStyleSettings.toolbarColor + ";\n    "));
        this.toolboxActiveButtonStyleColorsClass = Style.addClass(new StyleClass('toolbox-active-button_colors', "\n      background-color: " + this.uiStyleSettings.toolbarBackgroundHoverColor + ";\n      fill: " + this.uiStyleSettings.toolbarColor + ";\n    "));
        Style.addRule(new StyleRule("." + this.toolboxButtonStyleColorsClass.name + ":hover", "\n        background-color: " + this.uiStyleSettings.toolbarBackgroundHoverColor + "\n    "));
        Style.addRule(new StyleRule("." + this.toolboxButtonStyleClass.name + " svg", "\n      height: " + this.uiStyleSettings.toolbarHeight / 2 + "px;\n    "));
    };
    /**
     * Creates and displays the main toolbox UI.
     */
    Toolbox.prototype.show = function (visiblity) {
        var _a;
        this.uiContainer = document.createElement('div');
        this.uiContainer.style.visibility = visiblity;
        this.uiContainer.className = this.toolboxStyleClass.name + " " + ((_a = this.uiStyleSettings.toolboxStyleColorsClassName) !== null && _a !== void 0 ? _a : this.toolboxStyleColorsClass.name);
        this.markerjsContainer.appendChild(this.uiContainer);
    };
    /**
     * Creaes buttons for the top-level toolbox panel.
     * @param panels - available panels.
     */
    Toolbox.prototype.setPanelButtons = function (panels) {
        var _this = this;
        var _a, _b;
        this.panels = panels;
        if (this.uiContainer !== undefined) {
            this.uiContainer.innerHTML = '';
            this.panelRow = document.createElement('div');
            this.panelRow.className = this.toolboxPanelRowStyleClass.name + " " + ((_a = this.uiStyleSettings.toolboxPanelRowStyleColorsClassName) !== null && _a !== void 0 ? _a : this.toolboxPanelRowStyleColorsClass.name);
            this.uiContainer.appendChild(this.panelRow);
            this.buttonRow = document.createElement('div');
            this.buttonRow.className = this.toolboxButtonRowStyleClass.name + " " + ((_b = this.uiStyleSettings.toolboxButtonRowStyleColorsClassName) !== null && _b !== void 0 ? _b : this.toolboxButtonRowStyleColorsClass.name) + " ";
            this.uiContainer.appendChild(this.buttonRow);
            this.panelButtons.splice(0);
            this.panels.forEach(function (panel) {
                var _a;
                var panelBtnDiv = document.createElement('div');
                panelBtnDiv.className = _this.toolboxButtonStyleClass.name + " " + ((_a = _this.uiStyleSettings.toolboxButtonStyleColorsClassName) !== null && _a !== void 0 ? _a : _this.toolboxButtonStyleColorsClass.name);
                panelBtnDiv.innerHTML = panel.icon;
                panelBtnDiv.title = panel.title;
                panelBtnDiv.addEventListener('click', function () {
                    _this.panelButtonClick(panel);
                });
                _this.panelButtons.push(panelBtnDiv);
                _this.buttonRow.appendChild(panelBtnDiv);
            });
            if (this.displayMode === 'inline') {
                this.panelRow.style.display = 'none';
            }
            else {
                this.panelRow.style.visibility = 'hidden';
            }
        }
        // if (this.displayMode === 'popup' && this.panels.length > 0) {
        //   // this.showPanel(this.activePanel ? this.activePanel : this.panels[0]);
        //   this.panelButtonClick(this.panels[0]);
        // }
    };
    Toolbox.prototype.panelButtonClick = function (panel) {
        var _this = this;
        var panelIndex = -1;
        if (panel !== this.activePanel) {
            panelIndex = this.panels.indexOf(panel);
            this.panelRow.innerHTML = '';
            var panelUI = panel.getUi();
            panelUI.style.margin = this.uiStyleSettings.toolbarHeight / 4 + "px";
            this.panelRow.appendChild(panelUI);
            this.panelRow.style.display = 'flex';
            this.panelRow.style.visibility = 'visible';
            this.panelRow.className = this.panelRow.className.replace(Style.fadeOutAnimationClassName, '');
            this.panelRow.className += " " + Style.fadeInAnimationClassName;
            this.activePanel = panel;
        }
        else {
            this.activePanel = undefined;
            // hide panel
            this.panelRow.className = this.panelRow.className.replace(Style.fadeInAnimationClassName, '');
            this.panelRow.className += " " + Style.fadeOutAnimationClassName;
            setTimeout(function () {
                if (_this.displayMode === 'inline') {
                    _this.panelRow.style.display = 'none';
                }
                else {
                    _this.panelRow.style.visibility = 'hidden';
                }
            }, 200);
        }
        this.panelButtons.forEach(function (pb, index) {
            var _a, _b;
            pb.className = _this.toolboxButtonStyleClass.name + " " +
                (index === panelIndex
                    ? "" + ((_a = _this.uiStyleSettings.toolboxActiveButtonStyleColorsClassName) !== null && _a !== void 0 ? _a : _this.toolboxActiveButtonStyleColorsClass.name)
                    : "" + ((_b = _this.uiStyleSettings.toolboxButtonStyleColorsClassName) !== null && _b !== void 0 ? _b : _this.toolboxButtonStyleColorsClass.name));
        });
    };
    return Toolbox;
}());

var Icon = "<svg viewBox=\"0 0 24 24\"><path d=\"M4 6v13h16V6H4m14 11H6V8h12v9z\"/></svg>";

/**
 * Base class for all toolbox property panels.
 */
var ToolboxPanel = /** @class */ (function () {
    /**
     * Create panel with supplied title and icon.
     * @param title - panel name (used for accessibility)
     * @param icon - panel button icon (SVG image markup)
     */
    function ToolboxPanel(title, icon) {
        this.title = title;
        this.icon = icon;
    }
    return ToolboxPanel;
}());

var Icon$1 = "<svg viewBox=\"0 0 24 24\"><path d=\"M17.5 12a1.5 1.5 0 01-1.5-1.5A1.5 1.5 0 0117.5 9a1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5m-3-4A1.5 1.5 0 0113 6.5 1.5 1.5 0 0114.5 5 1.5 1.5 0 0116 6.5 1.5 1.5 0 0114.5 8m-5 0A1.5 1.5 0 018 6.5 1.5 1.5 0 019.5 5 1.5 1.5 0 0111 6.5 1.5 1.5 0 019.5 8m-3 4A1.5 1.5 0 015 10.5 1.5 1.5 0 016.5 9 1.5 1.5 0 018 10.5 1.5 1.5 0 016.5 12M12 3a9 9 0 00-9 9 9 9 0 009 9 1.5 1.5 0 001.5-1.5c0-.39-.15-.74-.39-1-.23-.27-.38-.62-.38-1a1.5 1.5 0 011.5-1.5H16a5 5 0 005-5c0-4.42-4.03-8-9-8z\"/></svg>";

/**
 * Color picker panel.
 */
var ColorPickerPanel = /** @class */ (function (_super) {
    __extends(ColorPickerPanel, _super);
    /**
     * Creates a color picker panel.
     * @param title - panel title.
     * @param colors - available colors.
     * @param currentColor - currently selected color.
     * @param icon - panel button icon (SVG imager markup).
     */
    function ColorPickerPanel(title, colors, currentColor, icon) {
        var _this = _super.call(this, title, icon ? icon : Icon$1) || this;
        _this.colors = [];
        _this.addTransparent = false;
        _this.colorBoxes = [];
        _this.colors = colors;
        _this.currentColor = currentColor;
        _this.setCurrentColor = _this.setCurrentColor.bind(_this);
        _this.getColorBox = _this.getColorBox.bind(_this);
        return _this;
    }
    /**
     * Returns panel UI.
     */
    ColorPickerPanel.prototype.getUi = function () {
        var _this = this;
        var panelDiv = document.createElement('div');
        panelDiv.style.overflow = 'hidden';
        panelDiv.style.whiteSpace = 'nowrap';
        this.colors.forEach(function (color) {
            var colorBoxContainer = _this.getColorBox(color);
            panelDiv.appendChild(colorBoxContainer);
            _this.colorBoxes.push(colorBoxContainer);
        });
        return panelDiv;
    };
    ColorPickerPanel.prototype.getColorBox = function (color) {
        var _this = this;
        var buttonPadding = Style.settings.toolbarHeight / 4;
        var buttonHeight = Style.settings.toolbarHeight - buttonPadding;
        var colorBoxContainer = document.createElement('div');
        colorBoxContainer.style.display = 'inline-block';
        colorBoxContainer.style.boxSizing = 'content-box';
        colorBoxContainer.style.width = buttonHeight - 2 + "px";
        colorBoxContainer.style.height = buttonHeight - 2 + "px";
        colorBoxContainer.style.padding = '1px';
        colorBoxContainer.style.marginRight = '2px';
        colorBoxContainer.style.marginBottom = '2px';
        colorBoxContainer.style.borderWidth = '2px';
        colorBoxContainer.style.borderStyle = 'solid';
        colorBoxContainer.style.borderRadius = (buttonHeight + 2) / 2 + "px";
        colorBoxContainer.style.borderColor =
            color === this.currentColor ? Style.settings.toolboxAccentColor : 'transparent';
        colorBoxContainer.addEventListener('click', function () {
            _this.setCurrentColor(color, colorBoxContainer);
        });
        var colorBox = document.createElement('div');
        colorBox.style.display = 'inline-block';
        colorBox.style.width = buttonHeight - 2 + "px";
        colorBox.style.height = buttonHeight - 2 + "px";
        colorBox.style.backgroundColor = color;
        colorBox.style.borderRadius = buttonHeight / 2 + "px";
        if (color === 'transparent') {
            colorBox.style.fill = Style.settings.toolboxAccentColor;
            colorBox.innerHTML = "<svg viewBox=\"0 0 24 24\">\n        <path d=\"M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z\" />\n      </svg>";
        }
        colorBoxContainer.appendChild(colorBox);
        return colorBoxContainer;
    };
    ColorPickerPanel.prototype.setCurrentColor = function (color, target) {
        this.currentColor = color;
        this.colorBoxes.forEach(function (box) {
            box.style.borderColor = box === target ? Style.settings.toolboxAccentColor : 'transparent';
        });
        if (this.onColorChanged) {
            this.onColorChanged(color);
        }
    };
    return ColorPickerPanel;
}(ToolboxPanel));

/**
 * Base class for all available and custom marker types.
 *
 * All markers used with marker.js 2 should be descendants of this class.
 */
var MarkerBase = /** @class */ (function () {
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function MarkerBase(container, overlayContainer, settings) {
        this._state = 'new';
        this._container = container;
        this._overlayContainer = overlayContainer;
        this.globalSettings = settings;
    }
    Object.defineProperty(MarkerBase.prototype, "container", {
        /**
         * SVG container object holding the marker's visual.
         */
        get: function () {
            return this._container;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarkerBase.prototype, "overlayContainer", {
        /**
         * HTML container that can be used to render overlay objects while the marker is active.
         *
         * For example, this is used for the text editing layer while editing text in the {@see TextMarker}.
         */
        get: function () {
            return this._overlayContainer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarkerBase.prototype, "state", {
        /**
         * Current marker state.
         *
         * Both MarkerArea and the marker itself can react differently to different events based on what state the marker is in.
         */
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarkerBase.prototype, "toolboxPanels", {
        /**
         * Returns the list of toolbox panels for this marker type.
         */
        get: function () {
            return [];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns true if passed SVG element belongs to the marker. False otherwise.
     *
     * @param el - target element.
     */
    
    MarkerBase.prototype.ownsTarget = function (el) {
        return false;
    };
    /**
     * Selects this marker and displays appropriate selected marker UI.
     */
    MarkerBase.prototype.select = function () {
        this.container.style.cursor = 'move';
    };
    /**
     * Deselects this marker and hides selected marker UI.
     */
    MarkerBase.prototype.deselect = function () {
        this.container.style.cursor = 'default';
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) down event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    
    MarkerBase.prototype.pointerDown = function (point, target) { };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) double click event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    
    MarkerBase.prototype.dblClick = function (point, target) { };
    /**
     * Handles marker manipulation (move, resize, rotate, etc.).
     *
     * @param point - event coordinates.
     */
    
    MarkerBase.prototype.manipulate = function (point) { };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) up event.
     *
     * @param point - event coordinates.
     */
    
    MarkerBase.prototype.pointerUp = function (point) { };
    /**
     * Disposes the marker and clean's up.
     */
    
    MarkerBase.prototype.dispose = function () { };
    MarkerBase.prototype.addMarkerVisualToContainer = function (element) {
        if (this.container.childNodes.length > 0) {
            this.container.insertBefore(element, this.container.childNodes[0]);
        }
        else {
            this.container.appendChild(element);
        }
    };
    /**
     * Returns current marker state that can be restored in the future.
     */
    MarkerBase.prototype.getState = function () {
        return {
            typeName: MarkerBase.typeName,
            state: this.state,
            notes: this.notes
        };
    };
    /**
     * Restores previously saved marker state.
     *
     * @param state - previously saved state.
     */
    MarkerBase.prototype.restoreState = function (state) {
        this._state = state.state;
        this.notes = state.notes;
    };
    /**
     * Scales marker. Used after the image resize.
     *
     * @param scaleX - horizontal scale
     * @param scaleY - vertical scale
     */
    
    MarkerBase.prototype.scale = function (scaleX, scaleY) { };
    /**
     * Called by a marker when its foreground color changes.
     * @param color
     */
    MarkerBase.prototype.colorChanged = function (color) {
        if (this.onColorChanged) {
            this.onColorChanged(color);
        }
    };
    /**
     * Called by a marker when its background/fill color changes.
     * @param color
     */
    MarkerBase.prototype.fillColorChanged = function (color) {
        if (this.onFillColorChanged) {
            this.onFillColorChanged(color);
        }
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    MarkerBase.typeName = 'MarkerBase';
    return MarkerBase;
}());

/**
 * RectangularBoxMarkerGrips is a set of resize/rotation grips for a rectangular marker.
 */
var RectangularBoxMarkerGrips = /** @class */ (function () {
    /**
     * Creates a new marker grip set.
     */
    function RectangularBoxMarkerGrips() {
        this.findGripByVisual = this.findGripByVisual.bind(this);
    }
    /**
     * Returns a marker grip owning the specified visual.
     * @param gripVisual - visual for owner to be determined.
     */
    RectangularBoxMarkerGrips.prototype.findGripByVisual = function (gripVisual) {
        if (this.topLeft.ownsTarget(gripVisual)) {
            return this.topLeft;
        }
        else if (this.topCenter.ownsTarget(gripVisual)) {
            return this.topCenter;
        }
        else if (this.topRight.ownsTarget(gripVisual)) {
            return this.topRight;
        }
        else if (this.centerLeft.ownsTarget(gripVisual)) {
            return this.centerLeft;
        }
        else if (this.centerRight.ownsTarget(gripVisual)) {
            return this.centerRight;
        }
        else if (this.bottomLeft.ownsTarget(gripVisual)) {
            return this.bottomLeft;
        }
        else if (this.bottomCenter.ownsTarget(gripVisual)) {
            return this.bottomCenter;
        }
        else if (this.bottomRight.ownsTarget(gripVisual)) {
            return this.bottomRight;
        }
        else {
            return undefined;
        }
    };
    return RectangularBoxMarkerGrips;
}());

/**
 * Represents a single resize-manipulation grip used in marker's manipulation controls.
 */
var ResizeGrip = /** @class */ (function () {
    /**
     * Creates a new grip.
     */
    function ResizeGrip() {
        /**
         * Grip's size (raduis).
         */
        this.GRIP_SIZE = 10;
        this.visual = SvgHelper.createGroup();
        this.visual.appendChild(SvgHelper.createCircle(this.GRIP_SIZE * 1.5, [['fill', 'transparent']]));
        this.visual.appendChild(SvgHelper.createCircle(this.GRIP_SIZE, [
            ['fill', '#cccccc'],
            ['fill-opacity', '0.7'],
            ['stroke', '#333333'],
            ['stroke-width', '2'],
            ['stroke-opacity', '0.7']
        ]));
    }
    /**
     * Returns true if passed SVG element belongs to the grip. False otherwise.
     *
     * @param el - target element.
     */
    ResizeGrip.prototype.ownsTarget = function (el) {
        if (el === this.visual ||
            el === this.visual.childNodes[0] ||
            el === this.visual.childNodes[1]) {
            return true;
        }
        else {
            return false;
        }
    };
    return ResizeGrip;
}());

/**
 * A utility class to transform between SVGMatrix and its simplified representation.
 */
var TransformMatrix = /** @class */ (function () {
    function TransformMatrix() {
    }
    TransformMatrix.toITransformMatrix = function (matrix) {
        return {
            a: matrix.a,
            b: matrix.b,
            c: matrix.c,
            d: matrix.d,
            e: matrix.e,
            f: matrix.f
        };
    };
    TransformMatrix.toSVGMatrix = function (currentMatrix, newMatrix) {
        currentMatrix.a = newMatrix.a;
        currentMatrix.b = newMatrix.b;
        currentMatrix.c = newMatrix.c;
        currentMatrix.d = newMatrix.d;
        currentMatrix.e = newMatrix.e;
        currentMatrix.f = newMatrix.f;
        return currentMatrix;
    };
    return TransformMatrix;
}());

/**
 * RectangularBoxMarkerBase is a base class for all marker's with rectangular controls such as all rectangle markers,
 * text and callout markers.
 *
 * It creates and manages the rectangular control box and related resize, move, and rotate manipulations.
 */
var RectangularBoxMarkerBase = /** @class */ (function (_super) {
    __extends(RectangularBoxMarkerBase, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function RectangularBoxMarkerBase(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        /**
         * x coordinate of the top-left corner.
         */
        _this.left = 0;
        /**
         * y coordinate of the top-left corner.
         */
        _this.top = 0;
        /**
         * Marker width.
         */
        _this.width = 0;
        /**
         * Marker height.
         */
        _this.height = 0;
        /**
         * The default marker size when the marker is created with a click (without dragging).
         */
        _this.defaultSize = { x: 50, y: 20 };
        /**
         * Pointer's horizontal distance from the top left corner.
         */
        _this.offsetX = 0;
        /**
         * Pointer's vertical distance from the top left corner.
         */
        _this.offsetY = 0;
        /**
         * Marker's rotation angle.
         */
        _this.rotationAngle = 0;
        _this.CB_DISTANCE = 10;
        // add rotation transform
        _this.container.transform.baseVal.appendItem(SvgHelper.createTransform());
        _this.setupControlBox();
        return _this;
    }
    Object.defineProperty(RectangularBoxMarkerBase.prototype, "centerX", {
        /**
         * x coordinate of the marker's center.
         */
        get: function () {
            return this.left + this.width / 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangularBoxMarkerBase.prototype, "centerY", {
        /**
         * y coordinate of the marker's center.
         */
        get: function () {
            return this.top + this.height / 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RectangularBoxMarkerBase.prototype, "visual", {
        /**
         * Container for the marker's visual.
         */
        get: function () {
            return this._visual;
        },
        set: function (value) {
            this._visual = value;
            var translate = SvgHelper.createTransform();
            this._visual.transform.baseVal.appendItem(translate);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns true if passed SVG element belongs to the marker. False otherwise.
     *
     * @param el - target element.
     */
    RectangularBoxMarkerBase.prototype.ownsTarget = function (el) {
        if (_super.prototype.ownsTarget.call(this, el)) {
            return true;
        }
        else if (this.controlGrips.findGripByVisual(el) !== undefined ||
            this.rotatorGrip.ownsTarget(el)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) down event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    RectangularBoxMarkerBase.prototype.pointerDown = function (point, target) {
        _super.prototype.pointerDown.call(this, point, target);
        if (this.state === 'new') {
            this.left = point.x;
            this.top = point.y;
        }
        this.manipulationStartLeft = this.left;
        this.manipulationStartTop = this.top;
        this.manipulationStartWidth = this.width;
        this.manipulationStartHeight = this.height;
        var rotatedPoint = this.unrotatePoint(point);
        this.manipulationStartX = rotatedPoint.x;
        this.manipulationStartY = rotatedPoint.y;
        this.offsetX = rotatedPoint.x - this.left;
        this.offsetY = rotatedPoint.y - this.top;
        if (this.state !== 'new') {
            this.select();
            this.activeGrip = this.controlGrips.findGripByVisual(target);
            if (this.activeGrip !== undefined) {
                this._state = 'resize';
            }
            else if (this.rotatorGrip.ownsTarget(target)) {
                this.activeGrip = this.rotatorGrip;
                var rotatedCenter = this.rotatePoint({ x: this.centerX, y: this.centerY });
                this.left = rotatedCenter.x - this.width / 2;
                this.top = rotatedCenter.y - this.height / 2;
                this.moveVisual({ x: this.left, y: this.top });
                var rotate = this.container.transform.baseVal.getItem(0);
                rotate.setRotate(this.rotationAngle, this.centerX, this.centerY);
                this.container.transform.baseVal.replaceItem(rotate, 0);
                this.adjustControlBox();
                this._state = 'rotate';
            }
            else {
                this._state = 'move';
            }
        }
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) up event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    RectangularBoxMarkerBase.prototype.pointerUp = function (point) {
        var inState = this.state;
        _super.prototype.pointerUp.call(this, point);
        if (this.state === 'creating' && this.width < 10 && this.height < 10) {
            this.width = this.defaultSize.x;
            this.height = this.defaultSize.y;
        }
        else {
            this.manipulate(point);
        }
        this._state = 'select';
        if (inState === 'creating' && this.onMarkerCreated) {
            this.onMarkerCreated(this);
        }
    };
    /**
     * Moves visual to the specified coordinates.
     * @param point - coordinates of the new top-left corner of the visual.
     */
    RectangularBoxMarkerBase.prototype.moveVisual = function (point) {
        this.visual.style.transform = "translate(" + point.x + "px, " + point.y + "px)";
        // const translate = this.visual.transform.baseVal.getItem(0);
        // translate.setTranslate(point.x, point.y);
        // this.visual.transform.baseVal.replaceItem(translate, 0);
    };
    /**
     * Handles marker manipulation (move, resize, rotate, etc.).
     *
     * @param point - event coordinates.
     */
    RectangularBoxMarkerBase.prototype.manipulate = function (point) {
        var rotatedPoint = this.unrotatePoint(point);
        if (this.state === 'creating') {
            this.resize(point);
        }
        else if (this.state === 'move') {
            this.left =
                this.manipulationStartLeft +
                    (rotatedPoint.x - this.manipulationStartLeft) -
                    this.offsetX;
            this.top =
                this.manipulationStartTop +
                    (rotatedPoint.y - this.manipulationStartTop) -
                    this.offsetY;
            this.moveVisual({ x: this.left, y: this.top });
            this.adjustControlBox();
        }
        else if (this.state === 'resize') {
            this.resize(rotatedPoint);
        }
        else if (this.state === 'rotate') {
            this.rotate(point);
        }
    };
    /**
     * Resizes the marker based on pointer coordinates and context.
     * @param point - pointer coordinates.
     */
    RectangularBoxMarkerBase.prototype.resize = function (point) {
        var newX = this.manipulationStartLeft;
        var newWidth = this.manipulationStartWidth;
        var newY = this.manipulationStartTop;
        var newHeight = this.manipulationStartHeight;
        switch (this.activeGrip) {
            case this.controlGrips.bottomLeft:
            case this.controlGrips.centerLeft:
            case this.controlGrips.topLeft:
                newX = this.manipulationStartLeft + point.x - this.manipulationStartX;
                newWidth = this.manipulationStartWidth + this.manipulationStartLeft - newX;
                break;
            case this.controlGrips.bottomRight:
            case this.controlGrips.centerRight:
            case this.controlGrips.topRight:
            case undefined:
                newWidth = this.manipulationStartWidth + point.x - this.manipulationStartX;
                break;
        }
        switch (this.activeGrip) {
            case this.controlGrips.topCenter:
            case this.controlGrips.topLeft:
            case this.controlGrips.topRight:
                newY = this.manipulationStartTop + point.y - this.manipulationStartY;
                newHeight = this.manipulationStartHeight + this.manipulationStartTop - newY;
                break;
            case this.controlGrips.bottomCenter:
            case this.controlGrips.bottomLeft:
            case this.controlGrips.bottomRight:
            case undefined:
                newHeight = this.manipulationStartHeight + point.y - this.manipulationStartY;
                break;
        }
        if (newWidth >= 0) {
            this.left = newX;
            this.width = newWidth;
        }
        else {
            this.left = newX + newWidth;
            this.width = -newWidth;
        }
        if (newHeight >= 0) {
            this.top = newY;
            this.height = newHeight;
        }
        else {
            this.top = newY + newHeight;
            this.height = -newHeight;
        }
        this.setSize();
    };
    /**
     * Sets control box size and location.
     */
    RectangularBoxMarkerBase.prototype.setSize = function () {
        this.moveVisual({ x: this.left, y: this.top });
        this.adjustControlBox();
    };
    RectangularBoxMarkerBase.prototype.rotate = function (point) {
        // avoid glitch when crossing the 0 rotation point
        if (Math.abs(point.x - this.centerX) > 0.1) {
            var sign = Math.sign(point.x - this.centerX);
            this.rotationAngle =
                (Math.atan((point.y - this.centerY) / (point.x - this.centerX)) * 180) /
                    Math.PI +
                    90 * sign;
            this.applyRotation();
        }
    };
    RectangularBoxMarkerBase.prototype.applyRotation = function () {
        var rotate = this.container.transform.baseVal.getItem(0);
        rotate.setRotate(this.rotationAngle, this.centerX, this.centerY);
        this.container.transform.baseVal.replaceItem(rotate, 0);
    };
    /**
     * Returns point coordinates based on the actual screen coordinates and marker's rotation.
     * @param point - original pointer coordinates
     */
    RectangularBoxMarkerBase.prototype.rotatePoint = function (point) {
        if (this.rotationAngle === 0) {
            return point;
        }
        var matrix = this.container.getCTM();
        var svgPoint = SvgHelper.createPoint(point.x, point.y);
        svgPoint = svgPoint.matrixTransform(matrix);
        var result = { x: svgPoint.x, y: svgPoint.y };
        return result;
    };
    /**
     * Returns original point coordinates based on coordinates with rotation applied.
     * @param point - rotated point coordinates.
     */
    RectangularBoxMarkerBase.prototype.unrotatePoint = function (point) {
        if (this.rotationAngle === 0) {
            return point;
        }
        var matrix = this.container.getCTM();
        matrix = matrix.inverse();
        var svgPoint = SvgHelper.createPoint(point.x, point.y);
        svgPoint = svgPoint.matrixTransform(matrix);
        var result = { x: svgPoint.x, y: svgPoint.y };
        return result;
    };
    /**
     * Displays marker's controls.
     */
    RectangularBoxMarkerBase.prototype.select = function () {
        _super.prototype.select.call(this);
        this.adjustControlBox();
        this.controlBox.style.display = '';
    };
    /**
     * Hides marker's controls.
     */
    RectangularBoxMarkerBase.prototype.deselect = function () {
        _super.prototype.deselect.call(this);
        this.controlBox.style.display = 'none';
    };
    RectangularBoxMarkerBase.prototype.setupControlBox = function () {
        this.controlBox = SvgHelper.createGroup();
        var translate = SvgHelper.createTransform();
        translate.setTranslate(-this.CB_DISTANCE / 2, -this.CB_DISTANCE / 2);
        this.controlBox.transform.baseVal.appendItem(translate);
        this.container.appendChild(this.controlBox);
        this.controlRect = SvgHelper.createRect(this.width + this.CB_DISTANCE, this.height + this.CB_DISTANCE, [
            ['stroke', 'black'],
            ['stroke-width', '1'],
            ['stroke-opacity', '0.5'],
            ['stroke-dasharray', '3, 2'],
            ['fill', 'transparent'],
            ['pointer-events', 'none']
        ]);
        this.controlBox.appendChild(this.controlRect);
        this.rotatorGripLine = SvgHelper.createLine((this.width + this.CB_DISTANCE * 2) / 2, this.top - this.CB_DISTANCE, (this.width + this.CB_DISTANCE * 2) / 2, this.top - this.CB_DISTANCE * 3, [
            ['stroke', 'black'],
            ['stroke-width', '1'],
            ['stroke-opacity', '0.5'],
            ['stroke-dasharray', '3, 2'],
        ]);
        this.controlBox.appendChild(this.rotatorGripLine);
        this.controlGrips = new RectangularBoxMarkerGrips();
        this.addControlGrips();
        this.controlBox.style.display = 'none';
    };
    RectangularBoxMarkerBase.prototype.adjustControlBox = function () {
        var translate = this.controlBox.transform.baseVal.getItem(0);
        translate.setTranslate(this.left - this.CB_DISTANCE / 2, this.top - this.CB_DISTANCE / 2);
        this.controlBox.transform.baseVal.replaceItem(translate, 0);
        this.controlRect.setAttribute('width', (this.width + this.CB_DISTANCE).toString());
        this.controlRect.setAttribute('height', (this.height + this.CB_DISTANCE).toString());
        this.rotatorGripLine.setAttribute('x1', ((this.width + this.CB_DISTANCE) / 2).toString());
        this.rotatorGripLine.setAttribute('y1', (-this.CB_DISTANCE / 2).toString());
        this.rotatorGripLine.setAttribute('x2', ((this.width + this.CB_DISTANCE) / 2).toString());
        this.rotatorGripLine.setAttribute('y2', (-this.CB_DISTANCE * 3).toString());
        this.positionGrips();
    };
    RectangularBoxMarkerBase.prototype.addControlGrips = function () {
        this.controlGrips.topLeft = this.createGrip();
        this.controlGrips.topCenter = this.createGrip();
        this.controlGrips.topRight = this.createGrip();
        this.controlGrips.centerLeft = this.createGrip();
        this.controlGrips.centerRight = this.createGrip();
        this.controlGrips.bottomLeft = this.createGrip();
        this.controlGrips.bottomCenter = this.createGrip();
        this.controlGrips.bottomRight = this.createGrip();
        this.rotatorGrip = this.createGrip();
        this.positionGrips();
    };
    RectangularBoxMarkerBase.prototype.createGrip = function () {
        var grip = new ResizeGrip();
        grip.visual.transform.baseVal.appendItem(SvgHelper.createTransform());
        this.controlBox.appendChild(grip.visual);
        return grip;
    };
    RectangularBoxMarkerBase.prototype.positionGrips = function () {
        var gripSize = this.controlGrips.topLeft.GRIP_SIZE;
        var left = -gripSize / 2;
        var top = left;
        var cx = (this.width + this.CB_DISTANCE) / 2 - gripSize / 2;
        var cy = (this.height + this.CB_DISTANCE) / 2 - gripSize / 2;
        var bottom = this.height + this.CB_DISTANCE - gripSize / 2;
        var right = this.width + this.CB_DISTANCE - gripSize / 2;
        this.positionGrip(this.controlGrips.topLeft.visual, left, top);
        this.positionGrip(this.controlGrips.topCenter.visual, cx, top);
        this.positionGrip(this.controlGrips.topRight.visual, right, top);
        this.positionGrip(this.controlGrips.centerLeft.visual, left, cy);
        this.positionGrip(this.controlGrips.centerRight.visual, right, cy);
        this.positionGrip(this.controlGrips.bottomLeft.visual, left, bottom);
        this.positionGrip(this.controlGrips.bottomCenter.visual, cx, bottom);
        this.positionGrip(this.controlGrips.bottomRight.visual, right, bottom);
        this.positionGrip(this.rotatorGrip.visual, cx, top - this.CB_DISTANCE * 3);
    };
    RectangularBoxMarkerBase.prototype.positionGrip = function (grip, x, y) {
        var translate = grip.transform.baseVal.getItem(0);
        translate.setTranslate(x, y);
        grip.transform.baseVal.replaceItem(translate, 0);
    };
    /**
     * Hides marker's editing controls.
     */
    RectangularBoxMarkerBase.prototype.hideControlBox = function () {
        this.controlBox.style.display = 'none';
    };
    /**
     * Shows marker's editing controls.
     */
    RectangularBoxMarkerBase.prototype.showControlBox = function () {
        this.controlBox.style.display = '';
    };
    /**
     * Returns marker's state.
     */
    RectangularBoxMarkerBase.prototype.getState = function () {
        var result = Object.assign({
            left: this.left,
            top: this.top,
            width: this.width,
            height: this.height,
            rotationAngle: this.rotationAngle,
            visualTransformMatrix: TransformMatrix.toITransformMatrix(this.visual.transform.baseVal.getItem(0).matrix),
            containerTransformMatrix: TransformMatrix.toITransformMatrix(this.container.transform.baseVal.getItem(0).matrix)
        }, _super.prototype.getState.call(this));
        return result;
    };
    /**
     * Restores marker's state to the previously saved one.
     * @param state - previously saved state.
     */
    RectangularBoxMarkerBase.prototype.restoreState = function (state) {
        _super.prototype.restoreState.call(this, state);
        var rbmState = state;
        this.left = rbmState.left;
        this.top = rbmState.top;
        this.width = rbmState.width;
        this.height = rbmState.height;
        this.rotationAngle = rbmState.rotationAngle;
        this.visual.transform.baseVal.getItem(0).setMatrix(TransformMatrix.toSVGMatrix(this.visual.transform.baseVal.getItem(0).matrix, rbmState.visualTransformMatrix));
        this.container.transform.baseVal.getItem(0).setMatrix(TransformMatrix.toSVGMatrix(this.container.transform.baseVal.getItem(0).matrix, rbmState.containerTransformMatrix));
        // this.moveVisual({x: this.left, y: this.top});
        // this.applyRotation();
    };
    /**
     * Scales marker. Used after the image resize.
     *
     * @param scaleX - horizontal scale
     * @param scaleY - vertical scale
     */
    RectangularBoxMarkerBase.prototype.scale = function (scaleX, scaleY) {
        _super.prototype.scale.call(this, scaleX, scaleY);
        var rPoint = this.rotatePoint({ x: this.left, y: this.top });
        var point = this.unrotatePoint({ x: rPoint.x * scaleX, y: rPoint.y * scaleY });
        this.left = point.x;
        this.top = point.y;
        this.width = this.width * scaleX;
        this.height = this.height * scaleY;
        this.adjustControlBox();
    };
    return RectangularBoxMarkerBase;
}(MarkerBase));

/**
 * RecatngleMarker is a base class for all rectangular markers (Frame, Cover, Highlight, etc.)
 */
var RectangleMarker = /** @class */ (function (_super) {
    __extends(RectangleMarker, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function RectangleMarker(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        /**
         * Recangle fill color.
         */
        _this.fillColor = 'transparent';
        /**
         * Rectangle stroke color.
         */
        _this.strokeColor = 'transparent';
        /**
         * Rectangle border stroke width.
         */
        _this.strokeWidth = 0;
        /**
         * Rectangle border stroke dash array.
         */
        _this.strokeDasharray = '';
        /**
         * Rectangle opacity (alpha). 0 to 1.
         */
        _this.opacity = 1;
        _this.setStrokeColor = _this.setStrokeColor.bind(_this);
        _this.setFillColor = _this.setFillColor.bind(_this);
        _this.setStrokeWidth = _this.setStrokeWidth.bind(_this);
        _this.setStrokeDasharray = _this.setStrokeDasharray.bind(_this);
        _this.createVisual = _this.createVisual.bind(_this);
        return _this;
    }
    /**
     * Returns true if passed SVG element belongs to the marker. False otherwise.
     *
     * @param el - target element.
     */
    RectangleMarker.prototype.ownsTarget = function (el) {
        if (_super.prototype.ownsTarget.call(this, el) || el === this.visual) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Creates the marker's rectangle visual.
     */
    RectangleMarker.prototype.createVisual = function () {
        this.visual = SvgHelper.createRect(1, 1, [
            ['fill', this.fillColor],
            ['stroke', this.strokeColor],
            ['stroke-width', this.strokeWidth.toString()],
            ['stroke-dasharray', this.strokeDasharray],
            ['opacity', this.opacity.toString()]
        ]);
        this.addMarkerVisualToContainer(this.visual);
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) down event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    RectangleMarker.prototype.pointerDown = function (point, target) {
        _super.prototype.pointerDown.call(this, point, target);
        if (this.state === 'new') {
            this.createVisual();
            this.moveVisual(point);
            this._state = 'creating';
        }
    };
    /**
     * Handles marker manipulation (move, resize, rotate, etc.).
     *
     * @param point - event coordinates.
     */
    RectangleMarker.prototype.manipulate = function (point) {
        _super.prototype.manipulate.call(this, point);
    };
    /**
     * Resizes the marker based on the pointer coordinates.
     * @param point - current pointer coordinates.
     */
    RectangleMarker.prototype.resize = function (point) {
        _super.prototype.resize.call(this, point);
        this.setSize();
    };
    /**
     * Sets visual's width and height attributes based on marker's width and height.
     */
    RectangleMarker.prototype.setSize = function () {
        _super.prototype.setSize.call(this);
        SvgHelper.setAttributes(this.visual, [
            ['width', this.width.toString()],
            ['height', this.height.toString()],
        ]);
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) up event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    RectangleMarker.prototype.pointerUp = function (point) {
        _super.prototype.pointerUp.call(this, point);
        this.setSize();
    };
    /**
     * Sets rectangle's border stroke color.
     * @param color - color as string
     */
    RectangleMarker.prototype.setStrokeColor = function (color) {
        this.strokeColor = color;
        if (this.visual) {
            SvgHelper.setAttributes(this.visual, [['stroke', this.strokeColor]]);
        }
        this.colorChanged(color);
    };
    /**
     * Sets rectangle's fill color.
     * @param color - color as string
     */
    RectangleMarker.prototype.setFillColor = function (color) {
        this.fillColor = color;
        if (this.visual) {
            SvgHelper.setAttributes(this.visual, [['fill', this.fillColor]]);
        }
    };
    /**
     * Sets rectangle's border stroke (line) width.
     * @param color - color as string
     */
    RectangleMarker.prototype.setStrokeWidth = function (width) {
        this.strokeWidth = width;
        if (this.visual) {
            SvgHelper.setAttributes(this.visual, [['stroke-width', this.strokeWidth.toString()]]);
        }
    };
    /**
     * Sets rectangle's border stroke dash array.
     * @param color - color as string
     */
    RectangleMarker.prototype.setStrokeDasharray = function (dashes) {
        this.strokeDasharray = dashes;
        if (this.visual) {
            SvgHelper.setAttributes(this.visual, [['stroke-dasharray', this.strokeDasharray]]);
        }
    };
    /**
     * Returns current marker state that can be restored in the future.
     */
    RectangleMarker.prototype.getState = function () {
        var result = Object.assign({
            fillColor: this.fillColor,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
            strokeDasharray: this.strokeDasharray,
            opacity: this.opacity
        }, _super.prototype.getState.call(this));
        return result;
    };
    /**
     * Restores previously saved marker state.
     *
     * @param state - previously saved state.
     */
    RectangleMarker.prototype.restoreState = function (state) {
        var rectState = state;
        this.fillColor = rectState.fillColor;
        this.strokeColor = rectState.strokeColor;
        this.strokeWidth = rectState.strokeWidth;
        this.strokeDasharray = rectState.strokeDasharray;
        this.opacity = rectState.opacity;
        this.createVisual();
        _super.prototype.restoreState.call(this, state);
        this.setSize();
    };
    /**
     * Scales marker. Used after the image resize.
     *
     * @param scaleX - horizontal scale
     * @param scaleY - vertical scale
     */
    RectangleMarker.prototype.scale = function (scaleX, scaleY) {
        _super.prototype.scale.call(this, scaleX, scaleY);
        this.setSize();
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    RectangleMarker.title = 'Rectangle marker';
    return RectangleMarker;
}(RectangularBoxMarkerBase));

var Icon$2 = "<svg viewBox=\"0 0 24 24\"><path d=\"M3 17h18v-2H3v2m0 3h18v-1H3v1m0-7h18v-3H3v3m0-9v4h18V4H3z\"/></svg>";

/**
 * Line width toolbox panel.
 */
var LineWidthPanel = /** @class */ (function (_super) {
    __extends(LineWidthPanel, _super);
    /**
     * Creates a line width toolbox panel.
     * @param title - panel title.
     * @param widths - available widths.
     * @param currentWidth - currently set width.
     * @param icon - toolbox panel icon (SVG image markup).
     */
    function LineWidthPanel(title, widths, currentWidth, icon) {
        var _this = _super.call(this, title, icon ? icon : Icon$2) || this;
        _this.widths = [];
        _this.widthBoxes = [];
        _this.widths = widths;
        _this.currentWidth = currentWidth;
        _this.setCurrentWidth = _this.setCurrentWidth.bind(_this);
        return _this;
    }
    /**
     * Returns panel UI.
     */
    LineWidthPanel.prototype.getUi = function () {
        var _this = this;
        var panelDiv = document.createElement('div');
        panelDiv.style.display = 'flex';
        panelDiv.style.overflow = 'hidden';
        panelDiv.style.flexGrow = '2';
        this.widths.forEach(function (lineWidth) {
            var widthBoxContainer = document.createElement('div');
            widthBoxContainer.style.display = 'flex';
            widthBoxContainer.style.flexGrow = '2';
            widthBoxContainer.style.alignItems = 'center';
            widthBoxContainer.style.justifyContent = 'space-between';
            widthBoxContainer.style.padding = '5px';
            widthBoxContainer.style.borderWidth = '2px';
            widthBoxContainer.style.borderStyle = 'solid';
            widthBoxContainer.style.borderColor =
                lineWidth === _this.currentWidth ? Style.settings.toolboxAccentColor : 'transparent';
            widthBoxContainer.addEventListener('click', function () {
                _this.setCurrentWidth(lineWidth, widthBoxContainer);
            });
            panelDiv.appendChild(widthBoxContainer);
            var label = document.createElement('div');
            label.innerText = lineWidth.toString();
            label.style.marginRight = '5px';
            widthBoxContainer.appendChild(label);
            var widthBox = document.createElement('div');
            widthBox.style.minHeight = '20px';
            widthBox.style.flexGrow = '2';
            widthBox.style.display = 'flex';
            widthBox.style.alignItems = 'center';
            var hr = document.createElement('hr');
            hr.style.minWidth = '20px';
            hr.style.border = '0px';
            hr.style.borderTop = lineWidth + "px solid " + Style.settings.toolboxColor;
            hr.style.flexGrow = '2';
            widthBox.appendChild(hr);
            // widthBox.innerHTML = `<svg viewBox="0 0 140 20" width="140" height="20" xmlns="http://www.w3.org/2000/svg">
            //   <line x1="0" y1="10" x2="140" y2="10" stroke="${Style.settings.toolboxColor}" stroke-width="${lineWidth}" />
            // </svg>`;
            widthBoxContainer.appendChild(widthBox);
            _this.widthBoxes.push(widthBoxContainer);
        });
        return panelDiv;
    };
    LineWidthPanel.prototype.setCurrentWidth = function (newWidth, target) {
        this.currentWidth = newWidth;
        this.widthBoxes.forEach(function (box) {
            box.style.borderColor = box === target ? Style.settings.toolboxAccentColor : 'transparent';
        });
        if (this.onWidthChanged) {
            this.onWidthChanged(this.currentWidth);
        }
    };
    return LineWidthPanel;
}(ToolboxPanel));

var Icon$3 = "<svg viewBox=\"0 0 24 24\"><path d=\"M3 16h5v-2H3v2m6.5 0h5v-2h-5v2m6.5 0h5v-2h-5v2M3 20h2v-2H3v2m4 0h2v-2H7v2m4 0h2v-2h-2v2m4 0h2v-2h-2v2m4 0h2v-2h-2v2M3 12h8v-2H3v2m10 0h8v-2h-8v2M3 4v4h18V4H3z\"/></svg>";

/**
 * Line style (solid, dashed, etc.) toolbox panel.
 */
var LineStylePanel = /** @class */ (function (_super) {
    __extends(LineStylePanel, _super);
    /**
     * Creates a line style toolbox panel.
     * @param title - panel title
     * @param styles - available line styles (dash array).
     * @param currentStyle - currently selected style.
     * @param icon - panel button icon (SVG image markup).
     */
    function LineStylePanel(title, styles, currentStyle, icon) {
        var _this = _super.call(this, title, icon ? icon : Icon$3) || this;
        _this.styles = [];
        _this.styleBoxes = [];
        _this.styles = styles;
        _this.currentStyle = currentStyle;
        _this.setCurrentStyle = _this.setCurrentStyle.bind(_this);
        return _this;
    }
    /**
     * Returns panel UI.
     */
    LineStylePanel.prototype.getUi = function () {
        var _this = this;
        var panelDiv = document.createElement('div');
        panelDiv.style.display = 'flex';
        panelDiv.style.overflow = 'hidden';
        panelDiv.style.flexGrow = '2';
        this.styles.forEach(function (lineStyle) {
            var styleBoxContainer = document.createElement('div');
            styleBoxContainer.style.display = 'flex'; //'inline-block';
            styleBoxContainer.style.alignItems = 'center';
            styleBoxContainer.style.justifyContent = 'space-between';
            styleBoxContainer.style.padding = '5px';
            styleBoxContainer.style.borderWidth = '2px';
            styleBoxContainer.style.borderStyle = 'solid';
            styleBoxContainer.style.overflow = 'hidden';
            styleBoxContainer.style.maxWidth = 100 / _this.styles.length - 5 + "%";
            styleBoxContainer.style.borderColor =
                lineStyle === _this.currentStyle ? Style.settings.toolboxAccentColor : 'transparent';
            styleBoxContainer.addEventListener('click', function () {
                _this.setCurrentStyle(lineStyle, styleBoxContainer);
            });
            panelDiv.appendChild(styleBoxContainer);
            var styleBox = document.createElement('div');
            styleBox.style.minHeight = '20px';
            styleBox.style.flexGrow = '2';
            styleBox.style.overflow = 'hidden';
            var styleSample = "<svg width=\"100\" height=\"20\">\n      <line x1=\"0\" y1=\"10\" x2=\"100\" y2=\"10\" stroke=\"" + Style.settings.toolboxColor + "\" stroke-width=\"3\" " + (lineStyle !== '' ? 'stroke-dasharray="' + lineStyle + '"' : '') + " />\n  </svg>";
            styleBox.innerHTML = styleSample;
            styleBoxContainer.appendChild(styleBox);
            _this.styleBoxes.push(styleBoxContainer);
        });
        return panelDiv;
    };
    LineStylePanel.prototype.setCurrentStyle = function (newStyle, target) {
        this.currentStyle = newStyle;
        this.styleBoxes.forEach(function (box) {
            box.style.borderColor = box === target ? Style.settings.toolboxAccentColor : 'transparent';
        });
        if (this.onStyleChanged) {
            this.onStyleChanged(this.currentStyle);
        }
    };
    return LineStylePanel;
}(ToolboxPanel));

var FrameMarker = /** @class */ (function (_super) {
    __extends(FrameMarker, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function FrameMarker(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        _this.strokeColor = settings.defaultColor;
        _this.strokeWidth = settings.defaultStrokeWidth;
        _this.strokeDasharray = settings.defaultStrokeDasharray;
        _this.strokePanel = new ColorPickerPanel('Line color', settings.defaultColorSet, settings.defaultColor);
        _this.strokePanel.onColorChanged = _this.setStrokeColor;
        _this.strokeWidthPanel = new LineWidthPanel('Line width', settings.defaultStrokeWidths, settings.defaultStrokeWidth);
        _this.strokeWidthPanel.onWidthChanged = _this.setStrokeWidth;
        _this.strokeStylePanel = new LineStylePanel('Line style', settings.defaultStrokeDasharrays, settings.defaultStrokeDasharray);
        _this.strokeStylePanel.onStyleChanged = _this.setStrokeDasharray;
        return _this;
    }
    Object.defineProperty(FrameMarker.prototype, "toolboxPanels", {
        /**
         * Returns the list of toolbox panels for this marker type.
         */
        get: function () {
            return [this.strokePanel, this.strokeWidthPanel, this.strokeStylePanel];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns current marker state that can be restored in the future.
     */
    FrameMarker.prototype.getState = function () {
        var result = _super.prototype.getState.call(this);
        result.typeName = FrameMarker.typeName;
        return result;
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    FrameMarker.typeName = 'FrameMarker';
    /**
     * Marker type title (display name) used for accessibility and other attributes.
     */
    FrameMarker.title = 'Frame marker';
    /**
     * SVG icon markup displayed on toolbar buttons.
     */
    FrameMarker.icon = Icon;
    return FrameMarker;
}(RectangleMarker));

/**
 * Default settings for marker.js 2 markers.
 */
var Settings = /** @class */ (function () {
    function Settings() {
        /**
         * List of colors used in color pickers.
         */
        this.defaultColorSet = [
            '#EF4444',
            '#10B981',
            '#2563EB',
            '#FFFF00',
            '#7C3AED',
            '#F472B6',
            '#000000',
            '#FFFFFF' //white
        ];
        /**
         * Default foreground color.
         */
        this.defaultColor = this.defaultColorSet[0];
        /**
         * Default fill color.
         */
        this.defaultFillColor = this.defaultColorSet[0];
        /**
         * Default stroke color for markers with background (eg. {@link CalloutMarker}).
         */
        this.defaultStrokeColor = this.defaultColorSet[7];
        /**
         * Default highlighter color.
         */
        this.defaultHighlightColor = this.defaultColorSet[3];
        /**
         * Default stroke (line) width.
         */
        this.defaultStrokeWidth = 1;
        /**
         * Default line dash array
         */
        this.defaultStrokeDasharray = '';
        /**
         * Default opacity (alpha) of the {@link HighlightMarker} (and other highlighters).
         */
        this.defaultHighlightOpacity = 0.5;
        /**
         * Default font family for text-based markers (eg. {@link TextMarker} and {@link CalloutMarker}).
         *
         */
        this.defaultFontFamily = 'Helvetica, Arial, sans-serif';
        /**
         * Stroke (line) width options.
         */
        this.defaultStrokeWidths = [1, 2, 3, 5, 10];
        /**
         * Stroke dash array options.
         */
        this.defaultStrokeDasharrays = ['', '3', '12 3', '9 6 3 6'];
        /**
         * Opacity options.
         */
        this.defaultOpacitySteps = [0.1, 0.25, 0.5, 0.75, 1];
        /**
         * Default display mode.
         */
        this.displayMode = 'inline';
        /**
         * Font family options.
         */
        this.defaultFontFamilies = [
            'Times, "Times New Roman", serif',
            'Helvetica, Arial, sans-serif',
            'Courier, "Courier New", monospace',
            'cursive',
            'fantasy'
        ];
        /**
         * Margin in pixels between marker.js popup UI and window borders.
         */
        this.popupMargin = 30;
        /**
         * Create a new Freehand marker for every stroke.
         */
        this.newFreehandMarkerOnPointerUp = false;
        /**
         * If set to true, when colors on a marker are changed
         * it changes the default color for other markers as well.
         *
         * @since 2.7.0
         */
        this.defaultColorsFollowCurrentColors = false;
    }
    return Settings;
}());

/**
 * LinearMarkerBase is a base class for all line-type markers (Line, Arrow, Measurement Tool, etc.).
 */
var LinearMarkerBase = /** @class */ (function (_super) {
    __extends(LinearMarkerBase, _super);
    /**
     * Creates a LineMarkerBase object.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function LinearMarkerBase(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        /**
         * x coordinate of the first end-point
         */
        _this.x1 = 0;
        /**
         * y coordinate of the first end-point
         */
        _this.y1 = 0;
        /**
         * x coordinate of the second end-point
         */
        _this.x2 = 0;
        /**
         * y coordinate of the second end-point
         */
        _this.y2 = 0;
        /**
         * Default line length when marker is created with a simple click (without dragging).
         */
        _this.defaultLength = 50;
        /**
         * Pointer coordinates at the satart of move or resize.
         */
        _this.manipulationStartX = 0;
        _this.manipulationStartY = 0;
        _this.manipulationStartX1 = 0;
        _this.manipulationStartY1 = 0;
        _this.manipulationStartX2 = 0;
        _this.manipulationStartY2 = 0;
        _this.setupControlBox();
        return _this;
    }
    /**
     * Returns true if passed SVG element belongs to the marker. False otherwise.
     *
     * @param el - target element.
     */
    LinearMarkerBase.prototype.ownsTarget = function (el) {
        if (_super.prototype.ownsTarget.call(this, el)) {
            return true;
        }
        else if (this.grip1.ownsTarget(el) || this.grip2.ownsTarget(el)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) down event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    LinearMarkerBase.prototype.pointerDown = function (point, target) {
        _super.prototype.pointerDown.call(this, point, target);
        this.manipulationStartX = point.x;
        this.manipulationStartY = point.y;
        if (this.state === 'new') {
            this.x1 = point.x;
            this.y1 = point.y;
            this.x2 = point.x;
            this.y2 = point.y;
        }
        this.manipulationStartX1 = this.x1;
        this.manipulationStartY1 = this.y1;
        this.manipulationStartX2 = this.x2;
        this.manipulationStartY2 = this.y2;
        if (this.state !== 'new') {
            this.select();
            if (this.grip1.ownsTarget(target)) {
                this.activeGrip = this.grip1;
            }
            else if (this.grip2.ownsTarget(target)) {
                this.activeGrip = this.grip2;
            }
            else {
                this.activeGrip = undefined;
            }
            if (this.activeGrip) {
                this._state = 'resize';
            }
            else {
                this._state = 'move';
            }
        }
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) up event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    LinearMarkerBase.prototype.pointerUp = function (point) {
        var inState = this.state;
        _super.prototype.pointerUp.call(this, point);
        if (this.state === 'creating' && Math.abs(this.x1 - this.x2) < 10 && Math.abs(this.y1 - this.y2) < 10) {
            this.x2 = this.x1 + this.defaultLength;
            this.adjustVisual();
            this.adjustControlBox();
        }
        else {
            this.manipulate(point);
        }
        this._state = 'select';
        if (inState === 'creating' && this.onMarkerCreated) {
            this.onMarkerCreated(this);
        }
    };
    /**
     * When implemented adjusts marker visual after manipulation when needed.
     */
    
    LinearMarkerBase.prototype.adjustVisual = function () { };
    /**
     * Handles marker manipulation (move, resize, rotate, etc.).
     *
     * @param point - event coordinates.
     */
    LinearMarkerBase.prototype.manipulate = function (point) {
        if (this.state === 'creating') {
            this.resize(point);
        }
        else if (this.state === 'move') {
            this.x1 = this.manipulationStartX1 + point.x - this.manipulationStartX;
            this.y1 = this.manipulationStartY1 + point.y - this.manipulationStartY;
            this.x2 = this.manipulationStartX2 + point.x - this.manipulationStartX;
            this.y2 = this.manipulationStartY2 + point.y - this.manipulationStartY;
            this.adjustVisual();
            this.adjustControlBox();
        }
        else if (this.state === 'resize') {
            this.resize(point);
        }
    };
    /**
     * Resizes the line marker.
     * @param point - current manipulation coordinates.
     */
    LinearMarkerBase.prototype.resize = function (point) {
        switch (this.activeGrip) {
            case this.grip1:
                this.x1 = point.x;
                this.y1 = point.y;
                break;
            case this.grip2:
            case undefined:
                this.x2 = point.x;
                this.y2 = point.y;
                break;
        }
        this.adjustVisual();
        this.adjustControlBox();
    };
    /**
     * Displays marker's controls.
     */
    LinearMarkerBase.prototype.select = function () {
        _super.prototype.select.call(this);
        this.adjustControlBox();
        this.controlBox.style.display = '';
    };
    /**
     * Hides marker's controls.
     */
    LinearMarkerBase.prototype.deselect = function () {
        _super.prototype.deselect.call(this);
        this.controlBox.style.display = 'none';
    };
    /**
     * Creates control box for manipulation controls.
     */
    LinearMarkerBase.prototype.setupControlBox = function () {
        this.controlBox = SvgHelper.createGroup();
        this.container.appendChild(this.controlBox);
        this.addControlGrips();
        this.controlBox.style.display = 'none';
    };
    LinearMarkerBase.prototype.adjustControlBox = function () {
        this.positionGrips();
    };
    /**
     * Adds control grips to control box.
     */
    LinearMarkerBase.prototype.addControlGrips = function () {
        this.grip1 = this.createGrip();
        this.grip2 = this.createGrip();
        this.positionGrips();
    };
    /**
     * Creates manipulation grip.
     * @returns - manipulation grip.
     */
    LinearMarkerBase.prototype.createGrip = function () {
        var grip = new ResizeGrip();
        grip.visual.transform.baseVal.appendItem(SvgHelper.createTransform());
        this.controlBox.appendChild(grip.visual);
        return grip;
    };
    /**
     * Updates manipulation grip layout.
     */
    LinearMarkerBase.prototype.positionGrips = function () {
        var gripSize = this.grip1.GRIP_SIZE;
        this.positionGrip(this.grip1.visual, this.x1 - gripSize / 2, this.y1 - gripSize / 2);
        this.positionGrip(this.grip2.visual, this.x2 - gripSize / 2, this.y2 - gripSize / 2);
    };
    /**
     * Positions manipulation grip.
     * @param grip - grip to position
     * @param x - new X coordinate
     * @param y - new Y coordinate
     */
    LinearMarkerBase.prototype.positionGrip = function (grip, x, y) {
        var translate = grip.transform.baseVal.getItem(0);
        translate.setTranslate(x, y);
        grip.transform.baseVal.replaceItem(translate, 0);
    };
    /**
     * Returns marker's state.
     */
    LinearMarkerBase.prototype.getState = function () {
        var result = Object.assign({
            x1: this.x1,
            y1: this.y1,
            x2: this.x2,
            y2: this.y2
        }, _super.prototype.getState.call(this));
        return result;
    };
    /**
     * Restores marker's state to the previously saved one.
     * @param state - previously saved state.
     */
    LinearMarkerBase.prototype.restoreState = function (state) {
        _super.prototype.restoreState.call(this, state);
        var lmbState = state;
        this.x1 = lmbState.x1;
        this.y1 = lmbState.y1;
        this.x2 = lmbState.x2;
        this.y2 = lmbState.y2;
    };
    /**
     * Scales marker. Used after the image resize.
     *
     * @param scaleX - horizontal scale
     * @param scaleY - vertical scale
     */
    LinearMarkerBase.prototype.scale = function (scaleX, scaleY) {
        _super.prototype.scale.call(this, scaleX, scaleY);
        this.x1 = this.x1 * scaleX;
        this.y1 = this.y1 * scaleY;
        this.x2 = this.x2 * scaleX;
        this.y2 = this.y2 * scaleY;
        this.adjustVisual();
        this.adjustControlBox();
    };
    return LinearMarkerBase;
}(MarkerBase));

var Icon$4 = "<svg viewBox=\"0 0 24 24\"><path d=\"M19 13H5v-2h14v2z\"/></svg>";

var LineMarker = /** @class */ (function (_super) {
    __extends(LineMarker, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function LineMarker(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        /**
         * Line color.
         */
        _this.strokeColor = 'transparent';
        /**
         * Line width.
         */
        _this.strokeWidth = 0;
        /**
         * Line dash array.
         */
        _this.strokeDasharray = '';
        _this.setStrokeColor = _this.setStrokeColor.bind(_this);
        _this.setStrokeWidth = _this.setStrokeWidth.bind(_this);
        _this.setStrokeDasharray = _this.setStrokeDasharray.bind(_this);
        _this.strokeColor = settings.defaultColor;
        _this.strokeWidth = settings.defaultStrokeWidth;
        _this.strokeDasharray = settings.defaultStrokeDasharray;
        _this.strokePanel = new ColorPickerPanel('Line color', settings.defaultColorSet, settings.defaultColor);
        _this.strokePanel.onColorChanged = _this.setStrokeColor;
        _this.strokeWidthPanel = new LineWidthPanel('Line width', settings.defaultStrokeWidths, settings.defaultStrokeWidth);
        _this.strokeWidthPanel.onWidthChanged = _this.setStrokeWidth;
        _this.strokeStylePanel = new LineStylePanel('Line style', settings.defaultStrokeDasharrays, settings.defaultStrokeDasharray);
        _this.strokeStylePanel.onStyleChanged = _this.setStrokeDasharray;
        return _this;
    }
    /**
     * Returns true if passed SVG element belongs to the marker. False otherwise.
     *
     * @param el - target element.
     */
    LineMarker.prototype.ownsTarget = function (el) {
        if (_super.prototype.ownsTarget.call(this, el) ||
            el === this.visual ||
            el === this.selectorLine ||
            el === this.visibleLine) {
            return true;
        }
        else {
            return false;
        }
    };
    LineMarker.prototype.createVisual = function () {
        this.visual = SvgHelper.createGroup();
        this.selectorLine = SvgHelper.createLine(this.x1, this.y1, this.x2, this.y2, [
            ['stroke', 'transparent'],
            ['stroke-width', (this.strokeWidth + 10).toString()],
        ]);
        this.visibleLine = SvgHelper.createLine(this.x1, this.y1, this.x2, this.y2, [
            ['stroke', this.strokeColor],
            ['stroke-width', this.strokeWidth.toString()],
        ]);
        this.visual.appendChild(this.selectorLine);
        this.visual.appendChild(this.visibleLine);
        this.addMarkerVisualToContainer(this.visual);
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) down event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    LineMarker.prototype.pointerDown = function (point, target) {
        _super.prototype.pointerDown.call(this, point, target);
        if (this.state === 'new') {
            this.createVisual();
            this.adjustVisual();
            this._state = 'creating';
        }
    };
    /**
     * Adjusts visual after manipulation.
     */
    LineMarker.prototype.adjustVisual = function () {
        if (this.selectorLine && this.visibleLine) {
            this.selectorLine.setAttribute('x1', this.x1.toString());
            this.selectorLine.setAttribute('y1', this.y1.toString());
            this.selectorLine.setAttribute('x2', this.x2.toString());
            this.selectorLine.setAttribute('y2', this.y2.toString());
            this.visibleLine.setAttribute('x1', this.x1.toString());
            this.visibleLine.setAttribute('y1', this.y1.toString());
            this.visibleLine.setAttribute('x2', this.x2.toString());
            this.visibleLine.setAttribute('y2', this.y2.toString());
            SvgHelper.setAttributes(this.visibleLine, [['stroke', this.strokeColor]]);
            SvgHelper.setAttributes(this.visibleLine, [['stroke-width', this.strokeWidth.toString()]]);
            SvgHelper.setAttributes(this.visibleLine, [['stroke-dasharray', this.strokeDasharray.toString()]]);
        }
    };
    /**
     * Sets line color.
     * @param color - new color.
     */
    LineMarker.prototype.setStrokeColor = function (color) {
        this.strokeColor = color;
        this.adjustVisual();
        this.colorChanged(color);
    };
    /**
     * Sets line width.
     * @param width - new width.
     */
    LineMarker.prototype.setStrokeWidth = function (width) {
        this.strokeWidth = width;
        this.adjustVisual();
    };
    /**
     * Sets line dash array.
     * @param dashes - new dash array.
     */
    LineMarker.prototype.setStrokeDasharray = function (dashes) {
        this.strokeDasharray = dashes;
        this.adjustVisual();
    };
    Object.defineProperty(LineMarker.prototype, "toolboxPanels", {
        /**
         * Returns the list of toolbox panels for this marker type.
         */
        get: function () {
            return [this.strokePanel, this.strokeWidthPanel, this.strokeStylePanel];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns current marker state that can be restored in the future.
     */
    LineMarker.prototype.getState = function () {
        var result = Object.assign({
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
            strokeDasharray: this.strokeDasharray
        }, _super.prototype.getState.call(this));
        result.typeName = LineMarker.typeName;
        return result;
    };
    /**
     * Restores previously saved marker state.
     *
     * @param state - previously saved state.
     */
    LineMarker.prototype.restoreState = function (state) {
        _super.prototype.restoreState.call(this, state);
        var lmState = state;
        this.strokeColor = lmState.strokeColor;
        this.strokeWidth = lmState.strokeWidth;
        this.strokeDasharray = lmState.strokeDasharray;
        this.createVisual();
        this.adjustVisual();
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    LineMarker.typeName = 'LineMarker';
    /**
     * Marker type title (display name) used for accessibility and other attributes.
     */
    LineMarker.title = 'Line marker';
    /**
     * SVG icon markup displayed on toolbar buttons.
     */
    LineMarker.icon = Icon$4;
    return LineMarker;
}(LinearMarkerBase));

var Icon$5 = "<svg viewBox=\"0 0 24 24\"><path d=\"M9.6 14L12 7.7l2.4 6.3M11 5L5.5 19h2.2l1.1-3H15l1.1 3h2.2L13 5h-2z\"/></svg>";

var Icon$6 = "<svg viewBox=\"0 0 24 24\"><path d=\"M17 8h3v12h1v1h-4v-1h1v-3h-4l-1.5 3H14v1h-4v-1h1l6-12m1 1l-3.5 7H18V9M5 3h5c1.11 0 2 .89 2 2v11H9v-5H6v5H3V5c0-1.11.89-2 2-2m1 2v4h3V5H6z\"/></svg>";

/**
 * Font family selection toolbox panel.
 */
var FontFamilyPanel = /** @class */ (function (_super) {
    __extends(FontFamilyPanel, _super);
    /**
     * Creates a font family toolbox panel.
     * @param title - panel title.
     * @param fonts - available font families.
     * @param currentFont - currently selected font family.
     * @param icon - panel button icon (SVG image markup).
     */
    function FontFamilyPanel(title, fonts, currentFont, icon) {
        var _this = _super.call(this, title, icon ? icon : Icon$6) || this;
        _this.fonts = [];
        _this.fontBoxes = [];
        _this.fonts = fonts;
        _this.currentFont = currentFont;
        _this.setCurrentFont = _this.setCurrentFont.bind(_this);
        return _this;
    }
    /**
     * Returns panel UI.
     */
    FontFamilyPanel.prototype.getUi = function () {
        var _this = this;
        var panelDiv = document.createElement('div');
        // panelDiv.style.display = 'flex';
        panelDiv.style.overflow = 'hidden';
        panelDiv.style.flexGrow = '2';
        this.fonts.forEach(function (font) {
            var fontBoxContainer = document.createElement('div');
            fontBoxContainer.style.display = 'inline-block';
            // fontBoxContainer.style.flexGrow = '2';
            fontBoxContainer.style.alignItems = 'center';
            fontBoxContainer.style.justifyContent = 'space-between';
            fontBoxContainer.style.padding = '5px';
            fontBoxContainer.style.borderWidth = '2px';
            fontBoxContainer.style.borderStyle = 'solid';
            fontBoxContainer.style.overflow = 'hidden';
            fontBoxContainer.style.maxWidth = 100 / _this.fonts.length - 5 + "%";
            fontBoxContainer.style.borderColor =
                font === _this.currentFont ? Style.settings.toolboxAccentColor : 'transparent';
            fontBoxContainer.addEventListener('click', function () {
                _this.setCurrentFont(font, fontBoxContainer);
            });
            panelDiv.appendChild(fontBoxContainer);
            var fontBox = document.createElement('div');
            fontBox.style.display = 'flex';
            fontBox.style.minHeight = '20px';
            fontBox.style.flexGrow = '2';
            fontBox.style.fontFamily = font;
            fontBox.style.overflow = 'hidden';
            var fontLabel = document.createElement('div');
            fontLabel.style.whiteSpace = 'nowrap';
            fontLabel.style.overflow = 'hidden';
            fontLabel.style.textOverflow = 'ellipsis';
            fontLabel.innerHTML = 'The quick brown fox jumps over the lazy dog';
            fontBox.appendChild(fontLabel);
            fontBoxContainer.appendChild(fontBox);
            _this.fontBoxes.push(fontBoxContainer);
        });
        return panelDiv;
    };
    FontFamilyPanel.prototype.setCurrentFont = function (newFont, target) {
        this.currentFont = newFont;
        this.fontBoxes.forEach(function (box) {
            box.style.borderColor = box === target ? Style.settings.toolboxAccentColor : 'transparent';
        });
        if (this.onFontChanged) {
            this.onFontChanged(this.currentFont);
        }
    };
    return FontFamilyPanel;
}(ToolboxPanel));

var TextMarker = /** @class */ (function (_super) {
    __extends(TextMarker, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function TextMarker(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        /**
         * Text color.
         */
        _this.color = 'transparent';
        /**
         * Padding inside of the marker's bounding box in percents.
         */
        _this.padding = 5;
        _this.DEFAULT_TEXT = 'your text here';
        _this.text = _this.DEFAULT_TEXT;
        _this.isMoved = false;
        _this.color = settings.defaultColor;
        _this.fontFamily = settings.defaultFontFamily;
        _this.defaultSize = { x: 100, y: 30 };
        _this.setColor = _this.setColor.bind(_this);
        _this.setFont = _this.setFont.bind(_this);
        _this.renderText = _this.renderText.bind(_this);
        _this.sizeText = _this.sizeText.bind(_this);
        _this.textEditDivClicked = _this.textEditDivClicked.bind(_this);
        _this.showTextEditor = _this.showTextEditor.bind(_this);
        _this.setSize = _this.setSize.bind(_this);
        _this.positionTextEditor = _this.positionTextEditor.bind(_this);
        _this.colorPanel = new ColorPickerPanel('Color', settings.defaultColorSet, settings.defaultColor);
        _this.colorPanel.onColorChanged = _this.setColor;
        _this.fontFamilyPanel = new FontFamilyPanel('Font', settings.defaultFontFamilies, settings.defaultFontFamily);
        _this.fontFamilyPanel.onFontChanged = _this.setFont;
        return _this;
    }
    /**
     * Returns true if passed SVG element belongs to the marker. False otherwise.
     *
     * @param el - target element.
     */
    TextMarker.prototype.ownsTarget = function (el) {
        if (_super.prototype.ownsTarget.call(this, el) ||
            el === this.visual ||
            el === this.textElement ||
            el === this.bgRectangle) {
            return true;
        }
        else {
            var found_1 = false;
            this.textElement.childNodes.forEach(function (span) {
                if (span === el) {
                    found_1 = true;
                }
            });
            return found_1;
        }
    };
    /**
     * Creates text marker visual.
     */
    TextMarker.prototype.createVisual = function () {
        this.visual = SvgHelper.createGroup();
        this.bgRectangle = SvgHelper.createRect(1, 1, [['fill', 'transparent']]);
        this.visual.appendChild(this.bgRectangle);
        this.textElement = SvgHelper.createText([
            ['fill', this.color],
            ['font-family', this.fontFamily],
            ['font-size', '16px'],
            ['x', '0'],
            ['y', '0'],
        ]);
        this.textElement.transform.baseVal.appendItem(SvgHelper.createTransform()); // translate transorm
        this.textElement.transform.baseVal.appendItem(SvgHelper.createTransform()); // scale transorm
        this.visual.appendChild(this.textElement);
        this.addMarkerVisualToContainer(this.visual);
        this.renderText();
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) down event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    TextMarker.prototype.pointerDown = function (point, target) {
        _super.prototype.pointerDown.call(this, point, target);
        this.isMoved = false;
        this.pointerDownPoint = point;
        this.pointerDownTimestamp = Date.now();
        if (this.state === 'new') {
            this.createVisual();
            this.moveVisual(point);
            this._state = 'creating';
        }
    };
    TextMarker.prototype.renderText = function () {
        var _this = this;
        var LINE_SIZE = '1.2em';
        if (this.textElement) {
            while (this.textElement.lastChild) {
                this.textElement.removeChild(this.textElement.lastChild);
            }
            var lines = this.text.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/);
            lines.forEach(function (line) {
                _this.textElement.appendChild(SvgHelper.createTSpan(
                // workaround for swallowed empty lines
                line.trim() === '' ? ' ' : line.trim(), [
                    ['x', '0'],
                    ['dy', LINE_SIZE],
                ]));
            });
            setTimeout(this.sizeText, 10);
        }
    };
    TextMarker.prototype.getTextScale = function () {
        var textSize = this.textElement.getBBox();
        var scale = 1.0;
        if (textSize.width > 0 && textSize.height > 0) {
            var xScale = (this.width * 1.0 - (this.width * this.padding * 2) / 100) /
                textSize.width;
            var yScale = (this.height * 1.0 - (this.height * this.padding * 2) / 100) /
                textSize.height;
            scale = Math.min(xScale, yScale);
        }
        return scale;
    };
    TextMarker.prototype.getTextPosition = function (scale) {
        var textSize = this.textElement.getBBox();
        var x = 0;
        var y = 0;
        if (textSize.width > 0 && textSize.height > 0) {
            x = (this.width - textSize.width * scale) / 2;
            y = this.height / 2 - (textSize.height * scale) / 2;
        }
        return { x: x, y: y };
    };
    TextMarker.prototype.sizeText = function () {
        var textBBox = this.textElement.getBBox();
        var scale = this.getTextScale();
        var position = this.getTextPosition(scale);
        position.y -= textBBox.y * scale; // workaround adjustment for text not being placed at y=0
        if (navigator.userAgent.indexOf('Edge/') > -1) {
            // workaround for legacy Edge as transforms don't work otherwise but this way it doesn't work in Safari
            this.textElement.style.transform = "translate(" + position.x + "px, " + position.y + "px) scale(" + scale + ", " + scale + ")";
        }
        else {
            this.textElement.transform.baseVal
                .getItem(0)
                .setTranslate(position.x, position.y);
            this.textElement.transform.baseVal.getItem(1).setScale(scale, scale);
        }
    };
    /**
     * Handles marker manipulation (move, resize, rotate, etc.).
     *
     * @param point - event coordinates.
     */
    TextMarker.prototype.manipulate = function (point) {
        _super.prototype.manipulate.call(this, point);
        if (this.pointerDownPoint !== undefined) {
            this.isMoved =
                Math.abs(point.x - this.pointerDownPoint.x) > 5 ||
                    Math.abs(point.y - this.pointerDownPoint.y) > 5;
        }
    };
    /**
     * Resize marker based on current pointer coordinates and context.
     * @param point
     */
    TextMarker.prototype.resize = function (point) {
        _super.prototype.resize.call(this, point);
        this.isMoved = true;
        this.setSize();
        this.sizeText();
    };
    /**
     * Sets size of marker elements after manipulation.
     */
    TextMarker.prototype.setSize = function () {
        _super.prototype.setSize.call(this);
        if (this.visual && this.bgRectangle) {
            SvgHelper.setAttributes(this.visual, [
                ['width', this.width.toString()],
                ['height', this.height.toString()],
            ]);
            SvgHelper.setAttributes(this.bgRectangle, [
                ['width', this.width.toString()],
                ['height', this.height.toString()],
            ]);
        }
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) up event.
     *
     * @param point - event coordinates.
     */
    TextMarker.prototype.pointerUp = function (point) {
        var inState = this.state;
        _super.prototype.pointerUp.call(this, point);
        this.setSize();
        if (inState === 'creating' ||
            (!this.isMoved && Date.now() - this.pointerDownTimestamp > 500)) {
            this.showTextEditor();
        }
        this.pointerDownPoint = undefined;
    };
    TextMarker.prototype.showTextEditor = function () {
        var _this = this;
        this._state = 'edit';
        this.overlayContainer.innerHTML = '';
        this.textEditDiv = document.createElement('div');
        // textEditDiv.style.display = 'flex';
        this.textEditDiv.style.flexGrow = '2';
        //textEditDiv.style.backgroundColor = 'rgb(0,0,0,0.7)';
        this.textEditDiv.style.alignItems = 'center';
        this.textEditDiv.style.justifyContent = 'center';
        this.textEditDiv.style.pointerEvents = 'auto';
        this.textEditDiv.style.overflow = 'hidden';
        this.textEditor = document.createElement('div');
        this.textEditor.style.position = 'absolute';
        this.textEditor.style.fontFamily = this.fontFamily;
        this.textEditor.style.lineHeight = '1em';
        this.textEditor.innerText = this.text;
        this.textEditor.contentEditable = 'true';
        this.textEditor.style.color = this.color;
        this.positionTextEditor();
        this.textEditor.addEventListener('pointerup', function (ev) {
            ev.stopPropagation();
        });
        this.textEditor.addEventListener('input', function () {
            var fontSize = Number.parseFloat(_this.textEditor.style.fontSize);
            while (_this.textEditor.clientWidth >=
                Number.parseInt(_this.textEditor.style.maxWidth) &&
                fontSize > 0.9) {
                fontSize -= 0.1;
                _this.textEditor.style.fontSize = Math.max(fontSize, 0.9) + "em";
            }
        });
        this.textEditor.addEventListener('keyup', function (ev) {
            ev.cancelBubble = true;
        });
        this.textEditDiv.addEventListener('pointerup', function () {
            _this.textEditDivClicked(_this.textEditor.innerText);
        });
        this.textEditDiv.appendChild(this.textEditor);
        this.overlayContainer.appendChild(this.textEditDiv);
        this.hideVisual();
        this.textEditor.focus();
        document.execCommand('selectAll');
    };
    TextMarker.prototype.positionTextEditor = function () {
        if (this.state === 'edit') {
            if (this.textEditor === undefined) {
                this.showTextEditor();
            }
            else {
                this.textElement.style.display = '';
                var textScale = this.getTextScale();
                // const textPosition = this.getTextPosition(textScale);
                var rPosition = this.rotatePoint({
                    x: this.left + this.width / 2,
                    y: this.top + this.height / 2,
                });
                var textSize = this.textElement.getBBox();
                var rWH = {
                    x: textSize.width * textScale,
                    y: textSize.height * textScale,
                };
                rPosition.x -= rWH.x / 2;
                rPosition.y -= rWH.y / 2;
                this.textEditor.style.top = rPosition.y + "px";
                this.textEditor.style.left = rPosition.x + "px";
                this.textEditor.style.maxWidth = this.overlayContainer.offsetWidth - rPosition.x + "px";
                this.textEditor.style.fontSize = Math.max(13 * textScale, 12) + "px";
                this.textElement.style.display = 'none';
            }
        }
    };
    TextMarker.prototype.textEditDivClicked = function (text) {
        this.text = text.trim();
        this.overlayContainer.innerHTML = '';
        this.renderText();
        this.showVisual();
    };
    /**
     * Deselects this marker, renders text (if necessary), and hides selected marker UI.
     */
    TextMarker.prototype.deselect = function () {
        if (this.state === 'edit') {
            this.textEditDivClicked(this.textEditor.innerText);
        }
        _super.prototype.deselect.call(this);
    };
    /**
     * Opens text editor on double-click.
     * @param point
     * @param target
     */
    TextMarker.prototype.dblClick = function (point, target) {
        _super.prototype.dblClick.call(this, point, target);
        this.showTextEditor();
    };
    /**
     * Sets text color.
     * @param color - new text color.
     */
    TextMarker.prototype.setColor = function (color) {
        if (this.textElement) {
            SvgHelper.setAttributes(this.textElement, [['fill', color]]);
        }
        this.color = color;
        if (this.textEditor) {
            this.textEditor.style.color = this.color;
        }
        this.colorChanged(color);
    };
    /**
     * Sets font family.
     * @param font - new font family.
     */
    TextMarker.prototype.setFont = function (font) {
        if (this.textElement) {
            SvgHelper.setAttributes(this.textElement, [['font-family', font]]);
        }
        this.fontFamily = font;
        if (this.textEditor) {
            this.textEditor.style.fontFamily = this.fontFamily;
        }
        this.renderText();
    };
    /**
     * Hides marker visual.
     */
    TextMarker.prototype.hideVisual = function () {
        this.textElement.style.display = 'none';
        this.hideControlBox();
    };
    /**
     * Shows marker visual.
     */
    TextMarker.prototype.showVisual = function () {
        if (this.state === 'edit') {
            this._state = 'select';
        }
        this.textElement.style.display = '';
        this.showControlBox();
    };
    Object.defineProperty(TextMarker.prototype, "toolboxPanels", {
        /**
         * Returns the list of toolbox panels for this marker type.
         */
        get: function () {
            return [this.colorPanel, this.fontFamilyPanel];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns current marker state that can be restored in the future.
     */
    TextMarker.prototype.getState = function () {
        var result = Object.assign({
            color: this.color,
            fontFamily: this.fontFamily,
            padding: this.padding,
            text: this.text,
        }, _super.prototype.getState.call(this));
        result.typeName = TextMarker.typeName;
        return result;
    };
    /**
     * Restores previously saved marker state.
     *
     * @param state - previously saved state.
     */
    TextMarker.prototype.restoreState = function (state) {
        var textState = state;
        this.color = textState.color;
        this.fontFamily = textState.fontFamily;
        this.padding = textState.padding;
        this.text = textState.text;
        this.createVisual();
        _super.prototype.restoreState.call(this, state);
        this.setSize();
    };
    /**
     * Scales marker. Used after the image resize.
     *
     * @param scaleX - horizontal scale
     * @param scaleY - vertical scale
     */
    TextMarker.prototype.scale = function (scaleX, scaleY) {
        _super.prototype.scale.call(this, scaleX, scaleY);
        this.setSize();
        this.sizeText();
        this.positionTextEditor();
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    TextMarker.typeName = 'TextMarker';
    /**
     * Marker type title (display name) used for accessibility and other attributes.
     */
    TextMarker.title = 'Text marker';
    /**
     * SVG icon markup displayed on toolbar buttons.
     */
    TextMarker.icon = Icon$5;
    return TextMarker;
}(RectangularBoxMarkerBase));

var Icon$7 = "<svg viewBox=\"0 0 24 24\"><path d=\"M9.75 20.85c1.78-.7 1.39-2.63.49-3.85-.89-1.25-2.12-2.11-3.36-2.94A9.817 9.817 0 014.54 12c-.28-.33-.85-.94-.27-1.06.59-.12 1.61.46 2.13.68.91.38 1.81.82 2.65 1.34l1.01-1.7C8.5 10.23 6.5 9.32 4.64 9.05c-1.06-.16-2.18.06-2.54 1.21-.32.99.19 1.99.77 2.77 1.37 1.83 3.5 2.71 5.09 4.29.34.33.75.72.95 1.18.21.44.16.47-.31.47-1.24 0-2.79-.97-3.8-1.61l-1.01 1.7c1.53.94 4.09 2.41 5.96 1.79m11.09-15.6c.22-.22.22-.58 0-.79l-1.3-1.3a.562.562 0 00-.78 0l-1.02 1.02 2.08 2.08M11 10.92V13h2.08l6.15-6.15-2.08-2.08L11 10.92z\"/></svg>";

var FreehandMarker = /** @class */ (function (_super) {
    __extends(FreehandMarker, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function FreehandMarker(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        /**
         * Marker color.
         */
        _this.color = 'transparent';
        /**
         * Marker's stroke width.
         */
        _this.lineWidth = 3;
        _this.drawing = false;
        _this.color = settings.defaultColor;
        _this.lineWidth = settings.defaultStrokeWidth;
        _this.setColor = _this.setColor.bind(_this);
        _this.addCanvas = _this.addCanvas.bind(_this);
        _this.finishCreation = _this.finishCreation.bind(_this);
        _this.setLineWidth = _this.setLineWidth.bind(_this);
        _this.colorPanel = new ColorPickerPanel('Color', settings.defaultColorSet, settings.defaultColor);
        _this.colorPanel.onColorChanged = _this.setColor;
        _this.lineWidthPanel = new LineWidthPanel('Line width', settings.defaultStrokeWidths, settings.defaultStrokeWidth);
        _this.lineWidthPanel.onWidthChanged = _this.setLineWidth;
        return _this;
    }
    /**
     * Returns true if passed SVG element belongs to the marker. False otherwise.
     *
     * @param el - target element.
     */
    FreehandMarker.prototype.ownsTarget = function (el) {
        if (_super.prototype.ownsTarget.call(this, el) ||
            el === this.visual ||
            el === this.drawingImage) {
            return true;
        }
        else {
            return false;
        }
    };
    FreehandMarker.prototype.createVisual = function () {
        this.visual = SvgHelper.createGroup();
        this.drawingImage = SvgHelper.createImage();
        this.visual.appendChild(this.drawingImage);
        var translate = SvgHelper.createTransform();
        this.visual.transform.baseVal.appendItem(translate);
        this.addMarkerVisualToContainer(this.visual);
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) down event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    FreehandMarker.prototype.pointerDown = function (point, target) {
        if (this.state === 'new') {
            this.addCanvas();
            this.createVisual();
            this._state = 'creating';
        }
        if (this.state === 'creating') {
            this.canvasContext.strokeStyle = this.color;
            this.canvasContext.lineWidth = this.lineWidth;
            this.canvasContext.beginPath();
            this.canvasContext.moveTo(point.x, point.y);
            this.drawing = true;
        }
        else {
            _super.prototype.pointerDown.call(this, point, target);
        }
    };
    /**
     * Handles marker manipulation (move, resize, rotate, etc.).
     *
     * @param point - event coordinates.
     */
    FreehandMarker.prototype.manipulate = function (point) {
        if (this.state === 'creating') {
            if (this.drawing) {
                this.canvasContext.lineTo(point.x, point.y);
                this.canvasContext.stroke();
            }
        }
        else {
            _super.prototype.manipulate.call(this, point);
        }
    };
    /**
     * Resize marker based on current pointer coordinates and context.
     * @param point
     */
    FreehandMarker.prototype.resize = function (point) {
        _super.prototype.resize.call(this, point);
        SvgHelper.setAttributes(this.visual, [
            ['width', this.width.toString()],
            ['height', this.height.toString()],
        ]);
        SvgHelper.setAttributes(this.drawingImage, [
            ['width', this.width.toString()],
            ['height', this.height.toString()],
        ]);
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) up event.
     *
     * @param point - event coordinates.
     */
    FreehandMarker.prototype.pointerUp = function (point) {
        if (this._state === 'creating') {
            if (this.drawing) {
                this.canvasContext.closePath();
                this.drawing = false;
                if (this.globalSettings.newFreehandMarkerOnPointerUp) {
                    this.finishCreation();
                }
            }
        }
        else {
            _super.prototype.pointerUp.call(this, point);
        }
    };
    FreehandMarker.prototype.addCanvas = function () {
        this.overlayContainer.innerHTML = '';
        this.canvasElement = document.createElement('canvas');
        this.canvasElement.width = this.overlayContainer.clientWidth;
        this.canvasElement.height = this.overlayContainer.clientHeight;
        this.canvasContext = this.canvasElement.getContext('2d');
        this.overlayContainer.appendChild(this.canvasElement);
    };
    /**
     * Selects this marker and displays appropriate selected marker UI.
     */
    FreehandMarker.prototype.select = function () {
        if (this.state === 'creating') {
            this.finishCreation();
        }
        _super.prototype.select.call(this);
    };
    /**
     * Deselects this marker and hides selected marker UI.
     */
    FreehandMarker.prototype.deselect = function () {
        if (this.state === 'creating') {
            this.finishCreation();
        }
        _super.prototype.deselect.call(this);
    };
    FreehandMarker.prototype.finishCreation = function () {
        var imgData = this.canvasContext.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
        var _a = [
            this.canvasElement.width + 1,
            this.canvasElement.height + 1,
            -1,
            -1,
        ], startX = _a[0], startY = _a[1], endX = _a[2], endY = _a[3];
        var containsData = false;
        for (var row = 0; row < this.canvasElement.height; row++) {
            for (var col = 0; col < this.canvasElement.width; col++) {
                var pixAlpha = imgData.data[row * this.canvasElement.width * 4 + col * 4 + 3];
                if (pixAlpha > 0) {
                    containsData = true;
                    if (row < startY) {
                        startY = row;
                    }
                    if (col < startX) {
                        startX = col;
                    }
                    if (row > endY) {
                        endY = row;
                    }
                    if (col > endX) {
                        endX = col;
                    }
                }
            }
        }
        if (containsData) {
            this.left = startX;
            this.top = startY;
            this.width = endX - startX;
            this.height = endY - startY;
            var tmpCanvas = document.createElement('canvas');
            tmpCanvas.width = this.width;
            tmpCanvas.height = this.height;
            var tmpCtx = tmpCanvas.getContext('2d');
            tmpCtx.putImageData(this.canvasContext.getImageData(startX, startY, endX - startX, endY - startY), 0, 0);
            this.drawingImgUrl = tmpCanvas.toDataURL('image/png');
            this.setDrawingImage();
            this._state = 'select';
            if (this.onMarkerCreated) {
                this.onMarkerCreated(this);
            }
        }
        this.overlayContainer.innerHTML = '';
    };
    FreehandMarker.prototype.setDrawingImage = function () {
        SvgHelper.setAttributes(this.drawingImage, [
            ['width', this.width.toString()],
            ['height', this.height.toString()],
        ]);
        SvgHelper.setAttributes(this.drawingImage, [['href', this.drawingImgUrl]]);
        this.moveVisual({ x: this.left, y: this.top });
    };
    /**
     * Sets marker drawing color.
     * @param color - new color.
     */
    FreehandMarker.prototype.setColor = function (color) {
        this.color = color;
        this.colorChanged(color);
    };
    /**
     * Sets line width.
     * @param width - new line width
     */
    FreehandMarker.prototype.setLineWidth = function (width) {
        this.lineWidth = width;
    };
    Object.defineProperty(FreehandMarker.prototype, "toolboxPanels", {
        /**
         * Returns the list of toolbox panels for this marker type.
         */
        get: function () {
            if (this.state === 'new' || this.state === 'creating') {
                return [this.colorPanel, this.lineWidthPanel];
            }
            else {
                return [];
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns current marker state that can be restored in the future.
     */
    FreehandMarker.prototype.getState = function () {
        var result = Object.assign({
            drawingImgUrl: this.drawingImgUrl
        }, _super.prototype.getState.call(this));
        result.typeName = FreehandMarker.typeName;
        return result;
    };
    /**
     * Restores previously saved marker state.
     *
     * @param state - previously saved state.
     */
    FreehandMarker.prototype.restoreState = function (state) {
        this.createVisual();
        _super.prototype.restoreState.call(this, state);
        this.drawingImgUrl = state.drawingImgUrl;
        this.setDrawingImage();
    };
    /**
     * Scales marker. Used after the image resize.
     *
     * @param scaleX - horizontal scale
     * @param scaleY - vertical scale
     */
    FreehandMarker.prototype.scale = function (scaleX, scaleY) {
        _super.prototype.scale.call(this, scaleX, scaleY);
        this.setDrawingImage();
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    FreehandMarker.typeName = 'FreehandMarker';
    /**
     * Marker type title (display name) used for accessibility and other attributes.
     */
    FreehandMarker.title = 'Freehand marker';
    /**
     * SVG icon markup displayed on toolbar buttons.
     */
    FreehandMarker.icon = Icon$7;
    return FreehandMarker;
}(RectangularBoxMarkerBase));

var Icon$8 = "<svg viewBox=\"0 0 24 24\"><path d=\"M19 6.41L17.59 5 7 15.59V9H5v10h10v-2H8.41L19 6.41z\"/></svg>";

var Icon$9 = "<svg viewBox=\"0 0 24 24\"><path d=\"M8 14v4l-6-6 6-6v4h8V6l6 6-6 6v-4H8z\"/></svg>";

/**
 * Arrow type selection panel.
 */
var ArrowTypePanel = /** @class */ (function (_super) {
    __extends(ArrowTypePanel, _super);
    /**
     * Creates an ArrowTypePanel.
     * @param title - panel title.
     * @param currentType - currently set arrow type.
     * @param icon - panel button icon (SVG image markup).
     */
    function ArrowTypePanel(title, currentType, icon) {
        var _this = _super.call(this, title, icon ? icon : Icon$9) || this;
        _this.typeBoxes = [];
        _this.currentType = currentType;
        _this.setCurrentType = _this.setCurrentType.bind(_this);
        return _this;
    }
    /**
     * Returns panel UI.
     */
    ArrowTypePanel.prototype.getUi = function () {
        var _this = this;
        var panelDiv = document.createElement('div');
        panelDiv.style.display = 'flex';
        panelDiv.style.overflow = 'hidden';
        panelDiv.style.flexGrow = '2';
        var _loop_1 = function (ti) {
            var arrowType = 'both';
            switch (ti) {
                case 0:
                    arrowType = 'both';
                    break;
                case 1:
                    arrowType = 'start';
                    break;
                case 2:
                    arrowType = 'end';
                    break;
                case 3:
                    arrowType = 'none';
                    break;
            }
            var typeBoxContainer = document.createElement('div');
            typeBoxContainer.style.display = 'flex';
            typeBoxContainer.style.flexGrow = '2';
            typeBoxContainer.style.alignItems = 'center';
            typeBoxContainer.style.justifyContent = 'space-between';
            typeBoxContainer.style.padding = '5px';
            typeBoxContainer.style.borderWidth = '2px';
            typeBoxContainer.style.borderStyle = 'solid';
            typeBoxContainer.style.borderColor =
                arrowType === this_1.currentType ? Style.settings.toolboxAccentColor : 'transparent';
            typeBoxContainer.addEventListener('click', function () {
                _this.setCurrentType(arrowType, typeBoxContainer);
            });
            panelDiv.appendChild(typeBoxContainer);
            if (arrowType === 'both' || arrowType === 'start') {
                var leftTip = document.createElement('div');
                leftTip.style.display = 'flex';
                leftTip.style.alignItems = 'center';
                leftTip.style.minHeight = '20px';
                leftTip.innerHTML = "<svg viewBox=\"0 0 10 10\" width=\"10\" height=\"10\" xmlns=\"http://www.w3.org/2000/svg\">\n          <polygon points=\"0,5 10,0 10,10\" fill=\"" + Style.settings.toolboxColor + "\" />\n        </svg>";
                leftTip.style.marginLeft = '5px';
                typeBoxContainer.appendChild(leftTip);
            }
            var lineBox = document.createElement('div');
            lineBox.style.display = 'flex';
            lineBox.style.alignItems = 'center';
            lineBox.style.minHeight = '20px';
            lineBox.style.flexGrow = '2';
            var hr = document.createElement('hr');
            hr.style.minWidth = '20px';
            hr.style.border = '0px';
            hr.style.borderTop = "3px solid " + Style.settings.toolboxColor;
            hr.style.flexGrow = '2';
            lineBox.appendChild(hr);
            typeBoxContainer.appendChild(lineBox);
            if (arrowType === 'both' || arrowType === 'end') {
                var rightTip = document.createElement('div');
                rightTip.style.display = 'flex';
                rightTip.style.alignItems = 'center';
                rightTip.style.minHeight = '20px';
                rightTip.innerHTML = "<svg viewBox=\"0 0 10 10\" width=\"10\" height=\"10\" xmlns=\"http://www.w3.org/2000/svg\">\n          <polygon points=\"0,0 10,5 0,10\" fill=\"" + Style.settings.toolboxColor + "\" />\n        </svg>";
                rightTip.style.marginRight = '5px';
                typeBoxContainer.appendChild(rightTip);
            }
            this_1.typeBoxes.push(typeBoxContainer);
        };
        var this_1 = this;
        for (var ti = 0; ti < 4; ti++) {
            _loop_1(ti);
        }
        return panelDiv;
    };
    ArrowTypePanel.prototype.setCurrentType = function (newType, target) {
        this.currentType = newType;
        this.typeBoxes.forEach(function (box) {
            box.style.borderColor = box === target ? Style.settings.toolboxAccentColor : 'transparent';
        });
        if (this.onArrowTypeChanged) {
            this.onArrowTypeChanged(this.currentType);
        }
    };
    return ArrowTypePanel;
}(ToolboxPanel));

/**
 * Represents an arrow marker.
 */
var ArrowMarker = /** @class */ (function (_super) {
    __extends(ArrowMarker, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function ArrowMarker(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        _this.arrowType = 'end';
        _this.arrowBaseHeight = 10;
        _this.arrowBaseWidth = 10;
        _this.getArrowPoints = _this.getArrowPoints.bind(_this);
        _this.setArrowType = _this.setArrowType.bind(_this);
        _this.arrowTypePanel = new ArrowTypePanel('Arrow type', 'end');
        _this.arrowTypePanel.onArrowTypeChanged = _this.setArrowType;
        return _this;
    }
    /**
     * Returns true if passed SVG element belongs to the marker. False otherwise.
     *
     * @param el - target element.
     */
    ArrowMarker.prototype.ownsTarget = function (el) {
        if (_super.prototype.ownsTarget.call(this, el) ||
            el === this.arrow1 || el === this.arrow2) {
            return true;
        }
        else {
            return false;
        }
    };
    ArrowMarker.prototype.getArrowPoints = function (offsetX, offsetY) {
        var width = this.arrowBaseWidth + this.strokeWidth * 2;
        var height = this.arrowBaseHeight + this.strokeWidth * 2;
        return offsetX - width / 2 + "," + (offsetY + height / 2) + " " + offsetX + "," + (offsetY - height / 2) + " " + (offsetX + width / 2) + "," + (offsetY + height / 2);
    };
    ArrowMarker.prototype.createTips = function () {
        this.arrow1 = SvgHelper.createPolygon(this.getArrowPoints(this.x1, this.y1), [['fill', this.strokeColor]]);
        this.arrow1.transform.baseVal.appendItem(SvgHelper.createTransform());
        this.visual.appendChild(this.arrow1);
        this.arrow2 = SvgHelper.createPolygon(this.getArrowPoints(this.x2, this.y2), [['fill', this.strokeColor]]);
        this.arrow2.transform.baseVal.appendItem(SvgHelper.createTransform());
        this.visual.appendChild(this.arrow2);
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) down event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    ArrowMarker.prototype.pointerDown = function (point, target) {
        _super.prototype.pointerDown.call(this, point, target);
        if (this.state === 'creating') {
            this.createTips();
        }
    };
    /**
     * Adjusts marker visual after manipulation.
     */
    ArrowMarker.prototype.adjustVisual = function () {
        _super.prototype.adjustVisual.call(this);
        if (this.arrow1 && this.arrow2) {
            this.arrow1.style.display = (this.arrowType === 'both' || this.arrowType === 'start') ? '' : 'none';
            this.arrow2.style.display = (this.arrowType === 'both' || this.arrowType === 'end') ? '' : 'none';
            SvgHelper.setAttributes(this.arrow1, [
                ['points', this.getArrowPoints(this.x1, this.y1)],
                ['fill', this.strokeColor]
            ]);
            SvgHelper.setAttributes(this.arrow2, [
                ['points', this.getArrowPoints(this.x2, this.y2)],
                ['fill', this.strokeColor]
            ]);
            if (Math.abs(this.x1 - this.x2) > 0.1) {
                var lineAngle1 = (Math.atan((this.y2 - this.y1) / (this.x2 - this.x1)) * 180) / Math.PI + 90 * Math.sign(this.x1 - this.x2);
                var a1transform = this.arrow1.transform.baseVal.getItem(0);
                a1transform.setRotate(lineAngle1, this.x1, this.y1);
                this.arrow1.transform.baseVal.replaceItem(a1transform, 0);
                var a2transform = this.arrow2.transform.baseVal.getItem(0);
                a2transform.setRotate(lineAngle1 + 180, this.x2, this.y2);
                this.arrow2.transform.baseVal.replaceItem(a2transform, 0);
            }
        }
    };
    ArrowMarker.prototype.setArrowType = function (arrowType) {
        this.arrowType = arrowType;
        this.adjustVisual();
    };
    Object.defineProperty(ArrowMarker.prototype, "toolboxPanels", {
        /**
         * Returns the list of toolbox panels for this marker type.
         */
        get: function () {
            return [this.strokePanel, this.strokeWidthPanel, this.strokeStylePanel, this.arrowTypePanel];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns current marker state that can be restored in the future.
     */
    ArrowMarker.prototype.getState = function () {
        var result = Object.assign({
            arrowType: this.arrowType
        }, _super.prototype.getState.call(this));
        result.typeName = ArrowMarker.typeName;
        return result;
    };
    /**
     * Restores previously saved marker state.
     *
     * @param state - previously saved state.
     */
    ArrowMarker.prototype.restoreState = function (state) {
        _super.prototype.restoreState.call(this, state);
        var amState = state;
        this.arrowType = amState.arrowType;
        this.createTips();
        this.adjustVisual();
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    ArrowMarker.typeName = 'ArrowMarker';
    /**
     * Marker type title (display name) used for accessibility and other attributes.
     */
    ArrowMarker.title = 'Arrow marker';
    /**
     * SVG icon markup displayed on toolbar buttons.
     */
    ArrowMarker.icon = Icon$8;
    return ArrowMarker;
}(LineMarker));

var Icon$a = "<svg viewBox=\"0 0 24 24\"><path d=\"M4 6v13h16V6H4z\"/></svg>";

var CoverMarker = /** @class */ (function (_super) {
    __extends(CoverMarker, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function CoverMarker(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        _this.fillColor = settings.defaultFillColor;
        _this.strokeWidth = 0;
        _this.fillPanel = new ColorPickerPanel('Color', settings.defaultColorSet, settings.defaultFillColor);
        _this.fillPanel.onColorChanged = _this.setFillColor;
        return _this;
    }
    Object.defineProperty(CoverMarker.prototype, "toolboxPanels", {
        /**
         * Returns the list of toolbox panels for this marker type.
         */
        get: function () {
            return [this.fillPanel];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns current marker state that can be restored in the future.
     */
    CoverMarker.prototype.getState = function () {
        var result = _super.prototype.getState.call(this);
        result.typeName = CoverMarker.typeName;
        return result;
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    CoverMarker.typeName = 'CoverMarker';
    /**
     * Marker type title (display name) used for accessibility and other attributes.
     */
    CoverMarker.title = 'Cover marker';
    /**
     * SVG icon markup displayed on toolbar buttons.
     */
    CoverMarker.icon = Icon$a;
    return CoverMarker;
}(RectangleMarker));

var Icon$b = "<svg viewBox=\"0 0 24 24\"><path d=\"M18.5 1.15c-.53 0-1.04.19-1.43.58l-5.81 5.82 5.65 5.65 5.82-5.81c.77-.78.77-2.04 0-2.83l-2.84-2.83c-.39-.39-.89-.58-1.39-.58M10.3 8.5l-5.96 5.96c-.78.78-.78 2.04.02 2.85C3.14 18.54 1.9 19.77.67 21h5.66l.86-.86c.78.76 2.03.75 2.81-.02l5.95-5.96\"/></svg>";

var Icon$c = "<svg viewBox=\"0 0 24 24\"><path d=\"M17.66 8L12 2.35 6.34 8A8.02 8.02 0 004 13.64c0 2 .78 4.11 2.34 5.67a7.99 7.99 0 0011.32 0c1.56-1.56 2.34-3.67 2.34-5.67S19.22 9.56 17.66 8M6 14c0-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 18 12 18 14H6z\"/></svg>";

/**
 * Opacity panel.
 */
var OpacityPanel = /** @class */ (function (_super) {
    __extends(OpacityPanel, _super);
    /**
     * Creates an opacity panel.
     * @param title - panel title.
     * @param opacities - available opacities.
     * @param currentOpacity - current opacity.
     * @param icon - toolbox panel button (SVG image markup).
     */
    function OpacityPanel(title, opacities, currentOpacity, icon) {
        var _this = _super.call(this, title, icon ? icon : Icon$c) || this;
        _this.opacities = [];
        _this.opacityBoxes = [];
        _this.opacities = opacities;
        _this.currentOpacity = currentOpacity;
        _this.setCurrentOpacity = _this.setCurrentOpacity.bind(_this);
        return _this;
    }
    /**
     * Returns panel UI.
     */
    OpacityPanel.prototype.getUi = function () {
        var _this = this;
        var panelDiv = document.createElement('div');
        panelDiv.style.display = 'flex';
        panelDiv.style.overflow = 'hidden';
        panelDiv.style.flexGrow = '2';
        panelDiv.style.justifyContent = 'space-between';
        this.opacities.forEach(function (opacity) {
            var opacityBoxContainer = document.createElement('div');
            opacityBoxContainer.style.display = 'flex';
            //opacityBoxContainer.style.flexGrow = '2';
            opacityBoxContainer.style.alignItems = 'center';
            opacityBoxContainer.style.justifyContent = 'center';
            opacityBoxContainer.style.padding = '5px';
            opacityBoxContainer.style.borderWidth = '2px';
            opacityBoxContainer.style.borderStyle = 'solid';
            opacityBoxContainer.style.borderColor =
                opacity === _this.currentOpacity ? Style.settings.toolboxAccentColor : 'transparent';
            opacityBoxContainer.addEventListener('click', function () {
                _this.setCurrentOpacity(opacity, opacityBoxContainer);
            });
            panelDiv.appendChild(opacityBoxContainer);
            var label = document.createElement('div');
            label.innerText = (opacity * 100) + "%";
            opacityBoxContainer.appendChild(label);
            _this.opacityBoxes.push(opacityBoxContainer);
        });
        return panelDiv;
    };
    OpacityPanel.prototype.setCurrentOpacity = function (newWidth, target) {
        this.currentOpacity = newWidth;
        this.opacityBoxes.forEach(function (box) {
            box.style.borderColor = box === target ? Style.settings.toolboxAccentColor : 'transparent';
        });
        if (this.onOpacityChanged) {
            this.onOpacityChanged(this.currentOpacity);
        }
    };
    return OpacityPanel;
}(ToolboxPanel));

var HighlightMarker = /** @class */ (function (_super) {
    __extends(HighlightMarker, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function HighlightMarker(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        _this.setOpacity = _this.setOpacity.bind(_this);
        _this.fillColor = settings.defaultHighlightColor;
        _this.strokeWidth = 0;
        _this.opacity = settings.defaultHighlightOpacity;
        _this.fillPanel = new ColorPickerPanel('Color', settings.defaultColorSet, _this.fillColor);
        _this.fillPanel.onColorChanged = _this.setFillColor;
        _this.opacityPanel = new OpacityPanel('Opacity', settings.defaultOpacitySteps, _this.opacity);
        _this.opacityPanel.onOpacityChanged = _this.setOpacity;
        return _this;
    }
    /**
     * Sets marker's opacity (0..1).
     * @param opacity - new opacity value.
     */
    HighlightMarker.prototype.setOpacity = function (opacity) {
        this.opacity = opacity;
        if (this.visual) {
            SvgHelper.setAttributes(this.visual, [['opacity', this.opacity.toString()]]);
        }
    };
    Object.defineProperty(HighlightMarker.prototype, "toolboxPanels", {
        /**
         * Returns the list of toolbox panels for this marker type.
         */
        get: function () {
            return [this.fillPanel, this.opacityPanel];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns current marker state that can be restored in the future.
     */
    HighlightMarker.prototype.getState = function () {
        var result = _super.prototype.getState.call(this);
        result.typeName = HighlightMarker.typeName;
        return result;
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    HighlightMarker.typeName = 'HighlightMarker';
    /**
     * Marker type title (display name) used for accessibility and other attributes.
     */
    HighlightMarker.title = 'Highlight marker';
    /**
     * SVG icon markup displayed on toolbar buttons.
     */
    HighlightMarker.icon = Icon$b;
    return HighlightMarker;
}(CoverMarker));

var Icon$d = "<svg viewBox=\"0 0 24 24\"><path d=\"M4 2h16a2 2 0 012 2v12a2 2 0 01-2 2h-4l-4 4-4-4H4a2 2 0 01-2-2V4a2 2 0 012-2m0 2v12h4.83L12 19.17 15.17 16H20V4H4m2 3h12v2H6V7m0 4h10v2H6v-2z\"/></svg>";

var TextColorIcon = "<svg viewBox=\"0 0 24 24\"><path d=\"M9.62 12L12 5.67 14.37 12M11 3L5.5 17h2.25l1.12-3h6.25l1.13 3h2.25L13 3h-2z\"/></svg>";

var FillColorIcon = "<svg viewBox=\"0 0 24 24\"><path d=\"M19 11.5s-2 2.17-2 3.5a2 2 0 002 2 2 2 0 002-2c0-1.33-2-3.5-2-3.5M5.21 10L10 5.21 14.79 10m1.77-1.06L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.56-.59 1.53 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.59.59-1.56 0-2.12z\"/></svg>";

var CalloutMarker = /** @class */ (function (_super) {
    __extends(CalloutMarker, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function CalloutMarker(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        _this.bgColor = 'transparent';
        _this.tipPosition = { x: 0, y: 0 };
        _this.tipBase1Position = { x: 0, y: 0 };
        _this.tipBase2Position = { x: 0, y: 0 };
        _this.tipMoving = false;
        _this.color = settings.defaultStrokeColor;
        _this.bgColor = settings.defaultFillColor;
        _this.fontFamily = settings.defaultFontFamily;
        _this.defaultSize = { x: 100, y: 30 };
        _this.setBgColor = _this.setBgColor.bind(_this);
        _this.getTipPoints = _this.getTipPoints.bind(_this);
        _this.positionTip = _this.positionTip.bind(_this);
        _this.setTipPoints = _this.setTipPoints.bind(_this);
        _this.colorPanel = new ColorPickerPanel('Text color', settings.defaultColorSet, _this.color, TextColorIcon);
        _this.colorPanel.onColorChanged = _this.setColor;
        _this.bgColorPanel = new ColorPickerPanel('Fill color', settings.defaultColorSet, _this.bgColor, FillColorIcon);
        _this.bgColorPanel.onColorChanged = _this.setBgColor;
        _this.fontFamilyPanel = new FontFamilyPanel('Font', settings.defaultFontFamilies, settings.defaultFontFamily);
        _this.fontFamilyPanel.onFontChanged = _this.setFont;
        _this.tipGrip = new ResizeGrip();
        _this.tipGrip.visual.transform.baseVal.appendItem(SvgHelper.createTransform());
        _this.controlBox.appendChild(_this.tipGrip.visual);
        return _this;
    }
    /**
     * Returns true if passed SVG element belongs to the marker. False otherwise.
     *
     * @param el - target element.
     */
    CalloutMarker.prototype.ownsTarget = function (el) {
        return (_super.prototype.ownsTarget.call(this, el) || this.tipGrip.ownsTarget(el) || this.tip === el);
    };
    CalloutMarker.prototype.createTip = function () {
        SvgHelper.setAttributes(this.bgRectangle, [
            ['fill', this.bgColor],
            ['rx', '10px'],
        ]);
        this.tip = SvgHelper.createPolygon(this.getTipPoints(), [
            ['fill', this.bgColor],
        ]);
        this.visual.appendChild(this.tip);
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) down event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    CalloutMarker.prototype.pointerDown = function (point, target) {
        if (this.state === 'new') {
            _super.prototype.pointerDown.call(this, point, target);
        }
        if (this.state === 'creating') {
            this.createTip();
        }
        else if (this.tipGrip.ownsTarget(target)) {
            this.manipulationStartLeft = this.left;
            this.manipulationStartTop = this.top;
            this.tipMoving = true;
        }
        else {
            _super.prototype.pointerDown.call(this, point, target);
        }
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) up event.
     *
     * @param point - event coordinates.
     */
    CalloutMarker.prototype.pointerUp = function (point) {
        if (this.tipMoving) {
            this.tipMoving = false;
        }
        else {
            var isCreating = this.state === 'creating';
            _super.prototype.pointerUp.call(this, point);
            this.setTipPoints(isCreating);
            this.positionTip();
        }
    };
    /**
     * Handles marker manipulation (move, resize, rotate, etc.).
     *
     * @param point - event coordinates.
     */
    CalloutMarker.prototype.manipulate = function (point) {
        if (this.tipMoving) {
            var rotatedPoint = this.unrotatePoint(point);
            this.tipPosition = {
                x: rotatedPoint.x - this.manipulationStartLeft,
                y: rotatedPoint.y - this.manipulationStartTop,
            };
            this.positionTip();
        }
        else {
            _super.prototype.manipulate.call(this, point);
        }
    };
    /**
     * Sets marker's background/fill color.
     * @param color - new background color.
     */
    CalloutMarker.prototype.setBgColor = function (color) {
        if (this.bgRectangle && this.tip) {
            SvgHelper.setAttributes(this.bgRectangle, [['fill', color]]);
            SvgHelper.setAttributes(this.tip, [['fill', color]]);
        }
        this.bgColor = color;
        this.fillColorChanged(color);
    };
    CalloutMarker.prototype.getTipPoints = function () {
        this.setTipPoints(this.state === 'creating');
        return this.tipBase1Position.x + "," + this.tipBase1Position.y + " " + this.tipBase2Position.x + "," + this.tipBase2Position.y + " " + this.tipPosition.x + "," + this.tipPosition.y;
    };
    CalloutMarker.prototype.setTipPoints = function (isCreating) {
        if (isCreating === void 0) { isCreating = false; }
        var offset = Math.min(this.height / 2, 15);
        var baseWidth = this.height / 5;
        if (isCreating) {
            this.tipPosition = { x: offset + baseWidth / 2, y: this.height + 20 };
        }
        var cornerAngle = Math.atan((this.height / 2) / (this.width / 2));
        if (this.tipPosition.x < this.width / 2 && this.tipPosition.y < this.height / 2) {
            // top left
            var tipAngle = Math.atan((this.height / 2 - this.tipPosition.y) / (this.width / 2 - this.tipPosition.x));
            if (cornerAngle < tipAngle) {
                baseWidth = this.width / 5;
                offset = Math.min(this.width / 2, 15);
                this.tipBase1Position = { x: offset, y: 0 };
                this.tipBase2Position = { x: offset + baseWidth, y: 0 };
            }
            else {
                this.tipBase1Position = { x: 0, y: offset };
                this.tipBase2Position = { x: 0, y: offset + baseWidth };
            }
        }
        else if (this.tipPosition.x >= this.width / 2 && this.tipPosition.y < this.height / 2) {
            // top right
            var tipAngle = Math.atan((this.height / 2 - this.tipPosition.y) / (this.tipPosition.x - this.width / 2));
            if (cornerAngle < tipAngle) {
                baseWidth = this.width / 5;
                offset = Math.min(this.width / 2, 15);
                this.tipBase1Position = { x: this.width - offset - baseWidth, y: 0 };
                this.tipBase2Position = { x: this.width - offset, y: 0 };
            }
            else {
                this.tipBase1Position = { x: this.width, y: offset };
                this.tipBase2Position = { x: this.width, y: offset + baseWidth };
            }
        }
        else if (this.tipPosition.x >= this.width / 2 && this.tipPosition.y >= this.height / 2) {
            // bottom right
            var tipAngle = Math.atan((this.tipPosition.y - this.height / 2) / (this.tipPosition.x - this.width / 2));
            if (cornerAngle < tipAngle) {
                baseWidth = this.width / 5;
                offset = Math.min(this.width / 2, 15);
                this.tipBase1Position = { x: this.width - offset - baseWidth, y: this.height };
                this.tipBase2Position = { x: this.width - offset, y: this.height };
            }
            else {
                this.tipBase1Position = { x: this.width, y: this.height - offset - baseWidth };
                this.tipBase2Position = { x: this.width, y: this.height - offset };
            }
        }
        else {
            // bottom left
            var tipAngle = Math.atan((this.tipPosition.y - this.height / 2) / (this.width / 2 - this.tipPosition.x));
            if (cornerAngle < tipAngle) {
                baseWidth = this.width / 5;
                offset = Math.min(this.width / 2, 15);
                this.tipBase1Position = { x: offset, y: this.height };
                this.tipBase2Position = { x: offset + baseWidth, y: this.height };
            }
            else {
                this.tipBase1Position = { x: 0, y: this.height - offset };
                this.tipBase2Position = { x: 0, y: this.height - offset - baseWidth };
            }
        }
    };
    /**
     * Resize marker based on current pointer coordinates and context.
     * @param point
     */
    CalloutMarker.prototype.resize = function (point) {
        _super.prototype.resize.call(this, point);
        this.positionTip();
    };
    CalloutMarker.prototype.positionTip = function () {
        SvgHelper.setAttributes(this.tip, [['points', this.getTipPoints()]]);
        var translate = this.tipGrip.visual.transform.baseVal.getItem(0);
        translate.setTranslate(this.tipPosition.x, this.tipPosition.y);
        this.tipGrip.visual.transform.baseVal.replaceItem(translate, 0);
    };
    Object.defineProperty(CalloutMarker.prototype, "toolboxPanels", {
        /**
         * Returns the list of toolbox panels for this marker type.
         */
        get: function () {
            return [this.colorPanel, this.bgColorPanel, this.fontFamilyPanel];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Selects this marker and displays appropriate selected marker UI.
     */
    CalloutMarker.prototype.select = function () {
        this.positionTip();
        _super.prototype.select.call(this);
    };
    /**
     * Returns current marker state that can be restored in the future.
     */
    CalloutMarker.prototype.getState = function () {
        var result = Object.assign({
            bgColor: this.bgColor,
            tipPosition: this.tipPosition
        }, _super.prototype.getState.call(this));
        result.typeName = CalloutMarker.typeName;
        return result;
    };
    /**
     * Restores previously saved marker state.
     *
     * @param state - previously saved state.
     */
    CalloutMarker.prototype.restoreState = function (state) {
        var calloutState = state;
        this.bgColor = calloutState.bgColor;
        this.tipPosition = calloutState.tipPosition;
        _super.prototype.restoreState.call(this, state);
        this.createTip();
        this.setTipPoints();
    };
    /**
     * Scales marker. Used after the image resize.
     *
     * @param scaleX - horizontal scale
     * @param scaleY - vertical scale
     */
    CalloutMarker.prototype.scale = function (scaleX, scaleY) {
        _super.prototype.scale.call(this, scaleX, scaleY);
        this.tipPosition = { x: this.tipPosition.x * scaleX, y: this.tipPosition.y * scaleY };
        this.positionTip();
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    CalloutMarker.typeName = 'CalloutMarker';
    /**
     * Marker type title (display name) used for accessibility and other attributes.
     */
    CalloutMarker.title = 'Callout marker';
    /**
     * SVG icon markup displayed on toolbar buttons.
     */
    CalloutMarker.icon = Icon$d;
    return CalloutMarker;
}(TextMarker));

var Icon$e = "<svg viewBox=\"0 0 24 24\"><path d=\"M12 4C6.5 4 2 7.58 2 12s4.5 8 10 8 10-3.58 10-8-4.5-8-10-8z\"/></svg>";

var EllipseMarker = /** @class */ (function (_super) {
    __extends(EllipseMarker, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function EllipseMarker(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        /**
         * Ellipse fill color.
         */
        _this.fillColor = 'transparent';
        /**
         * Ellipse border color.
         */
        _this.strokeColor = 'transparent';
        /**
         * Ellipse border line width.
         */
        _this.strokeWidth = 0;
        /**
         * Ellipse border dash array.
         */
        _this.strokeDasharray = '';
        /**
         * Ellipse opacity (0..1).
         */
        _this.opacity = 1;
        _this.strokeColor = settings.defaultColor;
        _this.strokeWidth = settings.defaultStrokeWidth;
        _this.strokeDasharray = settings.defaultStrokeDasharray;
        _this.fillColor = settings.defaultFillColor;
        _this.setStrokeColor = _this.setStrokeColor.bind(_this);
        _this.setFillColor = _this.setFillColor.bind(_this);
        _this.setStrokeWidth = _this.setStrokeWidth.bind(_this);
        _this.setStrokeDasharray = _this.setStrokeDasharray.bind(_this);
        _this.setOpacity = _this.setOpacity.bind(_this);
        _this.createVisual = _this.createVisual.bind(_this);
        _this.strokePanel = new ColorPickerPanel('Line color', __spreadArrays(settings.defaultColorSet, ['transparent']), settings.defaultColor);
        _this.strokePanel.onColorChanged = _this.setStrokeColor;
        _this.fillPanel = new ColorPickerPanel('Fill color', __spreadArrays(settings.defaultColorSet, ['transparent']), _this.fillColor, FillColorIcon);
        _this.fillPanel.onColorChanged = _this.setFillColor;
        _this.strokeWidthPanel = new LineWidthPanel('Line width', settings.defaultStrokeWidths, settings.defaultStrokeWidth);
        _this.strokeWidthPanel.onWidthChanged = _this.setStrokeWidth;
        _this.strokeStylePanel = new LineStylePanel('Line style', settings.defaultStrokeDasharrays, settings.defaultStrokeDasharray);
        _this.strokeStylePanel.onStyleChanged = _this.setStrokeDasharray;
        _this.opacityPanel = new OpacityPanel('Opacity', settings.defaultOpacitySteps, _this.opacity);
        _this.opacityPanel.onOpacityChanged = _this.setOpacity;
        return _this;
    }
    /**
     * Returns true if passed SVG element belongs to the marker. False otherwise.
     *
     * @param el - target element.
     */
    EllipseMarker.prototype.ownsTarget = function (el) {
        if (_super.prototype.ownsTarget.call(this, el) || el === this.visual) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Creates marker visual.
     */
    EllipseMarker.prototype.createVisual = function () {
        this.visual = SvgHelper.createEllipse(this.width / 2, this.height / 2, [
            ['fill', this.fillColor],
            ['stroke', this.strokeColor],
            ['stroke-width', this.strokeWidth.toString()],
            ['stroke-dasharray', this.strokeDasharray],
            ['opacity', this.opacity.toString()]
        ]);
        this.addMarkerVisualToContainer(this.visual);
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) down event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    EllipseMarker.prototype.pointerDown = function (point, target) {
        _super.prototype.pointerDown.call(this, point, target);
        if (this.state === 'new') {
            this.createVisual();
            this.moveVisual(point);
            this._state = 'creating';
        }
    };
    /**
     * Handles marker manipulation (move, resize, rotate, etc.).
     *
     * @param point - event coordinates.
     */
    EllipseMarker.prototype.manipulate = function (point) {
        _super.prototype.manipulate.call(this, point);
    };
    /**
     * Resize marker based on current pointer coordinates and context.
     * @param point
     */
    EllipseMarker.prototype.resize = function (point) {
        _super.prototype.resize.call(this, point);
        this.setSize();
    };
    /**
     * Sets marker's visual size after manipulation.
     */
    EllipseMarker.prototype.setSize = function () {
        _super.prototype.setSize.call(this);
        SvgHelper.setAttributes(this.visual, [
            ['cx', (this.width / 2).toString()],
            ['cy', (this.height / 2).toString()],
            ['rx', (this.width / 2).toString()],
            ['ry', (this.height / 2).toString()],
        ]);
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) up event.
     *
     * @param point - event coordinates.
     */
    EllipseMarker.prototype.pointerUp = function (point) {
        _super.prototype.pointerUp.call(this, point);
        this.setSize();
    };
    /**
     * Sets marker's line color.
     * @param color - new line color.
     */
    EllipseMarker.prototype.setStrokeColor = function (color) {
        this.strokeColor = color;
        if (this.visual) {
            SvgHelper.setAttributes(this.visual, [['stroke', this.strokeColor]]);
        }
        this.colorChanged(color);
    };
    /**
     * Sets marker's fill (background) color.
     * @param color - new fill color.
     */
    EllipseMarker.prototype.setFillColor = function (color) {
        this.fillColor = color;
        if (this.visual) {
            SvgHelper.setAttributes(this.visual, [['fill', this.fillColor]]);
        }
        this.fillColorChanged(color);
    };
    /**
     * Sets marker's line width.
     * @param width - new line width
     */
    EllipseMarker.prototype.setStrokeWidth = function (width) {
        this.strokeWidth = width;
        if (this.visual) {
            SvgHelper.setAttributes(this.visual, [['stroke-width', this.strokeWidth.toString()]]);
        }
    };
    /**
     * Sets marker's border dash array.
     * @param dashes - new dash array.
     */
    EllipseMarker.prototype.setStrokeDasharray = function (dashes) {
        this.strokeDasharray = dashes;
        if (this.visual) {
            SvgHelper.setAttributes(this.visual, [['stroke-dasharray', this.strokeDasharray]]);
        }
    };
    /**
     * Sets marker's opacity.
     * @param opacity - new opacity value (0..1).
     */
    EllipseMarker.prototype.setOpacity = function (opacity) {
        this.opacity = opacity;
        if (this.visual) {
            SvgHelper.setAttributes(this.visual, [['opacity', this.opacity.toString()]]);
        }
    };
    Object.defineProperty(EllipseMarker.prototype, "toolboxPanels", {
        /**
         * Returns the list of toolbox panels for this marker type.
         */
        get: function () {
            return [this.strokePanel, this.fillPanel, this.strokeWidthPanel, this.strokeStylePanel, this.opacityPanel];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns current marker state that can be restored in the future.
     */
    EllipseMarker.prototype.getState = function () {
        var result = Object.assign({
            fillColor: this.fillColor,
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
            strokeDasharray: this.strokeDasharray,
            opacity: this.opacity
        }, _super.prototype.getState.call(this));
        result.typeName = EllipseMarker.typeName;
        return result;
    };
    /**
     * Restores previously saved marker state.
     *
     * @param state - previously saved state.
     */
    EllipseMarker.prototype.restoreState = function (state) {
        var rectState = state;
        this.fillColor = rectState.fillColor;
        this.strokeColor = rectState.strokeColor;
        this.strokeWidth = rectState.strokeWidth;
        this.strokeDasharray = rectState.strokeDasharray;
        this.opacity = rectState.opacity;
        this.createVisual();
        _super.prototype.restoreState.call(this, state);
        this.setSize();
    };
    /**
     * Scales marker. Used after the image resize.
     *
     * @param scaleX - horizontal scale
     * @param scaleY - vertical scale
     */
    EllipseMarker.prototype.scale = function (scaleX, scaleY) {
        _super.prototype.scale.call(this, scaleX, scaleY);
        this.setSize();
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    EllipseMarker.typeName = 'EllipseMarker';
    /**
     * Marker type title (display name) used for accessibility and other attributes.
     */
    EllipseMarker.title = 'Ellipse marker';
    /**
     * SVG icon markup displayed on toolbar buttons.
     */
    EllipseMarker.icon = Icon$e;
    return EllipseMarker;
}(RectangularBoxMarkerBase));

var Icon$f = "<svg viewBox=\"0 0 24 24\"><path d=\"M1.39 18.36l1.77-1.76L4.58 18l1.06-1.05-1.42-1.41 1.42-1.42 2.47 2.48 1.06-1.06-2.47-2.48 1.41-1.41 1.42 1.41L10.59 12l-1.42-1.41 1.42-1.42 2.47 2.48 1.06-1.06-2.47-2.48 1.41-1.41 1.41 1.41 1.07-1.06-1.42-1.41 1.42-1.42L18 6.7l1.07-1.06-2.47-2.48 1.76-1.77 4.25 4.25L5.64 22.61l-4.25-4.25z\"/></svg>";

var MeasurementMarker = /** @class */ (function (_super) {
    __extends(MeasurementMarker, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function MeasurementMarker(container, overlayContainer, settings) {
        return _super.call(this, container, overlayContainer, settings) || this;
    }
    Object.defineProperty(MeasurementMarker.prototype, "tipLength", {
        get: function () {
            return 10 + this.strokeWidth * 3;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns true if passed SVG element belongs to the marker. False otherwise.
     *
     * @param el - target element.
     */
    MeasurementMarker.prototype.ownsTarget = function (el) {
        if (_super.prototype.ownsTarget.call(this, el) ||
            el === this.tip1 || el === this.tip2) {
            return true;
        }
        else {
            return false;
        }
    };
    MeasurementMarker.prototype.createTips = function () {
        this.tip1 = SvgHelper.createLine(this.x1 - this.tipLength / 2, this.y1, this.x1 + this.tipLength / 2, this.y1, [
            ['stroke', this.strokeColor],
            ['stroke-width', this.strokeWidth.toString()]
        ]);
        this.tip1.transform.baseVal.appendItem(SvgHelper.createTransform());
        this.visual.appendChild(this.tip1);
        this.tip2 = SvgHelper.createLine(this.x2 - this.tipLength / 2, this.y2, this.x2 + this.tipLength / 2, this.y2, [
            ['stroke', this.strokeColor],
            ['stroke-width', this.strokeWidth.toString()]
        ]);
        this.tip2.transform.baseVal.appendItem(SvgHelper.createTransform());
        this.visual.appendChild(this.tip2);
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) down event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    MeasurementMarker.prototype.pointerDown = function (point, target) {
        _super.prototype.pointerDown.call(this, point, target);
        if (this.state === 'creating') {
            this.createTips();
        }
    };
    /**
     * Adjusts marker visual after manipulation.
     */
    MeasurementMarker.prototype.adjustVisual = function () {
        _super.prototype.adjustVisual.call(this);
        if (this.tip1 && this.tip2) {
            SvgHelper.setAttributes(this.tip1, [
                ['x1', (this.x1 - this.tipLength / 2).toString()],
                ['y1', this.y1.toString()],
                ['x2', (this.x1 + this.tipLength / 2).toString()],
                ['y2', this.y1.toString()],
                ['stroke', this.strokeColor],
                ['stroke-width', this.strokeWidth.toString()]
            ]);
            SvgHelper.setAttributes(this.tip2, [
                ['x1', (this.x2 - this.tipLength / 2).toString()],
                ['y1', this.y2.toString()],
                ['x2', (this.x2 + this.tipLength / 2).toString()],
                ['y2', this.y2.toString()],
                ['stroke', this.strokeColor],
                ['stroke-width', this.strokeWidth.toString()]
            ]);
            if (Math.abs(this.x1 - this.x2) > 0.1) {
                var lineAngle1 = (Math.atan((this.y2 - this.y1) / (this.x2 - this.x1)) * 180) / Math.PI + 90 * Math.sign(this.x1 - this.x2);
                var a1transform = this.tip1.transform.baseVal.getItem(0);
                a1transform.setRotate(lineAngle1, this.x1, this.y1);
                this.tip1.transform.baseVal.replaceItem(a1transform, 0);
                var a2transform = this.tip2.transform.baseVal.getItem(0);
                a2transform.setRotate(lineAngle1 + 180, this.x2, this.y2);
                this.tip2.transform.baseVal.replaceItem(a2transform, 0);
            }
        }
    };
    Object.defineProperty(MeasurementMarker.prototype, "toolboxPanels", {
        /**
         * Returns the list of toolbox panels for this marker type.
         */
        get: function () {
            return [this.strokePanel, this.strokeWidthPanel, this.strokeStylePanel];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns current marker state that can be restored in the future.
     */
    MeasurementMarker.prototype.getState = function () {
        var result = _super.prototype.getState.call(this);
        result.typeName = MeasurementMarker.typeName;
        return result;
    };
    /**
     * Restores previously saved marker state.
     *
     * @param state - previously saved state.
     */
    MeasurementMarker.prototype.restoreState = function (state) {
        _super.prototype.restoreState.call(this, state);
        this.createTips();
        this.adjustVisual();
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    MeasurementMarker.typeName = 'MeasurementMarker';
    /**
     * Marker type title (display name) used for accessibility and other attributes.
     */
    MeasurementMarker.title = 'Measurement marker';
    /**
     * SVG icon markup displayed on toolbar buttons.
     */
    MeasurementMarker.icon = Icon$f;
    return MeasurementMarker;
}(LineMarker));

var Icon$g = "<svg viewBox=\"0 0 24 24\"><path d=\"M12 6c4.41 0 8 2.69 8 6s-3.59 6-8 6-8-2.69-8-6 3.59-6 8-6m0-2C6.5 4 2 7.58 2 12s4.5 8 10 8 10-3.58 10-8-4.5-8-10-8z\"/></svg>";

var EllipseFrameMarker = /** @class */ (function (_super) {
    __extends(EllipseFrameMarker, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function EllipseFrameMarker(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        // reset colors so 'transparent' is excluded
        _this.strokePanel.colors = settings.defaultColorSet;
        _this.fillColor = 'transparent';
        return _this;
    }
    Object.defineProperty(EllipseFrameMarker.prototype, "toolboxPanels", {
        /**
         * Returns the list of toolbox panels for this marker type.
         */
        get: function () {
            return [this.strokePanel, this.strokeWidthPanel, this.strokeStylePanel];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns current marker state that can be restored in the future.
     */
    EllipseFrameMarker.prototype.getState = function () {
        var result = _super.prototype.getState.call(this);
        result.typeName = EllipseFrameMarker.typeName;
        return result;
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    EllipseFrameMarker.typeName = 'EllipseFrameMarker';
    /**
     * Marker type title (display name) used for accessibility and other attributes.
     */
    EllipseFrameMarker.title = 'Ellipse frame marker';
    /**
     * SVG icon markup displayed on toolbar buttons.
     */
    EllipseFrameMarker.icon = Icon$g;
    return EllipseFrameMarker;
}(EllipseMarker));

/**
 * Manages undo and redo stacks.
 */
var UndoRedoManager = /** @class */ (function () {
    function UndoRedoManager() {
        this.undoStack = [];
        this.redoStack = [];
    }
    Object.defineProperty(UndoRedoManager.prototype, "isUndoPossible", {
        /**
         * Returns true if there are items in the undo stack.
         */
        get: function () {
            return this.undoStack.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UndoRedoManager.prototype, "isRedoPossible", {
        /**
         * Returns true if there are items in the redo stack.
         */
        get: function () {
            return this.redoStack.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds a step to the undo stack.
     * @param stepData data representing a state.
     */
    UndoRedoManager.prototype.addUndoStep = function (stepData) {
        if (this.undoStack.length === 0 ||
            JSON.stringify(this.undoStack[this.undoStack.length - 1]) !==
                JSON.stringify(stepData)) {
            this.undoStack.push(stepData);
            if (JSON.stringify(this.lastRedoStep) !== JSON.stringify(stepData)) {
                this.redoStack.splice(0, this.redoStack.length);
            }
        }
    };
    /**
     * Returns data for the previous step in the undo stack and adds last step to the redo stack.
     * @returns
     */
    UndoRedoManager.prototype.undo = function () {
        if (this.undoStack.length > 1) {
            var lastStep = this.undoStack.pop();
            if (lastStep !== undefined) {
                this.redoStack.push(lastStep);
            }
            return this.undoStack.length > 0 ? this.undoStack[this.undoStack.length - 1] : undefined;
        }
    };
    /**
     * Returns most recent item in the redo stack.
     * @returns
     */
    UndoRedoManager.prototype.redo = function () {
        this.lastRedoStep = this.redoStack.pop();
        return this.lastRedoStep;
    };
    return UndoRedoManager;
}());

var Icon$h = "<svg viewBox=\"0 0 24 24\"><path d=\"M18.5 2A1.5 1.5 0 0120 3.5 1.5 1.5 0 0118.5 5c-.23 0-.45-.05-.65-.15l-3.69 3.7.34.45c2.19-1.26 4.76-2 7.5-2l1 .03v2.01L22 9c-2.58 0-5 .75-7 2.04A3.96 3.96 0 0111.04 15C9.75 17 9 19.42 9 22l.04 1H7.03L7 22c0-2.74.74-5.31 2-7.5l-.45-.34-3.7 3.69c.1.2.15.42.15.65A1.5 1.5 0 013.5 20 1.5 1.5 0 012 18.5 1.5 1.5 0 013.5 17c.23 0 .45.05.65.15l3.69-3.7C7.31 12.78 7 11.92 7 11a4 4 0 014-4c.92 0 1.78.31 2.45.84l3.7-3.69c-.1-.2-.15-.42-.15-.65A1.5 1.5 0 0118.5 2M11 9a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2z\"/></svg>";

var CurveMarker = /** @class */ (function (_super) {
    __extends(CurveMarker, _super);
    /**
     * Creates a new marker.
     *
     * @param container - SVG container to hold marker's visual.
     * @param overlayContainer - overlay HTML container to hold additional overlay elements while editing.
     * @param settings - settings object containing default markers settings.
     */
    function CurveMarker(container, overlayContainer, settings) {
        var _this = _super.call(this, container, overlayContainer, settings) || this;
        /**
         * Line color.
         */
        _this.strokeColor = 'transparent';
        /**
         * Line width.
         */
        _this.strokeWidth = 0;
        /**
         * Line dash array.
         */
        _this.strokeDasharray = '';
        _this.curveX = 0;
        _this.curveY = 0;
        _this.manipulationStartCurveX = 0;
        _this.manipulationStartCurveY = 0;
        _this.setStrokeColor = _this.setStrokeColor.bind(_this);
        _this.setStrokeWidth = _this.setStrokeWidth.bind(_this);
        _this.setStrokeDasharray = _this.setStrokeDasharray.bind(_this);
        _this.positionGrips = _this.positionGrips.bind(_this);
        _this.addControlGrips = _this.addControlGrips.bind(_this);
        _this.adjustVisual = _this.adjustVisual.bind(_this);
        _this.setupControlBox = _this.setupControlBox.bind(_this);
        _this.resize = _this.resize.bind(_this);
        _this.strokeColor = settings.defaultColor;
        _this.strokeWidth = settings.defaultStrokeWidth;
        _this.strokeDasharray = settings.defaultStrokeDasharray;
        _this.strokePanel = new ColorPickerPanel('Line color', settings.defaultColorSet, settings.defaultColor);
        _this.strokePanel.onColorChanged = _this.setStrokeColor;
        _this.strokeWidthPanel = new LineWidthPanel('Line width', settings.defaultStrokeWidths, settings.defaultStrokeWidth);
        _this.strokeWidthPanel.onWidthChanged = _this.setStrokeWidth;
        _this.strokeStylePanel = new LineStylePanel('Line style', settings.defaultStrokeDasharrays, settings.defaultStrokeDasharray);
        _this.strokeStylePanel.onStyleChanged = _this.setStrokeDasharray;
        return _this;
    }
    /**
     * Returns true if passed SVG element belongs to the marker. False otherwise.
     *
     * @param el - target element.
     */
    CurveMarker.prototype.ownsTarget = function (el) {
        if (_super.prototype.ownsTarget.call(this, el) ||
            el === this.visual ||
            el === this.selectorCurve ||
            el === this.visibleCurve ||
            this.curveGrip.ownsTarget(el)) {
            return true;
        }
        else {
            return false;
        }
    };
    CurveMarker.prototype.getPathD = function () {
        var result = "M " + this.x1 + " " + this.y1 + " Q " + this.curveX + " " + this.curveY + ", " + this.x2 + " " + this.y2;
        return result;
    };
    CurveMarker.prototype.createVisual = function () {
        this.visual = SvgHelper.createGroup();
        this.selectorCurve = SvgHelper.createPath(this.getPathD(), [
            ['stroke', 'transparent'],
            ['stroke-width', (this.strokeWidth + 10).toString()],
            ['fill', 'transparent'],
        ]);
        this.visibleCurve = SvgHelper.createPath(this.getPathD(), [
            ['stroke', this.strokeColor],
            ['stroke-width', this.strokeWidth.toString()],
            ['fill', 'transparent'],
        ]);
        this.visual.appendChild(this.selectorCurve);
        this.visual.appendChild(this.visibleCurve);
        this.addMarkerVisualToContainer(this.visual);
    };
    /**
     * Handles pointer (mouse, touch, stylus, etc.) down event.
     *
     * @param point - event coordinates.
     * @param target - direct event target element.
     */
    CurveMarker.prototype.pointerDown = function (point, target) {
        _super.prototype.pointerDown.call(this, point, target);
        this.manipulationStartCurveX = this.curveX;
        this.manipulationStartCurveY = this.curveY;
        if (this.state === 'new') {
            this.curveX = point.x;
            this.curveY = point.y;
        }
        if (this.state === 'new') {
            this.createVisual();
            this.adjustVisual();
            this._state = 'creating';
        }
        else if (this.curveGrip.ownsTarget(target)) {
            this.activeGrip = this.curveGrip;
            this._state = 'resize';
        }
    };
    /**
     * Adjusts visual after manipulation.
     */
    CurveMarker.prototype.adjustVisual = function () {
        if (this.selectorCurve && this.visibleCurve) {
            this.selectorCurve.setAttribute('d', this.getPathD());
            this.visibleCurve.setAttribute('d', this.getPathD());
            SvgHelper.setAttributes(this.visibleCurve, [['stroke', this.strokeColor]]);
            SvgHelper.setAttributes(this.visibleCurve, [['stroke-width', this.strokeWidth.toString()]]);
            SvgHelper.setAttributes(this.visibleCurve, [['stroke-dasharray', this.strokeDasharray.toString()]]);
        }
    };
    /**
     * Sets manipulation grips up.
     */
    CurveMarker.prototype.setupControlBox = function () {
        _super.prototype.setupControlBox.call(this);
        this.curveControlLine1 = SvgHelper.createLine(this.x1, this.y1, this.curveX, this.curveY, [
            ['stroke', 'black'],
            ['stroke-width', '1'],
            ['stroke-opacity', '0.5'],
            ['stroke-dasharray', '3, 2'],
        ]);
        this.curveControlLine2 = SvgHelper.createLine(this.x2, this.y2, this.curveX, this.curveY, [
            ['stroke', 'black'],
            ['stroke-width', '1'],
            ['stroke-opacity', '0.5'],
            ['stroke-dasharray', '3, 2'],
        ]);
        this.controlBox.insertBefore(this.curveControlLine1, this.controlBox.firstChild);
        this.controlBox.insertBefore(this.curveControlLine2, this.controlBox.firstChild);
    };
    /**
     * Add manipulation grips to the control box.
     */
    CurveMarker.prototype.addControlGrips = function () {
        this.curveGrip = this.createGrip();
        this.curveX = 0;
        this.curveY = 0;
        _super.prototype.addControlGrips.call(this);
    };
    /**
     * Positions manipulation grips.
     */
    CurveMarker.prototype.positionGrips = function () {
        _super.prototype.positionGrips.call(this);
        var gripSize = this.curveGrip.GRIP_SIZE;
        this.positionGrip(this.curveGrip.visual, this.curveX - gripSize / 2, this.curveY - gripSize / 2);
        if (this.curveControlLine1 && this.curveControlLine2) {
            this.curveControlLine1.setAttribute('x1', this.x1.toString());
            this.curveControlLine1.setAttribute('y1', this.y1.toString());
            this.curveControlLine1.setAttribute('x2', this.curveX.toString());
            this.curveControlLine1.setAttribute('y2', this.curveY.toString());
            this.curveControlLine2.setAttribute('x1', this.x2.toString());
            this.curveControlLine2.setAttribute('y1', this.y2.toString());
            this.curveControlLine2.setAttribute('x2', this.curveX.toString());
            this.curveControlLine2.setAttribute('y2', this.curveY.toString());
        }
    };
    /**
     * Moves or resizes the marker.
     * @param point event coordinates
     */
    CurveMarker.prototype.manipulate = function (point) {
        if (this.state === 'move') {
            this.curveX = this.manipulationStartCurveX + point.x - this.manipulationStartX;
            this.curveY = this.manipulationStartCurveY + point.y - this.manipulationStartY;
        }
        _super.prototype.manipulate.call(this, point);
    };
    /**
     * Resizes the marker.
     * @param point event coordinates.
     */
    CurveMarker.prototype.resize = function (point) {
        if (this.activeGrip === this.curveGrip) {
            this.curveX = point.x;
            this.curveY = point.y;
        }
        _super.prototype.resize.call(this, point);
        if (this.state === 'creating') {
            this.curveX = this.x1 + (this.x2 - this.x1) / 2;
            this.curveY = this.y1 + (this.y2 - this.y1) / 2;
        }
    };
    /**
     * Sets line color.
     * @param color - new color.
     */
    CurveMarker.prototype.setStrokeColor = function (color) {
        this.strokeColor = color;
        this.adjustVisual();
        this.colorChanged(color);
    };
    /**
     * Sets line width.
     * @param width - new width.
     */
    CurveMarker.prototype.setStrokeWidth = function (width) {
        this.strokeWidth = width;
        this.adjustVisual();
    };
    /**
     * Sets line dash array.
     * @param dashes - new dash array.
     */
    CurveMarker.prototype.setStrokeDasharray = function (dashes) {
        this.strokeDasharray = dashes;
        this.adjustVisual();
    };
    Object.defineProperty(CurveMarker.prototype, "toolboxPanels", {
        /**
         * Returns the list of toolbox panels for this marker type.
         */
        get: function () {
            return [this.strokePanel, this.strokeWidthPanel, this.strokeStylePanel];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns current marker state that can be restored in the future.
     */
    CurveMarker.prototype.getState = function () {
        var result = Object.assign({
            strokeColor: this.strokeColor,
            strokeWidth: this.strokeWidth,
            strokeDasharray: this.strokeDasharray,
            curveX: this.curveX,
            curveY: this.curveY
        }, _super.prototype.getState.call(this));
        result.typeName = CurveMarker.typeName;
        return result;
    };
    /**
     * Restores previously saved marker state.
     *
     * @param state - previously saved state.
     */
    CurveMarker.prototype.restoreState = function (state) {
        _super.prototype.restoreState.call(this, state);
        var lmState = state;
        this.strokeColor = lmState.strokeColor;
        this.strokeWidth = lmState.strokeWidth;
        this.strokeDasharray = lmState.strokeDasharray;
        this.curveX = lmState.curveX;
        this.curveY = lmState.curveY;
        this.createVisual();
        this.adjustVisual();
    };
    /**
     * String type name of the marker type.
     *
     * Used when adding {@link MarkerArea.availableMarkerTypes} via a string and to save and restore state.
     */
    CurveMarker.typeName = 'CurveMarker';
    /**
     * Marker type title (display name) used for accessibility and other attributes.
     */
    CurveMarker.title = 'Curve marker';
    /**
     * SVG icon markup displayed on toolbar buttons.
     */
    CurveMarker.icon = Icon$h;
    return CurveMarker;
}(LinearMarkerBase));

/**
 * MarkerArea is the main class of marker.js 2. It controls the behavior and appearance of the library.
 *
 * The simplest marker.js 2 usage scenario looks something like this:
 *
 * ```typescript
 * import * as markerjs2 from 'markerjs2';
 * // create an instance of MarkerArea and pass the target image reference as a parameter
 * let markerArea = new markerjs2.MarkerArea(document.getElementById('myimg'));
 *
 * // register an event listener for when user clicks OK/save in the marker.js UI
 * markerArea.addRenderEventListener(dataUrl => {
 *   // we are setting the markup result to replace our original image on the page
 *   // but you can set a different image or upload it to your server
 *   document.getElementById('myimg').src = dataUrl;
 * });
 *
 * // finally, call the show() method and marker.js UI opens
 * markerArea.show();
 * ```
 */
var MarkerArea = /** @class */ (function () {
    /**
     * Creates a new MarkerArea for the specified target image.
     *
     * ```typescript
     * // create an instance of MarkerArea and pass the target image reference as a parameter
     * let markerArea = new markerjs2.MarkerArea(document.getElementById('myimg'));
     * ```
     *
     * @param target image object to mark up.
     */
    function MarkerArea(target) {
        this.touchPoints = 0;
        this._availableMarkerTypes = this
            .DEFAULT_MARKER_TYPES;
        this.mode = 'select';
        this.markers = [];
        this.isDragging = false;
        this.renderEventListeners = [];
        this.closeEventListeners = [];
        this.eventListener = [];
        this.settings = new Settings();
        this._isOpen = false;
        this.undoRedoManager = new UndoRedoManager();
        /**
         * When set to true resulting image will be rendered at the natural (original) resolution
         * of the target image. Otherwise (default), screen dimensions of the image are used.
         *
         * @default false (use screen dimensions)
         */
        this.renderAtNaturalSize = false;
        /**
         * Type of image for the rendering result. Eg. `image/png` (default) or `image/jpeg`.
         *
         * @default `image/png`
         */
        this.renderImageType = 'image/png';
        /**
         * When set to `true`, will render only the marker layer without the original image.
         * This could be useful when you want to non-destructively overlay markers on top of the original image.
         *
         * Note that in order for the markers layer to have a transparent background {@linkcode renderImageType}
         * should be set to a format supporting transparency, such as `image/png`.
         *
         * @default false
         */
        this.renderMarkersOnly = false;
        Style.settings = Style.defaultSettings;
        this.uiStyleSettings = Style.settings;
        this.target = target;
        this.targetRoot = document.body;
        this.width = target.clientWidth;
        this.height = target.clientHeight;
        Style.removeStyleSheet();
        this.open = this.open.bind(this);
        this.setTopLeft = this.setTopLeft.bind(this);
        this.toolbarButtonClicked = this.toolbarButtonClicked.bind(this);
        this.createNewMarker = this.createNewMarker.bind(this);
        this.addNewMarker = this.addNewMarker.bind(this);
        this.markerCreated = this.markerCreated.bind(this);
        this.setCurrentMarker = this.setCurrentMarker.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onDblClick = this.onDblClick.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.overrideOverflow = this.overrideOverflow.bind(this);
        this.restoreOverflow = this.restoreOverflow.bind(this);
        this.close = this.close.bind(this);
        this.closeUI = this.closeUI.bind(this);
        this.addCloseEventListener = this.addCloseEventListener.bind(this);
        this.removeCloseEventListener = this.removeCloseEventListener.bind(this);
        this.addRenderEventListener = this.addRenderEventListener.bind(this);
        this.removeRenderEventListener = this.removeRenderEventListener.bind(this);
        this.clientToLocalCoordinates = this.clientToLocalCoordinates.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.deleteSelectedMarker = this.deleteSelectedMarker.bind(this);
        this.setWindowHeight = this.setWindowHeight.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.colorChanged = this.colorChanged.bind(this);
        this.fillColorChanged = this.fillColorChanged.bind(this);
        this.onPopupTargetResize = this.onPopupTargetResize.bind(this);
        this.showNotesEditor = this.showNotesEditor.bind(this);
        this.hideNotesEditor = this.hideNotesEditor.bind(this);
    }
    Object.defineProperty(MarkerArea.prototype, "ALL_MARKER_TYPES", {
        /**
         * Returns a list of all built-in marker types for use with {@linkcode availableMarkerTypes}
         *
         * @readonly
         */
        get: function () {
            return [
                FrameMarker,
                FreehandMarker,
                ArrowMarker,
                TextMarker,
                EllipseFrameMarker,
                EllipseMarker,
                HighlightMarker,
                CalloutMarker,
                MeasurementMarker,
                CoverMarker,
                LineMarker,
                CurveMarker
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarkerArea.prototype, "DEFAULT_MARKER_TYPES", {
        /**
         * Returns a list of default set of built-in marker types.
         * Used when {@linkcode availableMarkerTypes} isn't set explicitly.
         *
         * @readonly
         */
        get: function () {
            return [
                FrameMarker,
                FreehandMarker,
                ArrowMarker,
                TextMarker,
                EllipseMarker,
                HighlightMarker,
                CalloutMarker,
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarkerArea.prototype, "BASIC_MARKER_TYPES", {
        /**
         * Returns a short list of essential built-in marker types for use with {@linkcode availableMarkerTypes}
         *
         * @readonly
         */
        get: function () {
            return [
                FrameMarker,
                FreehandMarker,
                ArrowMarker,
                TextMarker,
                HighlightMarker,
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarkerArea.prototype, "availableMarkerTypes", {
        /**
         * Gets or sets a list of marker types avaiable to the user in the toolbar.
         * The types can be passed as either type reference or a string type name.
         *
         * ```typescript
         * this.markerArea1.availableMarkerTypes = ['CalloutMarker', ...this.markerArea1.BASIC_MARKER_TYPES];
         * ```
         *
         * @default {@linkcode DEFAULT_MARKER_TYPES}
         */
        get: function () {
            return this._availableMarkerTypes;
        },
        set: function (value) {
            var _this = this;
            this._availableMarkerTypes.splice(0);
            value.forEach(function (mt) {
                if (typeof mt === 'string') {
                    var typeType = _this.ALL_MARKER_TYPES.find(function (allT) { return allT.typeName === mt; });
                    if (typeType !== undefined) {
                        _this._availableMarkerTypes.push(typeType);
                    }
                }
                else {
                    _this._availableMarkerTypes.push(mt);
                }
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MarkerArea.prototype, "isOpen", {
        /**
         * Returns `true` when MarkerArea is open and `false` otherwise.
         *
         * @readonly
         */
        get: function () {
            return this._isOpen;
        },
        enumerable: false,
        configurable: true
    });
    MarkerArea.prototype.open = function () {
        this.setupResizeObserver();
        this.setEditingTarget();
        this.setTopLeft();
        this.initMarkerCanvas();
        this.initOverlay();
        this.attachEvents();
        if (this.settings.displayMode === 'popup') {
            this.onPopupTargetResize();
        }
        if (!Activator.isLicensed) {
            // NOTE:
            // before removing this call please consider supporting marker.js
            // by visiting https://markerjs.com/ for details
            // thank you!
            this.addLogo();
        }
        this._isOpen = true;
    };
    /**
     * Initializes the MarkerArea and opens the UI.
     */
    MarkerArea.prototype.show = function () {
        this.setWindowHeight();
        if (!this.rendered) {
            this.rendered = true;
            this.showUI();
            this.open();
        } else {
            this.toolbar.uiContainer.style.visibility = "visible";
            this._isOpen = true;
        }

        this.eventListener.forEach(function (listener) { return listener("open"); });
    };
    /**
     * Renders the annotation result.
     *
     * Normally, you should use {@linkcode addRenderEventListener} method to set a listener for the `render` event
     * rather than calling this method directly.
     */
    MarkerArea.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var renderer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setCurrentMarker();
                        renderer = new Renderer();
                        renderer.naturalSize = this.renderAtNaturalSize;
                        renderer.imageType = this.renderImageType;
                        renderer.imageQuality = this.renderImageQuality;
                        renderer.markersOnly = this.renderMarkersOnly;
                        renderer.width = this.renderWidth;
                        renderer.height = this.renderHeight;
                        // workaround for an issue in Safari where FreeHand marker
                        // is not rendered on the first try for some reason
                        return [4 /*yield*/, renderer.rasterize(this.target, this.markerImage)];
                    case 1:
                        // workaround for an issue in Safari where FreeHand marker
                        // is not rendered on the first try for some reason
                        _a.sent();
                        return [4 /*yield*/, renderer.rasterize(this.target, this.markerImage)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Closes the MarkerArea UI.
     */
    MarkerArea.prototype.close = function () {
        if (this.isOpen) {
            if (this.coverDiv) {
                this.closeUI();
            }
            if (this.targetObserver) {
                this.targetObserver.unobserve(this.target);
            }
            if (this.settings.displayMode === 'popup') {
                window.removeEventListener('resize', this.setWindowHeight);
            }
            this.closeEventListeners.forEach(function (listener) { return listener(); });
            this._isOpen = false;

            this.eventListener.forEach(function (listener) { return listener("open"); });
        }
    };
    /**
     * Adds one or more markers to the toolbar.
     *
     * @param markers - one or more marker types to be added.
     */
    MarkerArea.prototype.addMarkersToToolbar = function () {
        var _a;
        var markers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            markers[_i] = arguments[_i];
        }
        (_a = this._availableMarkerTypes).push.apply(_a, markers);
    };
    /**
     * Add a `render` event listener which is called when user clicks on the OK/save button
     * in the toolbar.
     *
     * ```typescript
     * // register an event listener for when user clicks OK/save in the marker.js UI
     * markerArea.addRenderEventListener(dataUrl => {
     *   // we are setting the markup result to replace our original image on the page
     *   // but you can set a different image or upload it to your server
     *   document.getElementById('myimg').src = dataUrl;
     * });
     * ```
     *
     * This is where you place your code to save a resulting image and/or MarkerAreaState.
     *
     * @param listener - a method handling rendering results
     *
     * @see {@link MarkerAreaState}
     */
    MarkerArea.prototype.addRenderEventListener = function (listener) {
        this.renderEventListeners.push(listener);
    };
    /**
     * Remove a `render` event handler.
     *
     * @param listener - previously registered `render` event handler.
     */
    MarkerArea.prototype.removeRenderEventListener = function (listener) {
        if (this.renderEventListeners.indexOf(listener) > -1) {
            this.renderEventListeners.splice(this.renderEventListeners.indexOf(listener), 1);
        }
    };
    MarkerArea.prototype.addEventListener = function (listener) {
        this.eventListener.push(listener);
    };
    /**
     * Add a `close` event handler to perform actions in your code after the user
     * clicks on the close button (without saving).
     *
     * @param listener - close event listener
     */
    MarkerArea.prototype.addCloseEventListener = function (listener) {
        this.closeEventListeners.push(listener);
    };
    /**
     * Remove a `close` event handler.
     *
     * @param listener - previously registered `close` event handler.
     */
    MarkerArea.prototype.removeCloseEventListener = function (listener) {
        if (this.closeEventListeners.indexOf(listener) > -1) {
            this.closeEventListeners.splice(this.closeEventListeners.indexOf(listener), 1);
        }
    };
    MarkerArea.prototype.setupResizeObserver = function () {
        var _this = this;
        if (this.settings.displayMode === 'inline') {
            if (window.ResizeObserver) {
                this.targetObserver = new ResizeObserver(function () {
                    _this.resize(_this.target.clientWidth, _this.target.clientHeight);
                });
                this.targetObserver.observe(this.target);
            }
        }
        else if (this.settings.displayMode === 'popup') {
            if (window.ResizeObserver) {
                this.targetObserver = new ResizeObserver(function () {
                    return _this.onPopupTargetResize();
                });
                this.targetObserver.observe(this.editorCanvas);
            }
            window.addEventListener('resize', this.setWindowHeight);
        }
    };
    MarkerArea.prototype.onPopupTargetResize = function () {
        var ratio = (1.0 * this.target.clientWidth) / this.target.clientHeight;
        var newWidth = this.editorCanvas.clientWidth / ratio > this.editorCanvas.clientHeight
            ? this.editorCanvas.clientHeight * ratio
            : this.editorCanvas.clientWidth;
        var newHeight = newWidth < this.editorCanvas.clientWidth
            ? this.editorCanvas.clientHeight
            : this.editorCanvas.clientWidth / ratio;
        this.resize(newWidth, newHeight);
    };
    MarkerArea.prototype.setWindowHeight = function () {
        this.windowHeight = window.innerHeight;
    };
    MarkerArea.prototype.resize = function (newWidth, newHeight) {
        var scaleX = newWidth / this.imageWidth;
        var scaleY = newHeight / this.imageHeight;
        this.imageWidth = Math.round(newWidth);
        this.imageHeight = Math.round(newHeight) - this.getDiffHeight();
        this.editingTarget.src = this.target.src;
        this.editingTarget.width = this.imageWidth;
        this.editingTarget.height = this.imageHeight;
        this.editingTarget.style.width = this.imageWidth + "px";
        this.editingTarget.style.height = this.imageHeight + "px";
        this.markerImage.setAttribute('width', this.imageWidth.toString());
        this.markerImage.setAttribute('height', this.imageHeight.toString());
        this.markerImage.setAttribute('viewBox', '0 0 ' + this.imageWidth.toString() + ' ' + this.imageHeight.toString());
        this.markerImageHolder.style.width = this.imageWidth + "px";
        this.markerImageHolder.style.height = this.imageHeight + "px";
        this.overlayContainer.style.width = this.imageWidth + "px";
        this.overlayContainer.style.height = this.imageHeight + "px";
        if (this.settings.displayMode !== 'popup') {
            this.coverDiv.style.width = this.imageWidth.toString() + "px";
        }
        else {
            this.setTopLeft();
            this.positionMarkerImage();
        }
        if (this.toolbar !== undefined) {
            this.toolbar.adjustLayout();
        }
        this.positionLogo();
        this.scaleMarkers(scaleX, scaleY);
    };
    MarkerArea.prototype.scaleMarkers = function (scaleX, scaleY) {
        var preScaleSelectedMarker;
        if (!(this.currentMarker && this.currentMarker instanceof TextMarker)) {
            preScaleSelectedMarker = this.currentMarker;
            this.setCurrentMarker();
            this.toolbar.setSelectMode();
        }
        this.markers.forEach(function (marker) { return marker.scale(scaleX, scaleY); });
        if (preScaleSelectedMarker !== undefined) {
            this.setCurrentMarker(preScaleSelectedMarker);
        }
    };
    MarkerArea.prototype.setEditingTarget = function () {
        this.imageWidth = Math.round(this.target.clientWidth);
        this.imageHeight = Math.round(this.target.clientHeight);
        this.editingTarget.src = this.target.src;
        this.editingTarget.width = this.imageWidth;
        this.editingTarget.height = this.imageHeight;
        this.editingTarget.style.width = this.imageWidth + "px";
        this.editingTarget.style.height = this.imageHeight + "px";
    };
    MarkerArea.prototype.setTopLeft = function () {
        var targetRect = this.editingTarget.getBoundingClientRect();
        var bodyRect = this.editorCanvas.getBoundingClientRect();
        this.left = targetRect.left - bodyRect.left;
        this.top = targetRect.top - bodyRect.top;
    };
    MarkerArea.prototype.initMarkerCanvas = function () {
        this.markerImageHolder = document.createElement('div');
        this.markerImageHolder.style.setProperty('touch-action', 'pinch-zoom');
        this.markerImage = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.markerImage.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        this.markerImage.setAttribute('width', this.imageWidth.toString());
        this.markerImage.setAttribute('height', this.imageHeight.toString());
        this.markerImage.setAttribute('viewBox', '0 0 ' + this.imageWidth.toString() + ' ' + this.imageHeight.toString());
        this.markerImage.style.pointerEvents = 'auto';
        this.markerImageHolder.style.position = 'absolute';
        this.markerImageHolder.style.width = this.imageWidth + "px";
        this.markerImageHolder.style.height = this.imageHeight + "px";
        this.markerImageHolder.style.transformOrigin = 'top left';
        this.positionMarkerImage();
        this.defs = SvgHelper.createDefs();
        this.markerImage.appendChild(this.defs);
        this.markerImageHolder.appendChild(this.markerImage);
        this.editorCanvas.appendChild(this.markerImageHolder);
    };
    MarkerArea.prototype.initOverlay = function () {
        this.overlayContainer = document.createElement('div');
        this.overlayContainer.style.position = 'absolute';
        this.overlayContainer.style.left = '0px';
        this.overlayContainer.style.top = '0px';
        this.overlayContainer.style.width = this.imageWidth + "px";
        this.overlayContainer.style.height = this.imageHeight + "px";
        this.overlayContainer.style.display = 'flex';
        this.markerImageHolder.appendChild(this.overlayContainer);
    };
    MarkerArea.prototype.positionMarkerImage = function () {
        this.markerImageHolder.style.top = this.top + 'px';
        this.markerImageHolder.style.left = this.left + 'px';
    };
    MarkerArea.prototype.attachEvents = function () {
        var _this = this;
        this.markerImage.addEventListener('pointerdown', this.onPointerDown);
        this.markerImage.addEventListener('dblclick', this.onDblClick);
        window.addEventListener('pointermove', this.onPointerMove);
        window.addEventListener('pointerup', this.onPointerUp);
        window.addEventListener('pointercancel', function () {
            if (_this.touchPoints > 0) {
                _this.touchPoints--;
            }
        });
        window.addEventListener('pointerout', function () {
            if (_this.touchPoints > 0) {
                _this.touchPoints--;
            }
        });
        window.addEventListener('pointerleave', this.onPointerUp);
        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('keyup', this.onKeyUp);
    };
    /**
     * NOTE:
     *
     * before removing or modifying this method please consider supporting marker.js
     * by visiting https://markerjs.com/#price for details
     *
     * thank you!
     */
    MarkerArea.prototype.addLogo = function () {
    };
    MarkerArea.prototype.positionLogo = function () {
        if (this.logoUI) {
            this.logoUI.style.left = this.markerImageHolder.offsetLeft + 10 + "px";
            this.logoUI.style.top = this.markerImageHolder.offsetTop +
                this.markerImageHolder.offsetHeight -
                this.logoUI.clientHeight -
                10 + "px";
        }
    };
    MarkerArea.prototype.overrideOverflow = function () {
        // backup current state of scrolling and overflow
        this.scrollXState = window.scrollX;
        this.scrollYState = window.scrollY;
        this.bodyOverflowState = document.body.style.overflow;
        window.scroll({ top: 0, left: 0 });
        document.body.style.overflow = 'hidden';
    };
    MarkerArea.prototype.restoreOverflow = function () {
        document.body.style.overflow = this.bodyOverflowState;
        window.scroll({ top: this.scrollYState, left: this.scrollXState });
    };
    MarkerArea.prototype.showUI = function () {
        if (this.settings.displayMode === 'popup') {
            this.overrideOverflow();
        }
        if (!this.coverDiv) {
            this.coverDiv = document.createElement('div');
            this.coverDiv.className = Style.CLASS_PREFIX;
            // hardcode font size so nothing inside is affected by higher up settings
            this.coverDiv.style.fontSize = '13px';
            this.coverDiv.style.userSelect = 'none';
            switch (this.settings.displayMode) {
                case 'inline': {
                    this.coverDiv.style.position = 'absolute';
                    var coverTop = this.target.offsetTop > Style.settings.toolbarHeight
                        ? this.target.offsetTop - Style.settings.toolbarHeight
                        : 0;
                    this.coverDiv.style.top = coverTop + "px";
                    this.coverDiv.style.left = this.getX() + "px";
                    this.coverDiv.style.width = this.target.offsetWidth.toString() + "px";
                    //this.coverDiv.style.height = `${this.target.offsetHeight.toString()}px`;
                    this.coverDiv.style.zIndex = '5';
                    // flex causes the ui to stretch when toolbox has wider nowrap panels
                    //this.coverDiv.style.display = 'flex';
                    break;
                }
                case 'popup': {
                    this.coverDiv.style.position = 'absolute';
                    this.coverDiv.style.top = '0px';
                    this.coverDiv.style.left = '0px';
                    this.coverDiv.style.width = '100vw';
                    this.coverDiv.style.height = window.innerHeight + "px";
                    this.coverDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
                    this.coverDiv.style.zIndex = '1000';
                    this.coverDiv.style.display = 'flex';
                    // this.coverDiv.style.overflow = 'auto';
                }
            }
            this.targetRoot.appendChild(this.coverDiv);
            this.uiDiv = document.createElement('div');
            this.uiDiv.style.display = 'flex';
            this.uiDiv.style.flexDirection = 'column';
            this.uiDiv.style.flexGrow = '2';
            this.uiDiv.style.margin =
                this.settings.displayMode === 'popup'
                    ? this.settings.popupMargin + "px"
                    : '0px';
            this.uiDiv.style.border = '0px';
            // this.uiDiv.style.overflow = 'hidden';
            //this.uiDiv.style.backgroundColor = '#ffffff';
            this.coverDiv.appendChild(this.uiDiv);
            this.toolbar = new Toolbar(this.uiDiv, this.settings.displayMode, this._availableMarkerTypes, this.uiStyleSettings);
            this.toolbar.addButtonClickListener(this.toolbarButtonClicked);
            this.toolbar.show(this.uiStyleSettings.hideToolbar ? 'hidden' : 'visible');
            this.contentDiv = document.createElement('div');
            this.contentDiv.style.display = 'flex';
            this.contentDiv.style.flexDirection = 'row';
            this.contentDiv.style.flexGrow = '2';
            this.contentDiv.style.flexShrink = '1';
            this.contentDiv.style.backgroundColor = this.uiStyleSettings.canvasBackgroundColor;
            if (this.settings.displayMode === 'popup') {
                this.contentDiv.style.maxHeight = this.windowHeight -
                    this.settings.popupMargin * 2 -
                    this.uiStyleSettings.toolbarHeight * 3.5 + "px";
                // this.contentDiv.style.maxHeight = `calc(100vh - ${
                //   this.settings.popupMargin * 2 + this.uiStyleSettings.toolbarHeight * 3.5}px)`;
                this.contentDiv.style.maxWidth = "calc(100vw - " + this.settings.popupMargin * 2 + "px)";
            }
            this.uiDiv.appendChild(this.contentDiv);
            this.editorCanvas = document.createElement('div');
            this.editorCanvas.style.flexGrow = '2';
            this.editorCanvas.style.flexShrink = '1';
            this.editorCanvas.style.position = 'relative';
            this.editorCanvas.style.overflow = 'hidden';
            this.editorCanvas.style.display = 'flex';
            if (this.settings.displayMode === 'popup') {
                this.editorCanvas.style.alignItems = 'center';
                this.editorCanvas.style.justifyContent = 'center';
            }
            this.editorCanvas.style.pointerEvents = 'none';
            this.contentDiv.appendChild(this.editorCanvas);
            this.editingTarget = document.createElement('img');
            this.editorCanvas.appendChild(this.editingTarget);
            this.toolbox = new Toolbox(this.uiDiv, this.settings.displayMode, this.uiStyleSettings);
            this.toolbox.show(this.uiStyleSettings.hideToolbox ? 'hidden' : 'visible');
        }
    };
    MarkerArea.prototype.closeUI = function () {
        if (this.settings.displayMode === 'popup') {
            this.restoreOverflow();
        }
        // @todo better cleanup
        this.toolbar.uiContainer.style.visibility = "hidden";
    };
    MarkerArea.prototype.removeMarker = function (marker) {
        this.markerImage.removeChild(marker.container);
        if (this.markers.indexOf(marker) > -1) {
            this.markers.splice(this.markers.indexOf(marker), 1);
        }
        marker.dispose();
    };
    MarkerArea.prototype.switchToSelectMode = function () {
        this.mode = 'select';
        this.hideNotesEditor();
        if (this.currentMarker !== undefined) {
            if (this.currentMarker.state !== 'new') {
                this.currentMarker.select();
            }
            else {
                this.removeMarker(this.currentMarker);
                this.setCurrentMarker();
                this.markerImage.style.cursor = 'default';
            }
            this.addUndoStep();
        }
    };
    MarkerArea.prototype.toolbarButtonClicked = function (buttonType, value) {
        if (buttonType === 'marker' && value !== undefined) {
            this.createNewMarker(value);
        }
        else if (buttonType === 'action') {
            switch (value) {
                case 'select': {
                    this.switchToSelectMode();
                    break;
                }
                case 'delete': {
                    this.deleteSelectedMarker();
                    break;
                }
                case 'undo': {
                    this.switchToSelectMode();
                    this.addUndoStep();
                    this.undo();
                    break;
                }
                case 'redo': {
                    this.switchToSelectMode();
                    this.redo();
                    break;
                }
                case 'notes': {
                    if (this.notesArea === undefined) {
                        this.switchToSelectMode();
                        this.showNotesEditor();
                    }
                    else {
                        this.switchToSelectMode();
                    }
                    break;
                }
                case 'close': {
                    this.close();
                    break;
                }
                case 'render': {
                    this.switchToSelectMode();
                    this.startRenderAndClose();
                    break;
                }
            }
        }
    };
    /**
     * Removes currently selected marker.
     */
    MarkerArea.prototype.deleteSelectedMarker = function () {
        if (this.currentMarker !== undefined) {
            this.currentMarker.dispose();
            this.markerImage.removeChild(this.currentMarker.container);
            this.markers.splice(this.markers.indexOf(this.currentMarker), 1);
            this.setCurrentMarker();
            this.addUndoStep();
        }
    };
    Object.defineProperty(MarkerArea.prototype, "isNotesAreaOpen", {
        get: function () {
            return this.notesArea !== undefined;
        },
        enumerable: false,
        configurable: true
    });
    MarkerArea.prototype.showNotesEditor = function () {
        var _a;
        if (this.currentMarker !== undefined) {
            this.overlayContainer.innerHTML = '';
            this.notesArea = document.createElement('textarea');
            this.notesArea.className = this.uiStyleSettings.notesAreaStyleClassName;
            this.notesArea.style.pointerEvents = 'auto';
            this.notesArea.style.alignSelf = 'stretch';
            this.notesArea.style.width = '100%';
            this.notesArea.style.margin = this.uiStyleSettings.toolbarHeight / 4 + "px";
            this.notesArea.value = (_a = this.currentMarker.notes) !== null && _a !== void 0 ? _a : '';
            this.overlayContainer.appendChild(this.notesArea);
        }
    };
    MarkerArea.prototype.hideNotesEditor = function () {
        if (this.isNotesAreaOpen) {
            if (this.currentMarker !== undefined) {
                this.currentMarker.notes =
                    this.notesArea.value.trim() !== '' ? this.notesArea.value : undefined;
            }
            this.overlayContainer.removeChild(this.notesArea);
            this.notesArea = undefined;
        }
    };
    MarkerArea.prototype.selectLastMarker = function () {
        if (this.markers.length > 0) {
            this.setCurrentMarker(this.markers[this.markers.length - 1]);
        }
    };
    MarkerArea.prototype.addUndoStep = function () {
        if (this.currentMarker === undefined ||
            this.currentMarker.state !== 'edit') {
            this.undoRedoManager.addUndoStep(this.getState());
        }
    };
    /**
     * Undo last action.
     *
     * @since 2.6.0
     */
    MarkerArea.prototype.undo = function () {
        var stepData = this.undoRedoManager.undo();
        if (stepData !== undefined) {
            this.restoreState(stepData);
            this.selectLastMarker();
        }
    };
    /**
     * Redo previously undone action.
     *
     * @since 2.6.0
     */
    MarkerArea.prototype.redo = function () {
        var stepData = this.undoRedoManager.redo();
        if (stepData !== undefined) {
            this.restoreState(stepData);
            this.selectLastMarker();
        }
    };
    /**
     * Initiates markup rendering.
     *
     * Get results by adding a render event listener via {@linkcode addRenderEventListener}.
     */
    MarkerArea.prototype.startRenderAndClose = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.render()];
                    case 1:
                        result = _a.sent();
                        state = this.getState();
                        this.renderEventListeners.forEach(function (listener) { return listener(result, state); });
                        this.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the complete state for the MarkerArea that can be preserved and used
     * to continue annotation next time.
     *
     * @param deselectCurrentMarker - when `true` is passed, currently selected marker will be deselected before getting the state.
     */
    MarkerArea.prototype.getState = function (deselectCurrentMarker) {
        if (deselectCurrentMarker === true) {
            this.setCurrentMarker();
        }
        var result = {
            width: this.imageWidth,
            height: this.imageHeight,
            markers: [],
        };
        this.markers.forEach(function (marker) { return result.markers.push(marker.getState()); });
        return result;
    };
    /**
     * Restores MarkerArea state to continue previous annotation session.
     *
     * **IMPORTANT**: call `restoreState()` __after__ you've opened the MarkerArea with {@linkcode show}.
     *
     * ```typescript
     * this.markerArea1.show();
     * if (this.currentState) {
     *   this.markerArea1.restoreState(this.currentState);
     * }
     * ```
     *
     * @param state - previously saved state object.
     */
    MarkerArea.prototype.restoreState = function (state) {
        var _this = this;
        this.markers.splice(0);
        while (this.markerImage.lastChild) {
            this.markerImage.removeChild(this.markerImage.lastChild);
        }
        state.markers.forEach(function (markerState) {
            var markerType = _this._availableMarkerTypes.find(function (mType) { return mType.typeName === markerState.typeName; });
            if (markerType !== undefined) {
                var marker = _this.addNewMarker(markerType);
                marker.restoreState(markerState);
                _this.markers.push(marker);
            }
        });
        if (state.width &&
            state.height &&
            (state.width !== this.imageWidth || state.height !== this.imageHeight)) {
            this.scaleMarkers(this.imageWidth / state.width, this.imageHeight / state.height);
        }
    };
    MarkerArea.prototype.addNewMarker = function (markerType) {
        var g = SvgHelper.createGroup();
        this.markerImage.appendChild(g);
        return new markerType(g, this.overlayContainer, this.settings);
    };
    /**
     * Initiate new marker creation.
     *
     * marker.js switches to marker creation mode for the marker type specified
     * and users can draw a new marker like they would by pressing a corresponding
     * toolbar button.
     *
     * This example initiates creation of a `FrameMarker`:
     * ```typescript
     * this.markerArea1.createNewMarker(FrameMarker);
     * ```
     *
     * @param markerType
     */
    MarkerArea.prototype.createNewMarker = function (markerType) {
        this.setCurrentMarker();
        this.currentMarker = this.addNewMarker(markerType);
        this.currentMarker.onMarkerCreated = this.markerCreated;
        this.currentMarker.onColorChanged = this.colorChanged;
        this.currentMarker.onFillColorChanged = this.fillColorChanged;
        this.markerImage.style.cursor = 'crosshair';
        this.markerImage.style.pointerEvents = "auto";
        this.toolbox.setPanelButtons(this.currentMarker.toolboxPanels);
    };
    MarkerArea.prototype.markerCreated = function (marker) {
        this.mode = 'select';
        this.markerImage.style.cursor = 'default';
        this.markerImage.style.pointerEvents = "none";
        this.markers.push(marker);
        this.setCurrentMarker(marker);
        if (marker instanceof FreehandMarker &&
            this.settings.newFreehandMarkerOnPointerUp) {
            this.createNewMarker(FreehandMarker);
        }
        else {
            this.toolbar.setSelectMode();
        }
        this.addUndoStep();
        this.close();
    };
    MarkerArea.prototype.colorChanged = function (color) {
        if (this.settings.defaultColorsFollowCurrentColors) {
            this.settings.defaultColor = color;
            this.settings.defaultStrokeColor = color;
        }
    };
    MarkerArea.prototype.fillColorChanged = function (color) {
        if (this.settings.defaultColorsFollowCurrentColors) {
            this.settings.defaultFillColor = color;
        }
    };
    /**
     * Sets the currently selected marker or deselects it if no parameter passed.
     *
     * @param marker marker to select. Deselects current marker if undefined.
     */
    MarkerArea.prototype.setCurrentMarker = function (marker) {
        if (this.currentMarker !== undefined) {
            this.currentMarker.deselect();
            this.toolbar.setCurrentMarker();
            this.toolbox.setPanelButtons([]);
        }
        this.currentMarker = marker;
        if (this.currentMarker !== undefined) {
            this.currentMarker.select();
            this.toolbar.setCurrentMarker(this.currentMarker);
            this.toolbox.setPanelButtons(this.currentMarker.toolboxPanels);
        }
    };
    MarkerArea.prototype.onPointerDown = function (ev) {
        this.touchPoints++;
        if (this.touchPoints === 1 || ev.pointerType !== 'touch') {
            if (this.currentMarker !== undefined &&
                (this.currentMarker.state === 'new' ||
                    this.currentMarker.state === 'creating')) {
                this.isDragging = true;
                this.currentMarker.pointerDown(this.clientToLocalCoordinates(ev.clientX, ev.clientY));
            }
            else if (this.mode === 'select') {
                var hitMarker = this.markers.find(function (m) { return m.ownsTarget(ev.target); });
                if (hitMarker !== undefined) {
                    this.setCurrentMarker(hitMarker);
                    this.isDragging = true;
                    this.currentMarker.pointerDown(this.clientToLocalCoordinates(ev.clientX, ev.clientY), ev.target);
                }
                else {
                    this.setCurrentMarker();
                }
            }
        }
    };
    MarkerArea.prototype.onDblClick = function (ev) {
        if (this.mode === 'select') {
            var hitMarker = this.markers.find(function (m) { return m.ownsTarget(ev.target); });
            if (hitMarker !== undefined && hitMarker !== this.currentMarker) {
                this.setCurrentMarker(hitMarker);
            }
            if (this.currentMarker !== undefined) {
                this.currentMarker.dblClick(this.clientToLocalCoordinates(ev.clientX, ev.clientY), ev.target);
            }
            else {
                this.setCurrentMarker();
            }
        }
    };
    MarkerArea.prototype.onPointerMove = function (ev) {
        if (this.touchPoints === 1 || ev.pointerType !== 'touch') {
            if (this.currentMarker !== undefined || this.isDragging) {
                // don't swallow the event when editing text markers
                if (this.currentMarker === undefined ||
                    this.currentMarker.state !== 'edit') {
                    ev.preventDefault();
                }
                this.currentMarker.manipulate(this.clientToLocalCoordinates(ev.clientX, ev.clientY));
            }
        }
    };
    MarkerArea.prototype.onPointerUp = function (ev) {
        if (this.touchPoints > 0) {
            this.touchPoints--;
        }
        if (this.touchPoints === 0) {
            if (this.isDragging && this.currentMarker !== undefined) {
                this.currentMarker.pointerUp(this.clientToLocalCoordinates(ev.clientX, ev.clientY));
            }
        }
        this.isDragging = false;
        this.addUndoStep();

        this.markerImage.style.pointerEvents = "none";
    };
    MarkerArea.prototype.onKeyUp = function (ev) {
        if (this.currentMarker !== undefined &&
            this.notesArea === undefined &&
            (ev.key === 'Delete' || ev.key === 'Backspace')) {
            this.removeMarker(this.currentMarker);
            this.setCurrentMarker();
            this.markerImage.style.cursor = 'default';
            this.addUndoStep();
        }
    };
    MarkerArea.prototype.clientToLocalCoordinates = function (x, y) {
        var clientRect = this.markerImage.getBoundingClientRect();
        return { x: x - clientRect.left, y: y - clientRect.top };
    };
    MarkerArea.prototype.onWindowResize = function () {
        this.positionUI();
    };
    MarkerArea.prototype.getX = function () {
        return this.target.parentElement.parentElement.offsetLeft + 4;
    };
    MarkerArea.prototype.getY = function () {
        var coverTop = this.target.offsetTop > Style.settings.toolbarHeight
        ? this.target.offsetTop - Style.settings.toolbarHeight
        : 0;
        return coverTop;
    };
    MarkerArea.prototype.getDiffHeight = function () {
        let diff = 0;
        if (this.target.offsetTop < Style.settings.toolbarHeight) {
            diff = Style.settings.toolbarHeight - this.target.offsetTop;
        }
        return diff;
    };
    MarkerArea.prototype.positionUI = function () {
        this.setTopLeft();
        switch (this.settings.displayMode) {
            case 'inline': {
                this.coverDiv.style.top = this.getY() + "px";
                this.coverDiv.style.left = this.getX() + "px";
                break;
            }
            case 'popup': {
                this.coverDiv.style.top = '0px';
                this.coverDiv.style.left = '0px';
                this.coverDiv.style.width = '100vw';
                this.coverDiv.style.height = this.windowHeight + "px";
                this.contentDiv.style.maxHeight = this.windowHeight -
                    this.settings.popupMargin * 2 -
                    this.uiStyleSettings.toolbarHeight * 3.5 + "px";
            }
        }
        this.positionMarkerImage();
        this.positionLogo();
    };
    return MarkerArea;
}());

exports.Activator = Activator;
exports.ArrowMarker = ArrowMarker;
exports.ArrowTypePanel = ArrowTypePanel;
exports.CalloutMarker = CalloutMarker;
exports.ColorPickerPanel = ColorPickerPanel;
exports.CoverMarker = CoverMarker;
exports.CurveMarker = CurveMarker;
exports.EllipseFrameMarker = EllipseFrameMarker;
exports.EllipseMarker = EllipseMarker;
exports.FontFamilyPanel = FontFamilyPanel;
exports.FrameMarker = FrameMarker;
exports.FreehandMarker = FreehandMarker;
exports.HighlightMarker = HighlightMarker;
exports.LineMarker = LineMarker;
exports.LineStylePanel = LineStylePanel;
exports.LineWidthPanel = LineWidthPanel;
exports.LinearMarkerBase = LinearMarkerBase;
exports.MarkerArea = MarkerArea;
exports.MarkerBase = MarkerBase;
exports.MeasurementMarker = MeasurementMarker;
exports.OpacityPanel = OpacityPanel;
exports.RectangleMarker = RectangleMarker;
exports.RectangularBoxMarkerBase = RectangularBoxMarkerBase;
exports.RectangularBoxMarkerGrips = RectangularBoxMarkerGrips;
exports.ResizeGrip = ResizeGrip;
exports.Settings = Settings;
exports.Style = Style;
exports.StyleClass = StyleClass;
exports.SvgHelper = SvgHelper;
exports.TextMarker = TextMarker;
exports.ToolboxPanel = ToolboxPanel;
exports.TransformMatrix = TransformMatrix;
