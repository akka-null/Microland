<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import { Progress } from '@/components/ui/progress'
import { useRoute, useRouter } from 'vue-router'
import { authStore } from '@/stores/auth'
import { useToast } from '@/components/ui/toast/use-toast'
const router = useRouter()
const route = useRoute()

const { toast } = useToast()
const auth = authStore()

const progress = ref(13)
watchEffect((cleanupFn) => {
  const timer = setTimeout(() => (progress.value = 66), 500)
  cleanupFn(() => clearTimeout(timer))
})

onMounted(async () => {
  const res = await auth.confirm(route.params.token)
  toast({
    title: res.status === 200 ? 'Email Confirmation' : 'Oops!',
    variant: res.status === 200 ? 'informative' : 'destructive',
    description: `${res.message}`
  })
  if (res.status === 200) {
    router.push({ path: '/login' })
  }
})
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    >
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
      >
    </div>
  </div>
</template>
