<template>
    <!-- MAIN CONTENTS -->
    <div class="container-fluid mt-1 d-flex justify-content-center p-3" style="min-height: calc(100vh - 58px);">
        <div class="card p-4 shadow-lg border-0 " 
             style="width: 98%; min-height: calc(100vh - 100px); background-color: #e2ead0; backdrop-filter: blur(10px)" >
            <!-- Title -->
            <h1 class="text-start mb-3">Find Events</h1>

            <!-- Search bar -->

            <!-- Add Event Button -->
            
            <div class="d-flex justify-content-end mb-4" v-if="isAdmin">
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
                                <strong>Description:</strong> {{ event.description }}
                            </div>
                            <div class="text-secondary small mt-2">
                                <strong>Rating:</strong> {{ event.averageRating ? `Average Rating: ${event.averageRating} (${event.ratingCount} reviews)` : 'No reviews yet' }}
                            </div>
                        </div>
                        <!-- --- ALIGNED DYNAMIC RATING SECTION --- -->
                        <div class="card-body d-flex flex-column justify-content-between p-3 border-top" style="background-color: #f8f9fa;">
                            <!-- Inline Summary to match small text format -->
                            <div v-if= "event.allowReviews" class="text-secondary small mb-1">

                                <strong>Rating:</strong> 
                                <span class="text-warning">
                                    <!-- Display stars matching the average rating integer -->
                                    <span v-for="star in 5" :key="'avg-'+star">
                                        {{ star <= Math.round(event.averageRating || 0) ? '★' : '☆' }}
                                    </span>
                                </span>
                                <span class="text-muted ms-1">({{ event.averageRating || 0 }} / 5 from {{ event.ratingCount || 0 }} reviews)</span>
                            </div>
                            
                            <!-- Aligned interactive wrapper -->
                            <div v-if="event.allowReviews && currentUser" class="text-secondary small d-flex align-items-center gap-2 mt-2">
                                <strong>Rate Event:</strong>
                                <div class="d-flex rating-stars">
                                    <button v-for="star in 5" 
                                            :key="'rate-'+star" 
                                            type="button" 
                                            class="btn btn-link p-0 border-0 text-decoration-none star-interactive-btn"
                                            :class="star <= (event.hoverRating || event.myRating || 0) ? 'text-warning' : 'text-muted'"
                                            @mouseenter="event.hoverRating = star"
                                            @mouseleave="event.hoverRating = 0"
                                            @click="handleRateEvent(event.id, star)"
                                            style="font-size: 1.1rem; line-height: 1;">
                                        {{ star <= (event.hoverRating || event.myRating || 0) ? '★' : '☆' }}
                                    </button>
                                </div>
                                <!-- Helpful text indicator if they have already rated -->
                                <span v-if="event.myRating > 0" class="text-success small ms-1 opacity-75">(Your score: {{ event.myRating }})</span>
                            </div>
                            <div v-else-if="event.allowReviews && !currentUser" class="text-secondary small mt-2 italic">
                                <strong>Rate Event:</strong> <span class="text-muted opacity-75">Log in to leave a rating</span>
                            </div>
                            <div v-else class="text-secondary small mt-2 italic">
                                <strong>Rate Event:</strong> <span class="text-muted opacity-75">Disabled for this event</span>
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
import { ref, computed, onMounted } from 'vue'
import { db } from '../firebase/firebase'; 
import { collection, addDoc, Timestamp, doc, runTransaction, getDocs, deleteDoc, getDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const isNavbarExpanded = ref(false)
const showEventModal = ref(false)
const currentUser = ref(null)
const isAdmin = ref(false)
const auth = getAuth() 

onAuthStateChanged(auth, (user) => {
    currentUser.value = user
})

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

// DATABASE FUNCTIONS

const fetchEvents = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'events'))
        
        // Use map with Promise.all to cleanly fetch the subcollection ratings records in parallel
        const eventsPromises = querySnapshot.docs.map(async (eventDoc) => {
            const data = eventDoc.data()
            
            let eventDate = ''
            if (data.date && typeof data.date.toDate === 'function') {
                eventDate = data.date.toDate().toISOString()
            } else if (data.date) {
                eventDate = data.date 
            }

            let rawDateObject = null
            if (data.date && typeof data.date.toDate === 'function') {
                rawDateObject = data.date.toDate()
            } else if (data.date) {
                rawDateObject = new Date(data.date)
            }

            // 2. Generate a reliable time fallback from the date object if the field is missing
            let displayTime = data.time
            if (!displayTime && rawDateObject) {
                displayTime = rawDateObject.toLocaleTimeString('en-AU', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                })
            }

            // Default fallback if no user profile is found
            let userExistingRating = 0

            // Query the inner subcollection for the currently authenticated user
            if (currentUser.value) {
                const userRatingRef = doc(db, 'events', eventDoc.id, 'ratings', currentUser.value.uid)
                const userRatingSnap = await getDoc(userRatingRef)
                if (userRatingSnap.exists()) {
                    userExistingRating = userRatingSnap.data().rating || 0
                }
            }

            return {
                id: eventDoc.id,
                title: data.title || 'Untitled Event',
                time: displayTime || 'No time set', // Fallback display string
                date: eventDate,    
                tag: data.tag || '',
                location: data.location || '',
                description: data.description || '',
                allowReviews: data.allowReviews !== undefined ? data.allowReviews : false,
                averageRating: typeof data.averageRating === 'number' ? data.averageRating : 0,
                ratingCount: typeof data.ratingCount === 'number' ? data.ratingCount : 0,
                
                // Track user selection values cleanly inside Vue memory
                myRating: userExistingRating, 
                hoverRating: 0 
            }
        })
        
        savedEvents.value = await Promise.all(eventsPromises)
    } catch (error) {
        console.error("Error fetching events from Firestore: ", error)
    }
}


// Automatically load event data as soon as the app component mounts
onMounted(() => {
    fetchEvents()

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser.value = user
            console.log("Logged in user UID:", user.uid)
            
            // 2. Fetch the user's custom role from your Firestore 'users' collection
            try {
                const userDocRef = doc(db, 'UserInfo', user.uid)
                const userDocSnap = await getDoc(userDocRef)
                
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data()
                    
                    // Check if the 'role' field equals 'admin'
                    if (userData.accountType === 'Admin') {
                        isAdmin.value = true
                        console.log("Access Granted: User is an Admin.")
                    } else {
                        isAdmin.value = false
                        console.log("Access Limited: User is a regular client.")
                    }
                } else {
                    // Document doesn't exist for this user id
                    isAdmin.value = false
                    console.log("No user profile found in Firestore database.")
                }
            } catch (error) {
                console.error("Error verifying user role: ", error)
                isAdmin.value = false
            }
        } else {
            currentUser.value = null
            isAdmin.value = false
            console.log("No user is currently logged in.")
        }
        fetchEvents() 
    })
})

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

const submitEventForm = async () => {
    try {
        // 1. Combine your local date and time fields into a single JavaScript Date object
        const dateTimeString = `${eventData.value.date}T${eventData.value.time}`
        const combinedDate = new Date(dateTimeString)

        // 2. Structure the data using proper Firestore-supported data types
        const newEvent = {
            title: eventData.value.title,
            // Convert JavaScript date into a native Firestore Timestamp
            date: Timestamp.fromDate(combinedDate), 
            tag: eventData.value.tag,
            location: eventData.value.location, // Keep as string for now, or use GeoPoint
            description: eventData.value.description,
            allowReviews: eventData.value.allowReviews,
            
            // 3. Initialize your rating tracking fields as numbers (as discussed earlier)
            averageRating: 0,
            ratingCount: 0
        }

        // 4. Send it to your 'events' collection in Firestore
        // Firestore automatically creates a strong, random unique string ID for you
        const docRef = await addDoc(collection(db, 'events'), newEvent)
        
        console.log("Document successfully written with ID: ", docRef.id)

        // 5. UI Cleanup
        await fetchEvents()
        closeEventModal()

    } catch (error) {
        console.error("Error adding event to Firestore: ", error)
        alert("Failed to save event. Check your console.")
    }
}

const deleteEvent = async (eventId) => {
    if (!confirm("Are you sure you want to delete this event?")) return
    try {
        // Drop standard row from database collection
        await deleteDoc(doc(db, 'events', eventId))
        // Remove item out of the local arrays instantly
        savedEvents.value = savedEvents.value.filter(event => event.id !== eventId)
        console.log("Document successfully removed from Firestore!")
    } catch (error) {
        console.error("Error deleting event doc:", error)
        alert("Could not remove event record.")
    }
}

// RATING FUNCTIONS

const submitUserRating = async (eventId, userId, newRatingValue) => {
    const eventRef = doc(db, 'events', eventId)
    const ratingRef = doc(db, 'events', eventId, 'ratings', userId)
    try {
        await runTransaction(db, async (transaction) => {
            const eventSnapshot = await transaction.get(eventRef)
            const ratingSnapshot = await transaction.get(ratingRef)

            if (!eventSnapshot.exists()) {
                throw new Error("Event does not exist!")
            }
            const eventData = eventSnapshot.data()
            if (eventData.allowReviews === false) {
                throw new Error("Reviews are disabled for this event.")
            }
            let currentAverage = eventData.averageRating || 0
            let currentCount = eventData.ratingCount || 0
            let updatedAverage = currentAverage
            let updatedCount = currentCount

            if (ratingSnapshot.exists()) {
                const oldRatingValue = ratingSnapshot.data().rating
                const totalScore = (currentAverage * currentCount) - oldRatingValue + newRatingValue
                updatedAverage = totalScore / currentCount
            } else {
                updatedCount = currentCount + 1
                const totalScore = (currentAverage * currentCount) + newRatingValue
                updatedAverage = totalScore / updatedCount
            }

            transaction.set(ratingRef, {
                rating: newRatingValue,
                userId: userId,
                timestamp: new Date()
            })
            transaction.set(eventRef, {
                averageRating: Number(updatedAverage.toFixed(2)),
                ratingCount: updatedCount
            }, { merge: true })
        })
        console.log("Rating successfully processed and average recalculated!")
        const localEvent = savedEvents.value.find(e => e.id === eventId)
        if (localEvent) {
            localEvent.myRating = newRatingValue
        }
        await fetchEvents()
    } catch (error) {
        console.error("Transaction failed: ", error)
        alert(error.message)
    }
}

const handleRateEvent = async (eventId, ratingValue) => {
    // 1. Safety Check: Verify if a user is logged in
    if (!currentUser.value) {
        alert("You must be logged in to rate this event!")
        return
    }

    // 2. Extract the actual active Firebase user UID
    const currentUserId = currentUser.value.uid
    
    console.log(`Submitting a ${ratingValue}-star rating for Event ID: ${eventId} by User: ${currentUserId}`)
    
    // 3. Fire the transaction calculation
    await submitUserRating(eventId, currentUserId, ratingValue)
}

const searchQuery = ref('')

const filteredEvents = computed(() => {
    return savedEvents.value.filter(event => {
        return event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
})

const formatDate = (dateValue) => {
    if (!dateValue) return 'No date set'
    
    // Accept either a direct JS Date object or a parseable string smoothly
    const date = new Date(dateValue)
    
    // Check if the date is actually valid before running string operations
    if (isNaN(date.getTime())) return 'Invalid Date'

    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('en-AU', options)
}

</script>


<style scoped>

</style>