<!-- 树节点的子节点 -->
<template>
  <div class="tree-view-item">
    <div v-for="node in parent" :key="node.id">
      <div class="button heading " :class="{expand:node.isExpanded}" @click="toggle(node)">
        <Icon :type="getIconType()" />
        <span>{{node.name}}</span>
        <div v-if="!node.isEmpty" class="icon">
          <svg v-if="needLoading(node)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
              <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite" />
            </path>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 24 24">
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z "></path>
          </svg>
        </div>
      </div>
      <transition name="fade">
        <div class="heading-children" v-show="node.isExpanded" v-if="haveChildren(node)">
          <tree-view-item :parent="node.children" :icon="icon" :level="computeLevel()" :asyncLoadData="asyncLoadData" :nodeClick="nodeClick"></tree-view-item>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "tree-view-item",
  components: {},
  data() {
    return {};
  },
  props: {
    parent: Array,
    icon: Array,
    level: String,
    asyncLoadData: Function,
    nodeClick: Function
  },
  computed: {},
  methods: {
    haveChildren(node) {
      return node.children && node.children.length > 0;
    },
    needLoading(node) {
      return this.asyncLoadData && node.loading;
    },
    getIconType() {
      if (this.icon && this.icon.length > this.level) {
        return this.icon[this.level];
      } else {
        return "checkmark";
      }
    },
    computeLevel() {
      return parseInt(this.level) + 1 + "";
    },
    toggle(node) {
      this.nodeClick(node, this.parent, this.level);
      if (this.asyncLoadData) {
        if (node.isAsync) {
          if (Array.isArray(node.children) && node.children.length > 0) {
            this.$set(node, "isExpanded", !node.isExpanded);
          } else {
            this.$set(node, "isEmpty", true);
          }
        } else {
          const self = this;
          self.$set(node, "loading", true);
          self.asyncLoadData(node, function(children) {
            if (Array.isArray(children) && children.length > 0) {
              self.$set(node, "children", children);
              self.$set(node, "loading", false);
              self.$set(node, "isAsync", true);
              self.$set(node, "isExpanded", !node.isExpanded);
            } else {
              self.$set(node, "isEmpty", true);
            }
          });
        }
      } else {
        if (Array.isArray(node.children) && node.children.length > 0) {
          this.$set(node, "isExpanded", !node.isExpanded);
        } else {
          this.$set(node, "isEmpty", true);
        }
      }
    }
  },
  watch: {},
  created() {}
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #333;
}
.button {
  display: block;
  padding: 10px 15px;
  transition: background-color 0.2s ease-in-out 0s, color 0.3s ease-in-out 0.1s;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  font-size: 16px;
}
.button {
  position: relative;
}
.button:hover {
  color: #1976d2;
  background-color: #eee;
  cursor: pointer;
}
.icon {
  position: absolute;
  right: 0;
  display: inline-block;
  height: 24px;
  width: 24px;
  fill: currentColor;
  transition: -webkit-transform 0.15s;
  transition: transform 0.15s;
  transition: transform 0.15s, -webkit-transform 0.15s;
  transition-timing-function: ease-in-out;
}
.heading-children {
  padding-left: 14px;
  overflow: hidden;
}
.expand {
  display: block;
}
.collapsed {
  display: none;
}
.expand .icon {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.selected {
  color: #1976d2;
}
.fade-enter-active {
  transition: all 0.5s ease 0s;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-to {
  height: 0;
}
</style>