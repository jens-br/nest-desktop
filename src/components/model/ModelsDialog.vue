<template>
  <div class="ModelsDialog">
    <v-dialog max-width="1024" v-model="dialogState.open">
      <span v-if="dialogState.action === 'import'">
        <ModelsImport />
      </span>
      <span v-else>
        <v-card>
          <v-card-title
            v-if="dialogState.content.length !== 0"
            v-text="`Select models to ${dialogState.action}.`"
          />

          <v-card-text>
            <v-simple-table v-if="dialogState.content.length !== 0">
              <template #default>
                <thead>
                  <tr>
                    <th v-text="'Model name'" />
                    <th v-text="'Element type'" />
                    <th class="text-center" v-text="'Selected'" />
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :key="index"
                    v-for="(model, index) in dialogState.content"
                  >
                    <td v-text="model.label" />
                    <td v-text="model.elementType" />
                    <td class="text-center">
                      <v-checkbox
                        class="my-0 mx-auto"
                        color="model"
                        hide-details
                        v-model="model.state.selected"
                      />
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              @click="() => closeDialog()"
              outlined
              small
              text
              v-text="'Cancel'"
            />
            <v-btn
              :disabled="!dialogState.content.some(p => p.state.selected)"
              @click="exportModels"
              outlined
              small
              v-if="dialogState.action === 'export'"
            >
              <v-icon left v-text="'mdi-export'" />
              Export
            </v-btn>
            <v-btn
              :disabled="!dialogState.content.some(p => p.state.selected)"
              @click="deleteModels"
              outlined
              small
              v-if="dialogState.action === 'delete'"
            >
              <v-icon left v-text="'mdi-trash-can-outline'" />
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </span>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { Model } from '@/core/model/model';
import core from '@/core';
import ModelsImport from '@/components/model/ModelsImport.vue';

export default Vue.extend({
  name: 'ModelsDialog',
  components: {
    ModelsImport,
  },
  setup() {
    const dialogState = core.app.state.dialog;

    /**
     * Export selected models.
     */
    const exportModels = () => {
      const selectedModels: Model[] = dialogState.content.filter(
        (model: Model) => model.state.selected
      );
      if (selectedModels.length > 0) {
        core.app.model.exportModels(selectedModels);
      }
      core.app.closeDialog();
    };

    /**
     * Delete selected models.
     */
    const deleteModels = () => {
      const selectedModels: Model[] = dialogState.content.filter(
        (model: Model) => model.state.selected
      );
      if (selectedModels.length > 0) {
        core.app.model.deleteModels(selectedModels);
      }
      core.app.closeDialog();
    };

    return {
      closeDialog: () => core.app.closeDialog(),
      deleteModels,
      dialogState,
      exportModels,
    };
  },
});
</script>

<style>
.v-input__slot {
  align-items: center;
  justify-content: center;
}
</style>
