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

   <!-- MAIN -->
    <div class="container-fluid mt-1 d-flex justify-content-center align-items-center p-3" style="min-height: calc(100vh - 58px);">
        <div class="card p-4 shadow-lg border-0" 
             style="width: 98%; height: calc(100vh - 100px); background-color: #e2ead0; backdrop-filter: blur(10px)" >
        
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-12 col-md-6 d-flex flex-column justify-content-center border-end border-dark border-opacity-10 py-4">
                        <h1 class="text-center fw-bold mb-4">Sign Up</h1>

                        <form style="width: 100%;">
                            <!-- Username -->
                            <div class="form-floating mb-4">
                                <input type="text" class="form-control" id="username" placeholder="Username">
                                <label for="username">Username</label>
                            </div>
                            <!-- Email -->
                            <div class="form-floating mb-4">
                                <input type="email" class="form-control" id="loginEmail" placeholder="name@example.com">
                                <label for="loginEmail">Email address</label>
                            </div>
                            <!-- Password -->
                            <div class="form-floating mb-4">
                                <input type="password" class="form-control" id="loginPassword" placeholder="Password">
                                <label for="loginPassword">Password</label>
                            </div>
                            <!-- Confirm Password -->
                            <div class="form-floating mb-4">
                                <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password">
                                <label for="confirmPassword">Confirm Password</label>
                            </div>
                            <!-- Account Type -->
                            <div class="form-floating mb-4">
                                <select class="form-select" id="accountType" placeholder="Account Type">
                                    <option value="" disabled selected>Select account type</option>
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                <label for="accountType">Account Type</label>
                            </div>
                            <!-- Buttons -->
                            <div class="d-flex gap-3">
                                <button type="button" class="btn w-100 py-2 fw-semibold text-white" style="background-color: #aaa46e;" @click="clearForm">Clear</button>
                                <button type="submit" class="btn w-100 py-2 fw-semibold text-white" style="background-color: #384232;">Sign Up</button>
                            </div> 
                            
                        </form>
                    </div>
                    
                    <div class="col-12 col-md-6 d-flex flex-column justify-content-center py-4">
                        <h1 class="text-center fw-bold mb-4">Sign Up</h1>

                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Enter your name">

                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" placeholder="Enter your email">
                    </div>

                </div>
            </div>
        </div>
    </div>


</template>


<script setup>
import { ref } from 'vue'
const isNavbarExpanded = ref(false)
</script>


<style scoped>

</style>