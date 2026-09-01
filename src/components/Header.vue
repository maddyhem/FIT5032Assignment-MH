<template>
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container-fluid px-4">
            
            <a class="navbar-brand d-flex align-items-center" href="/main">
                <img src="../assets/placeholder.png" class="img-fluid" style="max-height: 40px;" alt="Logo">
            </a>

            
            <button 
                class="navbar-toggler" 
                type="button" 
                @click="isNavbarExpanded = !isNavbarExpanded"
                :aria-expanded="isNavbarExpanded"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            
            <div class="collapse navbar-collapse justify-content-center" :class="{ 'show': isNavbarExpanded }" id="navbarNav">
                <ul class="navbar-nav gap-5">
                    
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
            <router-link to="/signuplogin" class="btn btn-outline-secondary rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 40px; height: 40px; padding: 0;" title="View Profile">
                <i class="bi bi-person-circle fs-5"></i>
            </router-link>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
const isNavbarExpanded = ref(false)
</script>
