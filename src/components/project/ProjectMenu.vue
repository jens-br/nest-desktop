<template>
  <div class="projectMenu" v-if="state.project">
    <v-menu
      :close-on-content-click="false"
      :position-x="state.position.x"
      :position-y="state.position.y"
      :value="state.show"
      transition="slide-y-transition"
    >
      <v-card>
        <!-- <v-card-title class="py-1" height="40" v-text="state.project.name" /> -->

        <span v-if="state.content == null">
          <v-list dense>
            <v-list-item
              :key="index"
              @click="item.onClick"
              v-for="(item, index) in state.items"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-title v-text="item.title" />
              <v-list-item-action v-show="item.append">
                <v-icon small v-text="'mdi-menu-right'" />
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </span>

        <span v-if="state.content === 'projectDelete'">
          <v-card-title v-text="'Are you sure to delete this project?'" />

          <v-card-actions>
            <v-btn @click="state.content = null" outlined small text>
              <v-icon left v-text="'mdi-menu-left'" /> back
            </v-btn>
            <v-spacer />
            <v-btn @click="deleteProject" outlined small v-text="'Delete'" />
          </v-card-actions>
        </span>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { reactive, watch } from '@vue/composition-api';

import { Project } from '@/core/project/project';
import core from '@/core';

export default Vue.extend({
  name: 'ProjectMenu',
  props: {
    project: Project,
    position: Object,
  },
  setup(props, { root }) {
    const state = reactive({
      content: null,
      project: props.project as Project,
      position: props.position,
      show: true,
      items: [
        {
          id: 'projectReload',
          icon: 'mdi-reload',
          title: 'Reload project',
          onClick: () => {
            state.project.reload();
            state.show = false;
          },
        },
        {
          id: 'projectDuplicate',
          icon: 'mdi-content-duplicate',
          title: 'Duplicate project',
          onClick: () => {
            const project: Project = state.project.duplicate();
            if (!root.$route.path.endsWith(project.id)) {
              root.$router.push({
                path: `/project/${project.id}`,
              });
            }
            state.show = false;
          },
        },
        {
          id: 'projectExport',
          icon: 'mdi-export',
          title: 'Export project',
          onClick: () => openDialog('export'),
        },
        {
          id: 'projectDelete',
          icon: 'mdi-delete',
          title: 'Delete project',
          onClick: () => {
            state.content = 'projectDelete';
          },
          append: true,
        },
      ],
    });

    /**
     * Delete project.
     */
    const deleteProject = () => {
      state.project.delete();
      state.show = false;
    };

    const openDialog = (action: string = 'export') => {
      state.project.resetState();
      core.app.openDialog('project', action, [state.project]);
      state.show = false;
    };

    watch(
      () => props.project,
      () => {
        state.content = null;
        state.show = true;
        state.project = props.project as Project;
        state.position = props.position;
      }
    );

    return { deleteProject, state };
  },
});
</script>
