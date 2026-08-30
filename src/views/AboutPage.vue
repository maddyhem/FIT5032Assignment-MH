<template>
<!-- HEADER -->
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div class="container-fluid px-4">
            <!-- Logo -->
            <a class="navbar-brand d-flex align-items-center" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                <img src="../assets/placeholder.png" class="img-fluid" style="max-height: 40px;" alt="Logo"> </a>

            
            <!-- Burger Button -->
            <button 
                class="navbar-toggler" 
                type="button" 
                @click="isNavbarExpanded = !isNavbarExpanded"
                :aria-expanded="isNavbarExpanded"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <!-- Nav Menu -->
            <div class="collapse navbar-collapse justify-content-center" :class="{ 'show': isNavbarExpanded }" id="navbarNav">

                <ul class="navbar-nav gap-5">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Learn</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Blog</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Events</a>
                </li>
                </ul>
            </div>
            <!-- Profile -->
            <a href="/profile" class="btn btn-outline-secondary rounded-circle d-inline-flex align-items-center justify-content-center gap-5" style="width: 40px; height: 40px; padding: 0;" title="View Profile">
                <i class="bi bi-person-circle fs-5"></i>
            </a>

            </div>
        </nav>
    </header>


    


</template>


<script setup>
import { ref } from 'vue'
const isNavbarExpanded = ref(false)
</script>


<style scoped>

</style>