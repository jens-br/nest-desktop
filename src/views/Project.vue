<template>
  <div class="projectView" v-if="projectView.state.project">
    <v-app-bar
      app
      class="no-print"
      clipped-right
      color="project"
      dark
      dense
      flat
    >
      <v-tabs
        :show-arrows="false"
        @change="() => projectView.updateProjectMode()"
        align-with-title
        color="secondary"
        icons-and-text
        style="flex: 0 1 auto; width: 278px"
        v-model="projectView.state.modeIdx"
      >
        <v-tooltip :open-delay="1000" bottom>
          <template #activator="{ on, attrs }">
            <v-tab class="ma-0" v-bind="attrs" v-on="on">
              <div class="tab-text" v-text="'Editor'" />
              <v-icon v-text="'$network'" />
            </v-tab>
          </template>
          Construct network
        </v-tooltip>

        <v-menu offset-y open-on-hover>
          <template #activator="{ on, attrs }">
            <v-tab v-bind="attrs" v-on="on">
              <div class="tab-text" v-text="'Explorer'" />
              <ActivityGraphIcon
                :project="projectView.state.project"
                v-if="projectView.state.project.state.hasActivities"
              />
              <v-icon class="rotate-90" v-else v-text="'mdi-border-style'" />
            </v-tab>
          </template>

          <v-list dense>
            <v-list-item
              :disabled="!projectView.state.project.state.hasActivities"
              @click="projectView.selectActivityGraph('abstract')"
            >
              <v-list-item-icon>
                <ActivityGraphIcon
                  :project="projectView.state.project"
                  fixed
                  v-if="projectView.state.project.state.hasActivities"
                />
                <v-icon class="rotate-90" v-else v-text="'mdi-border-style'" />
              </v-list-item-icon>
              <v-list-item-title v-text="'abstract'" />
            </v-list-item>

            <v-list-item
              :disabled="!projectView.state.project.state.hasSpatialActivities"
              @click="projectView.selectActivityGraph('spatial')"
            >
              <v-list-item-icon>
                <v-icon v-text="'mdi-axis-arrow'" />
              </v-list-item-icon>
              <v-list-item-title v-text="'spatial'" />
            </v-list-item>
          </v-list>
        </v-menu>

        <v-tab>
          <div class="tab-text" v-text="'Lab book'" />
          <v-icon v-text="'mdi-book-open-outline'" />
        </v-tab>
      </v-tabs>

      <v-spacer />
      <v-toolbar-title class="mx-2" v-text="projectView.state.project.name" />
      <v-spacer />

      <div class="mx-4" style="width: 144px">
        <v-row no-gutters>
          <v-col col="3">
            <v-btn
              :disabled="projectView.countBefore() <= 0"
              @click="projectView.state.project.network.oldest()"
              dark
              icon
              small
            >
              <v-icon v-text="'mdi-page-first'" />
            </v-btn>
          </v-col>

          <v-col col="3">
            <v-btn
              :disabled="projectView.countBefore() <= 0"
              @click="projectView.state.project.network.older()"
              dark
              icon
              small
            >
              <v-badge
                :content="projectView.countBefore()"
                :value="projectView.countBefore()"
                color="project darken-1"
                offset-y="8"
              >
                <v-icon v-text="'mdi-undo-variant'" />
              </v-badge>
            </v-btn>
          </v-col>

          <v-col col="3">
            <v-btn
              :disabled="projectView.countAfter() <= 0"
              @click="projectView.state.project.network.newer()"
              dark
              icon
              small
            >
              <v-badge
                :content="projectView.countAfter()"
                :value="projectView.countAfter()"
                color="project darken-1"
                offset-y="8"
              >
                <v-icon v-text="'mdi-redo-variant'" />
              </v-badge>
            </v-btn>
          </v-col>

          <v-col col="3">
            <v-btn
              :disabled="projectView.countAfter() <= 0"
              @click="projectView.state.project.network.newest()"
              dark
              icon
              small
            >
              <v-icon v-text="'mdi-page-last'" />
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <div @click="projectView.state.modeIdx = 1">
        <SimulationButton :project="projectView.state.project" />
      </div>
    </v-app-bar>

    <v-navigation-drawer
      :mini-variant="!projectView.state.toolOpened"
      :style="{ transition: state.resizing ? 'initial' : '' }"
      :width="projectView.state.tool != null ? projectView.state.tool.width : 0"
      app
      class="no-print"
      clipped
      mobile-breakpoint="64"
      mini-variant-width="64"
      permanent
      right
    >
      <div
        @mousedown="resizeSidebar"
        class="resize-handle"
        v-if="projectView.state.toolOpened"
      />
      <v-row class="fill-height ml-0" no-gutters>
        <v-navigation-drawer
          absolute
          mini-variant
          mobile-breakpoint="64"
          mini-variant-width="64"
          right
        >
          <v-list nav>
            <v-list-item
              :class="{
                'v-list-item--active':
                  projectView.state.tool === tool &&
                  projectView.state.toolOpened,
              }"
              :key="tool.name"
              :title="tool.title"
              @click="projectView.selectTool(tool)"
              v-for="tool in projectView.tools"
              v-show="tool.devMode ? appConfig.devMode : true"
            >
              <v-list-item-icon>
                <v-list-item-group class="nav-item-right">
                  <span v-if="tool.name !== 'activityEdit'">
                    <v-icon v-text="tool.icon" />
                  </span>
                  <span v-else>
                    <ActivityGraphIcon
                      :project="projectView.state.project"
                      v-if="projectView.state.project.state.hasActivities"
                    />
                    <v-icon
                      class="rotate-90"
                      v-else
                      v-text="'mdi-border-style'"
                    />
                  </span>
                  <div v-text="tool.title" />
                </v-list-item-group>
              </v-list-item-icon>
              <v-list-item-content />
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <div
          style="width: 100%; padding-right: 64px"
          v-if="projectView.state.toolOpened"
        >
          <NetworkParamEdit
            :network="projectView.state.project.network"
            :projectId="projectView.state.projectId"
            v-if="projectView.state.tool.name === 'networkParamEdit'"
          />

          <SimulationKernel
            :simulation="projectView.state.project.simulation"
            v-if="projectView.state.tool.name === 'simulationKernel'"
          />

          <SimulationCodeEditor
            :code="projectView.state.project.code"
            v-if="projectView.state.tool.name === 'codeEditor'"
          />

          <ActivityChartController
            :graph="projectView.state.project.activityGraph.activityChartGraph"
            v-if="
              projectView.state.tool.name === 'activityEdit' &&
              projectView.state.activityGraph === 'abstract'
            "
          />

          <ActivityAnimationController
            :graph="
              projectView.state.project.activityGraph.activityAnimationGraph
            "
            v-if="
              projectView.state.tool.name === 'activityEdit' &&
              projectView.state.activityGraph === 'spatial'
            "
          />

          <ActivityStats
            :project="projectView.state.project"
            v-if="projectView.state.tool.name === 'activityStats'"
          />

          <v-card flat tile v-if="projectView.state.tool.name === 'docJSON'">
            <CodeMirror :data="projectView.state.project.doc" />
          </v-card>
          <v-card flat tile v-if="projectView.state.tool.name === 'dataJSON'">
            <CodeMirror :data="projectView.state.project.toJSON()" />
          </v-card>
        </div>
      </v-row>
    </v-navigation-drawer>

    <v-main>
      <transition name="fade">
        <div
          :style="{ height: projectView.state.networkGraphHeight }"
          ref="networkGraph"
          v-if="[0, 2].includes(projectView.state.modeIdx)"
        >
          <NetworkEditor
            :networkHash="projectView.state.project.network.state.hash"
            :projectId="projectView.state.projectId"
          />
        </div>
      </transition>

      <transition name="fade">
        <ActivityGraph
          :activitiesHash="
            projectView.state.project.activities.map(a => a.hash)
          "
          :codeHash="projectView.state.project.code.hash"
          :graph="projectView.state.project.activityGraph"
          :graphCodeHash="projectView.state.project.activityGraph.codeHash"
          :view="projectView.state.activityGraph"
          v-if="projectView.state.modeIdx === 1"
        />
      </transition>

      <transition name="fade">
        <ProjectLabBook v-if="projectView.state.modeIdx === 2" />
      </transition>
    </v-main>

    <v-overlay
      :value="
        state.loading ||
        (projectView.state.project.simulation.running &&
          !projectView.config.simulateWithInsite)
      "
      :z-index="10"
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="amber"
        dark
        indeterminate
      />
    </v-overlay>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { reactive, watch, onMounted } from '@vue/composition-api';
import axios from 'axios';

import ActivityGraph from '@/components/activity/ActivityGraph.vue';
import ActivityGraphIcon from '@/components/activity/ActivityGraphIcon.vue';
import ActivityChartController from '@/components/activity/activityChart/ActivityChartController.vue';
import ActivityAnimationController from '@/components/activity/activityAnimation/ActivityAnimationController.vue';
import ActivityStats from '@/components/activity/activityStats/ActivityStats.vue';
import CodeMirror from '@/components/CodeMirror.vue';
import core from '@/core';
import NetworkEditor from '@/components/network/NetworkEditor.vue';
import NetworkParamEdit from '@/components/network/NetworkParamEdit.vue';
import ProjectLabBook from '@/components/project/ProjectLabBook.vue';
import SimulationButton from '@/components/simulation/SimulationButton.vue';
import SimulationCodeEditor from '@/components/simulation/SimulationCodeEditor.vue';
import SimulationKernel from '@/components/simulation/SimulationKernel.vue';

export default Vue.extend({
  name: 'Project',
  components: {
    ActivityAnimationController,
    ActivityChartController,
    ActivityGraph,
    ActivityGraphIcon,
    ActivityStats,
    CodeMirror,
    NetworkEditor,
    NetworkParamEdit,
    ProjectLabBook,
    SimulationButton,
    SimulationCodeEditor,
    SimulationKernel,
  },
  props: {
    id: String,
  },
  setup(props, { root }) {
    const projectView = core.app.project.view;
    const state = reactive({
      error: false,
      loading: false,
      resizing: false,
      simulationMenu: {
        position: { x: 0, y: 0 },
        show: false,
      },
    });

    /**
     * Load project using query or projectId
     */
    const loadProject = () => {
      if (root.$route.query.from) {
        // URL contains a from-query, like in http://localhost:8080/#/project/?from=https://raw.githubusercontent.com/babsey/nest-desktop/master/src/assets/projects/neuron-spike-response.json
        const url: string = root.$route.query.from as string;
        axios.get(url).then((response: any) => {
          if (Array.isArray(response.data)) {
            response.data.forEach((project: any) => {
              core.app.project.createNewProject(project);
            });
          } else {
            core.app.project.createNewProject(response.data);
          }
        });
      } else {
        state.loading = true;
        projectView.init().then(() => {
          const project = projectView.state.project;
          if (!root.$route.path.endsWith(project.id)) {
            root.$router.push({
              path: `/project/${project.id}`,
            });
          }
          state.loading = false;
        });
      }
    };

    /**
     * Handle mouse move on resizing.
     * @param e MouseEvent from which the x position is taken
     */
    const handleMouseMove = (e: MouseEvent) => {
      window.getSelection().removeAllRanges();
      const width = window.innerWidth - e.clientX;
      if (width === projectView.state.tool['minWidth']) {
        return;
      }
      projectView.state.tool['width'] =
        width > projectView.state.tool['minWidth']
          ? width
          : projectView.state.tool['minWidth'];
      window.dispatchEvent(new Event('resize'));
    };

    /**
     * Handle mouse up on resizing.
     */
    const handleMouseUp = () => {
      state.resizing = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.dispatchEvent(new Event('resize'));
    };

    /**
     * Resize sidebar.
     */
    const resizeSidebar = () => {
      state.resizing = true;
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    onMounted(() => {
      projectView.state.projectId = props.id as string;
      loadProject();
    });

    watch(
      () => props.id,
      (id: string) => {
        projectView.state.projectId = id;
        loadProject();
      }
    );

    return {
      appConfig: core.app.config,
      projectView,
      resizeSidebar,
      state,
    };
  },
});
</script>

<style>
.projectView .nav-item-right {
  font-size: 9px;
  text-align: center;
  width: 100%;
}

.projectView .resize-handle {
  cursor: ew-resize;
  height: 100vh;
  left: 0;
  position: fixed;
  width: 4px;
  z-index: 10;
}

.rotate-90 {
  transform: rotate(-90deg);
}

.projectView .tab-text {
  font-size: 10px;
  margin-bottom: 2px !important;
}
</style>
