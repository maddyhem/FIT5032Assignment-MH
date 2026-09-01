<template>
<!-- MAIN CONTENTS -->
    
    <div class="container-fluid mt-1 d-flex justify-content-center align-items-center p-3" style="min-height: calc(100vh - 58px);">
        <div class="card p-4 shadow-lg border-0 d-flex flex-column justify-content-center align-items-center" 
             style="width: 98%; min-height: calc(100vh - 100px); background-color: #e2ead0; backdrop-filter: blur(10px)">
            
            <div class="text-center" style="max-width: 800px;">
                <!-- Title -->
                <h1 class="fw-bold mb-4" style="color: #384232;">Welcome to Cyclic Crafting</h1>
                
                <!-- Tagline -->
                <div class="row mb-4 justify-content-center">
                    <div class="col-12 text-secondary fs-5 lh-base">
                        <p class="fst-italic mb-3">
                            "There is no such thing as 'away'. When we throw anything away, it must go somewhere." 
                            <br>
                            <span class="fw-semibold">— Annie Leonard</span>
                        </p> 
                        <hr class="w-25 mx-auto my-4" style="color: #384232; opacity: 0.25;">
                        <p style="color: #384232;">
                            At Cyclic Crafting we are committed to prolonging the lifecycle of our everyday products, 
                            bringing people and creativity together in a space that inspires others to do the same.
                        </p>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="d-flex gap-3 justify-content-center mt-2">
                    <button type="button" class="btn btn-lg px-4 py-2 fw-semibold text-white shadow-sm border-0" style="background-color: #aaa46e;">About Us</button>
                    <button type="button" class="btn btn-lg px-4 py-2 fw-semibold text-white shadow-sm border-0" style="background-color: #384232;">Learn More</button>
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