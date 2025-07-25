<script setup lang="ts">
import Button from '@/components/CustomButton.vue';
import LinkConstructor from '@/components/forms/LinkConstructor.vue';
import DragDropList from '@/components/DragDropList.vue';
import { computed, inject } from 'vue';
import { useUserStore } from '@/stores/user';

import { useForm } from 'vee-validate';
import { linkListSchema } from '@/services/validations';

import type { Link } from '@/services/types';

const store = useUserStore();

const startNotification = inject('notification') as () => void;

const links = computed(() => store.getLinks);

const { handleSubmit, isSubmitting, errors } = useForm<Link[]>({
  validationSchema: linkListSchema,
  initialValues: store.getLinks
});

const updateItems = (newItems: Link[]) => {
  store.links = newItems;
  console.log('Lista aggiornata:', newItems);
};

const updateLink = (index: number, updated: Link) => {
  store.updateLink(updated);
  console.log('Link aggiornato:', updated);
};

const onSubmit = handleSubmit(async (values: any) => {
  console.log('Form submitted with links:', values);
  startNotification();
});

function addLink() {
  // push({ name: '', url: '' });
  store.addLink();
}
</script>

<template>
  <div class="tab-content">
    <div class="p-5 links-container">
      <h1 class="heading-m mt-0">Customize your links</h1>
      <p class="body-m mb-5">
        Add/edit/remove links below and then share all your profiles with the world!
      </p>
      <Button
        label="+ Add new link"
        :full-width="true"
        level="secondary"
        type="button"
        @click="addLink"
      ></Button>
    </div>

    <div class="empty-link-list-banner px-5 mb-5" v-if="links.length === 0">
      <div class="empty-link-list-svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="250" height="161" fill="none">
          <path
            fill="#fff"
            d="M48.6936 15.4213C23.3786 25.2238 4.59362 50.0679.857884 80.1285-2.26282 105.459 5.19347 133.446 49.0884 141.419c85.4056 15.52 173.4456 17.335 193.8636-24.525 20.417-41.8604-7.525-108.89107-50.873-113.53037C157.683-.326546 98.1465-3.7206 48.6936 15.4213Z"
            opacity=".3"
          />
          <path
            fill="#333"
            d="M157.022 9.56714H93.044c-4.0131 0-7.2664 3.25326-7.2664 7.26646V137.744c0 4.013 3.2533 7.266 7.2664 7.266h63.978c4.014 0 7.267-3.253 7.267-7.266V16.8336c0-4.0132-3.253-7.26646-7.267-7.26646Z"
          />
          <path
            fill="#333"
            d="M125.033 140.872c3.141 0 5.687-2.546 5.687-5.687 0-3.141-2.546-5.687-5.687-5.687-3.141 0-5.687 2.546-5.687 5.687 0 3.141 2.546 5.687 5.687 5.687Z"
            opacity=".03"
          />
          <path fill="#EFEBFF" d="M156.628 21.321H93.4314V126.78h63.1966V21.321Z" />
          <path
            fill="#333"
            d="M117.797 120.508c1.141 0 2.065-.925 2.065-2.065 0-1.141-.924-2.066-2.065-2.066s-2.065.925-2.065 2.066c0 1.14.924 2.065 2.065 2.065Z"
            opacity=".03"
          />
          <path
            fill="#fff"
            d="M125.033 120.508c1.141 0 2.066-.925 2.066-2.065 0-1.141-.925-2.066-2.066-2.066-1.14 0-2.065.925-2.065 2.066 0 1.14.925 2.065 2.065 2.065Z"
            opacity=".44"
          />
          <path
            fill="#333"
            d="M132.269 120.508c1.141 0 2.066-.925 2.066-2.065 0-1.141-.925-2.066-2.066-2.066-1.14 0-2.065.925-2.065 2.066 0 1.14.925 2.065 2.065 2.065ZM148.199 32.9534h-46.332v39.5517h46.332V32.9534ZM134.373 80.1285h-32.506v3.6219h32.506v-3.6219ZM148.199 80.1285h-11.632v3.6219h11.632v-3.6219ZM117.053 91.2371h-15.186v3.6218h15.186v-3.6218ZM148.199 91.2371H120.28v3.6218h27.919v-3.6218ZM136.954 102.353h-35.087v3.622h35.087v-3.622Z"
            opacity=".03"
          />
          <path fill="#EFEBFF" d="M78.6555 21.321H15.4592V126.78h63.1963V21.321Z" />
          <path
            fill="#fff"
            d="M39.8251 120.508c1.1406 0 2.0652-.925 2.0652-2.065 0-1.141-.9246-2.066-2.0652-2.066-1.1407 0-2.0653.925-2.0653 2.066 0 1.14.9246 2.065 2.0653 2.065Z"
            opacity=".44"
          />
          <path
            fill="#333"
            d="M47.0611 120.508c1.1407 0 2.0653-.925 2.0653-2.065 0-1.141-.9246-2.066-2.0653-2.066-1.1406 0-2.0653.925-2.0653 2.066 0 1.14.9247 2.065 2.0653 2.065ZM54.297 120.508c1.1406 0 2.0653-.925 2.0653-2.065 0-1.141-.9247-2.066-2.0653-2.066-1.1407 0-2.0653.925-2.0653 2.066 0 1.14.9246 2.065 2.0653 2.065ZM70.227 32.9534H23.8948v39.5517H70.227V32.9534ZM56.4002 80.1285H23.8948v3.6219h32.5054v-3.6219ZM70.2274 80.1285H58.595v3.6219h11.6324v-3.6219ZM39.0807 91.2371H23.8948v3.6218h15.1859v-3.6218ZM70.2272 91.2371H42.3079v3.6218h27.9193v-3.6218ZM58.9819 102.353H23.8948v3.622h35.0871v-3.622Z"
            opacity=".03"
          />
          <path fill="#EFEBFF" d="M234.6 21.321h-63.197V126.78H234.6V21.321Z" />
          <path
            fill="#333"
            d="M195.769 120.508c1.141 0 2.065-.925 2.065-2.065 0-1.141-.924-2.066-2.065-2.066-1.14 0-2.065.925-2.065 2.066 0 1.14.925 2.065 2.065 2.065ZM203.005 120.508c1.141 0 2.066-.925 2.066-2.065 0-1.141-.925-2.066-2.066-2.066-1.14 0-2.065.925-2.065 2.066 0 1.14.925 2.065 2.065 2.065Z"
            opacity=".03"
          />
          <path
            fill="#fff"
            d="M210.242 120.508c1.14 0 2.065-.925 2.065-2.065 0-1.141-.925-2.066-2.065-2.066-1.141 0-2.066.925-2.066 2.066 0 1.14.925 2.065 2.066 2.065Z"
            opacity=".44"
          />
          <path
            fill="#333"
            d="M226.171 32.9534h-46.332v39.5517h46.332V32.9534ZM212.345 80.1285h-32.506v3.6219h32.506v-3.6219ZM226.171 80.1285h-11.632v3.6219h11.632v-3.6219ZM195.025 91.2371h-15.186v3.6218h15.186v-3.6218ZM226.179 91.2371H198.26v3.6218h27.919v-3.6218ZM214.926 102.353h-35.087v3.622h35.087v-3.622Z"
            opacity=".03"
          />
          <path
            fill="#333"
            d="M146.597 145.041c0-.76-1.61-31.891-.577-36.522 1.033-4.632 10.509-27.2743 8.011-29.9167-2.498-2.6423-11.648 3.3713-11.648 3.3713s1.671-27.2663-2.278-29.2101c-3.948-1.9438-5.702 5.6719-5.702 5.6719L132.3 88.9363l-10.418 55.9597 24.715.145Z"
            opacity=".1"
          />
          <path
            fill="#F4A28C"
            d="M139.559 113.295c1.328-5.316 3.325-10.502 4.601-15.8698.843-3.5535 6.295-18.4053 7.821-22.7789.47-1.3439.873-2.9688-.038-4.0622-.308-.3197-.691-.5569-1.114-.6895-.423-.1327-.873-.1567-1.308-.0698-.878.1832-1.688.6064-2.339 1.2225-1.519 1.3363-4.32 7.9498-6.371 7.9422-2.482 0-1.313-6.8337-1.381-8.1472-.281-5.6568.136-12.9081-2.073-18.2232-1.64-3.9483-5.71-3.4168-6.667.8505-.957 4.2672-.919 22.1486-.919 22.1486s-15.884-2.7258-18.595 2.1185c-2.711 4.8443 1.868 35.6183 1.868 35.6183l26.515-.06Z"
          />
          <path fill="#633CFF" d="m141.495 160.5-.289-48.906-29.681-6.515L99.574 160.5h41.921Z" />
          <path
            fill="#333"
            d="m141.495 160.5-.289-48.906-14.168-3.113-2.536 52.019h16.993Z"
            opacity=".1"
          />
        </svg>
      </div>
      <h3 class="heading-m mt-5 mb-3">Let's get you started</h3>
      <p>
        Use the “Add new link” button to get started. Once you have more than one link, you can
        reorder and edit them. We’re here to help you share your profiles with everyone!
      </p>
    </div>

    <form v-else class="links-list px-5" novalidate @submit.prevent="onSubmit">
      <DragDropList :initialItems="links" @update:items="updateItems">
        <template #item="{ item, index }">
          <LinkConstructor
            :model-value="item"
            :index="index"
            @update:model-value="(updated) => updateLink(index, updated)"
          />
        </template>
      </DragDropList>
    </form>

    <div class="footer py-4 px-3">
      <Button
        label="Save"
        level="primary"
        :disable="isSubmitting"
        type="submit"
        @click="() => onSubmit()"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/scss/abstracts' as *;

.tab-content {
  display: flex;
  flex-direction: column;
  height: 100%;

  .links-container {
    flex: 0 1 auto;
  }

  .footer {
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid $color-grey-medium;
    position: sticky;
    bottom: 0;
    left: 0;
  }

  .empty-link-list-banner {
    flex: 1 1 auto;
    background-color: $color-grey-light;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    .empty-link-list-svg {
      display: block;
      margin: 0 auto;
    }

    p {
      max-width: 488px;
    }
  }

  .links-list {
    display: block;
    width: 100%;
    flex: 1 1 auto;
    overflow-y: auto;
  }
}
</style>
