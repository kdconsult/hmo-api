<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, usePage, Link } from '@inertiajs/vue3';

const company = usePage().props.auth.user.company;
const errors = usePage().props.errors;
const trans = usePage().props.trans;

const hasErrors = () => {
  return Object.keys(errors).length > 0;
};
</script>

<template>
  <Head title="Dashboard" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Dashboard
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 text-gray-900">You're logged in!</div>

          <div v-if="!company" class="flex py-6">
            <div class="mx-auto">
              <div
                class="p-4 border border-red-500 bg-red-50 text-red-800 rounded"
              >
                <div
                  v-if="hasErrors"
                  class="text-red-500 text-sm italic"
                  v-for="(error, index) in errors"
                  :key="index"
                >
                  {{ error }}
                </div>
                <div>
                  <span>{{ trans['create-company-text'] }}</span>
                </div>
              </div>
              <div class="mt-6 flex">
                <Link
                  :href="route('companies.create')"
                  class="border border-blue-800 p-4 bg-blue-50 text-blue-700 rounded ml-auto"
                  type="button"
                  dusk="create-company"
                >
                  {{ trans['create-company-button'] }}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
