'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('@/utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    methods: {
        body1Mousewheel: function body1Mousewheel(e) {
            var body = this.$el.querySelector('.v-table-rightview .v-table-body');
            var e1 = e.originalEvent || window.event || e;
            var scrollHeight = e1.wheelDelta || e1.detail * -1;
            body.scrollTop = body.scrollTop - scrollHeight;
        },
        bodyScroll: function bodyScroll(e) {
            var view = this.$el.querySelector('.v-table-rightview');
            var body = this.$el.querySelector('.v-table-rightview .v-table-body');
            view.querySelector('.v-table-header').scrollLeft = body.scrollLeft;
        },
        scrollControl: function scrollControl() {
            var _this = this;

            if (this.hasBindScrollEvent) {
                return false;
            }
            this.hasBindScrollEvent = true;

            setTimeout(function (x) {
                var body = _this.$el.querySelector('.v-table-rightview .v-table-body');
                _utils2.default.bind(body, 'scroll', _this.bodyScroll);
            });
        }
    },

    beforeDestroy: function beforeDestroy() {
        var body = this.$el.querySelector('.v-table-rightview .v-table-body');
        _utils2.default.unbind(body, 'scroll', this.bodyScroll);
    }
};