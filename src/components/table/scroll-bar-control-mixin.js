'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('@/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {

        return {
            scrollbarWidth: 0
        };
    },


    methods: {
        setScrollbarWidth: function setScrollbarWidth() {
            this.scrollbarWidth = _utils2.default.getScrollbarWidth();
        }
    }

};