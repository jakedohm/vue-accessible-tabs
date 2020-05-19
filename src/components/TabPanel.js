const TabPanel = {
  name: 'TabPanel',
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isActive() {
      return this.tabState.activeTab === this.index
    },
  },
  watch: {
    isActive(isActive) {
      if (isActive) {
        this.setActivePanelRef(this.$el)
      }
    },
  },
  render(createElement) {
    return createElement(
      'div',
      {
        attrs: {
          role: 'tabpanel',
          'aria-labeledby': `tabs--${this.tabState._id}--tab--${this.index}`,
          id: `tabs--${this.tabState._id}--panel--${this.index}`,
          tabindex: '-1',
          hidden: !this.isActive,
        },
      },
      this.$slots.default
    )
  },
  inject: ['tabState', 'setActivePanelRef'],
}

export default TabPanel
