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
             style="width: 98%; min-height: calc(100vh - 100px); background-color: #e2ead0; backdrop-filter: blur(10px)" >
            <div class="position-absolute top-0 end-0 mt-3 me-3">
                <!-- Exit -->
                <a href="/" class="btn-close p-2" aria-label="Close" title="Exit to Main Screen"></a>
            </div>
            <div class="card-body h-100 d-flex flex-column">
                <div class="row h-100 align-items-stretch flex-grow-1">
                    <div class="col-12 col-md-6 d-flex flex-column justify-content-start center-divider py-4 pb-5 pb-md-4">
                        <!-- SIGN UP -->
                        <h1 class="text-center fw-bold mb-4">Sign Up</h1>
                        <form @submit.prevent="submitForm" style="width: 100%;">
                            <!-- Username -->
                            <div class="form-floating mb-4">
                                <input type="text" class="form-control" id="username" 
                                @blur="() => validateName(true)"
                                @input="() => validateName(false)"
                                v-model="formData.username"
                                placeholder="Username"/>
                                <div v-if="errors.username" class="text-danger mt-1">{{ errors.username }}</div>
                                <label for="username">Username</label>
                            </div>
                            <!-- Email -->
                            <div class="form-floating mb-4">
                                <input type="email" class="form-control" id="loginEmail" 
                                @blur="() => validateEmail(true)"
                                @input="() => validateEmail(false)"
                                v-model="formData.email" 
                                placeholder="name@example.com">
                                <div v-if="errors.email" class="text-danger mt-1">{{ errors.email }}</div>
                                <label for="loginEmail">Email address</label>
                            </div>
                            <!-- Password -->
                            <div class="form-floating mb-4">
                                <input :type="showPassword ? 'text' : 'password'" class="form-control" id="loginPassword" 
                                @blur="() => validatePassword(true)"
                                @input="() => validatePassword(false)"
                                v-model="formData.password"
                                placeholder="Password">
                                <div v-if="errors.password" class="text-danger mt-1">{{ errors.password }}</div>
                                <label for="loginPassword">Password</label>
                                <button type="button" 
                                        class="btn position-absolute top-50 end-0 translate-middle-y me-2 border-0 z-3 text-secondary btn-sm"
                                        @click="showPassword = !showPassword">
                                    {{ showPassword ? 'Hide' : 'Show' }}
                                </button>
                            </div>
                            <!-- Confirm Password -->
                            <div class="form-floating mb-4">
                                <input :type="showConfirmPassword ? 'text' : 'password'" class="form-control" id="confirmPassword" 
                                @blur="() => validateConfirmPassword(true)"
                                v-model="formData.confirmPassword"
                                placeholder="Confirm Password">
                                <div v-if="errors.confirmPassword" class="text-danger mt-1">{{ errors.confirmPassword }}</div>
                                <label for="confirmPassword">Confirm Password</label>
                                <button type="button" 
                                        class="btn position-absolute top-50 end-0 translate-middle-y me-2 border-0 z-3 text-secondary btn-sm"
                                        @click="showConfirmPassword = !showConfirmPassword">
                                    {{ showConfirmPassword ? 'Hide' : 'Show' }}
                                </button>
                            </div>
                            <!-- Account Type -->
                            <div class="form-floating mb-4">
                                <select class="form-select" id="accountType" 
                                v-model="formData.accountType" placeholder="Account Type">
                                    <option value="" disabled selected>Select account type</option>
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                <label for="accountType">Account Type</label>
                                <div v-if="errors.accountType" class="text-danger mt-1">{{ errors.accountType }}</div>
                            </div>
                            <!-- Buttons -->
                            <div class="d-flex gap-3">
                                <button type="button" class="btn w-100 py-2 fw-semibold text-white" style="background-color: #aaa46e;" @click="clearForm">Clear</button>
                                <button type="submit" class="btn w-100 py-2 fw-semibold text-white" style="background-color: #384232;">Sign Up</button>
                            </div> 
                            
                        </form>
                    </div>
                    
                    <!-- LOG IN -->
                    <div class="col-12 col-md-6 d-flex flex-column py-4 pt-5 pt-md-4">
                        <h1 class="text-center fw-bold mb-4">Log In</h1>
                        <form style="width: 100%;">
                            <!-- Username -->
                            <div class="form-floating mb-4">
                                <input type="text" class="form-control" id="username" v-model="formData.username" placeholder="Username">
                                <label for="username">Username</label>
                            </div>
                            <!-- Email -->
                            <div class="form-floating mb-4">
                                <input type="email" class="form-control" id="loginEmail" v-model="formData.email" placeholder="name@example.com">
                                <label for="loginEmail">Email address</label>
                            </div>
                            <!-- Password -->
                            <div class="form-floating mb-4">
                                <input :type="showPassword ? 'text' : 'password'" class="form-control" id="loginPassword" v-model="formData.password" placeholder="Password">
                                <label for="loginPassword">Password</label>
                            </div>
                            <!-- Buttons -->
                             <div class="d-flex gap-3">
                                <button type="button" class="btn w-100 py-2 fw-semibold text-white" style="background-color: #aaa46e;" @click="clearForm">Clear</button>
                                <button type="submit" class="btn w-100 py-2 fw-semibold text-white" style="background-color: #384232;">Log In</button>
                            </div> 
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>


</template>


<script setup>
import { ref } from 'vue'

const isNavbarExpanded = ref(false)
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const formData = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: ''
});

const submittedCards = ref([])

const clearForm = () => {
    formData.value.username = ''
    formData.value.email = ''
    formData.value.password = ''
    formData.value.confirmPassword = ''
    formData.value.accountType = ''
}

const errors = ref({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    accountType: null
})

const validateName = (blur) => {
    if (formData.value.username.length < 3) {
        errors.value.username = 'Name must be at least 3 characters long.'
    } else {
        errors.value.username = null
    }
};

const validateEmail = (blur) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.value.email)) {
        errors.value.email = 'Please enter a valid email address.'
    } else {
        errors.value.email = null
    }
};

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateAccountType = (blur) => {
    if (!formData.value.accountType) {
        errors.value.accountType = 'Please select an account type.'
    } else {
        errors.value.accountType = null
    }
};

const submitForm = () => {
    validateName(true);
    validateEmail(true);
    validatePassword(true);
    validateConfirmPassword(true);
    validateAccountType(true);
    
    if (!errors.value.username && !errors.value.email && !errors.value.password && !errors.value.confirmPassword && !errors.value.accountType) {
        submittedCards.value.push({...formData.value});
        clearForm();
    }
};
</script>


<style scoped>

.center-divider {
    border-bottom: 1px solid rgba(56, 66, 50, 0.3); /* Matches your dark green color at 10% opacity */
}

@media (min-width: 768px) {
    .center-divider {
        border-bottom: 0 !important; /* Disables the mobile bottom line */
        
        /* 🛠️ Explicitly using border-right overrides layout reset conflicts */
        border-right: 1px solid rgba(56, 66, 50, 0.3) !important; 
    }
}

</style>
