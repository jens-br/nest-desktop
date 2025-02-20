<template>
  <div class="appDetails">
    <v-list dense max-width="500px">
      <v-list-item>
        <v-row>
          <v-col
            class="font-weight-bold text-left"
            cols="4"
            v-text="'Documentation'"
          />
          <v-col class="text-right" cols="8">
            <a
              :href="state.doc"
              class="text-decoration-none text--primary"
              target="_blank"
              v-text="state.doc"
            />
          </v-col>
        </v-row>
      </v-list-item>
      <v-list-item>
        <v-row>
          <v-col
            class="font-weight-bold text-left"
            cols="4"
            v-text="'Source code'"
          />
          <v-col class="text-right" cols="8">
            <a
              :href="state.repo"
              class="text-decoration-none text--primary"
              target="_blank"
              v-text="state.repo"
            />
          </v-col>
        </v-row>
      </v-list-item>
      <v-list-item>
        <v-row>
          <v-col
            class="font-weight-bold text-left"
            cols="4"
            v-text="'License'"
          />
          <v-col class="text-right" cols="8" v-text="state.license" />
        </v-row>
      </v-list-item>
      <v-list-item>
        <v-row>
          <v-col
            class="font-weight-bold text-left"
            cols="4"
            v-text="'Current version'"
          />
          <v-col class="text-right" cols="8" v-text="state.version" />
        </v-row>
      </v-list-item>
      <v-list-item>
        <v-row>
          <v-col
            class="font-weight-bold text-left"
            cols="4"
            v-text="'Contact'"
          />
          <v-col class="text-right" cols="8">
            <a
              :href="
                state.contactMailHeader +
                mailText[0] +
                state.clientType +
                mailText[1] +
                state.browserName +
                mailText[2] +
                state.browserVersion +
                mailText[3] +
                state.version +
                mailText[4] +
                state.simulatorVersion +
                mailText[5] +
                state.osType +
                mailText[6]
              "
              class="text-decoration-none text--primary"
              v-text="state.contactName"
            />
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, reactive } from '@vue/composition-api';
import core from '@/core';

import { detect } from 'detect-browser';
export default {
  name: 'AppDetails',
  setup() {
    const state = reactive({
      browserName: '',
      browserVersion: '',
      clientType: '',
      contactMailHeader:
        'mailto:spreizer@uni-trier.de?subject=[NEST Desktop ' +
        core.app.state.version +
        ']',
      contactName: '📧 Sebastian Spreizer',
      doc: 'https://nest-desktop.readthedocs.io',
      license: 'MIT License',
      osType: '',
      repo: 'https://github.com/nest-desktop/nest-desktop',
      simulatorVersion: core.app.backends.nestSimulator.state.version.nest,
      version: core.app.state.version,
    });
    const mailText = [
      '&body=%2D%2D%2D%2D %0D%0APlease do not delete the following lines! %0D%0AClient type: ',
      '%0D%0ABrowser name: ',
      '%0D%0ABrowser version: ',
      '%0D%0ANEST Desktop version: ',
      '%0D%0ANEST Simulator version: ',
      '%0D%0AOS type: ',
      '%0D%0A %2D%2D%2D%2D %0D%0A%0D%0A(your message text...)',
    ];

    // TODO: change to onRenderTriggered in Vue 3 to catch updates as well
    onBeforeMount(() => {
      // Fetch the debugging information
      const info = detect();
      if (info) {
        state.clientType = info.type;
        state.browserName = info.name;
        state.browserVersion = info.version;
        state.osType = info.os;
      }
    });

    return {
      state,
      mailText,
    };
  },
};
</script>

<style>
.appDetails .v-list {
  font-size: 12px;
}
.appDetails .v-list-item {
  min-height: 28px !important;
}
.appDetails a:hover {
  text-decoration: underline !important;
}
.appDetails .col-4,
.appDetails .col-8 {
  padding: 4px;
}
</style>
