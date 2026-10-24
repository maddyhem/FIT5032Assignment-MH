<template>
    <div class="container-fluid mt-1 d-flex justify-content-center align-items-center p-3" style="min-height: calc(100vh - 58px);">
        <div class="card p-4 shadow-lg border-0 d-flex flex-column justify-content-center align-items-center" 
             style="width: 98%; min-height: calc(100vh - 100px); background-color: #e2ead0; backdrop-filter: blur(10px)">
            
            <div class="w-100" style="max-width: 600px;">
                <!-- Header -->
                <div class="text-center mb-4">
                    <h1 class="fw-bold" style="color: #384232;">Report an Issue</h1>
                    <p class="text-secondary fs-6 mb-0" style="color: #555d4e !important;">
                        Help us improve your experience by reporting an issues you may encounter!
                    </p>
                    <hr class="w-25 mx-auto my-3" style="color: #384232; opacity: 0.25;">
                </div>

                <!-- Issue Report Form -->
                <form @submit.prevent="handleSendReport" class="w-100 p-2">
                    
                    <div class="row">
                        <!-- Reporter Name -->
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-semibold" style="color: #384232;">Your Name</label>
                            <input 
                                v-model="reportData.name" 
                                type="text" 
                                class="form-control form-control-lg border-0 shadow-sm custom-input" 
                                placeholder="Nature enthusiast" 
                                required 
                            />
                        </div>

                        <!-- Reporter Email -->
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-semibold" style="color: #384232;">Your Email</label>
                            <input 
                                v-model="reportData.email" 
                                type="email" 
                                class="form-control form-control-lg border-0 shadow-sm custom-input" 
                                placeholder="you@example.com" 
                                required 
                            />
                        </div>
                    </div>

                    <!-- Issue Type Dropdown -->
                    <div class="mb-3">
                        <label class="form-label fw-semibold" style="color: #384232;">What is the issue related to?</label>
                        <select 
                            v-model="reportData.category" 
                            class="form-select form-select-lg border-0 shadow-sm custom-input" 
                            required
                        >
                            <option value="" disabled selected>Select a category...</option>
                            <option value="Website Bug">Website Bug / Technical Glitch</option>
                            <option value="Account / Login">Account or Login Issue</option>
                            <option value="Events">Event issues</option>
                            <option value="Feedback">General  Feedback</option>
                            <option value="Other">Something Else</option>
                        </select>
                    </div>

                    <!-- Issue Description -->
                    <div class="mb-4">
                        <label class="form-label fw-semibold" style="color: #384232;">Describe the issue</label>
                        <textarea 
                            v-model="reportData.description" 
                            class="form-control form-control-lg border-0 shadow-sm custom-input" 
                            rows="5" 
                            placeholder="Please tell us what happened, or step-by-step how to find the problem..." 
                            required
                        ></textarea>
                    </div>

                    <!-- File Upload Section -->
                    <div class="mb-4">
                        <label class="form-label fw-semibold" style="color: #384232;">Upload a Screenshot (Optional)</label>
                        <input type="file" @change="handleFileChange" accept="image/*" class="form-control form-control-lg border-0 shadow-sm custom-input" />
                    </div>

                    <!-- Feedback Alerts -->
                    <div v-if="status.message" :class="['alert border-0 text-center py-2 mb-4 shadow-sm', status.isError ? 'alert-danger text-danger' : 'alert-success text-success']" style="background-color: rgba(255,255,255,0.6)">
                        {{ status.message }}
                    </div>

                    <!-- Action Buttons -->
                    <div class="d-flex gap-3 justify-content-center mt-2">
                        <button 
                            type="button" 
                            @click="resetForm"
                            class="btn btn-lg px-4 py-2 fw-semibold text-white shadow-sm border-0" 
                            style="background-color: #aaa46e;"
                            :disabled="isLoading"
                        >
                            Clear
                        </button>
                        <button 
                            type="submit" 
                            class="btn btn-lg px-4 py-2 fw-semibold text-white shadow-sm border-0 d-flex align-items-center gap-2" 
                            style="background-color: #384232;"
                            :disabled="isLoading"
                        >
                            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            {{ isLoading ? 'Submitting...' : 'Submit Report' }}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const reportData = ref({
    name: '',
    email: '',
    category: '',
    description: '',
    image: null 
})

const isLoading = ref(false)
const status = ref({
    message: '',
    isError: false
})

// Handle file input
const handleFileChange = (event) => {
    const file = event.target.files[0] 
    if (!file) {
        reportData.value.image = null
        return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
        const base64Parts = reader.result.split(',')
        const rawBase64Data = base64Parts[1] 
        
        reportData.value.image = {
            filename: file.name,
            base64Data: rawBase64Data, 
            type: file.type
        }
    }
    reader.readAsDataURL(file)
}


const resetForm = () => {
    reportData.value = { name: '', email: '', category: '', description: '', image: null }
    status.value = { message: '', isError: false }
}

const handleSendReport = async () => {
    isLoading.value = true
    status.value.message = ''
    
    try {
        const response = await axios.post('http://localhost:3000/api/report-issue', reportData.value)
        
        if (response.data.success) {
            status.value = {
                message: '✨ Report received! Thank you for helping us patch things up.',
                isError: false
            }
            resetForm()
        }
    } catch (error) {
        status.value = {
            message: '⚠️ Connection broken. Your report could not be sent to the server.',
            isError: true
        }
        console.error('Submission failure:', error)
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>
.custom-input {
    background-color: rgba(255, 255, 255, 0.75);
    color: #384232;
    transition: all 0.2s ease-in-out;
}

select.custom-input {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://w3.org' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23384232' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
}

.custom-input::placeholder {
    color: #8fa085;
}

.custom-input:focus {
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(56, 66, 50, 0.15) !important;
    outline: none;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
