import { useId, useCustomId } from '../utils/ids'

const Tabs = {
  name: 'Tabs',
  props: {
    id: null,
    defaultIndex: {
      type: Number,
      required: false,
    },
    orientation: {
      type: String,
      default: 'horizontal',
      validator: (value) => ['horizontal', 'vertical'].includes(value),
    },
    tabActivationMode: {
      type: String,
      default: 'auto',
      validator: (value) => ['auto', 'manual'].includes(value),
    },
  },
  data() {
    return {
      tabState: {
        activeTab: this.defaultIndex || 0,
        activePanelRef: null,
        focusedTab: null,
        _id: this.id ? useCustomId(this.id) : useId(),
      },
    }
  },
  computed: {
    tabCount() {
      return this.$slots.default ? this.$slots.default.length + 1 : 0
    },
    isOnLastTab() {
      return this.tabState.activeTab === this.tabCount
    },
    isOnFirstTab() {
      return this.tabState.activeTab === 0
    },
    isManual() {
      return this.tabActivationMode === 'manual'
    },
  },
  methods: {
    setActiveTab(updater, { force = false } = {}) {
      const activeTab = this.isManual
        ? this.tabState.focusedTab !== null
          ? this.tabState.focusedTab
          : 0
        : this.tabState.activeTab

      const newActiveTab =
        typeof updater === 'number'
          ? updater
          : updater({
              currentIndex: activeTab,
              tabCount: this.tabCount,
              isOnLastTab: this.isOnLastTab,
              isOnFirstTab: this.isOnFirstTab,
            })

      // If the updater return value is false, then we shouldn't run the update
      if (newActiveTab === false) return

      // DO IT 👊
      this.tabState.focusedTab = newActiveTab
      if (force || !this.isManual) {
        this.tabState.activeTab = newActiveTab
      }
    },
    setActivePanelRef(ref) {
      console.log(ref)
      this.tabState.activePanelRef = ref
    },
    focusActivePanel() {
      if (this.tabState.activePanelRef) {
        this.tabState.activePanelRef.focus()
      }
    },
    focusTab(tabIndex) {
      this.tabState.focusedTab = tabIndex
    },
  },
  provide() {
    return {
      tabState: this.tabState,
      setActiveTab: this.setActiveTab,
      setActivePanelRef: this.setActivePanelRef,
      focusActivePanel: this.focusActivePanel,
      tabOrientation: this.orientation,
    }
  },
  render(createElement) {
    return createElement('div', this.$slots.default)
  },
}

export default Tabs
