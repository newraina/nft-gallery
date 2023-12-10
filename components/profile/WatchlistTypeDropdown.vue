<template>
  <NeoDropdown
    v-model="selectedType"
    :mobile-modal="false"
    aria-role="list"
    position="bottom-auto">
    <template #trigger="{ active }">
      <NeoButton
        :active="active"
        type="button"
        :icon="active ? 'chevron-up' : 'chevron-down'"
        class="has-text-left"
        data-testid="explore-sort">
        {{
          `${$t('watchlist.type.label')}: ${$t(
            `watchlist.type.${selectedType}`,
          )}`
        }}
      </NeoButton>
    </template>

    <NeoDropdownItem
      v-for="option in options"
      :key="option"
      aria-role="listitem"
      class="is-flex"
      :data-testid="option"
      :value="option">
      <span>
        {{ $t(`watchlist.type.${option}`) }}
      </span>
      <NeoIcon v-if="selectedType.includes(option)" class="ml-2" icon="check" />
    </NeoDropdownItem>
  </NeoDropdown>
</template>

<script setup lang="ts">
import {
  NeoButton,
  NeoDropdown,
  NeoDropdownItem,
  NeoIcon,
} from '@kodadot1/brick'

const options = ['nft', 'collection']
const selectedType = ref<'nft' | 'collection'>('nft')
</script>
