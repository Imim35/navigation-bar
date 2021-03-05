<template>
  <div class="navigation-bar" :class="{ active: navigation.card }">

    <!-- Кнопка меню -->
    <div class="navigation-bar__menu" :class="{ active: navigation.menu, white: navigation.card }"  @click="toggleMenu"><slot class="navigation-bar__btn" name="menu"></slot></div>

    <!-- Список элементов меню -->
    <div class="navigation-bar__list">
      <transition-group name="list" tag="p">
        <span v-show="navigation.menu" v-for="icon in icons" :key="icon.id" class="material-icons list-item item" v-tooltip="icon.name"
          @click="handleClick(icon, $event)"
          :class="{ selected: icon.id === selectedIcon.id && navigation.card , white: icon.id !== selectedIcon.id && navigation.card }"
          ref="items">
          {{ icon.iconName }}
        </span>
      </transition-group>
    </div>

    <!-- Появляющаеся карточка -->
    <transition name="card-main">
      <navigation-bar-card-main :iconPosition="iconPosition" :selectedIcon="selectedIcon.name" :options="options" :card="card" />
    </transition>


  </div>

</template>

<script>
  import NavigationBarCardMain from '@/views/navigationBar/navigationBarCardMain'
  export default {
    name: "navigationBarComponent",
    props: {
      position: { type: String, default: 'left' },
      options : { type: Object, required: true }
    },
    components: { NavigationBarCardMain },
    data() {
      return {
        card         : null,
        iconPosition : null,
        selectedIcon : {},
        icons: [
          { id:1, name: 'Контакты', iconName: 'contacts', componentName: 'Contacts' },
          { id:2, name: 'Общаг', iconName: 'assignment', componentName: 'General' },
          { id:3, name: 'Общаг', iconName: 'assignment', componentName: 'General' },
          { id:4, name: 'Общаг', iconName: 'assignment', componentName: 'General' },
        ]
      }
    },
    computed:{
      navigation() { return this.$store.state.temporary.plugins.navigation_bar }
    },
    methods: {

      // Метод переключения отображения карточек
      handleClick(icon, event) {
        this.selectedIcon = { id: icon.id, name: icon.name }
        this.card         = null
        this.iconPosition = event.target.getBoundingClientRect().left
        let element       = event.toElement

        // lazy рендер карточки
        this.card = () => import(`@/views/navigationBar/navigationBar${icon.componentName}`)

        // this.$store.dispatch('temporary/plugins/navigation_bar/getPage', { page: icon,iconPosition: event.target.getBoundingClientRect().left })

        if(this.navigation.card) {
          if(element.classList.contains('selected')) {
            this.$store.commit('temporary/plugins/navigation_bar/CARD_TOGGLE')
          }
        } else {
          this.$store.commit('temporary/plugins/navigation_bar/CARD_TOGGLE')
        }
      },

      // Открытие / закрытие навигационного списка.
      toggleMenu() {
        this.$store.commit('temporary/plugins/navigation_bar/MENU_TOGGLE')
        if(this.navigation.card) {
          this.$store.commit('temporary/plugins/navigation_bar/CARD_TOGGLE')
        }
      }
    }
  }
</script>

<style lang="scss">
  .navigation-bar {
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 0;
    z-index: 1020;
    &.active {
      height: 100%;
    }
    &__content {
      position: relative !important;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
    &__mini-card {
      position: absolute;
      bottom: 55px;
    }
    &__list {
      position: absolute;
      height: 3rem;
      width: 100%;
      background-color: transparent;
      bottom: 0;
      left: 40px;
      z-index: 1200;
      .item {
        position: relative;
        margin-right: 1rem;
        font-size: 35px;
        cursor: pointer;
        &:hover {
          color: #007bff;
        }
        &.selected {
          color: #007bff;
        }
        &.white {
          color: #fff;
        }
      }
    }
    &__menu {
      position: fixed;
      width: 40px;
      height: 40px;
      left: 0;
      bottom: 1rem;
      z-index: 1200;
      transition: all 0.3s ease;
      span {
        font-size: 40px;
        cursor: pointer;
      }
      &.active {
        span {
          color: #007bff;
        }
      }
      &.white {
        span {
          color: #fff;
        }
      }
    }
    &__overlay {
      background-color: #000;
      opacity: 0.6;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all 0.1s ease;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateX(-10px);
  }
  .card-main-enter-active, .card-main-active {
    transition: all 0.1s ease;
  }
  .card-main-enter, .card-main-to {
    opacity: 0;
  }
</style>
