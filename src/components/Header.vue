<template>
    <!-- REMOVED: Outer container box wrapper so navbar spans 100% viewport width -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container-fluid px-4">
            <!-- Logo link pointing to the classic Rick Astley track -->
            <a class="navbar-brand d-flex align-items-center" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                <img src="../assets/placeholder.png" class="img-fluid" style="max-height: 40px;" alt="Logo">
            </a>

            <!-- Mobile responsive breakdown menu burger button toggle trigger switch -->
            <button 
                class="navbar-toggler" 
                type="button" 
                @click="isNavbarExpanded = !isNavbarExpanded"
                :aria-expanded="isNavbarExpanded"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <!-- Dynamic menu link tray visibility panel wrapper wrapper -->
            <div class="collapse navbar-collapse justify-content-center" :class="{ 'show': isNavbarExpanded }" id="navbarNav">
                <ul class="navbar-nav gap-5">
                    <!-- FIXED: Upgraded links to router-link components -->
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about" active-class="active">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/learn" active-class="active">Learn</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/blog" active-class="active">Blog</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/events" active-class="active">Events</router-link>
                    </li>
                </ul>
            </div>

            <!-- Profile dashboard route navigator portal action node -->
            <router-link to="/profile" class="btn btn-outline-secondary rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 40px; height: 40px; padding: 0;" title="View Profile">
                <i class="bi bi-person-circle fs-5"></i>
            </router-link>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
const isNavbarExpanded = ref(false)
</script>
