<template>
  <div class="projects">
    <ProjectMenu
      :position="state.projectMenu.position"
      :project="state.projectMenu.project"
      v-if="state.projectMenu.show"
    />

    <v-list dense>
      <v-list-item exact to="/project/">
        <v-list-item-icon>
          <v-icon left v-text="'mdi-plus'" />
        </v-list-item-icon>
        <v-list-item-title v-text="'New project'" />
      </v-list-item>
    </v-list>

    <v-container
      :key="state.projectId"
      class="py-0"
      v-if="projectStore.view.state.project"
    >
      <v-text-field
        @change="() => projectStore.view.state.project.clean()"
        clearable
        dense
        hide-details
        placeholder="Project name"
        title="Rename the current project"
        v-model="projectStore.view.state.project.name"
      >
        <template #append-outer>
          <v-row>
            <v-btn
              @click="saveProject"
              class="mx-2"
              depressed
              fab
              small
              title="Save the current project"
            >
              <v-icon v-text="'mdi-content-save-outline'" />
            </v-btn>
          </v-row>
        </template>
      </v-text-field>
    </v-container>

    <v-container class="py-0">
      <v-text-field
        clearable
        hide-details
        placeholder="Search project"
        prepend-inner-icon="mdi-magnify"
        v-model="projectStore.state.searchTerm"
      />
    </v-container>

    <v-list :key="projectStore.state.projects.length" dense two-line>
      <draggable v-model="projectStore.state.projects">
        <transition-group>
          <v-list-item
            :key="project.id"
            :to="'/project/' + project.id"
            @click="state.projectId = project.id"
            @contextmenu="e => showProjectMenu(e, project.id)"
            v-for="project in projectStore.filteredProjects"
          >
            <v-list-item-content>
              <v-list-item-title v-text="project.name" />
              <v-list-item-subtitle>
                {{ project.network.nodes.length }} nodes,
                {{ project.network.connections.length }} connections
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <span v-if="project.doc">
                <v-icon
                  class="px-1"
                  small
                  v-if="
                    project.id !== project.doc.id ||
                    project.state.hash !== project.doc.hash
                  "
                  v-text="'mdi-alert-circle-outline'"
                />
                <ActivityGraphIcon
                  :project="project"
                  append
                  v-if="project.state.hasActivities"
                />
              </span>
            </v-list-item-icon>
          </v-list-item>
        </transition-group>
      </draggable>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { reactive } from '@vue/composition-api';
import draggable from 'vuedraggable';

import ActivityGraphIcon from '@/components/activity/ActivityGraphIcon.vue';
import core from '@/core';
import ProjectMenu from '@/components/project/ProjectMenu.vue';

export default Vue.extend({
  name: 'ProjectNavList',
  components: {
    ActivityGraphIcon,
    draggable,
    ProjectMenu,
  },
  setup(_, { root }) {
    const projectStore = core.app.project;
    const state = reactive({
      app: core.app,
      projectId: '',
      projectMenu: {
        position: { x: 0, y: 0 },
        project: undefined,
        show: false,
      },
    });

    /**
     * Show project menu.
     */
    const showProjectMenu = function (e: MouseEvent, projectId: string) {
      // https://thewebdev.info/2020/08/13/vuetify%E2%80%8A-%E2%80%8Amenus-and-context-menu/
      e.preventDefault();
      state.projectMenu.show = false;
      state.projectMenu.project = projectStore.getProject(projectId);
      state.projectMenu.position.x = e.clientX;
      state.projectMenu.position.y = e.clientY;
      this.$nextTick(() => {
        state.projectMenu.show = true;
      });
    };

    const saveProject = () => {
      const project = projectStore.view.state.project;
      project.save().then(() => {
        if (!root.$route.path.endsWith(project.id)) {
          root.$router.push({
            path: `/project/${project.id}`,
          });
        }
      });
    };

    return {
      projectStore,
      saveProject,
      showProjectMenu,
      state,
    };
  },
});
</script>
