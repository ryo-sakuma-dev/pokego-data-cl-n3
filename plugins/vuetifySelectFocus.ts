/**
 * Vuetify 3.12.11以降、VSelectをタップしてメニューを開いてもフォーカスがinputに残るようになり、
 * スマホでキーボードが開いてしまう。(vuetifyjs/vuetify@23d4649)
 * メニューが開いた後にフォーカスをリストへ移すことで、3.12.10以前の挙動に戻す。
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vuetify:before-create', ({ vuetifyOptions }) => {
    vuetifyOptions.defaults = {
      ...vuetifyOptions.defaults,
      VSelect: {
        ...vuetifyOptions.defaults?.VSelect,
        menuProps: {
          onAfterEnter: () => {
            const content = document.querySelector<HTMLElement>('.v-overlay--active .v-select__content')
            if (!content || content.contains(document.activeElement)) {
              return
            }
            content.querySelector<HTMLElement>('.v-list')?.focus()
          }
        }
      }
    }
  })
})
