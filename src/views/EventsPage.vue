<template>


    <!-- MAIN CONTENTS -->
    <div class="container-fluid mt-1 d-flex justify-content-start p-3" style="min-height: calc(100vh - 58px);">

        
        <div class="card p-4 shadow-lg border-0" 
             style="width: 98%; min-height: calc(100vh - 100px); background-color: #e2ead0; backdrop-filter: blur(10px)" >
            <!-- Title -->
            <h1 class="text-start mb-3">Find Events</h1>

            <!-- Search bar -->

            <!-- Add Event Button -->
            <div class="d-flex justify-content-end mb-4">
                <button type="button" 
                        class="btn d-flex align-items-center gap-2 px-4 py-2 fw-semibold text-white shadow-sm border-0" 
                        style="background-color: #384232;"
                        @click="showEventModal = true">
                    <span>+</span> Add Event
                </button>
            </div>

            <!-- EVENT LIST -->
            <h2 class="fw-bold mb-4" style="color: #384232;">Upcoming Events</h2>

            <!-- Display Loop if there are matching events -->
            
            <div class="row g-3" v-if="filteredEvents.length > 0">
                <div class="col-12 col-sm-12 col-lg-6" v-for="event in filteredEvents" :key="event.id">
                    <div class="card shadow-sm border-0 h-100 position-relative" style="background-color: #ffffff;">
                        
                        <!-- Quick Delete Button -->
                        <button type="button" 
                                class="btn-close position-absolute top-0 end-0 mt-2 me-2 p-1" 
                                style="font-size: 0.8rem;"
                                @click="deleteEvent(event.id)"
                                title="Delete Event">
                        </button>

                        <div class="card-body d-flex flex-column justify-content-between p-3">
                            <div>
                                <h5 class="card-title fw-bold mb-2 d-flex align-items-center gap-2" style="color: #384232;">
                                    <span></span> {{ event.title }}
                                </h5>
                            </div>
                            <div class="text-secondary small mt-2">
                                <strong>Date:</strong> {{ formatDate(event.date) }}
                            </div>
                            <div class="text-secondary small mt-2">
                                <strong>Time:</strong> {{ event.time }}
                            </div>
                            <div class="text-secondary small mt-2">
                                <strong>Location:</strong> {{ event.location }}
                            </div>
                            <div class="text-secondary small mt-2">
                                <strong></strong> {{ event.description }}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <!-- Placeholder for no events -->
            <div class="mt-2 text-center py-5 border rounded bg-white bg-opacity-50 text-secondary" v-else>
                <p class="m-0 fw-medium">No events found. Click "+ Add Event" to create one or adjust your search.</p>
            </div>
        </div>


        <!-- Event Creation Modal Backdrop --> 
        <div v-if="showEventModal" 
            class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-3" 
            style="background-color: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px);">
            
            <!-- Modal Card Container -->
            <div class="card p-4 shadow-lg border-0 m-3" style="width: 100%; max-width: 500px; background-color: #e2ead0;">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h3 class="fw-bold m-0" style="color: #384232;">Create Event</h3>
                    <button type="button" class="btn-close" @click="closeEventModal"></button>
                </div>

                <form @submit.prevent="submitEventForm">
                    <!-- Event Title Input -->
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="eventTitle" placeholder="Event Title" v-model="eventData.title" required>
                        <label for="eventTitle">Event Title</label>
                    </div>

                    <!-- Event Date Input -->
                    <div class="form-floating mb-3">
                        <input type="date" class="form-control" id="eventDate" placeholder="Date" v-model="eventData.date" required>
                        <label for="eventDate">Event Date</label>
                    </div>
                    <!-- Event Time Input -->
                    <div class="form-floating mb-3">
                        <input type="time" class="form-control" id="eventTime" placeholder="Time" v-model="eventData.time" required>
                        <label for="eventTime">Event Time</label>
                    </div>
                    <!-- Event Tag Input -->
                    <div class="form-floating mb-3">
                        <select class="form-select" id="eventTag" 
                        v-model="eventData.tag" placeholder="Tag">
                            <option value="" disabled selected>Select tag</option>
                            <option value="Crafts">Crafts</option>
                            <option value="Community">Community</option>
                            <option value="Learning"> Learning</option>
                        </select>
                        <label for="accountType">Tag</label>
                    </div>
                    <!-- Event Location Input -->
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="eventLocation" placeholder="Location" v-model="eventData.location" required>
                        <label for="eventLocation">Event Location</label>
                    </div>
                    <!-- Allow Reviews Checkbox -->
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" id="allowReviews" v-model="eventData.allowReviews">
                        <label class="form-check-label" for="allowReviews">
                            Allow Reviews
                        </label>
                    </div>
                    <!-- Event Description Input -->
                    <div class="form-floating mb-3">
                        <textarea class="form-control" id="eventDescription" placeholder="Description" v-model="eventData.description" style="height: 100px;" required></textarea>
                        <label for="eventDescription">Event Description</label>
                    </div>

                    <!-- Action Buttons -->
                    <div class="d-flex gap-2 mt-4">
                        <button type="submit" class="btn w-100 py-2 fw-semibold text-white" style="background-color: #384232;">Save Event</button>
                    </div>
                </form>
            </div>
        </div>
    
    </div>
    
</template>


<script setup>
import { ref, computed } from 'vue'
 
const isNavbarExpanded = ref(false)

const showEventModal = ref(false)

const eventData = ref({
    title: '',
    date: '',
    time: '',
    tag: '',
    location: '',
    allowReviews: false,
    description: ''
})

const savedEvents = ref([])

const closeEventModal = () => {
    showEventModal.value = false
    eventData.value.title = ''
    eventData.value.date = ''
    eventData.value.time = ''
    eventData.value.tag = ''
    eventData.value.location = ''
    eventData.value.description = ''
    eventData.value.allowReviews = false
}

const submitEventForm = () => {
    const newEvent = {
        id: Date.now(), // Gives it a unique key for the HTML loop
        title: eventData.value.title,
        date: eventData.value.date,
        time: eventData.value.time,
        tag: eventData.value.tag,
        location: eventData.value.location,
        description: eventData.value.description,
        allowReviews: eventData.value.allowReviews
    }

    savedEvents.value.push(newEvent)
    // searchQuery.value = '' 
    closeEventModal()
}

const searchQuery = ref('')

const filteredEvents = computed(() => {
    return savedEvents.value.filter(event => {
        return event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
})

const formatDate = (dateString) => {
    if (!dateString) return ''
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-AU', options)
}

</script>


<style scoped>

</style>