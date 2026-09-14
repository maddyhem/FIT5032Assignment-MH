<template> 

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
                        <form @submit.prevent="signupUser" style="width: 100%;">
                            <!-- Username -->
                            <div class="form-floating mb-4">
                                <input type="text" class="form-control" id="username" 
                                @blur="() => validateName(true)"
                                @input="() => validateName(false)"
                                v-model="signupData.username"
                                placeholder="Username"/>
                                <div v-if="errors.username" class="text-danger mt-1">{{ errors.username }}</div>
                                <label for="username">Username</label>
                            </div>
                            <!-- Email -->
                            <div class="form-floating mb-4">
                                <input type="email" class="form-control" id="loginEmail" 
                                @blur="() => validateEmail(true)"
                                @input="() => validateEmail(false)"
                                v-model="signupData.email" 
                                placeholder="name@example.com">
                                <div v-if="errors.email" class="text-danger mt-1">{{ errors.email }}</div>
                                <label for="loginEmail">Email address</label>
                            </div>
                            <!-- Password -->
                            <div class="form-floating mb-4">
                                <input :type="showPassword ? 'text' : 'password'" class="form-control" id="signupPassword" 
                                @blur="() => validatePassword(true)"
                                @input="() => validatePassword(false)"
                                v-model="signupData.signupPassword"
                                placeholder="Password">
                                <div v-if="errors.password" class="text-danger mt-1">{{ errors.password }}</div>
                                <label for="signupPassword">Password</label>
                                <button type="button" 
                                        class="btn position-absolute top-50 end-0 translate-middle-y me-2 border-0 z-3 text-secondary btn-sm"
                                        @click="showPassword = !showPassword">
                                    {{ showPassword ? 'Hide' : 'Show' }}
                                </button>
                            </div>
                            <!-- Confirm Password -->
                            <div class="form-floating mb-4">
                                <input :type="showConfirmPassword ? 'text' : 'password'" class="form-control" id="confirmSignupPassword" 
                                @blur="() => validateConfirmPassword(true)"
                                @input="() => validateConfirmPassword(false)"
                                v-model="signupData.confirmPassword"
                                placeholder="Confirm Password">
                                <div v-if="errors.confirmPassword" class="text-danger mt-1">{{ errors.confirmPassword }}</div>
                                <label for="confirmSignupPassword">Confirm Password</label>
                                <button type="button" 
                                        class="btn position-absolute top-50 end-0 translate-middle-y me-2 border-0 z-3 text-secondary btn-sm"
                                        @click="showConfirmPassword = !showConfirmPassword">
                                    {{ showConfirmPassword ? 'Hide' : 'Show' }}
                                </button>
                            </div>
                            <!-- Account Type -->
                            <div class="form-floating mb-4">
                                <select class="form-select" id="accountType" 
                                v-model="signupData.accountType" placeholder="Account Type">
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
                        <form @submit.prevent="loginUser" style="width: 100%;">
                            <!-- Email -->
                            <div class="form-floating mb-4">
                                <input type="email" class="form-control" id="loginEmail" v-model="loginData.loginEmail" placeholder="name@example.com">
                                <label for="loginEmail">Email address</label>
                            </div>
                            <!-- Password -->
                            <div class="form-floating mb-4">
                                <input :type="showLoginPassword ? 'text' : 'password'" class="form-control" id="loginPassword" v-model="loginData.loginPassword" placeholder="Password">
                                <label for="loginPassword">Password</label>
                                <button type="button" 
                                        class="btn position-absolute top-50 end-0 translate-middle-y me-2 border-0 z-3 text-secondary btn-sm"
                                        @click="showLoginPassword = !showLoginPassword">
                                    {{ showLoginPassword ? 'Hide' : 'Show' }}
                                </button>
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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../main'; 
import { useRouter } from "vue-router"

const router = useRouter()
const auth = getAuth()
const isNavbarExpanded = ref(false)
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showLoginPassword = ref(false);

const signupData = ref({
    username: '',
    email: '',
    signupPassword: '',
    confirmPassword: '',
    accountType: ''
});

const loginData = ref({
    loginEmail: '',
    loginPassword: '',
});

const clearForm = () => {
    signupData.value.username = ''
    signupData.value.email = ''
    signupData.value.signupPassword = ''
    signupData.value.confirmPassword = ''
    signupData.value.accountType = ''
    loginData.value.loginEmail = ''
    loginData.value.loginPassword = ''
}

const errors = ref({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    accountType: null
})

const validateName = (blur) => {
    if (signupData.value.username.length < 3) {
        errors.value.username = 'Name must be at least 3 characters long.'
    } else {
        errors.value.username = null
    }
};

const validateEmail = (blur) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(signupData.value.email)) {
        errors.value.email = 'Please enter a valid email address.'
    } else {
        errors.value.email = null
    }
};

const validatePassword = (blur) => {
  const password = signupData.value.signupPassword
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!password) {
    if (blur) errors.value.password = 'Password is required.'
    return
  }

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
  if (!signupData.value.signupPassword && !signupData.value.confirmPassword) {
    errors.value.confirmPassword = null
    return
  }
  if (signupData.value.signupPassword !== signupData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateAccountType = (blur) => {
    if (!signupData.value.accountType) {
        errors.value.accountType = 'Please select an account type.'
    } else {
        errors.value.accountType = null
    }
};

const signupUser = async () => {
    validateName(true);
    validateEmail(true);
    validatePassword(true);
    validateConfirmPassword(true);
    validateAccountType(true);
    
    if (!errors.value.username && !errors.value.email && !errors.value.password && !errors.value.confirmPassword && !errors.value.accountType) {
        try {
            const userSignup = await createUserWithEmailAndPassword(
                auth,
                signupData.value.email,
                signupData.value.signupPassword
            )
            console.log('Firebase sign up success')

            // attach uid to other user info
            const user = userSignup.user;

            await setDoc(doc(db, "UserInfo", user.uid), {
                username: signupData.value.username,
                accountType: signupData.value.accountType,
                email: signupData.value.email,
            });

            console.log('Firebase auth account created and Firestore user profile saved successfully!');
        
            
            clearForm()
            router.push('/main')
        } catch (error) {
            console.error('Firebase sign in unsuccessful', error); 
            
            if (error.code === 'auth/email-already-in-use') {
                errors.value.email = 'This email is already in use.'
            } else {
                errors.value.email = error.message || 'Authentication failed. Please try again.'
            }
        }

    }
};

const loginUser = async () => {
    
    if (!loginData.value.loginEmail) {
        errors.value.loginEmail = 'Email is required.';
        return;
    }
    if (!loginData.value.loginPassword) {
        errors.value.loginPassword = 'Password is required.';
        return;
    }

    if (!errors.value.email && !errors.value.password) {
        try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            loginData.value.loginEmail,
            loginData.value.loginPassword
        );

        console.log('Firebase login success:', userCredential.user);
        clearForm();
        router.push('/main'); 

        } catch (error) {
        console.error('Firebase login failed:', error.code);

        switch (error.code) {
            case 'auth/invalid-credential':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            errors.value.email = 'Invalid email or password combination.';
            break;
            case 'auth/too-many-requests':
            errors.value.email = 'Too many failed attempts. Try again later.';
            break;
            default:
            errors.value.email = 'Login failed. Please check your credentials.';
        }
        }
  }
} 

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
