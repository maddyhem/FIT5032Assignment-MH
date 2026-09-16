<template>
    <!-- MAIN CONTENTS -->
    <div class="container-fluid mt-1 d-flex justify-content-start p-3" style="min-height: calc(100vh - 58px);">
        
        <div class="card p-4 shadow-lg border-0 d-flex flex-column" 
             style="width: 98%; min-height: calc(100vh - 100px); background-color: #e2ead0; backdrop-filter: blur(10px)" >
            <!-- Title -->
            <h1 class="text-start mb-3">Profile</h1>

            <!-- Loading State -->
            <div v-if="isAuthLoading" class="mb-4 text-start text-muted">
                <div class="spinner-border spinner-border-sm text-dark me-2" role="status"></div>
                Fetching account details...
            </div>

            <!-- Profile Type Content -->
            <div v-else class="mb-4 text-start">
                <p class="mb-1 text-uppercase fw-bold text-muted small">Profile Type</p>
                
                <!-- Dynamic badge displaying mapped labels -->
                <span 
                    class="badge px-3 py-2 fs-6 mb-3"
                    :class="userProfile?.accountType === 'admin' ? 'bg-dark' : 'bg-success'"
                >
                    <i class="bi bi-person-badge me-1"></i>
                    {{ userProfile?.accountType === 'Admin' ? 'Admin' : 'Standard' }}
                </span>
                
                <div v-if="userProfile?.email" class="text-secondary small mt-1">
                    Logged in as: <strong>{{ userProfile.email }}</strong>
                </div>
            </div>

            <!-- Logout Button pushed to the bottom -->
            <div class="mt-auto text-start">
                <button 
                    @click="handleLogout" 
                    class="btn btn-danger d-inline-flex align-items-center gap-2">
                    <i class="bi bi-box-arrow-right"></i>
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import { userProfile, isAuthLoading, logoutUser } from '@/firebase/firebase';

const router = useRouter();

const handleLogout = async () => {
  try {
    await logoutUser();
    console.log("[Firebase Auth] User signed out successfully.");
    router.push('/signuplogin'); 
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};
</script>

