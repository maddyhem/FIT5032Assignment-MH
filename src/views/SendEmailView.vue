<template>
    <div class="container-fluid mt-1 d-flex justify-content-center align-items-center p-3" style="min-height: calc(100vh - 58px);">
        <div class="card p-4 shadow-lg border-0 d-flex flex-column justify-content-center align-items-center" 
             style="width: 98%; min-height: calc(100vh - 100px); background-color: #e2ead0; backdrop-filter: blur(10px)">
            
            <div class="w-100" style="max-width: 600px;">
                <!-- Header -->
                <div class="text-center mb-4">
                    <h1 class="fw-bold" style="color: #384232;">Community post</h1>
                    <p class="text-secondary fs-6 mb-0" style="color: #555d4e !important;">
                        Send a message to your community.
                    </p>
                    <hr class="w-25 mx-auto my-3" style="color: #384232; opacity: 0.25;">
                </div>

                <!-- Email Form -->
                <form @submit.prevent="handleSendEmail" class="w-100 p-2">
                    <!-- Subject Field -->
                    <div class="mb-3">
                        <label class="form-label fw-semibold" style="color: #384232;">Subject</label>
                        <input 
                            v-model="emailData.subject" 
                            type="text" 
                            class="form-control form-control-lg border-0 shadow-sm custom-input" 
                            placeholder="What is this regarding?" 
                            required 
                        />
                    </div>

                    <!-- Message Body -->
                    <div class="mb-4">
                        <label class="form-label fw-semibold" style="color: #384232;">Your Message</label>
                        <textarea 
                            v-model="emailData.text" 
                            class="form-control form-control-lg border-0 shadow-sm custom-input" 
                            rows="5" 
                            placeholder="Write your creative thoughts or inquiries here..." 
                            required
                        ></textarea>
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
                            {{ isLoading ? 'Sending...' : 'Send Message' }}
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

// Form State
const emailData = ref({
    to: '',
    subject: '',
    text: ''
})

// UI Interaction State
const isLoading = ref(false)
const status = ref({
    message: '',
    isError: false
})

const resetForm = () => {
    emailData.value = { to: '', subject: '', text: '' }
    status.value = { message: '', isError: false }
}

const handleSendEmail = async () => {
    isLoading.value = true
    status.value.message = ''
    
    try {
        // Points to your local node endpoint or serverless function
        const response = await axios.post('http://localhost:3000/api/send-email', emailData.value)
        
        if (response.data.success) {
            status.value = {
                message: '✨ Message sent cleanly back into the universe!',
                isError: false
            }
            // Clear inputs after success
            emailData.value = { to: '', subject: '', text: '' }
        }
    } catch (error) {
        status.value = {
            message: '⚠️ Connection broken. Couldn\'t send email.',
            isError: true
        }
        console.error('Submission failure:', error)
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>
/* Subtle styling to blend bootstrap inputs nicely into the earthy vibe */
.custom-input {
    background-color: rgba(255, 255, 255, 0.75);
    color: #384232;
    transition: all 0.2s ease-in-out;
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
