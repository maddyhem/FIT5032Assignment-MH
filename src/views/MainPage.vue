<template>

<!-- MAIN CONTENTS -->
    
    <div class="container d-flex flex-column justify-content-center align-items-center" style="height: calc(100vh - 150px);">
        <h1 class="text-center mb-3">Welcome to Cyclic Crafting</h1>
        <div class="row mb-3 text-center gap-3">
            <div class="col-12">
                <p>"There is no such thing as 'away'. When we throw anything away, it must go somewhere." - Annie Leonard</p> 
                <p> At Cyclic Crafting we are commited to prolonging the life cycle of our everyday products, bring people and creativity together in a space
                    that inspires others to do the same.
                </p>
            </div>
        </div>
        <form>
            <div class="row justify-content-center mb-3">
                <div class="col-auto d-flex gap-2">
                    <button type="button" class="btn btn-secondary">About Us</button>
                    <button type="button" class="btn btn-secondary">Learn More</button>
                </div>
            </div>
        </form>
    </div>

</template>


<script setup>
import { ref } from 'vue'
const isNavbarExpanded = ref(false)
</script>

<style scoped>

</style>