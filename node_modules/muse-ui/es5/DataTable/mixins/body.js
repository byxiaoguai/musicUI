function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import Checkbox from '../../Checkbox';
import { ExpandTransition } from '../../internal/transitions';

export default {
  props: {
    expandRowIndex: {
      type: Number,
      default: -1
    },
    autoExpand: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      hoverIndex: -1,
      expandIndex: this.expandRowIndex,
      isSelectAll: false
    };
  },

  methods: {
    handleScroll: function handleScroll(e) {
      var scrollLeft = e.target.scrollLeft;
      var theader = this.$refs.header;
      var tfooter = this.$refs.tfooter;
      if (theader) theader.scrollLeft = scrollLeft;
      if (tfooter) tfooter.scrollLeft = scrollLeft;
    },
    isSelected: function isSelected(index) {
      return this.selects.indexOf(index) !== -1;
    },
    toggleSelect: function toggleSelect(index) {
      if (!this.selectable) return;
      var selects = [].concat(_toConsumableArray(this.selects));
      var selectIndex = selects.indexOf(index);
      if (selectIndex !== -1) {
        selects.splice(selectIndex, 1);
      } else {
        selects.push(index);
      }
      selects.sort(function (a, b) {
        return a - b;
      });
      this.$emit('update:selects', selects);
      this.$emit('select-change', index, selects);
    },
    toggleExpand: function toggleExpand(index) {
      this.expandIndex = this.expandIndex === index ? -1 : index;
    },
    createEmpty: function createEmpty(h) {
      return [this.$slots.empty ? this.$slots.empty : h('div', { staticClass: 'mu-table-empty' }, this.noDataText)];
    },
    createSlotContent: function createSlotContent(row, index) {
      return this.$scopedSlots.default({
        row: row,
        $index: index
      });
    },
    createCheckboxTd: function createCheckboxTd(h, index) {
      var _this = this;

      return h('td', {
        staticClass: 'mu-checkbox-col'
      }, [h(Checkbox, {
        props: {
          inputValue: this.isSelected(index),
          disabled: !this.selectable
        },
        on: {
          change: function change() {
            return _this.toggleSelect(index);
          },
          click: function click(e) {
            e.stopPropagation();
          }
        }
      })]);
    },
    createContent: function createContent(h) {
      var _this2 = this;

      var contents = [];

      var _loop = function _loop(index) {
        var row = _this2.data[index];
        var arr = _this2.$scopedSlots.default ? _this2.createSlotContent(row, index) : _this2.columns.map(function (column) {
          var text = column.formatter && typeof column.formatter === 'function' ? column.formatter(row[column.name], row) : row[column.name];
          return h('td', {
            class: [column.align || column.cellAlign ? 'is-' + (column.cellAlign || column.align) : '']
          }, text);
        }) || [];
        if (_this2.checkbox) arr.unshift(_this2.createCheckboxTd(h, index));

        var rowClassName = typeof _this2.rowClassName === 'function' ? _this2.rowClassName(index, row) : _this2.rowClassName;
        contents.push(h('tr', {
          staticClass: rowClassName,
          class: {
            'is-hover': _this2.hover && _this2.hoverIndex === index,
            'is-stripe': _this2.stripe && index % 2 !== 0,
            'is-selected': _this2.isSelected(index)
          },
          style: typeof _this2.rowStyle === 'function' ? _this2.rowStyle(index, row) : _this2.rowStyle,
          on: {
            mouseenter: function mouseenter(e) {
              _this2.hoverIndex = index;
              _this2.$emit('row-mouseenter', index, row, e);
            },
            mouseleave: function mouseleave(e) {
              _this2.hoverIndex = -1;
              _this2.$emit('row-mouseleave', index, row, e);
            },
            contextmenu: function contextmenu(e) {
              _this2.$emit('row-contextmenu', index, row, e);
            },
            click: function click(e) {
              if (!_this2.checkbox) _this2.toggleSelect(index);
              if (_this2.autoExpand) _this2.toggleExpand(index);
              _this2.$emit('row-click', index, row, e);
            },
            dblclick: function dblclick(e) {
              return _this2.$emit('row-dblclick', index, row, e);
            }
          },
          key: row[_this2.rowKey]
        }, arr));

        if (_this2.$scopedSlots.expand) {
          contents.push(h('tr', {
            staticClass: 'mu-table-expand-row'
          }, [h('td', {
            attrs: {
              colspan: _this2.columns.length + (_this2.checkbox ? 1 : 0)
            },
            class: {
              'is-expand': _this2.expandIndex === index
            }
          }, _this2.expandIndex === index ? [h(ExpandTransition, {}, _this2.$scopedSlots.expand({
            row: row,
            $index: index
          }))] : undefined)]));
        }
      };

      for (var index = 0; index < this.data.length; index++) {
        _loop(index);
      }
      return contents;
    },
    createBody: function createBody(h) {
      return this.data && this.data.length > 0 ? h('div', {
        staticClass: 'mu-table-body-wrapper',
        on: {
          scroll: this.handleScroll
        },
        ref: 'body'
      }, [h('table', {
        staticClass: 'mu-table-body',
        style: {
          width: this.tableWidth
        }
      }, [this.createColGroup(h), h('tbody', {}, this.createContent(h))])]) : this.createEmpty(h);
    }
  },
  watch: {
    selects: function selects(val) {
      this.isSelectAll = val && val.length >= this.data.length;
    },
    expandRowIndex: function expandRowIndex(val) {
      if (this.expandIndex === val) return;
      this.expandIndex = val;
    },
    expandIndex: function expandIndex(val) {
      this.$emit('update:expandRowIndex', val);
      this.$emit('change-expand', val);
    }
  }
};