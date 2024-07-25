<script setup lang="ts">
import {onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import {authStore} from '@/stores/auth'
import { useToast } from '@/components/ui/toast/use-toast'

const {toast} = useToast(); 
const auth = authStore();
const router = useRouter()
const route = useRoute()

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// onMounted(() => {
// auth.getUser();
// })

const logout = async () => {
const res = await auth.logOut();
    toast({
        title: res.status === 200 ? "Bye Bye": "Oops!",
        variant: res.status === 200? "default" : "destructive",
        description: `${res.message}`,
    })
    if (res.status === 200) {
        router.push({path: '/'});
    }
}

</script>

<template>
    <div v-if="!auth.user">
        <router-link to="/login">
            <Button variant="outline">
                <Icon icon="radix-icons:person"/>
            </Button>
        </router-link>
    </div>
    <div v-else>
        <DropdownMenu>
        <DropdownMenuTrigger as-child>
        <div class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground w-9 h-9">
            <Button variant="outline" >
                <Icon icon="radix-icons:person"/>
            </Button>
        </div>
        </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56">
                <div v-if="auth.user.admin">
                    <DropdownMenuLabel class="text-green-400">{{auth.user.name}}</DropdownMenuLabel>
                </div>
                <div v-else>
                    <DropdownMenuLabel>{{auth.user.name}}</DropdownMenuLabel>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem >
                        <User class="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard class="mr-2 h-4 w-4" />
                        <span>My Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings class="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Users class="mr-2 h-4 w-4" />
                        <span>Team</span>
                    </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <UserPlus class="mr-2 h-4 w-4" />
                                <span>Invite users</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>
                                        <Mail class="mr-2 h-4 w-4" />
                                        <span>Email</span>
                                    </DropdownMenuItem>
                        <DropdownMenuItem>
            <MessageSquare class="mr-2 h-4 w-4" />
        <span>Message</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
        <PlusCircle class="mr-2 h-4 w-4" />
        <span>More...</span>
        </DropdownMenuItem>
        </DropdownMenuSubContent>
        </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
        <Plus class="mr-2 h-4 w-4" />
        <span>New Team</span>
        </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
        <Github class="mr-2 h-4 w-4" />
        <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
        <LifeBuoy class="mr-2 h-4 w-4" />
        <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
        <Cloud class="mr-2 h-4 w-4" />
        <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="logout">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
        </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>
