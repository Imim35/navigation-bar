import component from "./navigationBarComponent";
import StoreBar from "./store";
import store from '@/store'
export default {
  install(Vue) {

    // Регистрация глобального компонента звонилки.
    Vue.component('navigation-bar', component)

    // Регистрация модуля store
    store.registerModule(['temporary', 'plugins','navigation_bar'], StoreBar)
  }
}
