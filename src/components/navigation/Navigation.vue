<template>
  <div class="navigation">
    <span v-if="dialogState.open">
      <ProjectsDialog v-if="dialogState.source === 'project'" />
      <ModelsDialog v-else-if="dialogState.source === 'model'" />
    </span>

    <span v-if="state.menu.show">
      <ProjectsMenu
        :position="state.menu.position"
        v-if="state.menu.content === 'project'"
      />
      <ModelsMenu
        :position="state.menu.position"
        v-else-if="state.menu.content === 'model'"
      />
      <SettingsMenu
        :position="state.menu.position"
        v-else-if="state.menu.content === 'settings'"
      />
    </span>

    <v-navigation-drawer
      :miniVariant="state.miniVariant"
      :style="{ transition: state.resizing ? 'initial' : '' }"
      :width="state.width"
      app
      left
      mini-variant-width="64"
      mobile-breakpoint="64"
      permanent
      v-click-outside="
        () => {
          if (!state.pinNav) {
            state.miniVariant = true;
            state.navList = '';
          }
        }
      "
    >
      <div
        @mousedown="resizeSidebar"
        class="resize-handle"
        v-if="!state.miniVariant"
      />
      <v-row class="fill-height" no-gutters>
        <v-col>
          <v-navigation-drawer
            :dark="state.darkNav"
            absolute
            mini-variant
            mini-variant-width="64"
            mobile-breakpoint="64"
            permanent
          >
            <div class="flex">
              <v-list nav>
                <v-list-item
                  :class="{ 'v-list-item--active': state.navList === route.id }"
                  :key="route.id"
                  :title="route.title"
                  @click="() => updatePageContent(route.id)"
                  @contextmenu="e => route.contextmenu(e)"
                  v-for="route in routes"
                >
                  <v-list-item-icon>
                    <v-list-item-group class="nav-item">
                      <v-icon :color="route.color" v-text="route.icon" />
                      {{ route.title }}
                    </v-list-item-group>
                  </v-list-item-icon>
                  <v-list-item-content />
                </v-list-item>
              </v-list>

              <v-spacer />

              <v-list nav>
                <template v-if="appConfig.devMode">
                  <v-tooltip right>
                    <template #activator="{ on, attrs }">
                      <v-list-item
                        @click="app.updateConfig({ devMode: false })"
                        dense
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-list-item-icon v-bind="attrs" v-on="on">
                          <v-list-item-group class="nav-item">
                            <v-icon dense v-text="'mdi-dev-to'" />
                          </v-list-item-group>
                        </v-list-item-icon>
                      </v-list-item>
                    </template>
                    <span v-text="'Dev mode is on.'" />
                  </v-tooltip>
                </template>

                <v-list-item
                  @click="app.darkMode = !app.darkMode"
                  dense
                  v-if="appConfig.devMode"
                >
                  <v-list-item-icon>
                    <v-list-item-group class="nav-item">
                      <v-icon dense v-text="'mdi-theme-light-dark'" />
                    </v-list-item-group>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="'Dark mode'" />
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                  @click="reset"
                  @contextmenu="e => showMenu(e, 'settings')"
                  title="Settings"
                  to="/settings"
                >
                  <v-list-item-icon>
                    <v-list-item-group class="nav-item">
                      <v-icon v-text="'mdi-cogs'" />
                      Settings
                    </v-list-item-group>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="'Settings'" />
                  </v-list-item-content>
                </v-list-item>

                <v-list-item
                  href="https://nest-desktop.readthedocs.io"
                  target="_blank"
                  title="Help"
                >
                  <v-list-item-icon>
                    <v-list-item-group class="nav-item">
                      <v-icon v-text="'mdi-help-circle-outline'" />
                      Help
                    </v-list-item-group>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-h1" v-text="'Help'" />
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="reset" title="About" to="/about">
                  <v-list-item-icon>
                    <v-list-item-group class="nav-item">
                      <v-icon v-text="'mdi-information-variant'" />
                      About
                    </v-list-item-group>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="'About'" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-navigation-drawer>

          <div style="padding-left: 64px; width: 100%">
            <ProjectNavList v-if="state.navList === 'project'" />
            <ModelNavList v-if="state.navList === 'model'" />
          </div>
        </v-col>
      </v-row>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { reactive } from '@vue/composition-api';
import VueRouter, { Route } from 'vue-router';

import core from '@/core';

import ModelNavList from '@/components/navigation/ModelNavList.vue';
import ModelsDialog from '@/components/model/ModelsDialog.vue';
import ModelsMenu from '@/components/model/ModelsMenu.vue';
import ProjectNavList from '@/components/navigation/ProjectNavList.vue';
import ProjectsDialog from '@/components/project/ProjectsDialog.vue';
import ProjectsMenu from '@/components/project/ProjectsMenu.vue';
import SettingsMenu from '@/components/setting/SettingsMenu.vue';

export default {
  name: 'Navigation',
  components: {
    ModelNavList,
    ModelsDialog,
    ModelsMenu,
    ProjectNavList,
    ProjectsDialog,
    ProjectsMenu,
    SettingsMenu,
  },
  setup() {
    const state = reactive({
      dialog: false,
      miniVariant: true,
      navList: '',
      pinNav: core.app.config.pinNav,
      menu: {
        content: '',
        position: { x: 0, y: 0 },
        show: false,
      },
      resizing: false,
      width: 320,
    });
    let recentProjectId = '';
    let recentModelId = 'ac_generator';

    /**
     * Toggle navigation drawer.
     */
    const toggle = (navList: string) => {
      state.miniVariant = state.navList === navList;
      state.navList = state.navList === navList ? '' : navList;
    };

    /**
     * Reset navigation drawer.
     */
    const reset = () => {
      state.navList = '';
      state.miniVariant = true;
    };

    /**
     * Redirects the page content to the most recent chosen project/model. If
     * no one was chosen before, the first one is selected.
     * Please beware: The route IDs used in this class are the ones in the
     * array, which might not contain every route from the Vue router!
     * @param targetRouteId ID of the route to navigate to
     * @param router Vue router (this.$router)
     */
    function redirect(targetRouteId: string, router: VueRouter) {
      if (targetRouteId === 'project') {
        // check if project ID is undefined or project does not exist anymore
        if (
          recentProjectId == undefined ||
          recentProjectId.length <= 0
          // core.app.project.filteredProjects.filter(
          //   (project: Project) => project.id === recentProjectId
          // ).length <= 0
        ) {
          recentProjectId = core.app.project.recentProjectId;
        }
        router.push({
          name: 'ProjectId',
          params: { id: recentProjectId },
        });
      } else {
        if (recentModelId == undefined || recentModelId.length <= 0) {
          recentModelId = 'ac_generator';
        }
        router.push({ name: 'ModelId', params: { id: recentModelId } });
      }
    }

    /**
     * Stores the most recently used model or project, respectively.
     * Please beware: The route IDs used in this class are the ones in the
     * array, which might not contain every route from the Vue router!
     * @param currentTargetId ID of the route to navigate to
     * @param sourceRroute Vue route of the page to leave (this.$route)
     */
    function saveRecentId(targetRouteId: string, sourceRoute: Route) {
      switch (targetRouteId) {
        case 'model':
          recentProjectId = sourceRoute.params.id;
          break;
        case 'project':
          recentModelId = sourceRoute.params.id;
          break;
        default:
          break;
      }
    }

    /**
     * Show menu.
     */
    const showMenu = (e: MouseEvent, content: string = 'project') => {
      // https://thewebdev.info/2020/08/13/vuetify%E2%80%8A-%E2%80%8Amenus-and-context-menu/
      e.preventDefault();
      state.menu.show = false;
      state.menu.position.x = e.clientX;
      state.menu.position.y = e.clientY;
      state.menu.content = content;
      setTimeout(() => {
        state.menu.show = true;
      }, 1);
    };

    /**
     * Updates the page content according to the route ID to navigate to.
     * Please beware: The route IDs used in this class are the ones in the
     * array, which might not contain every route from the Vue router!
     * @param routeId ID of the route to navigate to
     */
    function updatePageContent(routeId: string) {
      toggle(routeId);

      // Check if the page is already loaded to avoid "Avoided redundant
      // navigation" error
      let pathstring: string = this.$route.path;
      if (pathstring.indexOf(routeId) < 0) {
        saveRecentId(routeId, this.$route);
        redirect(routeId, this.$router);
      }
    }

    /**
     * List of routes in navigation.
     */
    const routes: any[] = [
      {
        id: 'project',
        color: 'project',
        contextmenu: (e: MouseEvent) => showMenu(e, 'project'),
        icon: '$network',
        title: 'Project',
      },
      {
        id: 'model',
        color: 'model',
        contextmenu: (e: MouseEvent) => showMenu(e, 'model'),
        icon: '$nest',
        title: 'Model',
      },
    ];

    /**
     * Handle mouse move on resizing.
     *
     * @param e MouseEvent from which the x position is taken
     */
    const handleMouseMove = (e: MouseEvent) => {
      window.getSelection().removeAllRanges();
      const width = e.clientX + 2;
      if (width < 320) {
        return;
      }
      state.width = width;
      window.dispatchEvent(new Event('resize'));
    };

    /**
     * Handle mouse up on resizing.
     */
    const handleMouseUp = () => {
      state.resizing = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    /**
     * Resize sidebar.
     */
    const resizeSidebar = () => {
      state.resizing = true;
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    return {
      app: core.app,
      appConfig: core.app.config,
      dialogState: core.app.state.dialog,
      reset,
      resizeSidebar,
      routes,
      showMenu,
      state,
      toggle,
      updatePageContent,
    };
  },
};
</script>

<style>
.navigation .flex {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.navigation .nav-item {
  font-size: 9px;
  text-align: center;
  width: 100%;
}

.navigation .resize-handle {
  cursor: ew-resize;
  height: 100vh;
  position: fixed;
  right: 0;
  width: 4px;
  z-index: 10;
}
</style>
